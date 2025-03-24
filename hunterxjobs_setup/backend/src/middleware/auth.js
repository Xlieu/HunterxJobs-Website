const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/**
 * Authenticate middleware
 * Verifies JWT token and adds user to request
 */
exports.authenticate = async (req, res, next) => {
  // Try to get token from multiple sources
  let token = req.header('x-auth-token');
  
  // Also check Authorization header with Bearer prefix
  if (!token && req.headers.authorization) {
    // Remove Bearer prefix if present
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      token = authHeader;
    }
  }
  
  // Check if no token found in any header
  if (!token) {
    console.log('No auth token found in request headers');
    return res.status(401).json({ 
      success: false,
      message: 'No token, authorization denied' 
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    
    // For debugging
    console.log(`User authenticated: ${decoded.id}`);

    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
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
exports.authorize = (roles) => {
  return async (req, res, next) => {
    try {
      // Get user from database
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: 'User not found' 
        });
      }

      // Convert roles to array if string
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      // Check if user role is allowed
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ 
          success: false,
          message: 'Not authorized to access this resource' 
        });
      }

      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error: ' + err.message);
    }
  };
};

/**
 * Create initial admin user
 * This function is called when the server starts
 */
exports.createInitialAdmin = async () => {
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
