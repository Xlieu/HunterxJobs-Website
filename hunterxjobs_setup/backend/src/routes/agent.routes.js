const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const agentController = require('../controllers/agent.controller');
const { authenticate } = require('../middleware/auth');

// @route   POST api/agent/analyze
// @desc    Analyze a user's LinkedIn profile
// @access  Private
router.post('/analyze', authenticate, agentController.analyzeProfile);

// @route   POST api/agent/generate-code
// @desc    Generate code with the programmer agent
// @access  Private/Developer
router.post('/generate-code', authenticate, agentController.generateCode);

module.exports = router;
