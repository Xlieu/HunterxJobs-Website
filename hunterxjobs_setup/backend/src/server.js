const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createInitialAdmin } = require('./middleware/auth');
const agentRoutes = require('./routes/agent.routes');
const authRoutes = require('./routes/auth.routes');
const linkedinRoutes = require('./routes/linkedin.routes');
const profileAnalysisRoutes = require('./routes/profile-analysis.routes');


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Configure CORS properly
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    // Define allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    // Log origins for debugging
    console.log(`CORS - Request from origin: ${origin}`);
    console.log(`CORS - Allowed origins: ${allowedOrigins.join(', ')}`);
    
    // Check if origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      console.log(`CORS - Origin ${origin} not allowed`);
      callback(null, true); // Temporarily allow all origins for debugging
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token', 'x-requested-with']
};
console.log('CORS configured with origins:', corsOptions.origin);
app.use(cors(corsOptions));

// Add OPTIONS handling for all routes for CORS preflight
app.options('*', cors(corsOptions));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    // Create initial admin and developer users
    createInitialAdmin();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/linkedin', linkedinRoutes);
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/agent', agentRoutes);
app.use('/api/content', require('./routes/content.routes'));

// Health check endpoints for debugging - both at API level and root level
app.get('/api/healthcheck', (req, res) => {
  console.log('API Healthcheck called:', {
    time: new Date().toISOString(),
    ip: req.ip,
    headers: req.headers,
    origin: req.get('origin')
  });
  
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Server is running correctly',
    environment: process.env.NODE_ENV || 'development',
    corsOrigin: corsOptions.origin,
    reqHeaders: {
      origin: req.get('origin'),
      host: req.get('host'),
      referer: req.get('referer')
    }
  });
});

// Root level healthcheck for easier detection
app.get('/healthcheck', (req, res) => {
  console.log('Root Healthcheck called:', {
    time: new Date().toISOString(),
    ip: req.ip,
    headers: req.headers,
    origin: req.get('origin')
  });
  
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Server is running correctly',
    environment: process.env.NODE_ENV || 'development',
    corsOrigin: corsOptions.origin,
    reqHeaders: {
      origin: req.get('origin'),
      host: req.get('host'),
      referer: req.get('referer')
    }
  });
});

// Simple root level ping for network connectivity tests
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'HunterXJobs API server is running'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
