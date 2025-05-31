const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const optimizationController = require('../controllers/optimization.controller');
const { authenticate } = require('../middleware/auth');

// @route   GET api/optimization/suggestions
// @desc    Get optimization suggestions for profile
// @access  Private
router.get('/suggestions', authenticate, optimizationController.getOptimizationSuggestions);

// @route   GET api/optimization/title
// @desc    Get title optimization suggestions
// @access  Private
router.get('/title', authenticate, optimizationController.getTitleSuggestions);

// @route   GET api/optimization/bio
// @desc    Get bio optimization suggestions
// @access  Private
router.get('/bio', authenticate, optimizationController.getBioSuggestions);

// @route   GET api/optimization/experience
// @desc    Get experience optimization suggestions
// @access  Private
router.get('/experience', authenticate, optimizationController.getExperienceSuggestions);

// @route   GET api/optimization/skills
// @desc    Get skills optimization suggestions
// @access  Private
router.get('/skills', authenticate, optimizationController.getSkillsSuggestions);

// @route   GET api/optimization/education
// @desc    Get education optimization suggestions
// @access  Private
router.get('/education', authenticate, optimizationController.getEducationSuggestions);

// @route   POST api/optimization/apply
// @desc    Apply optimization suggestion
// @access  Private
router.post(
  '/apply',
  [
    authenticate,
    check('section', 'Section is required').not().isEmpty(),
    check('suggestion', 'Suggestion is required').not().isEmpty()
  ],
  optimizationController.applySuggestion
);

// @route   POST api/optimization/publish
// @desc    Publish all optimizations to LinkedIn
// @access  Private
router.post('/publish', authenticate, optimizationController.publishOptimizations);

module.exports = router;
