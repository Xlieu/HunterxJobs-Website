const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const contentController = require('../controllers/content.controller');
const { authenticate } = require('../middleware/auth');

// @route   POST api/content/generate
// @desc    Generate LinkedIn content
// @access  Private
router.post(
  '/generate',
  [
    authenticate,
    check('contentType', 'Content type is required').not().isEmpty(),
    check('persona', 'Writing persona is required').not().isEmpty(),
    check('topic', 'Topic is required').not().isEmpty()
  ],
  contentController.generateContent
);

// @route   GET api/content/personas
// @desc    Get available writing personas
// @access  Private
router.get('/personas', authenticate, contentController.getWritingPersonas);

// @route   GET api/content/templates
// @desc    Get content templates
// @access  Private
router.get('/templates', authenticate, contentController.getContentTemplates);

// @route   POST api/content/analyze
// @desc    Analyze content for virality
// @access  Private
router.post(
  '/analyze',
  [
    authenticate,
    check('content', 'Content is required').not().isEmpty()
  ],
  contentController.analyzeContentVirality
);

// @route   GET api/content/hashtags
// @desc    Get trending hashtag suggestions
// @access  Private
router.get('/hashtags', authenticate, contentController.getTrendingHashtags);

// @route   POST api/content/schedule
// @desc    Schedule content for posting
// @access  Private
router.post(
  '/schedule',
  [
    authenticate,
    check('content', 'Content is required').not().isEmpty(),
    check('postDate', 'Post date is required').not().isEmpty()
  ],
  contentController.scheduleContent
);

// @route   GET api/content/scheduled
// @desc    Get scheduled content
// @access  Private
router.get('/scheduled', authenticate, contentController.getScheduledContent);

// @route   DELETE api/content/scheduled/:id
// @desc    Delete scheduled content
// @access  Private
router.delete('/scheduled/:id', authenticate, contentController.deleteScheduledContent);

module.exports = router;
