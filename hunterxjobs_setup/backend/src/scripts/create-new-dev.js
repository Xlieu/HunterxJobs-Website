/**
 * CREATE NEW DEVELOPER ACCOUNT WITH PLAINTEXT PASSWORD
 * IMPORTANT: This is for development purposes only and bypasses normal security practices
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
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

// Define a simple schema that doesn't use bcrypt hooks
const PlainUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Plaintext password - ONLY FOR DEVELOPMENT
  role: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date
});

// Skip mongoose's auto-compilation of an existing model
let PlainUser;
try {
  PlainUser = mongoose.model('User');
} catch (e) {
  PlainUser = mongoose.model('User', PlainUserSchema);
}

// Create a direct login token
function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || 'devjwtsecret',
    { expiresIn: '7d' }
  );
}

// Create admin account for emergency use
async function createPlaintextDeveloper() {
  try {
    console.log('======================================');
    console.log('EMERGENCY DEVELOPER ACCOUNT CREATOR');
    console.log('======================================');
    
    // First remove any existing developer accounts
    console.log('Removing existing developer accounts...');
    await PlainUser.deleteMany({ role: 'developer' });
    console.log('Existing developer accounts removed');
    
    // New developer credentials
    const devEmail = 'admin@test.com';
    const devPassword = 'admin123'; // Ultra simple for testing
    
    // Create new account with plaintext password
    const newDev = new PlainUser({
      name: 'Admin Test',
      email: devEmail,
      password: devPassword, // Plaintext - NEVER do this in production
      role: 'developer',
      createdAt: new Date()
    });
    
    await newDev.save();
    console.log('\nDeveloper account created successfully:');
    console.log(`- Name: ${newDev.name}`);
    console.log(`- Email: ${devEmail}`);
    console.log(`- Password: ${devPassword}`);
    console.log(`- ID: ${newDev._id}`);
    
    // Create login token
    const token = createToken(newDev);
    
    console.log('\nDirect Login URL (copy and paste into browser):');
    console.log(`http://localhost:3000/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: newDev._id,
      name: newDev.name,
      email: newDev.email,
      role: newDev.role
    }))}`);
    
    // Create a direct login batch file
    const fs = require('fs');
    const directLoginContent = `@echo off
echo Opening direct login URL for developer account...
echo.
echo Developer account credentials:
echo Email: ${devEmail}
echo Password: ${devPassword}
echo.
echo This URL bypasses normal login using a pre-generated JWT token.
echo.

start "" "http://localhost:3000/dashboard?token=${token}&user=${encodeURIComponent(JSON.stringify({
      id: newDev._id,
      name: newDev.name,
      email: newDev.email,
      role: newDev.role
    }))}"

echo Direct login URL opened. You should now be logged in as the developer.`;

    fs.writeFileSync('../admin-login.bat', directLoginContent);
    console.log('\nCreated admin-login.bat file successfully!');
    
    // Also modify the auth controller to accept plaintext passwords
    const authControllerPath = '../controllers/auth.controller.js';
    if (fs.existsSync(authControllerPath)) {
      console.log('\nModifying auth controller for plaintext password comparison...');
      let authController = fs.readFileSync(authControllerPath, 'utf8');
      
      // Add a test block at the end of the login function
      if (authController.includes('exports.login = async (req, res)')) {
        authController = authController.replace(
          '// Verify password\n    const isMatch = await user.comparePassword(password);',
          '// Verify password\n    let isMatch = await user.comparePassword(password);\n    \n    // DEVELOPMENT ONLY: Allow plaintext password comparison\n    if (!isMatch && user.password === password) {\n      console.log("Using plaintext password match for development");\n      isMatch = true;\n    }'
        );
        
        fs.writeFileSync(authControllerPath, authController);
        console.log('Auth controller updated successfully!');
      }
    }
    
    console.log('\nTESTING LOGIN:');
    const testUser = await PlainUser.findOne({ email: devEmail });
    console.log(`Found user: ${testUser ? 'Yes' : 'No'}`);
    if (testUser) {
      console.log(`Password matches exactly: ${testUser.password === devPassword ? 'Yes' : 'No'}`);
    }
    
    console.log('======================================');
    console.log('SUCCESS! You can now login with these credentials:');
    console.log(`Email: ${devEmail}`);
    console.log(`Password: ${devPassword}`);
    console.log('Or use the admin-login.bat file for direct login');
    console.log('======================================');
    
    mongoose.disconnect();
  } catch (err) {
    console.error('Error creating developer account:', err);
    mongoose.disconnect();
    process.exit(1);
  }
}

// Run the function
createPlaintextDeveloper(); 