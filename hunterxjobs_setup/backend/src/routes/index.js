const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const profileRoutes = require('./profile.routes');
const optimizationRoutes = require('./optimization.routes');
const contentRoutes = require('./content.routes');
const metricsRoutes = require('./metrics.routes');
const linkedinRoutes = require('./linkedin.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/optimization', optimizationRoutes);
router.use('/content', contentRoutes);
router.use('/metrics', metricsRoutes);
router.use('/linkedin', linkedinRoutes);

module.exports = router;
