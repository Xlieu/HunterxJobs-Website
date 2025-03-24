const agentService = require('../services/agent.service');

/**
 * Metrics Service
 * Connects the LinkedIn Optimizer Agent with the metrics endpoints
 */
class MetricsService {
  constructor(userId) {
    this.userId = userId;
    this.linkedinOptimizer = agentService.getLinkedInOptimizerAgent();
    this.securityAgent = agentService.getSecurityAgent();
  }

  /**
   * Get metrics dashboard data
   */
  async getDashboardMetrics() {
    try {
      const userProfile = await this.fetchUserProfileData();
      
      // Get all metrics in parallel for efficiency
      const [pvi, ofr, cas, cmi] = await Promise.all([
        this.getProfileVisibilityIndex(),
        this.getOpportunityFlowRate(),
        this.getContentAmplificationScore(),
        this.getCareerMomentumIndicator()
      ]);
      
      return {
        profileVisibilityIndex: pvi,
        opportunityFlowRate: ofr,
        contentAmplificationScore: cas,
        careerMomentumIndicator: cmi,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error getting dashboard metrics:', error);
      throw new Error('Failed to get dashboard metrics');
    }
  }

  /**
   * Get Profile Visibility Index (PVI)
   */
  async getProfileVisibilityIndex() {
    try {
      const userProfile = await this.fetchUserProfileData();
      const pviData = await this.linkedinOptimizer.calculateProfileVisibilityIndex(userProfile);
      
      return {
        current: pviData.current,
        previous: pviData.previous,
        change: pviData.change,
        history: pviData.history,
        factors: pviData.factors
      };
    } catch (error) {
      console.error('Error getting PVI:', error);
      throw new Error('Failed to get Profile Visibility Index');
    }
  }

  /**
   * Get Opportunity Flow Rate (OFR)
   */
  async getOpportunityFlowRate() {
    try {
      const userProfile = await this.fetchUserProfileData();
      const ofrData = await this.linkedinOptimizer.calculateOpportunityFlowRate(userProfile);
      
      return {
        current: ofrData.current,
        previous: ofrData.previous,
        change: ofrData.change,
        history: ofrData.history,
        breakdown: ofrData.breakdown
      };
    } catch (error) {
      console.error('Error getting OFR:', error);
      throw new Error('Failed to get Opportunity Flow Rate');
    }
  }

  /**
   * Get Content Amplification Score (CAS)
   */
  async getContentAmplificationScore() {
    try {
      const userProfile = await this.fetchUserProfileData();
      const casData = await this.linkedinOptimizer.calculateContentAmplificationScore(userProfile);
      
      return {
        current: casData.current,
        previous: casData.previous,
        change: casData.change,
        history: casData.history,
        topPerforming: casData.topPerforming
      };
    } catch (error) {
      console.error('Error getting CAS:', error);
      throw new Error('Failed to get Content Amplification Score');
    }
  }

  /**
   * Get Career Momentum Indicator (CMI)
   */
  async getCareerMomentumIndicator() {
    try {
      const userProfile = await this.fetchUserProfileData();
      const cmiData = await this.linkedinOptimizer.calculateCareerMomentumIndicator(userProfile);
      
      return {
        current: cmiData.current,
        previous: cmiData.previous,
        change: cmiData.change,
        history: cmiData.history,
        factors: cmiData.factors
      };
    } catch (error) {
      console.error('Error getting CMI:', error);
      throw new Error('Failed to get Career Momentum Indicator');
    }
  }

  /**
   * Get profile views history
   */
  async getProfileViewsHistory() {
    try {
      // In a real implementation, this would fetch profile views data from LinkedIn API
      
      // Mock data for demonstration
      return {
        total: 342,
        change: 28.5,
        daily: [
          { date: '2025-03-18', views: 32 },
          { date: '2025-03-17', views: 28 },
          { date: '2025-03-16', views: 35 },
          { date: '2025-03-15', views: 42 },
          { date: '2025-03-14', views: 38 },
          { date: '2025-03-13', views: 30 },
          { date: '2025-03-12', views: 25 }
        ],
        viewers: {
          recruiters: 45,
          industry: 30,
          connections: 25
        }
      };
    } catch (error) {
      console.error('Error getting profile views history:', error);
      throw new Error('Failed to get profile views history');
    }
  }

  /**
   * Get content performance metrics
   */
  async getContentPerformance() {
    try {
      // In a real implementation, this would fetch content performance data from LinkedIn API
      
      // Mock data for demonstration
      return [
        {
          postDate: '2025-03-15',
          content: 'The digital marketing landscape isn\'t just evolving...',
          impressions: 3245,
          reactions: 156,
          comments: 32,
          vppiScore: 78
        },
        {
          postDate: '2025-03-10',
          content: 'After analyzing trends across 500+ campaigns...',
          impressions: 2876,
          reactions: 124,
          comments: 18,
          vppiScore: 72
        },
        {
          postDate: '2025-03-05',
          content: 'The brands adapting fastest aren\'t necessarily...',
          impressions: 1982,
          reactions: 87,
          comments: 12,
          vppiScore: 65
        }
      ];
    } catch (error) {
      console.error('Error getting content performance:', error);
      throw new Error('Failed to get content performance metrics');
    }
  }

  /**
   * Export metrics data
   */
  async exportMetricsData() {
    try {
      // In a real implementation, this would compile all metrics data for export
      
      const dashboardData = await this.getDashboardMetrics();
      const profileViews = await this.getProfileViewsHistory();
      const contentPerformance = await this.getContentPerformance();
      
      return {
        metrics: dashboardData,
        profileViews: profileViews,
        contentPerformance: contentPerformance,
        exportedAt: new Date()
      };
    } catch (error) {
      console.error('Error exporting metrics data:', error);
      throw new Error('Failed to export metrics data');
    }
  }

  /**
   * Fetch user profile data (mock implementation)
   * In a real implementation, this would fetch from a database or LinkedIn API
   */
  async fetchUserProfileData() {
    // Mock profile data for demonstration
    return {
      userId: this.userId,
      name: 'John Doe',
      title: 'Marketing Manager',
      industry: 'Marketing and Advertising',
      connections: 500,
      profileViews: 342,
      postEngagement: 1250
    };
  }
}

module.exports = MetricsService;
