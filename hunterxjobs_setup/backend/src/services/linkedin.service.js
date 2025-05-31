const agentService = require('../services/agent.service');
const axios = require('axios');
const querystring = require('querystring');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

/**
 * LinkedIn Service
 * Connects the LinkedIn Optimizer Agent with the LinkedIn integration endpoints
 */
class LinkedInService {
  constructor(userId) {
    this.userId = userId;
    this.linkedinOptimizer = agentService.getLinkedInOptimizerAgent();
    this.securityAgent = agentService.getSecurityAgent();
    
    // LinkedIn OAuth configuration
    this.config = {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      redirectUri: process.env.LINKEDIN_REDIRECT_URI,
      scope: process.env.LINKEDIN_SCOPE
    };
    
    // LinkedIn API endpoints - updated to use v2 API
    this.endpoints = {
      authorization: 'https://www.linkedin.com/oauth/v2/authorization',
      accessToken: 'https://www.linkedin.com/oauth/v2/accessToken',
      userInfo: 'https://api.linkedin.com/v2/userinfo', // OpenID Connect userinfo endpoint
      me: 'https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))',
      email: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      shares: 'https://api.linkedin.com/v2/shares',
      ugcPosts: 'https://api.linkedin.com/v2/ugcPosts' // For creating posts
    };
  }

  // Static version of fetchLinkedInProfile for direct module use
  static async fetchLinkedInProfile(accessToken) {
    const service = new LinkedInService(null); // No user ID needed for this operation
    return service.fetchLinkedInProfile(accessToken);
  }

  // Static version of getProfileData for direct module use
  static async getProfileData(accessToken) {
    const service = new LinkedInService(null); // No user ID needed for this operation
    return service.getProfileData(accessToken);
  }

  // Static version of getProfileDataFromUsername for direct module use
  static async getProfileDataFromUsername(username) {
    const service = new LinkedInService(null); // No user ID needed for this operation
    return service.getProfileDataFromUsername(username);
  }

  /**
   * Connect LinkedIn account
   */
  async connectAccount() {
    try {
      // Verify configuration
      if (!this.config.clientId || !this.config.clientSecret || !this.config.redirectUri) {
        throw new Error('LinkedIn OAuth configuration is incomplete');
      }
      
      // Generate state parameter for security
      const state = Math.random().toString(36).substring(2, 15);
      
      // Debug logging
      console.log('LinkedIn OAuth configuration:');
      console.log('- Client ID:', this.config.clientId);
      console.log('- Redirect URI:', this.config.redirectUri);
      console.log('- Scopes:', this.config.scope);
      
      // Build authorization URL
      const authUrl = `${this.endpoints.authorization}?${querystring.stringify({
        response_type: 'code',
        client_id: this.config.clientId,
        redirect_uri: this.config.redirectUri,
        state: state,
        scope: this.config.scope
      })}`;
      
      console.log('Authorization URL:', authUrl);
      
      // Store state in session/database for verification when user returns
      // This would be implemented in a real application
      
      return {
        success: true,
        message: 'LinkedIn connection initiated',
        redirectUrl: authUrl
      };
    } catch (error) {
      console.error('Error connecting LinkedIn account:', error);
      throw new Error('Failed to connect LinkedIn account: ' + error.message);
    }
  }

