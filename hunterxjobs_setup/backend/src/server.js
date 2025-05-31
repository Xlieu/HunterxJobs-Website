const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const { createInitialAdmin } = require('./middleware/auth');
const agentRoutes = require('./routes/agent.routes');
const authRoutes = require('./routes/auth.routes');
const linkedinRoutes = require('./routes/linkedin.routes');
const profileAnalysisRoutes = require('./routes/profile-analysis.routes');
const config = require('./config');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Session middleware for LinkedIn OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || config.jwt.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'http://localhost:3000',
      'https://xlieu.github.io',
      process.env.FRONTEND_URL
    ];
    
    // Check if the origin is allowed
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin === origin) return true;
      if (allowedOrigin && origin && origin.startsWith(allowedOrigin)) return true;
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
console.log('CORS configured with origins including GitHub Pages');
app.use(cors(corsOptions));

// Add OPTIONS handling for all routes for CORS preflight
app.options('*', cors(corsOptions));

// Verify LinkedIn configuration
if (!config.linkedin || !config.linkedin.clientId || !config.linkedin.clientSecret) {
  logger.warn('LinkedIn API credentials are missing or incomplete. LinkedIn features will not work.');
  // Set up default empty values to prevent errors
  if (!config.linkedin) {
    config.linkedin = {
      clientId: process.env.LINKEDIN_CLIENT_ID || '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
      redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:5000/api/linkedin/callback',
      scope: process.env.LINKEDIN_SCOPE || 'openid profile email w_member_social'
    };
    logger.info('Created default LinkedIn configuration object');
  }
} else {
  logger.info('LinkedIn configuration loaded successfully');
}

// Connect to MongoDB
// Set default MongoDB URI if not provided
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = 'mongodb://localhost:27017/hunterxjobs';
  logger.info(`Setting default MongoDB URI: ${process.env.MONGODB_URI}`);
}

// Always try to connect to MongoDB first
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    logger.info('MongoDB connected successfully');
    // Create initial admin and developer users
    createInitialAdmin();
    // Still use mock data for LinkedIn and other services if configured
    if (process.env.USE_MOCK_DATA === 'true') {
      logger.info('Using mock data for services while connected to MongoDB');
      global.useMockData = true;
    }
  })
  .catch(err => {
    logger.error('MongoDB connection error:', err.message);
    logger.info('Falling back to mock data mode');
    process.env.USE_MOCK_DATA = 'true';
    global.useMockData = true;
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
