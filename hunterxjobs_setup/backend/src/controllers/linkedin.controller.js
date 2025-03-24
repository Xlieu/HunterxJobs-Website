const config = require('../config/config');
const userService = require('../services/user.service');
const linkedinService = require('../services/linkedin.service');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const querystring = require('querystring');
const logger = require('../utils/logger');

// Constants for LinkedIn API
const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';
const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';

/**
 * Initiate LinkedIn OAuth flow
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
exports.initiateLinkedInAuth = async (req, res) => {
  try {
    // Check if this is a signup or connection request
    const isSignup = req.query.signup === 'true';
    
    // Check if user is already logged in (for connection flow)
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const currentUser = token ? await authService.getUserFromToken(token) : null;
    
    // Store in session whether this is a signup or connection
    req.session.linkedinAuthType = isSignup ? 'signup' : 'connect';
    
    // Store current user id if available (for connection flow)
    if (currentUser && currentUser._id) {
      req.session.currentUserId = currentUser._id.toString();
      logger.info(`Storing current user ID in session: ${currentUser._id.toString()}`);
    }
    
    // LinkedIn OAuth parameters
    const state = Math.random().toString(36).substring(2, 15);
    const params = {
      response_type: 'code',
      client_id: config.linkedin.clientId,
      redirect_uri: config.linkedin.redirectUri,
      state: state,
      scope: 'r_liteprofile r_emailaddress w_member_social',
    };
    
    // Store state in session for validation
    req.session.linkedinState = state;
    logger.info(`Initiating LinkedIn auth: ${isSignup ? 'signup' : 'connect'} flow`);
    
    // Redirect to LinkedIn authorization page
    const authUrl = `${LINKEDIN_AUTH_URL}?${querystring.stringify(params)}`;
    res.redirect(authUrl);
  } catch (error) {
    logger.error('Error initiating LinkedIn auth:', error);
    res.redirect(`${config.frontend.url}/login?linkedin=error&message=${encodeURIComponent('Failed to initiate LinkedIn authentication')}`);
  }
};

/**
 * Handle LinkedIn OAuth callback
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void}
 */
exports.handleLinkedInCallback = async (req, res) => {
  try {
    // Get code and state from query params
    const { code, state } = req.query;
    
    // Verify state parameter to prevent CSRF
    if (state !== req.session.linkedinState) {
      logger.error('LinkedIn callback: Invalid state parameter');
      return res.redirect(`${config.frontend.url}/login?linkedin=error&message=${encodeURIComponent('Invalid state parameter')}`);
    }
    
    // Get auth type from session
    const authType = req.session.linkedinAuthType || 'connect';
    const isSignup = authType === 'signup';
    
    logger.info(`LinkedIn callback received for ${authType} flow`);
    
    // Exchange authorization code for access token
    const tokenResponse = await axios.post(LINKEDIN_TOKEN_URL, querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.linkedin.redirectUri,
      client_id: config.linkedin.clientId,
      client_secret: config.linkedin.clientSecret,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    // Extract tokens
    const { access_token, expires_in } = tokenResponse.data;
    
    if (!access_token) {
      logger.error('LinkedIn callback: No access token received');
      return res.redirect(`${config.frontend.url}/login?linkedin=error&message=${encodeURIComponent('Failed to obtain access token')}`);
    }
    
    // Fetch LinkedIn profile data
    const profileData = await linkedinService.fetchLinkedInProfile(access_token);
    
    if (!profileData) {
      logger.error('LinkedIn callback: Failed to fetch profile data');
      return res.redirect(`${config.frontend.url}/login?linkedin=error&message=${encodeURIComponent('Failed to fetch LinkedIn profile data')}`);
    }
    
    logger.info(`LinkedIn profile fetched: ${profileData.name}`);
    
    // Handle signup or connection based on auth type
    if (isSignup) {
      // SIGNUP FLOW - Create a new user with LinkedIn
      let user = await userService.findUserByEmail(profileData.email);
      
      if (user) {
        // If user already exists, update their LinkedIn data
        user = await userService.updateUser(user._id, {
          linkedInAccessToken: access_token,
          linkedInTokenExpiry: new Date(Date.now() + expires_in * 1000),
          linkedInProfile: profileData,
          linkedInConnected: true,
        });
        
        logger.info(`Existing user updated with LinkedIn data: ${user.email}`);
      } else {
        // Create new user with LinkedIn data
        user = await userService.createUser({
          name: profileData.name,
          email: profileData.email,
          role: 'user',
          password: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          linkedInAccessToken: access_token,
          linkedInTokenExpiry: new Date(Date.now() + expires_in * 1000),
          linkedInProfile: profileData,
          linkedInConnected: true,
        });
        
        logger.info(`New user created with LinkedIn data: ${user.email}`);
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
      );
      
      // Encode user data for URL
      const encodedUser = encodeURIComponent(JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        linkedInConnected: true,
      }));
      
      // Redirect to frontend with token and user data
      return res.redirect(`${config.frontend.url}/login?linkedin=connected&token=${token}&user=${encodedUser}`);
      
    } else {
      // CONNECTION FLOW - Connect LinkedIn to existing user
      const currentUserId = req.session.currentUserId;
      
      if (!currentUserId) {
        logger.error('LinkedIn connection: No current user ID in session');
        return res.redirect(`${config.frontend.url}/dashboard?linkedin=error&message=${encodeURIComponent('No user authenticated for LinkedIn connection')}`);
      }
      
      // Update user with LinkedIn data
      const updatedUser = await userService.updateUser(currentUserId, {
        linkedInAccessToken: access_token,
        linkedInTokenExpiry: new Date(Date.now() + expires_in * 1000),
        linkedInProfile: profileData,
        linkedInConnected: true,
      });
      
      if (!updatedUser) {
        logger.error(`LinkedIn connection: Failed to update user ${currentUserId}`);
        return res.redirect(`${config.frontend.url}/dashboard?linkedin=error&message=${encodeURIComponent('Failed to update user with LinkedIn data')}`);
      }
      
      logger.info(`LinkedIn connected to user account: ${updatedUser.email}`);
      
      // Redirect to dashboard with success message
      return res.redirect(`${config.frontend.url}/dashboard?linkedin=connected`);
    }
    
  } catch (error) {
    logger.error('Error in LinkedIn callback:', error);
    const errorMessage = encodeURIComponent(error.message || 'An error occurred during LinkedIn authentication');
    res.redirect(`${config.frontend.url}/login?linkedin=error&message=${errorMessage}`);
  }
};

