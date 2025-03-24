const { validationResult } = require('express-validator');
const ContentService = require('../services/content.service');

/**
 * Generate LinkedIn content
 */
exports.generateContent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { contentType, persona, topic } = req.body;

  try {
    const contentService = new ContentService(req.user.id);
    const generatedContent = await contentService.generateContent(contentType, persona, topic);
    
    res.json({
      content: generatedContent.content,
      vppiScore: generatedContent.vppiScore,
      recommendedHashtags: generatedContent.hashtags,
      optimalPostingTime: generatedContent.optimalPostingTime
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get available writing personas
 */
exports.getWritingPersonas = async (req, res) => {
  try {
    const contentService = new ContentService(req.user.id);
    const personas = await contentService.getAvailablePersonas();
    
    res.json(personas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get content templates
 */
exports.getContentTemplates = async (req, res) => {
  try {
    const contentService = new ContentService(req.user.id);
    const templates = await contentService.getContentTemplates();
    
    res.json(templates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Analyze content for virality
 */
exports.analyzeContentVirality = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content } = req.body;

  try {
    const contentService = new ContentService(req.user.id);
    const analysis = await contentService.analyzeVirality(content);
    
    res.json({
      vppiScore: analysis.score,
      breakdown: analysis.breakdown,
      improvementSuggestions: analysis.suggestions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get trending hashtag suggestions
 */
exports.getTrendingHashtags = async (req, res) => {
  try {
    const contentService = new ContentService(req.user.id);
    const hashtags = await contentService.getTrendingHashtags();
    
    res.json({
      trending: hashtags.trending,
      industry: hashtags.industry,
      personalized: hashtags.personalized
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Schedule content for posting
 */
exports.scheduleContent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, postDate, hashtags } = req.body;

  try {
    const contentService = new ContentService(req.user.id);
    const result = await contentService.scheduleContent(content, postDate, hashtags);
    
    res.json({
      success: result.success,
      message: result.message,
      scheduledId: result.id,
      scheduledFor: result.scheduledFor
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get scheduled content
 */
exports.getScheduledContent = async (req, res) => {
  try {
    const contentService = new ContentService(req.user.id);
    const scheduledContent = await contentService.getScheduledContent();
    
    res.json(scheduledContent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Delete scheduled content
 */
exports.deleteScheduledContent = async (req, res) => {
  const { id } = req.params;

  try {
    const contentService = new ContentService(req.user.id);
    const result = await contentService.deleteScheduledContent(id);
    
    res.json({
      success: result.success,
      message: result.message
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
