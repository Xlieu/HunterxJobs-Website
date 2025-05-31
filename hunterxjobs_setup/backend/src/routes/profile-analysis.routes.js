const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const profileAnalysisController = require('../controllers/profile-analysis.controller');
const { authenticate } = require('../middleware/auth');

// @route   GET api/profile-analysis/analyze
// @desc    Analyze LinkedIn profile
// @access  Private
router.get('/analyze', authenticate, profileAnalysisController.analyzeProfile);

// @route   POST api/profile-analysis/preview
// @desc    Generate optimization preview
// @access  Private
router.post('/preview', [
  authenticate,
  [
    check('profileId', 'Profile ID is required').not().isEmpty(),
    check('sections', 'Sections array is required').isArray()
  ]
], profileAnalysisController.generateOptimizationPreview);

// @route   POST api/profile-analysis/apply
// @desc    Apply optimizations to profile
// @access  Private
router.post('/apply', [
  authenticate,
  [
    check('profileId', 'Profile ID is required').not().isEmpty(),
    check('optimizations', 'Optimizations object is required').isObject()
  ]
], profileAnalysisController.applyOptimizations);

// @route   GET api/profile-analysis/benchmarks/:industry
// @desc    Get industry benchmarks
// @access  Private
router.get('/benchmarks/:industry', authenticate, profileAnalysisController.getIndustryBenchmarks);

module.exports = router; 