/**
 * Check if the current user has a connected LinkedIn account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Connection status and account information
 */
exports.getLinkedInConnectionStatus = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }
    
    const isConnected = user.linkedInConnected || false;
    const hasValidToken = user.linkedInAccessToken && 
                          user.linkedInTokenExpiry && 
                          new Date(user.linkedInTokenExpiry) > new Date();
    
    return res.status(200).json({
      success: true,
      isConnected,
      hasValidToken,
      linkedInEmail: user.linkedInProfile?.email || null,
      linkedInName: user.linkedInProfile?.name || null,
      connectionState: isConnected 
        ? (hasValidToken ? 'connected' : 'expired')
        : 'disconnected',
    });
  } catch (error) {
    logger.error('Error checking LinkedIn connection status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to check LinkedIn connection status',
      error: error.message,
    });
  }
};

/**
 * Disconnect LinkedIn from the current user's account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
exports.disconnectLinkedIn = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }
    
    // Update user to remove LinkedIn connection
    const updatedUser = await userService.updateUser(user._id, {
      linkedInAccessToken: null,
      linkedInTokenExpiry: null,
      linkedInConnected: false,
      // Keep linkedInProfile for historical purposes
    });
    
    if (!updatedUser) {
      return res.status(500).json({
        success: false,
        message: 'Failed to disconnect LinkedIn account',
      });
    }
    
    logger.info(`LinkedIn disconnected from user: ${user.email}`);
    
    return res.status(200).json({
      success: true,
      message: 'LinkedIn account disconnected successfully',
    });
  } catch (error) {
    logger.error('Error disconnecting LinkedIn:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to disconnect LinkedIn account',
      error: error.message,
    });
  }
};

/**
 * Get LinkedIn profile data for the current user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} LinkedIn profile data
 */
exports.getLinkedInProfileData = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }
    
    if (!user.linkedInConnected || !user.linkedInAccessToken) {
      return res.status(403).json({
        success: false,
        message: 'LinkedIn account not connected. Please connect your LinkedIn account first.',
        connectionRequired: true,
      });
    }
    
    // Check if token is expired
    if (user.linkedInTokenExpiry && new Date(user.linkedInTokenExpiry) < new Date()) {
      return res.status(401).json({
        success: false,
        message: 'LinkedIn token has expired. Please reconnect your LinkedIn account.',
        tokenExpired: true,
      });
    }
    
    // Fetch profile data using the user's token
    try {
      const linkedinService = require('../services/linkedin.service');
      const service = new linkedinService(user._id);
      const profileData = await service.getProfileData(user.linkedInAccessToken);
      
      // Log successful profile data retrieval
      console.log(`Successfully retrieved LinkedIn profile data for user ${user._id}`);
      
      return res.status(200).json({
        success: true,
        profile: profileData,
      });
    } catch (error) {
      // Log detailed error for debugging
      console.error('Error fetching LinkedIn profile data:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      
      // If there's an API error, inform the user they need to reconnect
      return res.status(401).json({
        success: false,
        message: 'Failed to fetch LinkedIn profile data. Please reconnect your LinkedIn account.',
        tokenInvalid: true,
        error: error.message
      });
    }
  } catch (error) {
    console.error('Error in getLinkedInProfileData:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get LinkedIn profile data',
      error: error.message,
    });
  }
};