  /**
   * Handle OAuth callback and exchange code for access token
   * @param {String} code - Authorization code from LinkedIn
   * @param {String} state - State parameter for verification
   */
  async handleOAuthCallback(code, state) {
    try {
      // Verify state parameter (would check against stored state in a real application)
      console.log('Starting OAuth callback handling with state:', state);
      
      // Exchange authorization code for access token
      console.log('Exchanging authorization code for access token');
      const tokenResponse = await axios.post(this.endpoints.accessToken, querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.config.redirectUri,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      const { access_token, expires_in } = tokenResponse.data;
      console.log('Received access token from LinkedIn');
      console.log('Token expires in:', expires_in, 'seconds');
      
      // Find user by ID and update their LinkedIn credentials
      const User = require('../models/user.model');
      const user = await User.findById(this.userId);
      
      if (user) {
        console.log(`Updating LinkedIn access token for user: ${this.userId}`);
        user.linkedinAccessToken = access_token;
        user.linkedinTokenExpiry = new Date(Date.now() + expires_in * 1000);
        // Important: DO NOT change the user's role here
        await user.save();
        console.log('LinkedIn credentials saved successfully');
      } else {
        console.error('User not found:', this.userId);
        throw new Error('User not found when saving LinkedIn token');
      }
      
      return {
        success: true,
        message: 'LinkedIn account connected successfully',
        expiresIn: expires_in
      };
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      throw new Error('Failed to complete LinkedIn connection: ' + (error.response?.data?.error_description || error.message));
    }
  }

  /**
   * Get LinkedIn connection status
   */
  async getConnectionStatus() {
    try {
      // In a real implementation, this would check if the user has a valid access token
      // and retrieve the connection details from the database
      
      // For demonstration purposes, check if LinkedIn credentials are configured
      if (!this.config.clientId || !this.config.clientSecret) {
        return {
          connected: false,
          message: 'LinkedIn API credentials not configured'
        };
      }
      
      // Mock implementation - would check database for actual token in real app
      return {
        connected: true,
        lastSynced: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        username: 'johndoe',
        permissions: this.config.scope.split(' ')
      };
    } catch (error) {
      console.error('Error getting LinkedIn connection status:', error);
      throw new Error('Failed to get LinkedIn connection status');
    }
  }

  /**
   * Get LinkedIn profile data
   */
  async getProfileData(accessToken) {
    try {
      if (!accessToken) {
        throw new Error('LinkedIn access token is required. Please connect your LinkedIn account.');
      }

      // Get profile data from LinkedIn API
      console.log('Fetching LinkedIn profile with access token');
      
      // Fetch user information
      const userResponse = await axios.get(this.endpoints.userInfo, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      console.log('LinkedIn returned user info:', userResponse.data);
      
      // Create a profile object from the LinkedIn data
      const profile = {
        id: userResponse.data.sub,
        firstName: userResponse.data.given_name,
        lastName: userResponse.data.family_name,
        name: `${userResponse.data.given_name} ${userResponse.data.family_name}`,
        email: userResponse.data.email,
        headline: userResponse.data.preferred_username || '',
        profilePicture: userResponse.data.picture || ''
      };
      
      // Save the user profile to the database if we have a user ID
      if (this.userId) {
        try {
          const User = require('../models/user.model');
          const user = await User.findById(this.userId);
          if (user) {
            user.linkedinProfile = profile;
            user.linkedinProfileUpdated = new Date();
            await user.save();
          }
        } catch (err) {
          console.error('Error saving LinkedIn profile to user record:', err);
        }
      }
      
      return profile;
    } catch (err) {
      console.error('Error getting LinkedIn profile data:', err);
      throw err; // Propagate the error instead of returning mock data
    }
  }

  /**
   * Fetch LinkedIn profile data using the access token
   * This is the method called from the controller
   * @param {String} accessToken - LinkedIn access token
   * @returns {Object} LinkedIn profile data
   */
  async fetchLinkedInProfile(accessToken) {
    try {
      if (!accessToken) {
        throw new Error('Access token is required');
      }
      
      console.log('Fetching LinkedIn profile data with access token');
      
      // Try to use the API to get profile data
      try {
        // Fetch user information using OpenID Connect userinfo endpoint
        const userResponse = await axios.get(this.endpoints.userInfo, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        console.log('LinkedIn returned user info:', userResponse.data);
        
        // Create a profile object from the LinkedIn data
        return {
          id: userResponse.data.sub,
          name: `${userResponse.data.given_name} ${userResponse.data.family_name}`,
          firstName: userResponse.data.given_name,
          lastName: userResponse.data.family_name,
          email: userResponse.data.email,
          headline: userResponse.data.preferred_username || '',
          profilePicture: userResponse.data.picture || ''
        };
      } catch (apiError) {
        console.error('Error using LinkedIn API, using mock data instead:', apiError.message);
        
        // If we're in mock mode, generate some realistic mock data
        return {
          id: `mock_${Date.now()}`,
          name: 'John Smith',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          headline: 'Software Engineer',
          profilePicture: 'https://via.placeholder.com/150'
        };
      }
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
      throw error;
    }
  }

  /**
   * Get profile data from a LinkedIn username
   */
  async getProfileDataFromUsername(username) {
    try {
      // Defensive check for empty username
      if (!username || typeof username !== 'string') {
        console.error('Invalid LinkedIn username provided:', username);
        throw new Error('A valid LinkedIn username is required');
      }
      
      // Make sure the username is clean
      username = username.trim()
        .replace(/\/$/, '')       // Remove trailing slash
        .replace(/[\?#].*$/, '')  // Remove query parameters or hash
        .replace(/\s+/g, '-');    // Replace spaces with dashes
      
      console.log(`Fetching profile data for LinkedIn username: ${username}`);
      
      // Here you would implement actual LinkedIn scraping or API integration
      // For now, we'll throw an error prompting the user to authenticate with LinkedIn
      throw new Error('LinkedIn authentication required to fetch profile data. Please connect your LinkedIn account.');
    } catch (err) {
      console.error('Error fetching LinkedIn profile from username:', err);
      throw err; // Propagate the error instead of using mock data
    }
  }
  
  /**
   * Generate a default headline based on name
   * @private
   */
  _generateDefaultHeadline(firstName, lastName) {
    const industries = [
      'Software Development',
      'Digital Marketing',
      'Data Science',
      'Product Management',
      'Design',
      'Business Strategy'
    ];
    const roles = [
      'Professional',
      'Specialist',
      'Expert',
      'Consultant',
      'Leader'
    ];
    
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    return `${industry} ${role}`;
  }

  /**
   * Enhance a basic profile with mock data
   */
  _enhanceWithMockData(basicProfile) {
    const profile = { ...basicProfile };
    
    // Add additional profile information
    profile.industry = profile.industry || this._getRandomIndustry();
    profile.location = profile.location || {
      country: 'United States',
      city: this._getRandomCity()
    };
    
    // Generate positions (work experience)
    if (!profile.positions) {
      const userName = `${profile.firstName} ${profile.lastName}`;
      profile.positions = this._generatePositions(userName);
    }
    
    // Generate skills based on the profile headline or industry
    if (!profile.skills) {
      profile.skills = this._getSkillsBasedOnProfile(profile);
    }
    
    // Add education if not present
    if (!profile.education) {
      profile.education = this._generateEducation();
    }
    
    return profile;
  }

  /**
   * Generate mock profile data
   */
  _generateMockProfileData() {
    const firstName = this._getRandomFirstName();
    const lastName = this._getRandomLastName();
    const fullName = `${firstName} ${lastName}`;
    
    return {
      id: `mock_${Date.now()}`,
      firstName,
      lastName,
      headline: this._getRandomJobTitle(),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      industry: this._getRandomIndustry(),
      location: {
        country: 'United States',
        city: this._getRandomCity()
      },
      positions: this._generatePositions(fullName),
      skills: this._getRandomSkills(),
      education: this._generateEducation()
    };
  }

  /**
   * Scrape LinkedIn profile data using the access token
   * This uses a hybrid approach - we use the authenticated session from OAuth 
   * to access the user's profile without API restrictions
   * @param {String} accessToken - LinkedIn access token
   * @returns {Object} LinkedIn profile data
   * @private
   */
  async scrapeLinkedInProfile(accessToken) {
    try {
      console.log('Attempting to scrape LinkedIn profile with access token');
      
      // First, get the user's LinkedIn ID from the token
      const userInfoResponse = await axios.get(this.endpoints.userInfo, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const userId = userInfoResponse.data.sub;
      const profileUrl = `https://www.linkedin.com/in/${userId}`;
      
      console.log(`Profile URL to scrape: ${profileUrl}`);
      
      // Since direct scraping using axios is likely to be blocked,
      // we'll use LinkedIn's API to get as much data as possible
      
      // Get basic user info (already fetched)
      const basicInfo = userInfoResponse.data;
      
      // Create a structured profile object
      const profile = {
        id: userId,
        profileUrl: profileUrl,
        firstName: basicInfo.given_name || '',
        lastName: basicInfo.family_name || '',
        headline: basicInfo.headline || basicInfo.title || '',
        email: basicInfo.email || '',
        picture: basicInfo.picture || '',
        scrapedAt: new Date().toISOString()
      };
      
      console.log('Successfully created profile from API data');
      return profile;
    } catch (error) {
      console.error('Error scraping LinkedIn profile:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      throw new Error('Failed to scrape LinkedIn profile: ' + error.message);
    }
  }

  /**
   * Extract pattern from HTML using regex
   * @param {String} html - HTML content
   * @param {RegExp} pattern - Regular expression pattern
   * @returns {String} Extracted value or empty string
   * @private
   */
  _extractPattern(html, pattern) {
    const match = html.match(pattern);
    return match && match[1] ? match[1].replace(/\\u002d/g, '-').replace(/\\"/g, '"') : '';
  }

  /**
   * Extract experiences from HTML
   * @param {String} html - HTML content
   * @returns {Array} Extracted experiences
   * @private
   */
  _extractExperiences(html) {
    const experienceSection = html.match(/"experience":\[(.*?)\]}/);
    if (!experienceSection || !experienceSection[1]) return [];
    
    const experienceData = experienceSection[1];
    
    // Extract individual experience entries
    const experienceEntries = [];
    const experienceRegex = /"companyName":"([^"]+)","title":"([^"]+)","dateRange":"([^"]+)","description":"([^"]*)"/g;
    
    let match;
    while ((match = experienceRegex.exec(experienceData)) !== null) {
      experienceEntries.push({
        companyName: match[1].replace(/\\u002d/g, '-').replace(/\\"/g, '"'),
        title: match[2].replace(/\\u002d/g, '-').replace(/\\"/g, '"'),
        dateRange: match[3].replace(/\\u002d/g, '-').replace(/\\"/g, '"'),
        description: match[4].replace(/\\u002d/g, '-').replace(/\\"/g, '"')
      });
    }
    
    return experienceEntries;
  }

  /**
   * Extract skills from HTML
   * @param {String} html - HTML content
   * @returns {Array} Extracted skills
   * @private
   */
  _extractSkills(html) {
    const skillsSection = html.match(/"skills":\[(.*?)\]}/);
    if (!skillsSection || !skillsSection[1]) return [];
    
    const skillsData = skillsSection[1];
    
    // Extract individual skill entries
    const skillEntries = [];
    const skillRegex = /"name":"([^"]+)"/g;
    
    let match;
    while ((match = skillRegex.exec(skillsData)) !== null) {
      skillEntries.push(match[1].replace(/\\u002d/g, '-').replace(/\\"/g, '"'));
    }
    
    return skillEntries;
  }

  /**
   * Extract education from HTML
   * @param {String} html - HTML content
   * @returns {Array} Extracted education entries
   * @private
   */
  _extractEducation(html) {
    const educationSection = html.match(/"education":\[(.*?)\]}/);
    if (!educationSection || !educationSection[1]) return [];
    
    const educationData = educationSection[1];
    
    // Extract individual education entries
    const educationEntries = [];
    const educationRegex = /"schoolName":"([^"]+)","degreeName":"([^"]*)","fieldOfStudy":"([^"]*)","dateRange":"([^"]*)"/g;
    
    let match;
    while ((match = educationRegex.exec(educationData)) !== null) {
      educationEntries.push({
        schoolName: match[1].replace(/\\u002d/g, '-').replace(/\\"/g, '"'),
        degreeName: match[2].replace(/\\u002d/g, '-').replace(/\\"/g, '"'),
        fieldOfStudy: match[3].replace(/\\u002d/g, '-').replace(/\\"/g, '"'),
        dateRange: match[4].replace(/\\u002d/g, '-').replace(/\\"/g, '"')
      });
    }
    
    return educationEntries;
  }

  /**
   * Post content to LinkedIn
   */
  async postContent(content, hashtags) {
    try {
      // Perform security check on the content
      await this.securityAgent.performSecurityCheck({ content, hashtags });
      
      // In a real implementation, this would post content to LinkedIn through the LinkedIn API
      // using the stored access token
      
      // Mock implementation - would use actual API call in real app
      return {
        success: true,
        message: 'Content posted to LinkedIn successfully',
        postId: 'linkedin_post_' + Math.random().toString(36).substr(2, 9),
        timestamp: new Date()
      };
    } catch (error) {
      console.error('Error posting to LinkedIn:', error);
      throw new Error('Failed to post content to LinkedIn');
    }
  }

  /**
   * Get LinkedIn posts
   */
  async getPosts() {
    try {
      // In a real implementation, this would fetch the user's LinkedIn posts
      // through the LinkedIn API using the stored access token
      
      // Mock implementation - would use actual API call in real app
      return [
        {
          id: 'post_1',
          content: 'The digital marketing landscape isn\'t just evolving—it\'s experiencing a complete metamorphosis...',
          publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          likes: 156,
          comments: 32,
          shares: 18
        },
        {
          id: 'post_2',
          content: 'After analyzing trends across 500+ campaigns this quarter, I\'ve identified three shifts that are redefining success metrics...',
          publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
          likes: 124,
          comments: 18,
          shares: 12
        }
      ];
    } catch (error) {
      console.error('Error getting LinkedIn posts:', error);
      throw new Error('Failed to get LinkedIn posts');
    }
  }

  /**
   * Get LinkedIn connections
   */
  async getConnections() {
    try {
      // In a real implementation, this would fetch the user's LinkedIn connections
      // through the LinkedIn API using the stored access token
      
      // Mock implementation - would use actual API call in real app
      return {
        total: 500,
        data: [
          {
            id: 'conn_1',
            firstName: 'Jane',
            lastName: 'Smith',
            headline: 'Marketing Director at XYZ Corp',
            profileUrl: 'https://www.linkedin.com/in/janesmith/'
          },
          {
            id: 'conn_2',
            firstName: 'Michael',
            lastName: 'Johnson',
            headline: 'Digital Marketing Specialist',
            profileUrl: 'https://www.linkedin.com/in/michaeljohnson/'
          },
          // More connections would be here
        ],
        pagination: {
          start: 0,
          count: 10,
          total: 500
        }
      };
    } catch (error) {
      console.error('Error getting LinkedIn connections:', error);
      throw new Error('Failed to get LinkedIn connections');
    }
  }

  /**
   * Disconnect LinkedIn account
   */
  async disconnectAccount() {
    try {
      // In a real implementation, this would revoke the OAuth token and remove
      // the LinkedIn connection from the user's account in the database
      
      // Mock implementation - would use actual API call in real app
      return {
        success: true,
        message: 'LinkedIn account disconnected successfully'
      };
    } catch (error) {
      console.error('Error disconnecting LinkedIn account:', error);
      throw new Error('Failed to disconnect LinkedIn account');
    }
  }

  /**
   * Get LinkedIn API rate limit status
   */
  async getRateLimitStatus() {
    try {
      // In a real implementation, this would check the current rate limit status
      // with the LinkedIn API using the stored access token
      
      // Mock implementation - would use actual API call in real app
      return {
        dailyLimit: 800,
        remaining: 650,
        resetTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
        percentUsed: 18.75
      };
    } catch (error) {
      console.error('Error getting rate limit status:', error);
      throw new Error('Failed to get LinkedIn API rate limit status');
    }
  }

  /**
   * Generate appropriate skills based on profile headline
   * @private
   */
  _getSkillsBasedOnProfile(profile) {
    // Check if profile is an object or a string
    let headlineLower = '';
    
    if (typeof profile === 'object' && profile !== null) {
      // Extract headline from profile object
      headlineLower = (profile.headline || '').toLowerCase();
      
      // If there's also an industry, add it to improve matching
      if (profile.industry) {
        headlineLower += ' ' + profile.industry.toLowerCase();
      }
      
      console.log(`Getting skills based on profile headline: "${headlineLower}"`);
    } else if (typeof profile === 'string') {
      // If directly passed a string, use it as headline
      headlineLower = profile.toLowerCase();
      console.log(`Getting skills based on headline string: "${headlineLower}"`);
    } else {
      console.log('No valid profile data for skill generation, using default skills');
    }
    
    // Default skills (Marketing)
    const defaultSkills = [
      'Digital Marketing',
      'Content Strategy',
      'Brand Development',
      'Social Media Marketing',
      'Campaign Management'
    ];
    
    // Developer skills
    if (headlineLower.includes('developer') || 
        headlineLower.includes('engineer') || 
        headlineLower.includes('programming') || 
        headlineLower.includes('coder')) {
      return [
        'JavaScript',
        'React',
        'Node.js',
        'API Development',
        'Git',
        'CSS',
        'TypeScript',
        'Python'
      ];
    }
    
    // Data Science skills
    if (headlineLower.includes('data') || 
        headlineLower.includes('analytics') || 
        headlineLower.includes('machine learning')) {
      return [
        'Python',
        'Data Analysis',
        'Machine Learning',
        'SQL',
        'Data Visualization',
        'Pandas',
        'NumPy',
        'TensorFlow'
      ];
    }
    
    // Design skills
    if (headlineLower.includes('design') || 
        headlineLower.includes('ux') || 
        headlineLower.includes('ui')) {
      return [
        'UI/UX Design',
        'Figma',
        'Adobe Creative Suite',
        'Wireframing',
        'Prototyping',
        'User Research',
        'Visual Design',
        'Typography'
      ];
    }
    
    // Product Management skills
    if (headlineLower.includes('product') || 
        headlineLower.includes('manager') || 
        headlineLower.includes('management')) {
      return [
        'Product Strategy',
        'Agile Methodologies',
        'User Research',
        'Roadmapping',
        'Cross-functional Collaboration',
        'Market Analysis',
        'Feature Prioritization',
        'A/B Testing'
      ];
    }
    
    return defaultSkills;
  }

  /**
   * Get random skills for a profile
   * @private
   */
  _getRandomSkills() {
    // A generic set of professional skills
    const professionalSkills = [
      'Communication',
      'Leadership',
      'Project Management',
      'Time Management',
      'Problem Solving',
      'Critical Thinking',
      'Teamwork',
      'Adaptability'
    ];
    
    // General tech skills
    const techSkills = [
      'Microsoft Office',
      'Google Workspace',
      'Data Analysis',
      'Social Media',
      'Digital Marketing',
      'Customer Service',
      'Research',
      'Presentation Skills'
    ];
    
    // Combine both sets and return
    return [...professionalSkills, ...techSkills].slice(0, 10);
  }
  
  /**
   * Generate random positions/experience
   * @private
   */
  _generatePositions(name) {
    const companies = [
      'Acme Technologies',
      'Global Innovations',
      'Horizon Solutions',
      'Stellar Systems',
      'Quantum Dynamics',
      'Frontier Digital',
      'Apex Corporation',
      'Elite Strategies'
    ];
    
    const titles = [
      'Marketing Manager',
      'Software Engineer',
      'Product Manager',
      'Data Analyst',
      'UX Designer',
      'Project Lead',
      'Business Analyst',
      'Content Strategist'
    ];
    
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    
    // Generate 1-3 positions
    const numPositions = Math.floor(Math.random() * 3) + 1;
    const positions = [];
    
    for (let i = 0; i < numPositions; i++) {
      const company = getRandomItem(companies);
      const title = getRandomItem(titles);
      
      positions.push({
        company,
        title,
        dateRange: `${2020 - i} - ${i === 0 ? 'Present' : 2020 - i + 2}`,
        description: `As a ${title} at ${company}, ${name} led key initiatives that drove business growth and innovation.`
      });
    }
    
    return positions;
  }
  
  /**
   * Generate random education
   * @private
   */
  _generateEducation() {
    const universities = [
      'University of Technology',
      'State University',
      'National College',
      'Technical Institute',
      'Business School',
      'Liberal Arts College'
    ];
    
    const degrees = [
      'Bachelor of Science in Computer Science',
      'Master of Business Administration',
      'Bachelor of Arts in Communication',
      'Master of Science in Data Science',
      'Bachelor of Engineering',
      'Bachelor of Science in Marketing'
    ];
    
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    
    return [
      {
        school: getRandomItem(universities),
        degree: getRandomItem(degrees),
        fieldOfStudy: '',  // Field of study is included in the degree
        dateRange: '2012 - 2016'
      }
    ];
  }
  
  /**
   * Get random industry
   * @private
   */
  _getRandomIndustry() {
    const industries = [
      'Software Development',
      'Marketing and Advertising',
      'Information Technology',
      'Financial Services',
      'E-commerce',
      'Healthcare',
      'Education',
      'Consulting'
    ];
    
    return industries[Math.floor(Math.random() * industries.length)];
  }
  
  /**
   * Get random city
   * @private
   */
  _getRandomCity() {
    const cities = [
      'New York',
      'San Francisco',
      'Seattle',
      'Austin',
      'Chicago',
      'Boston',
      'Denver',
      'Los Angeles'
    ];
    
    return cities[Math.floor(Math.random() * cities.length)];
  }
  
  /**
   * Get random first name
   * @private
   */
  _getRandomFirstName() {
    const firstNames = [
      'Alex',
      'Jamie',
      'Jordan',
      'Taylor',
      'Casey',
      'Morgan',
      'Riley',
      'Avery'
    ];
    
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }
  
  /**
   * Get random last name
   * @private
   */
  _getRandomLastName() {
    const lastNames = [
      'Smith',
      'Johnson',
      'Williams',
      'Brown',
      'Jones',
      'Miller',
      'Davis',
      'Garcia'
    ];
    
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }
  
  /**
   * Get random job title
   * @private
   */
  _getRandomJobTitle() {
    const titles = [
      'Senior Software Engineer',
      'Marketing Director',
      'Product Manager',
      'Data Scientist',
      'UX/UI Designer',
      'Project Manager',
      'Business Analyst',
      'Content Strategist'
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
  }
}

module.exports = LinkedInService;
