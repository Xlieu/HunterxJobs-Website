const LinkedInService = require('../services/linkedin.service');
const agentService = require('../services/agent.service');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');

/**
 * Analyze LinkedIn profile
 * This endpoint retrieves the user's LinkedIn profile and performs comprehensive analysis
 */
exports.analyzeProfile = async (req, res) => {
  try {
    // Get the user ID from authenticated request
    const userId = req.user ? req.user.id : req.session?.userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }
    
    // Initialize services
    const linkedInService = new LinkedInService(userId);
    const linkedinOptimizer = agentService.getLinkedInOptimizerAgent();
    
    // Fetch profile data
    console.log('Fetching LinkedIn profile data for analysis');
    const profileData = await linkedInService.getProfileData();
    
    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: 'LinkedIn profile data not found'
      });
    }
    
    // Perform comprehensive profile analysis
    console.log('Analyzing LinkedIn profile with AI agent');
    const analysisResults = await linkedinOptimizer.analyzeProfile(profileData);
    
    // Return analysis results
    res.json({
      success: true,
      profile: profileData,
      analysis: analysisResults
    });
  } catch (err) {
    console.error('Error in profile analysis:', err);
    res.status(500).json({
      success: false,
      message: 'Error analyzing LinkedIn profile: ' + err.message
    });
  }
};

/**
 * Generate optimization preview
 * This endpoint generates previews of optimized profile sections
 */
exports.generateOptimizationPreview = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Get parameters
    const { profileId, sections } = req.body;
    const userId = req.user.id;
    
    // Initialize services
    const linkedInService = new LinkedInService(userId);
    const linkedinOptimizer = agentService.getLinkedInOptimizerAgent();
    
    // Fetch profile data
    const profileData = await linkedInService.getProfileData();
    
    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: 'LinkedIn profile data not found'
      });
    }
    
    // Generate previews for requested sections
    const previews = {};
    for (const section of sections) {
      previews[section] = await linkedinOptimizer.generateOptimizationSuggestions(profileData, section);
    }
    
    // Return preview results
    res.json({
      success: true,
      profileId,
      previews
    });
  } catch (err) {
    console.error('Error generating optimization preview:', err);
    res.status(500).json({
      success: false,
      message: 'Error generating preview: ' + err.message
    });
  }
};

/**
 * Apply optimizations to profile
 * This endpoint applies the optimized content to the user's profile recommendations
 */
exports.applyOptimizations = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Get parameters
    const { profileId, optimizations } = req.body;
    const userId = req.user.id;
    
    if (!optimizations || Object.keys(optimizations).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No optimizations provided'
      });
    }
    
    // Store the optimizations for the user
    const User = require('../models/user.model');
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user's stored optimizations
    user.profileOptimizations = {
      ...user.profileOptimizations,
      linkedin: optimizations,
      lastUpdated: new Date()
    };
    
    await user.save();
    
    // Return success
    res.json({
      success: true,
      message: 'Optimizations saved successfully',
      profileId,
      appliedOptimizations: Object.keys(optimizations)
    });
  } catch (err) {
    console.error('Error applying optimizations:', err);
    res.status(500).json({
      success: false,
      message: 'Error applying optimizations: ' + err.message
    });
  }
};

/**
 * Get industry benchmarks
 * This endpoint returns industry benchmarks for comparison
 */
exports.getIndustryBenchmarks = async (req, res) => {
  try {
    // Get industry parameter
    const { industry } = req.params;
    const userId = req.user.id;
    
    // Initialize LinkedIn optimizer agent
    const linkedinOptimizer = agentService.getLinkedInOptimizerAgent();
    
    // Get industry benchmarks
    const benchmarks = await linkedinOptimizer.getIndustryBenchmark(industry);
    
    // Get top profile examples
    const topProfiles = linkedinOptimizer.topProfileExamples;
    
    // Return benchmarks and examples
    res.json({
      success: true,
      industry,
      benchmarks,
      topProfiles
    });
  } catch (err) {
    console.error('Error fetching industry benchmarks:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching benchmarks: ' + err.message
    });
  }
}; 