/**
 * Analyze a LinkedIn profile by URL
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} LinkedIn profile analysis
 */
exports.analyzeLinkedInProfile = async (req, res) => {
  try {
    const { linkedInUrl } = req.body;
    
    if (!linkedInUrl) {
      return res.status(400).json({
        success: false,
        message: 'LinkedIn URL is required',
      });
    }
    
    // Extract username from URL
    const usernameMatch = linkedInUrl.match(/linkedin\.com\/in\/([^\/]+)/);
    if (!usernameMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid LinkedIn URL format',
      });
    }
    
    const username = usernameMatch[1];
    logger.info(`Analyzing LinkedIn profile for username: ${username}`);
    
    // Get user for token check
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }
    
    if (!user.linkedInConnected || !user.linkedInAccessToken) {
      return res.status(400).json({
        success: false,
        message: 'LinkedIn account not connected',
        connectionRequired: true,
      });
    }
    
    // Fetch profile data
    try {
      const profileData = await linkedinService.getProfileDataFromUsername(username, user.linkedInAccessToken);
      
      // Here you would typically analyze the profile data
      // This is where you might call the AI service to analyze the profile
      
      // For now, return a placeholder response
      return res.status(200).json({
        success: true,
        analysis: {
          overallScore: 75,
          sections: [
            {
              name: 'Profile Picture',
              score: 80,
              recommendations: [
                'Consider using a professional headshot with good lighting',
                'Make sure your face is clearly visible'
              ]
            },
            {
              name: 'Headline',
              score: 70,
              recommendations: [
                'Include your current role and specialization',
                'Add keywords relevant to your target industry'
              ]
            },
            {
              name: 'About Section',
              score: 65,
              recommendations: [
                'Tell a compelling professional story',
                'Highlight key achievements and skills',
                'Keep it between 3-5 paragraphs'
              ]
            },
            {
              name: 'Experience',
              score: 85,
              recommendations: [
                'Add metrics and specific achievements to each role',
                'Ensure job descriptions emphasize results, not just responsibilities'
              ]
            },
            {
              name: 'Skills & Endorsements',
              score: 75,
              recommendations: [
                'Prioritize skills most relevant to your target role',
                'Aim for at least 5 endorsements for key skills'
              ]
            },
          ],
          topRecommendations: [
            'Enhance your About section with specific achievements',
            'Add more relevant skills to your profile',
            'Request recommendations from colleagues and supervisors'
          ]
        },
        profileData: profileData
      });
    } catch (error) {
      logger.error('LinkedIn profile analysis error:', error);
      return res.status(401).json({
        success: false,
        message: error.message || 'Failed to analyze LinkedIn profile',
        error: true,
      });
    }
  } catch (error) {
    logger.error('Error in analyzeLinkedInProfile:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to analyze LinkedIn profile',
      error: error.message,
    });
  }
};

/**
 * Post content to LinkedIn
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Success message
 */
exports.postToLinkedIn = async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }
    
    if (!user.linkedInConnected || !user.linkedInAccessToken) {
      return res.status(400).json({
        success: false,
        message: 'LinkedIn account not connected',
        connectionRequired: true,
      });
    }
    
    // Check if token is expired
    if (user.linkedInTokenExpiry && new Date(user.linkedInTokenExpiry) < new Date()) {
      return res.status(401).json({
        success: false,
        message: 'LinkedIn token expired, please reconnect your account',
        tokenExpired: true,
      });
    }
    
    // Note: LinkedIn API posting requires special permissions
    // This is a placeholder for the actual implementation
    
    // Simulate successful posting
    logger.info(`Simulated LinkedIn post for user: ${user.email}`);
    
    return res.status(200).json({
      success: true,
      message: 'Content shared to LinkedIn successfully',
      // In a real implementation, this would include details from the LinkedIn API response
    });
  } catch (error) {
    logger.error('Error posting to LinkedIn:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to post to LinkedIn',
      error: error.message,
    });
  }
};
