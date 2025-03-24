const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const profileController = require('../controllers/profile.controller');

// @route   POST /api/profile/analyze
// @desc    Analyze LinkedIn profile
// @access  Private
router.post('/analyze', auth.authenticate, profileController.analyzeProfile);

// @route   POST /api/profile/optimization-preview
// @desc    Generate optimization preview
// @access  Private
router.post(
  '/optimization-preview',
  auth.authenticate,
  [
    check('profileId', 'Profile ID is required').not().isEmpty(),
    check('sections', 'Sections must be an array').isArray()
  ],
  profileController.generateOptimizationPreview
);

// @route   POST /api/profile/apply-optimizations
// @desc    Apply optimizations
// @access  Private
router.post(
  '/apply-optimizations',
  auth.authenticate,
  [
    check('profileId', 'Profile ID is required').not().isEmpty(),
    check('optimizations', 'Optimizations object is required').not().isEmpty()
  ],
  profileController.applyOptimizations
);

// @route   GET /api/profile/industry-benchmarks
// @desc    Get industry benchmarks
// @access  Private
router.get('/industry-benchmarks', auth.authenticate, profileController.getIndustryBenchmarks);

module.exports = router;
