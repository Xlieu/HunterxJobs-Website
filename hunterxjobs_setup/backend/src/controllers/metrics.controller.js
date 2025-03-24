const MetricsService = require('../services/metrics.service');

/**
 * Get metrics dashboard data
 */
exports.getDashboardMetrics = async (req, res) => {
  try {
    const metricsService = new MetricsService(req.user.id);
    const dashboardData = await metricsService.getDashboardMetrics();
    
    res.json(dashboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get Profile Visibility Index (PVI)
 */
exports.getProfileVisibilityIndex = async (req, res) => {
  try {
    const metricsService = new MetricsService(req.user.id);
    const pviData = await metricsService.getProfileVisibilityIndex();
    
    res.json({
      currentScore: pviData.current,
      previousScore: pviData.previous,
      change: pviData.change,
      history: pviData.history,
      factors: pviData.factors
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get Opportunity Flow Rate (OFR)
 */
exports.getOpportunityFlowRate = async (req, res) => {
  try {
    const metricsService = new MetricsService(req.user.id);
    const ofrData = await metricsService.getOpportunityFlowRate();
    
    res.json({
      currentScore: ofrData.current,
      previousScore: ofrData.previous,
      change: ofrData.change,
      history: ofrData.history,
      breakdown: ofrData.breakdown
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get Content Amplification Score (CAS)
 */
exports.getContentAmplificationScore = async (req, res) => {
  try {
    const metricsService = new MetricsService(req.user.id);
    const casData = await metricsService.getContentAmplificationScore();
    
    res.json({
      currentScore: casData.current,
      previousScore: casData.previous,
      change: casData.change,
      history: casData.history,
      topPerformingContent: casData.topPerforming
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get Career Momentum Indicator (CMI)
 */
exports.getCareerMomentumIndicator = async (req, res) => {
  try {
    const metricsService = new MetricsService(req.user.id);
    const cmiData = await metricsService.getCareerMomentumIndicator();
    
    res.json({
      currentScore: cmiData.current,
      previousScore: cmiData.previous,
      change: cmiData.change,
      history: cmiData.history,
      growthFactors: cmiData.factors
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get profile views history
 */
exports.getProfileViewsHistory = async (req, res) => {
  try {
    const metricsService = new MetricsService(req.user.id);
    const viewsData = await metricsService.getProfileViewsHistory();
    
    res.json({
      total: viewsData.total,
      change: viewsData.change,
      dailyData: viewsData.daily,
      viewerBreakdown: viewsData.viewers
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Get content performance metrics
 */
exports.getContentPerformance = async (req, res) => {
  try {
    const metricsService = new MetricsService(req.user.id);
    const performanceData = await metricsService.getContentPerformance();
    
    res.json(performanceData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

/**
 * Export metrics data
 */
exports.exportMetricsData = async (req, res) => {
  try {
    const metricsService = new MetricsService(req.user.id);
    const exportData = await metricsService.exportMetricsData();
    
    res.json({
      data: exportData,
      exportedAt: new Date()
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
