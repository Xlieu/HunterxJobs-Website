const express = require('express');
const router = express.Router();
const linkedinController = require('../controllers/linkedin.controller');
const auth = require('../middleware/auth');

// Public routes
router.get('/connect', linkedinController.initiateLinkedInAuth);
router.get('/callback', linkedinController.handleLinkedInCallback);

// Protected routes (require authentication)
router.get('/status', auth.authenticate, linkedinController.getLinkedInConnectionStatus);
router.get('/profile', auth.authenticate, linkedinController.getLinkedInProfileData);
router.post('/analyze', auth.authenticate, linkedinController.analyzeLinkedInProfile);
router.post('/post', auth.authenticate, linkedinController.postToLinkedIn);
router.post('/disconnect', auth.authenticate, linkedinController.disconnectLinkedIn);

module.exports = router;
