const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metrics.controller');
const { authenticate } = require('../middleware/auth');

// @route   GET api/metrics/dashboard
// @desc    Get metrics dashboard data
// @access  Private
router.get('/dashboard', authenticate, metricsController.getDashboardMetrics);

// @route   GET api/metrics/profile-visibility
// @desc    Get Profile Visibility Index (PVI)
// @access  Private
router.get('/profile-visibility', authenticate, metricsController.getProfileVisibilityIndex);

// @route   GET api/metrics/opportunity-flow
// @desc    Get Opportunity Flow Rate (OFR)
// @access  Private
router.get('/opportunity-flow', authenticate, metricsController.getOpportunityFlowRate);

// @route   GET api/metrics/content-amplification
// @desc    Get Content Amplification Score (CAS)
// @access  Private
router.get('/content-amplification', authenticate, metricsController.getContentAmplificationScore);

// @route   GET api/metrics/career-momentum
// @desc    Get Career Momentum Indicator (CMI)
// @access  Private
router.get('/career-momentum', authenticate, metricsController.getCareerMomentumIndicator);

// @route   GET api/metrics/profile-views
// @desc    Get profile views history
// @access  Private
router.get('/profile-views', authenticate, metricsController.getProfileViewsHistory);

// @route   GET api/metrics/content-performance
// @desc    Get content performance metrics
// @access  Private
router.get('/content-performance', authenticate, metricsController.getContentPerformance);

// @route   GET api/metrics/export
// @desc    Export metrics data
// @access  Private
router.get('/export', authenticate, metricsController.exportMetricsData);

module.exports = router;
