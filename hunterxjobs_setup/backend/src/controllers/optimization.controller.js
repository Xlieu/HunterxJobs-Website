const { validationResult } = require('express-validator');
const OptimizationService = require('../services/optimization.service');

/**
 * Get optimization suggestions for profile
 */
exports.getOptimizationSuggestions = async (req, res) => {
  try {
    const optimizationService = new OptimizationService(req.user.id);
    const suggestions = await optimizationService.getAllSuggestions();
    
    res.json(suggestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get title optimization suggestions
 */
exports.getTitleSuggestions = async (req, res) => {
  try {
    const optimizationService = new OptimizationService(req.user.id);
    const titleSuggestions = await optimizationService.getTitleSuggestions();
    
    res.json({
      currentTitle: titleSuggestions.current,
      currentImpact: titleSuggestions.currentImpact,
      suggestions: titleSuggestions.suggestions,
      estimatedImpact: titleSuggestions.estimatedImpact
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get bio optimization suggestions
 */
exports.getBioSuggestions = async (req, res) => {
  try {
    const optimizationService = new OptimizationService(req.user.id);
    const bioSuggestions = await optimizationService.getBioSuggestions();
    
    res.json({
      currentBio: bioSuggestions.current,
      currentImpact: bioSuggestions.currentImpact,
      suggestions: bioSuggestions.suggestions,
      estimatedImpact: bioSuggestions.estimatedImpact
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get experience optimization suggestions
 */
exports.getExperienceSuggestions = async (req, res) => {
  try {
    const optimizationService = new OptimizationService(req.user.id);
    const experienceSuggestions = await optimizationService.getExperienceSuggestions();
    
    res.json(experienceSuggestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get skills optimization suggestions
 */
exports.getSkillsSuggestions = async (req, res) => {
  try {
    const optimizationService = new OptimizationService(req.user.id);
    const skillsSuggestions = await optimizationService.getSkillsSuggestions();
    
    res.json({
      currentSkills: skillsSuggestions.current,
      suggestedAdditions: skillsSuggestions.additions,
      suggestedRemovals: skillsSuggestions.removals,
      suggestedReordering: skillsSuggestions.reordering,
      trendingSkills: skillsSuggestions.trending
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get education optimization suggestions
 */
exports.getEducationSuggestions = async (req, res) => {
  try {
    const optimizationService = new OptimizationService(req.user.id);
    const educationSuggestions = await optimizationService.getEducationSuggestions();
    
    res.json(educationSuggestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Apply optimization suggestion
 */
exports.applySuggestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { section, suggestion } = req.body;

  try {
    const optimizationService = new OptimizationService(req.user.id);
    const result = await optimizationService.applySuggestion(section, suggestion);
    
    res.json({
      success: result.success,
      message: result.message,
      section: result.section,
      appliedAt: result.timestamp
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Publish all optimizations to LinkedIn
 */
exports.publishOptimizations = async (req, res) => {
  try {
    const optimizationService = new OptimizationService(req.user.id);
    const result = await optimizationService.publishAllOptimizations();
    
    res.json({
      success: result.success,
      message: result.message,
      publishedSections: result.sections,
      publishedAt: result.timestamp
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
