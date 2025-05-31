// Configuration file for HunterxJobs backend
// This file provides configuration settings for the application

module.exports = {
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || '5d94feee766024d617d4e5534e4c0ab30',
    expiresIn: process.env.JWT_EXPIRATION || '24h'
  },
  
  // Database configuration (using mock data for now)
  database: {
    useMockData: process.env.USE_MOCK_DATA === 'true' || false
  },
  
  // Frontend URL for CORS
  frontend: {
    url: process.env.FRONTEND_URL || 'https://hunterxjobs.xyz'
  },
  
  // LinkedIn OAuth configuration
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID || '869cznydysupnp',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || 'WPL_AP1.we0R4CMRVDBE0HUY.LMenVw==',
    redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:5000/api/linkedin/callback',
    scope: process.env.LINKEDIN_SCOPE || 'openid profile email w_member_social'
  },
  
  // Server configuration
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'production'
  }
}; 