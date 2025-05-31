/**
 * Script to create a new user without using bcrypt
 * This works around the bcrypt compatibility issues
 * 
 * Usage: 
 * 1. Make sure MongoDB is running
 * 2. Run this script with: node src/scripts/create-user.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected...');
}).catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Create a simple schema that doesn't use bcrypt
const directUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Create a simple method to validate password
directUserSchema.methods.validatePassword = function(password) {
  return this.password === hashPassword(password);
};

// Create a simple hash function
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Create model
const DirectUser = mongoose.model('User', directUserSchema);

async function createUser() {
  try {
    console.log('======================================');
    console.log('DIRECT USER CREATION TOOL');
    console.log('======================================');
    
    // User details - MODIFY THESE AS NEEDED
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'developer' // or 'user' or 'admin'
    };
    
    console.log('Creating user with:');
    console.log(`- Name: ${userData.name}`);
    console.log(`- Email: ${userData.email}`);
    console.log(`- Password: ${userData.password}`);
    console.log(`- Role: ${userData.role}`);
    
    // Check if user already exists
    const existingUser = await DirectUser.findOne({ email: userData.email });
    
    if (existingUser) {
      console.log(`User with email ${userData.email} already exists.`);
      console.log('Updating password...');
      
      // Update password with hashed version
      existingUser.password = hashPassword(userData.password);
      await existingUser.save();
      
      console.log('Password updated successfully!');
      console.log(`User ID: ${existingUser._id}`);
    } else {
      // Create new user with hashed password
      const hashedPassword = hashPassword(userData.password);
      console.log(`Password hash: ${hashedPassword}`);
      
      const newUser = new DirectUser({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      });
      
      await newUser.save();
      
      console.log('User created successfully!');
      console.log(`User ID: ${newUser._id}`);
    }
    
    // Generate a JWT token for direct login
    const user = await DirectUser.findOne({ email: userData.email });
    
    if (user) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'devjwtsecret',
        { expiresIn: '1d' }
      );
      
      console.log('');
      console.log('JWT Token for direct login:');
      console.log(token);
      console.log('');
      console.log('Login URL (copy and paste into browser):');
      console.log(`http://localhost:3000/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }))}`);
    }
    
    console.log('======================================');
    
    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating user:', err);
    mongoose.disconnect();
    process.exit(1);
  }
}

// Run the function
createUser(); 