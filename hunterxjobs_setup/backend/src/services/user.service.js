const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

// Mock user data for development
const mockUsers = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'John Doe',
    email: 'admin@hunterxjobs.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // password: admin123
    role: 'admin',
    createdAt: new Date('2023-01-01')
  },
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'Jane Smith',
    email: 'user@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // password: admin123
    role: 'user',
    createdAt: new Date('2023-01-02')
  },
  {
    _id: '60d0fe4f5311236168a109cc',
    name: 'Developer Account',
    email: 'xenlieu@yahoo.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // password: admin123
    role: 'developer',
    createdAt: new Date('2023-01-03')
  },
  {
    _id: '60d0fe4f5311236168a109cd',
    name: 'Test Admin',
    email: 'admin@test.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // password: admin123
    role: 'admin',
    createdAt: new Date('2023-01-04')
  }
];

// Check if we're using mock data
const useMockData = process.env.USE_MOCK_DATA === 'true';

// Helper function to clone mock data (to avoid direct references)
const cloneMockData = (data) => JSON.parse(JSON.stringify(data));

// Helper function to check if MongoDB is connected
const isMongoDBConnected = () => {
  return mongoose.connection.readyState === 1; // 1 means connected
};

/**
 * Find a user by email address
 * @param {string} email - The email address to search for
 * @returns {Promise<Object>} - The user object if found, null otherwise
 */
exports.findUserByEmail = async (email) => {
  try {
    // Always try MongoDB first if connected
    if (isMongoDBConnected()) {
      logger.info(`Finding user by email in MongoDB: ${email}`);
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        return user;
      }
      // If no user found in MongoDB but we have mock data enabled, try mock data
      if (useMockData) {
        logger.info(`No user found in MongoDB, checking mock data: ${email}`);
      } else {
        return null;
      }
    }
    
    // Fall back to mock data if MongoDB is not connected or user not found
    if (useMockData) {
      logger.info(`[MOCK] Finding user by email: ${email}`);
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      return user ? cloneMockData(user) : null;
    }
    
    return null;
  } catch (error) {
    logger.error(`Error finding user by email: ${email}`, error);
    if (useMockData) {
      logger.info(`[MOCK] Falling back to mock data due to error`);
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      return user ? cloneMockData(user) : null;
    }
    throw error;
  }
};

/**
 * Find a user by ID
 * @param {string} id - The user ID to search for
 * @returns {Promise<Object>} - The user object if found, null otherwise
 */
exports.findUserById = async (id) => {
  try {
    // Always try MongoDB first if connected
    if (isMongoDBConnected()) {
      logger.info(`Finding user by ID in MongoDB: ${id}`);
      try {
        const user = await User.findById(id);
        if (user) {
          return user;
        }
      } catch (err) {
        logger.warn(`MongoDB ID lookup error (might be invalid ID format): ${err.message}`);
      }
      
      // If no user found in MongoDB but we have mock data enabled, try mock data
      if (useMockData) {
        logger.info(`No user found in MongoDB, checking mock data: ${id}`);
      } else {
        return null;
      }
    }
    
    // Fall back to mock data if MongoDB is not connected or user not found
    if (useMockData) {
      logger.info(`[MOCK] Finding user by ID: ${id}`);
      const user = mockUsers.find(u => u._id === id);
      return user ? cloneMockData(user) : null;
    }
    
    return null;
  } catch (error) {
    logger.error(`Error finding user by ID: ${id}`, error);
    if (useMockData) {
      logger.info(`[MOCK] Falling back to mock data due to error`);
      const user = mockUsers.find(u => u._id === id);
      return user ? cloneMockData(user) : null;
    }
    throw error;
  }
};

/**
 * Create a new user
 * @param {Object} userData - The user data including name, email, password, and role
 * @returns {Promise<Object>} - The created user object
 */
