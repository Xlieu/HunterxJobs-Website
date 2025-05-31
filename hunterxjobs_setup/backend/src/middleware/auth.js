const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user.model');
const logger = require('../utils/logger');

/**
 * Authenticate middleware
 * Verifies JWT token and adds user to request
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from header or cookie
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                 req.cookies?.token;

    if (!token) {
      logger.warn('Authentication failed - no token provided');
      return res.status(401).json({ 
        success: false,
        message: 'No token, authorization denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      logger.warn(`Authentication failed - user not found: ${decoded.id}`);
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Add user to request object
    req.user = user;
    
    // Store user ID in session for LinkedIn auth
    if (req.session) {
      req.session.userId = user._id;
    }

    logger.info(`User authenticated: ${user.email} (${user._id})`);
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({ 
      success: false,
      message: 'Token is not valid' 
    });
  }
};

/**
 * Authorize middleware
 * Checks if user has required role
 * @param {String|Array} roles - Required role(s)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required'
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this resource'
        });
      }

      next();
    } catch (error) {
      logger.error('Authorization error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error during authorization'
      });
    }
  };
};

/**
 * Create initial admin user
 * This function is called when the server starts
 */
const createInitialAdmin = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@hunterxjobs.com',
      password: 'admin123!',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully');

    // Create developer account for xenlieu@yahoo.com
    const developerExists = await User.findOne({ email: 'xenlieu@yahoo.com' });

    if (developerExists) {
      console.log('Developer account already exists');
      return;
    }

    // Generate a secure random password
    const password = Math.random().toString(36).slice(-10) + Math.random().toString(36).toUpperCase().slice(-2) + '!';
    
    // Create developer account
    const developer = new User({
      name: 'Developer',
      email: 'xenlieu@yahoo.com',
      password,
      role: 'developer'
    });

    await developer.save();
    console.log('Developer account created successfully');
    console.log('Developer credentials:');
    console.log('Email: xenlieu@yahoo.com');
    console.log('Password:', password);
  } catch (err) {
    console.error('Error creating initial users:', err.message);
  }
};

// Export all middleware functions
module.exports = {
  authenticate,
  authorize,
  createInitialAdmin
};
