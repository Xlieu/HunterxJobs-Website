/**
 * Authentication service for HunterxJobs backend
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const userService = require('./user.service');
const logger = require('../utils/logger');

/**
 * Verify JWT token
 * @param {string} token - The JWT token to verify
 * @returns {Promise<Object>} - The decoded token payload
 */
exports.verifyToken = async (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    logger.error('Error verifying token:', error);
    throw error;
  }
};

/**
 * Generate JWT token
 * @param {Object} payload - The payload to include in the token
 * @returns {string} - The generated JWT token
 */
exports.generateToken = (payload) => {
  return jwt.sign(
    payload,
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

/**
 * Authenticate user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<Object>} - Authentication result with user and token
 */
exports.authenticateUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await userService.findUserByEmail(email);
    
    if (!user) {
      logger.warn(`Authentication attempt with non-existent email: ${email}`);
      return { success: false, message: 'Invalid credentials' };
    }
    
    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!isPasswordMatch) {
      logger.warn(`Failed authentication attempt for user: ${email}`);
      return { success: false, message: 'Invalid credentials' };
    }
    
    // Generate token
    const token = this.generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });
    
    logger.info(`User authenticated successfully: ${email}`);
    
    return {
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  } catch (error) {
    logger.error('Authentication error:', error);
    throw error;
  }
};

/**
 * Check if user has required role
 * @param {Object} user - The user object
 * @param {string|Array} requiredRole - The required role(s)
 * @returns {boolean} - Whether the user has the required role
 */
exports.hasRole = (user, requiredRole) => {
  if (!user || !user.role) {
    return false;
  }
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }
  
  return user.role === requiredRole;
};

/**
 * Create a secure hash of password
 * @param {string} password - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    logger.error('Error hashing password:', error);
    throw error;
  }
};

/**
 * Get user from token
 * @param {string} token - JWT token
 * @returns {Promise<Object>} - User object
 */
exports.getUserFromToken = async (token) => {
  try {
    if (!token) {
      return null;
    }
    
    // Clean the token (remove Bearer prefix if present)
    const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
    
    // Verify token
    const decoded = await exports.verifyToken(cleanToken);
    
    if (!decoded || !decoded.id) {
      logger.warn('Invalid token format or missing user ID');
      return null;
    }
    
    // Get user from database
    const user = await userService.findUserById(decoded.id);
    
    if (!user) {
      logger.warn(`User not found for token ID: ${decoded.id}`);
      return null;
    }
    
    return user;
  } catch (error) {
    logger.error('Error getting user from token:', error);
    throw error;
  }
}; 