exports.createUser = async (userData) => {
  try {
    const { name, email, password, role, accountType } = userData;
    
    if (useMockData) {
      logger.info(`[MOCK] Creating user: ${email}`);
      const newUser = {
        _id: `mock_${Date.now()}`,
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'user',
        accountType: accountType || 'user',
        createdAt: new Date()
      };
      mockUsers.push(newUser);
      return cloneMockData(newUser);
    }
    
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'user',
      accountType: accountType || 'user',
      createdAt: new Date()
    });
    
    return await user.save();
  } catch (error) {
    logger.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Update user information
 * @param {string} userId - The ID of the user to update
 * @param {Object} updateData - The data to update
 * @returns {Promise<Object>} - The updated user object
 */
exports.updateUser = async (userId, updateData) => {
  try {
    // If updating password, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    if (useMockData) {
      logger.info(`[MOCK] Updating user: ${userId}`);
      const userIndex = mockUsers.findIndex(u => u._id === userId);
      if (userIndex !== -1) {
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          ...updateData,
          lastUpdated: new Date()
        };
        return cloneMockData(mockUsers[userIndex]);
      }
      return null;
    }
    
    return await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    );
  } catch (error) {
    logger.error(`Error updating user: ${userId}`, error);
    throw error;
  }
};

/**
 * Delete a user
 * @param {string} userId - The ID of the user to delete
 * @returns {Promise<Object>} - The deletion result
 */
exports.deleteUser = async (userId) => {
  try {
    if (useMockData) {
      logger.info(`[MOCK] Deleting user: ${userId}`);
      const userIndex = mockUsers.findIndex(u => u._id === userId);
      if (userIndex !== -1) {
        const deletedUser = mockUsers[userIndex];
        mockUsers.splice(userIndex, 1);
        return cloneMockData(deletedUser);
      }
      return null;
    }
    
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    logger.error(`Error deleting user: ${userId}`, error);
    throw error;
  }
};

/**
 * Find users by role
 * @param {string} role - The role to search for
 * @returns {Promise<Array>} - An array of user objects
 */
exports.findUsersByRole = async (role) => {
  try {
    if (useMockData) {
      logger.info(`[MOCK] Finding users by role: ${role}`);
      const users = mockUsers.filter(u => u.role === role);
      return cloneMockData(users);
    }
    
    return await User.find({ role });
  } catch (error) {
    logger.error(`Error finding users by role: ${role}`, error);
    throw error;
  }
};

/**
 * Check and update LinkedIn connection status
 * @param {string} userId - The ID of the user
 * @returns {Promise<boolean>} - True if LinkedIn is connected and valid, false otherwise
 */
exports.checkLinkedInConnection = async (userId) => {
  try {
    if (useMockData) {
      logger.info(`[MOCK] Checking LinkedIn connection for user: ${userId}`);
      const user = mockUsers.find(u => u._id === userId);
      if (!user) return false;
      
      return user.linkedInConnected || false;
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      return false;
    }
    
    const linkedInConnected = user.linkedInConnected || false;
    const linkedInTokenValid = user.linkedInTokenExpiry && new Date(user.linkedInTokenExpiry) > new Date();
    
    // If token is expired, update the connection status
    if (linkedInConnected && !linkedInTokenValid) {
      await User.findByIdAndUpdate(userId, { linkedInConnected: false });
      return false;
    }
    
    return linkedInConnected && linkedInTokenValid;
  } catch (error) {
    logger.error(`Error checking LinkedIn connection: ${userId}`, error);
    return false;
  }
};

/**
 * Update LinkedIn connection information
 * @param {string} userId - The ID of the user
 * @param {Object} linkedInData - The LinkedIn data to update
 * @returns {Promise<Object>} - The updated user object
 */
exports.updateLinkedInConnection = async (userId, linkedInData) => {
  try {
    const updateData = {
      linkedInAccessToken: linkedInData.accessToken,
      linkedInTokenExpiry: linkedInData.expiryDate,
      linkedInProfile: linkedInData.profile,
      linkedInConnected: true,
      lastUpdated: new Date()
    };
    
    if (useMockData) {
      logger.info(`[MOCK] Updating LinkedIn connection for user: ${userId}`);
      const userIndex = mockUsers.findIndex(u => u._id === userId);
      if (userIndex !== -1) {
        mockUsers[userIndex] = {
          ...mockUsers[userIndex],
          ...updateData
        };
        return cloneMockData(mockUsers[userIndex]);
      }
      return null;
    }
    
    return await User.findByIdAndUpdate(
      userId, 
      updateData,
      { new: true }
    );
  } catch (error) {
    logger.error(`Error updating LinkedIn connection: ${userId}`, error);
    throw error;
  }
};

/**
 * Count total users in the system
 * @returns {Promise<number>} - Total count of users
 */
exports.countUsers = async () => {
  try {
    if (useMockData) {
      logger.info(`[MOCK] Counting users`);
      return mockUsers.length;
    }
    
    return await User.countDocuments();
  } catch (error) {
    logger.error('Error counting users:', error);
    throw error;
  }
}; 