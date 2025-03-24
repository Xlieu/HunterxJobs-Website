/**
 * Script to create a developer account directly in the database
 * This bypasses bcrypt compatibility issues
 * 
 * Usage: 
 * 1. Make sure MongoDB is running
 * 2. Run this script with: node src/scripts/create-developer.js
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

// Developer details - You can modify if needed
const DEVELOPER = {
  name: 'Developer Account',
  email: 'dev@hunterxjobs.com',
  password: 'dev123456',
  role: 'developer'
};

// Create a simple hash function
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function createDeveloperAccount() {
  try {
    console.log('======================================');
    console.log('DEVELOPER ACCOUNT CREATION TOOL');
    console.log('======================================');
    console.log(`Creating developer account with:`);
    console.log(`- Name: ${DEVELOPER.name}`);
    console.log(`- Email: ${DEVELOPER.email}`);
    console.log(`- Password: ${DEVELOPER.password}`);
    console.log(`- Role: ${DEVELOPER.role}`);
    
    // Create a direct connection to the Users collection
    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      createdAt: Date,
      lastLogin: Date
    }));
    
    // Check if developer account already exists
    const existingDeveloper = await User.findOne({ email: DEVELOPER.email });
    
    if (existingDeveloper) {
      console.log(`Developer account already exists with ID: ${existingDeveloper._id}`);
      console.log('Updating password...');
      
      // Update password with direct hash
      existingDeveloper.password = hashPassword(DEVELOPER.password);
      existingDeveloper.name = DEVELOPER.name;
      existingDeveloper.role = DEVELOPER.role;
      await existingDeveloper.save();
      
      console.log('Developer account updated successfully');
      
      // Generate JWT token for direct login
      const token = jwt.sign(
        { id: existingDeveloper._id, role: existingDeveloper.role },
        process.env.JWT_SECRET || 'devjwtsecret',
        { expiresIn: '7d' }
      );
      
      console.log('\nDirect Login URL:');
      console.log(`http://localhost:3000/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: existingDeveloper._id,
        name: existingDeveloper.name,
        email: existingDeveloper.email,
        role: existingDeveloper.role
      }))}\n`);
      
      console.log(`Developer login credentials:`);
      console.log(`- Email: ${DEVELOPER.email}`);
      console.log(`- Password: ${DEVELOPER.password}`);
    } else {
      // Create new developer account with direct hash
      const hashedPassword = hashPassword(DEVELOPER.password);
      console.log(`Hashed password: ${hashedPassword}`);
      
      const newDeveloper = new User({
        name: DEVELOPER.name,
        email: DEVELOPER.email,
        password: hashedPassword,
        role: DEVELOPER.role,
        createdAt: new Date()
      });
      
      await newDeveloper.save();
      
      console.log('Developer account created successfully');
      console.log(`Developer ID: ${newDeveloper._id}`);
      
      // Generate JWT token for direct login
      const token = jwt.sign(
        { id: newDeveloper._id, role: newDeveloper.role },
        process.env.JWT_SECRET || 'devjwtsecret',
        { expiresIn: '7d' }
      );
      
      console.log('\nDirect Login URL:');
      console.log(`http://localhost:3000/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify({
        id: newDeveloper._id,
        name: newDeveloper.name,
        email: newDeveloper.email,
        role: newDeveloper.role
      }))}\n`);
      
      console.log(`Developer login credentials:`);
      console.log(`- Email: ${DEVELOPER.email}`);
      console.log(`- Password: ${DEVELOPER.password}`);
    }
    
    console.log('======================================');
    
    // Disconnect from MongoDB
    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating developer account:', err);
    mongoose.disconnect();
    process.exit(1);
  }
}

// Run the function
createDeveloperAccount(); 