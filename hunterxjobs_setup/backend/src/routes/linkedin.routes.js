const express = require('express');
const router = express.Router();
const linkedinController = require('../controllers/linkedin.controller');
const auth = require('../middleware/auth');

// Public routes
router.get('/connect', linkedinController.initiateLinkedInAuth);
router.get('/callback', linkedinController.handleLinkedInCallback);

// Protected routes (require authentication)
router.get('/status', auth, linkedinController.getLinkedInConnectionStatus);
router.get('/profile', auth, linkedinController.getLinkedInProfileData);
router.post('/analyze', auth, linkedinController.analyzeLinkedInProfile);
router.post('/post', auth, linkedinController.postToLinkedIn);
router.post('/disconnect', auth, linkedinController.disconnectLinkedIn);

module.exports = router;
