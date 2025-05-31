const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const userService = require('../services/user.service');
const logger = require('../utils/logger');

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }
    
    // Check if user already exists
    const existingUser = await userService.findUserByEmail(email);
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use. Please use a different email or login.'
      });
    }
    
    logger.info(`Registering new developer account: ${email}`);
    
    // Create user with developer role - this is a developer account registration
    const user = await userService.createUser({
      name,
      email,
      password,
      role: 'developer',
      accountType: 'developer'
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    // Return user info and token
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountType: 'developer',
        linkedInConnected: false
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

/**
 * Login user
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }
    
    // Check if user exists
    const user = await userService.findUserByEmail(email);
    
    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.'
      });
    }
    
    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      logger.warn(`Failed login attempt for user: ${email}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your email and password.'
      });
    }
    
    logger.info(`User logged in successfully: ${email} (${user._id})`);
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    // Set cookie with token (for web clients)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Store user ID in session for LinkedIn authentication
    if (req.session) {
      req.session.currentUserId = user._id.toString();
      logger.info(`User ID stored in session: ${user._id.toString()}`);
    } else {
      logger.warn('Session object not available during login');
    }
    
    // Return user info and token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountType: user.accountType || 'developer',
        linkedInConnected: user.linkedInConnected || false
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

/**
 * Get current user
 */
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    // Check if LinkedIn connection is still valid if the user has one
    const linkedInConnected = user.linkedInConnected || false;
    const linkedInTokenValid = user.linkedInTokenExpiry && new Date(user.linkedInTokenExpiry) > new Date();
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountType: user.accountType || 'developer',
        linkedInConnected,
        linkedInTokenValid: linkedInConnected ? linkedInTokenValid : undefined,
        linkedInEmail: user.linkedInProfile?.email || null,
        linkedInName: user.linkedInProfile?.name || null
      }
    });
  } catch (error) {
    logger.error('Error fetching current user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message
    });
  }
};

/**
 * Create developer account
 */
const createDeveloperAccount = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }
    
    // Check if user already exists
    const existingUser = await userService.findUserByEmail(email);
    
    if (existingUser) {
      logger.warn(`Developer account creation failed - email exists: ${email}`);
      return res.status(400).json({
        success: false,
        message: 'Email already in use. Please use a different email or login.'
      });
    }
    
    // Check if current user exists and has a LinkedIn connection
    const currentUser = req.user;
    
    // Create a developer account
    const developerUser = await userService.createUser({
      name,
      email,
      password,
      role: 'developer',
      accountType: 'developer'
    });
    
    logger.info(`Developer account created: ${email} (${developerUser._id})`);
    
    // If there's a current user with LinkedIn connection, link them
    if (currentUser && currentUser.linkedInConnected) {
      // Update the developer account with LinkedIn info
      await userService.updateUser(developerUser._id, {
        linkedInAccessToken: currentUser.linkedInAccessToken,
        linkedInTokenExpiry: currentUser.linkedInTokenExpiry,
        linkedInProfile: currentUser.linkedInProfile,
        linkedInConnected: true
      });
      
      logger.info(`Linked existing LinkedIn account to new developer account: ${email}`);
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: developerUser._id, email: developerUser.email, role: developerUser.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    
    // Return user info and token
    res.status(201).json({
      success: true,
      message: 'Developer account created successfully',
      token,
      user: {
        id: developerUser._id,
        name: developerUser.name,
        email: developerUser.email,
        role: developerUser.role,
        accountType: 'developer',
        linkedInConnected: developerUser.linkedInConnected || false
      }
    });
  } catch (error) {
    logger.error('Error creating developer account:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating developer account',
      error: error.message
    });
  }
};

/**
 * Update user
 */
const updateUser = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    const { name, email, currentPassword, newPassword } = req.body;
    const updateData = {};
    
    // Only update fields that are provided
    if (name) updateData.name = name;
    if (email && email !== user.email) {
      // Check if email is already in use
      const existingUser = await userService.findUserByEmail(email);
      
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another account'
        });
      }
      
      updateData.email = email;
    }
    
    // Handle password change
    if (newPassword && currentPassword) {
      // Verify current password
      const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
      
      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }
    
    // Update user
    if (Object.keys(updateData).length > 0) {
      const updatedUser = await userService.updateUser(user._id, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      logger.info(`User updated: ${user.email} (${user._id})`);
      
      // Generate new token if email changed
      let newToken = null;
      if (updateData.email) {
        newToken = jwt.sign(
          { id: updatedUser._id, email: updatedUser.email, role: updatedUser.role },
          config.jwt.secret,
          { expiresIn: config.jwt.expiresIn }
        );
      }
      
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        token: newToken,
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          accountType: updatedUser.accountType || 'developer',
          linkedInConnected: updatedUser.linkedInConnected || false
        }
      });
    } else {
      // No changes to make
      res.status(200).json({
        success: true,
        message: 'No changes to make',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          accountType: user.accountType || 'developer',
          linkedInConnected: user.linkedInConnected || false
        }
      });
    }
  } catch (error) {
    logger.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

/**
 * Delete user
 */
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    // Check if user is trying to delete someone else's account
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to delete this user' 
      });
    }
    
    await user.remove();
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error: ' + err.message);
  }
};

/**
 * Logout user
 */
const logout = (req, res) => {
  try {
    // Clear token cookie
    res.clearCookie('token');
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging out',
      error: error.message
    });
  }
};

/**
 * Check server status
 */
const checkStatus = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    logger.error('Status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking server status',
      error: error.message
    });
  }
};

// Export all controller functions
module.exports = {
  register,
  login,
  getCurrentUser,
  createDeveloperAccount,
  updateUser,
  deleteUser,
  logout,
  checkStatus
};
