const express = require('express');
const router = express.Router();
const { 
  register,
  login,
  getCurrentUser,
  updateUser,
  logout,
  checkStatus,
  createDeveloperAccount
} = require('../controllers/auth.controller');
const { authenticate } = require('../middleware/auth');

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticate, getCurrentUser);
router.post('/update', authenticate, updateUser);
router.post('/logout', logout);
router.get('/status', checkStatus);

// Developer account route
router.post('/developer', authenticate, createDeveloperAccount);

module.exports = router;
