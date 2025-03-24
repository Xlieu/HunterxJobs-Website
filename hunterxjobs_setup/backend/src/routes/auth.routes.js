const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/user', auth, authController.getCurrentUser);
router.post('/update', auth, authController.updateUser);
router.post('/logout', authController.logout);
router.get('/status', authController.checkStatus);

// Developer account route
router.post('/developer', auth, authController.createDeveloperAccount);

module.exports = router;
