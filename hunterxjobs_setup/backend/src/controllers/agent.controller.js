/**
 * Agent Controller
 * Handles agent-related operations like profile analysis
 */
const agentService = require('../services/agent.service');
const LinkedInService = require('../services/linkedin.service');
const User = require('../models/user.model');

/**
 * Analyze LinkedIn profile
 */
exports.analyzeProfile = async (req, res) => {
  console.log('==== PROFILE ANALYSIS REQUEST ====');
  console.log('Request body:', req.body);
  console.log('User ID from token:', req.user ? req.user.id : 'No user in request');
  
  try {
    if (!req.user || !req.user.id) {
      console.error('Authentication error: No user ID in request');
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }
    
    console.log('Finding user in database...');
    const user = await User.findById(req.user.id);
    
    if (!user) {
      console.error(`User not found with ID ${req.user.id}`);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    console.log(`Found user: ${user.name}, email: ${user.email}, role: ${user.role}`);
    console.log('LinkedIn connected:', !!user.linkedinAccessToken);
    
    let profileData = user.profileData || null;
    
    // If we have no profile data, or it's older than 1 hour, fetch fresh data
    const linkedinService = new LinkedInService(user._id);
    
    if (!profileData) {
      console.log('No existing profile data, attempting to fetch from LinkedIn...');
      try {
        profileData = await linkedinService.fetchProfileData();
        console.log('Successfully fetched LinkedIn profile data');
      } catch (error) {
        console.error('Error fetching LinkedIn profile:', error.message);
        
        // Create minimal profile data if none exists
        if (!profileData) {
          console.log('Creating fallback profile data');
          profileData = {
            firstName: user.name.split(' ')[0] || 'User',
            lastName: user.name.split(' ').slice(1).join(' ') || '',
            headline: 'LinkedIn User',
            summary: 'No profile data available',
            positions: [],
            skills: [],
            education: [],
            createdAt: new Date(),
            id: user._id.toString()
          };
        }
      }
      
      // Save the profile data to the user
      user.profileData = profileData;
      await user.save();
      console.log('Saved profile data to user document');
    } else {
      console.log('Using existing profile data');
    }
    
    // At this point we should have profile data, either fresh or from DB
    console.log('Profile data available:', !!profileData);
    
    if (!profileData) {
      console.error('Failed to get profile data');
      return res.status(400).json({
        success: false,
        message: 'Failed to get profile data'
      });
    }
    
    // Log sample of profile data
    console.log('Profile data sample:', {
      id: profileData.id,
      name: `${profileData.firstName} ${profileData.lastName}`,
      headline: profileData.headline,
      hasPositions: Array.isArray(profileData.positions) ? profileData.positions.length : 'N/A',
      hasSkills: Array.isArray(profileData.skills) ? profileData.skills.length : 'N/A'
    });
    
    // Analyze the profile using the LinkedIn Optimizer agent
    console.log('Running profile analysis with LinkedIn Optimizer agent...');
    
    try {
      const agentService = new agentService();
      const analyzedProfile = await agentService.analyzeProfile(profileData);
      
      console.log('Analysis completed successfully');
      console.log('Analysis results sample:', {
        hasScore: !!analyzedProfile.score,
        suggestions: Array.isArray(analyzedProfile.suggestions) ? analyzedProfile.suggestions.length : 'N/A',
        improvements: Array.isArray(analyzedProfile.improvements) ? analyzedProfile.improvements.length : 'N/A'
      });
      
      return res.json({
        success: true,
        message: 'Profile analyzed successfully',
        results: analyzedProfile
      });
    } catch (analyzeError) {
      console.error('Error in agent analysis:', analyzeError);
      return res.status(500).json({
        success: false,
        message: 'Error analyzing profile with AI agent',
        error: analyzeError.message
      });
    }
  } catch (error) {
    console.error('Profile analysis controller error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  } finally {
    console.log('==== PROFILE ANALYSIS REQUEST COMPLETE ====');
  }
};

/**
 * Check if user has the developer role
 */
exports.checkDeveloperRole = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }

  if (req.user.role !== 'developer' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'You do not have permission to access this feature. Developer role required.'
    });
  }

  next();
};

/**
 * Generate code using the programmer agent
 */
exports.generateCode = async (req, res) => {
  const { feature, requirements } = req.body;

  try {
    // Check required parameters
    if (!feature || !requirements) {
      return res.status(400).json({
        success: false,
        message: 'Feature name and requirements are required'
      });
    }

    // Log the request
    console.log(`Generating code for feature: ${feature}`);
    console.log(`Requirements: ${requirements}`);
    console.log(`User ID: ${req.user.id}`);

    // Get the Programmer agent
    const programmerAgent = agentService.getProgrammerAgent();

    // Generate code (mock implementation)
    const generatedCode = `// Generated code for ${feature}
function analyzeLinkedInProfile(profileData) {
  // Initialize score tracker
  let scores = {
    headline: 0,
    about: 0,
    experience: 0,
    skills: 0,
    education: 0,
    recommendations: 0
  };
  
  // Analyze the headline (example logic)
  if (profileData.headline) {
    // Check length
    if (profileData.headline.length > 10 && profileData.headline.length < 120) {
      scores.headline += 20;
    }
    
    // Check for keywords
    const keywords = ['professional', 'expert', 'specialist', 'lead'];
    keywords.forEach(keyword => {
      if (profileData.headline.toLowerCase().includes(keyword)) {
        scores.headline += 5;
      }
    });
  }
  
  // Calculate total score (simplified)
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  return {
    totalScore,
    sectionScores: scores,
    recommendations: generateRecommendations(scores, profileData)
  };
}

function generateRecommendations(scores, profileData) {
  // Implementation would contain logic to create personalized recommendations
  // based on profile analysis
  return [
    "Add industry-specific keywords to your headline",
    "Expand your about section with quantifiable achievements",
    "Add more details about your responsibilities in recent positions"
  ];
}

// Export the analyzer
module.exports = { analyzeLinkedInProfile };`;

    // Return response
    res.json({
      success: true,
      message: 'Code generated successfully',
      code: generatedCode,
      explanation: 'This code provides functions to analyze a LinkedIn profile and generate recommendations for improvement.',
      fileStructure: {
        'profile-analyzer.js': 'Main analysis functions',
        'recommendations.js': 'Recommendation generation logic',
        'utils/scoring.js': 'Scoring utilities'
      }
    });
  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating code: ' + error.message
    });
  }
}; 