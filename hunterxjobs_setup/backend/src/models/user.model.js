const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'developer', 'admin'],
    default: 'user'
  },
  linkedinId: {
    type: String
  },
  linkedinAccessToken: {
    type: String
  },
  linkedinTokenExpiry: {
    type: Date
  },
  profileData: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(password) {
  console.log(`Comparing password for user: ${this.email}`);
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    console.log(`Password comparison result for ${this.email}: ${isMatch ? 'matched' : 'did not match'}`);
    return isMatch;
  } catch (error) {
    console.error(`Error comparing password for ${this.email}:`, error);
    return false;
  }
};

// Generate JWT token
UserSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION || '24h' }
  );
};

module.exports = mongoose.model('User', UserSchema);
