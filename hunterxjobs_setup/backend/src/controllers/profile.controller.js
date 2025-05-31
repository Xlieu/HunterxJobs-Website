const { validationResult } = require('express-validator');
const ProfileAnalyzer = require('../services/profileAnalyzer.service');
const OptimizationService = require('../services/optimization.service');

/**
 * Analyze LinkedIn profile
 */
exports.analyzeProfile = async (req, res) => {
  try {
    const profileAnalyzer = new ProfileAnalyzer(req.user.id);
    
    // Pass the useRealData flag from the request
    const useRealData = req.body.useRealData || req.headers['use-real-data'] === 'true';
    
    // Set environment variable temporarily for this request
    process.env.USE_MOCK_DATA = useRealData ? 'false' : 'true';
    
    const analysisResults = await profileAnalyzer.analyzeProfile();
    
    res.json(analysisResults);
  } catch (err) {
    console.error('Profile analysis error:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
};

/**
 * Get profile health score
 */
exports.getProfileHealthScore = async (req, res) => {
  try {
    const profileAnalyzer = new ProfileAnalyzer(req.user.id);
    const healthScore = await profileAnalyzer.calculateHealthScore();
    
    res.json({
      score: healthScore.score,
      previousScore: healthScore.previousScore,
      change: healthScore.change,
      lastUpdated: healthScore.lastUpdated,
      breakdown: healthScore.breakdown
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get industry benchmark comparison
 */
exports.getIndustryBenchmark = async (req, res) => {
  try {
    const profileAnalyzer = new ProfileAnalyzer(req.user.id);
    const benchmarkData = await profileAnalyzer.getIndustryBenchmark();
    
    res.json(benchmarkData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get opportunity radar results
 */
exports.getOpportunityRadar = async (req, res) => {
  try {
    const profileAnalyzer = new ProfileAnalyzer(req.user.id);
    const opportunities = await profileAnalyzer.scanOpportunities();
    
    res.json(opportunities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Sync LinkedIn profile data
 */
exports.syncLinkedInProfile = async (req, res) => {
  try {
    const profileAnalyzer = new ProfileAnalyzer(req.user.id);
    const syncResult = await profileAnalyzer.syncProfileData();
    
    res.json({
      success: syncResult.success,
      message: syncResult.message,
      lastSynced: syncResult.timestamp
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get profile update history
 */
exports.getProfileHistory = async (req, res) => {
  try {
    const profileAnalyzer = new ProfileAnalyzer(req.user.id);
    const history = await profileAnalyzer.getUpdateHistory();
    
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Update LinkedIn profile
 */
exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { section, content } = req.body;

  try {
    const profileAnalyzer = new ProfileAnalyzer(req.user.id);
    const updateResult = await profileAnalyzer.updateProfileSection(section, content);
    
    res.json({
      success: updateResult.success,
      message: updateResult.message,
      section: updateResult.section,
      timestamp: updateResult.timestamp
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Generate optimization preview
 */
exports.generateOptimizationPreview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { profileId, sections, useRealData } = req.body;

  try {
    const optimizationService = new OptimizationService(req.user.id);
    
    // Set environment variable temporarily for this request
    process.env.USE_MOCK_DATA = useRealData ? 'false' : 'true';
    
    const previewResults = await optimizationService.generatePreview(profileId, sections);
    
    res.json(previewResults);
  } catch (err) {
    console.error('Optimization preview error:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
};

/**
 * Apply optimizations
 */
exports.applyOptimizations = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { profileId, optimizations, useRealData } = req.body;

  try {
    const optimizationService = new OptimizationService(req.user.id);
    
    // Set environment variable temporarily for this request
    process.env.USE_MOCK_DATA = useRealData ? 'false' : 'true';
    
    const results = await optimizationService.applyOptimizations(profileId, optimizations);
    
    res.json(results);
  } catch (err) {
    console.error('Optimization application error:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
};

/**
 * Get industry benchmarks
 */
exports.getIndustryBenchmarks = async (req, res) => {
  try {
    const { industry } = req.query;
    const useRealData = req.query.useRealData === 'true' || req.headers['use-real-data'] === 'true';
    
    if (!industry) {
      return res.status(400).json({ 
        success: false, 
        message: 'Industry is required' 
      });
    }
    
    const profileAnalyzer = new ProfileAnalyzer(req.user.id);
    
    // Set environment variable temporarily for this request
    process.env.USE_MOCK_DATA = useRealData ? 'false' : 'true';
    
    const benchmarks = await profileAnalyzer.getIndustryBenchmarks(industry);
    
    res.json(benchmarks);
  } catch (err) {
    console.error('Industry benchmarks error:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
};
