const agentService = require('../services/agent.service');
const LinkedInService = require('./linkedin.service');

/**
 * Profile Analyzer Service
 * Connects the LinkedIn Optimizer Agent with the profile analysis endpoints
 */
class ProfileAnalyzer {
  constructor(userId) {
    this.userId = userId;
    this.linkedinOptimizer = agentService.getLinkedInOptimizerAgent();
    this.securityAgent = agentService.getSecurityAgent();
    this.linkedinService = new LinkedInService(userId);
  }

  /**
   * Perform a full analysis of the user's LinkedIn profile
   */
  async performFullAnalysis() {
    try {
      // Get the user's LinkedIn profile data from LinkedIn service
      const profileData = await this.fetchUserProfileData();
      
      // Perform security check on the data
      await this.securityAgent.performSecurityCheck(profileData);
      
      // Analyze the profile using the LinkedIn Optimizer Agent
      const analysisResults = await this.linkedinOptimizer.analyzeProfile(profileData);
      
      return analysisResults;
    } catch (error) {
      console.error('Error in profile analysis:', error);
      throw new Error('Failed to analyze profile');
    }
  }

  /**
   * Analyze LinkedIn profile
   */
  async analyzeProfile() {
    try {
      // Get the user's LinkedIn profile data
      const profileData = await this.fetchUserProfileData();
      
      // Analyze using the LinkedIn optimizer agent
      const analysis = await this.linkedinOptimizer.analyzeProfile(profileData);
      
      // Format the results
      return {
        summary: analysis.summary,
        score: analysis.score,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        recommendations: analysis.recommendations,
        profileData: profileData // Include profile data for client-side reference
      };
    } catch (error) {
      console.error('Error analyzing profile:', error);
      throw new Error('Failed to analyze profile: ' + error.message);
    }
  }

  /**
   * Calculate the profile health score
   */
  async calculateHealthScore() {
    try {
      const profileData = await this.fetchUserProfileData();
      const healthScore = await this.linkedinOptimizer.calculateProfileHealthScore(profileData);
      
      return {
        score: healthScore.score,
        previousScore: healthScore.previousScore,
        change: healthScore.change,
        lastUpdated: healthScore.lastUpdated,
        breakdown: healthScore.breakdown
      };
    } catch (error) {
      console.error('Error calculating health score:', error);
      throw new Error('Failed to calculate profile health score');
    }
  }

  /**
   * Get industry benchmark comparison
   */
  async getIndustryBenchmark() {
    try {
      const profileData = await this.fetchUserProfileData();
      const benchmarkData = await this.linkedinOptimizer.getIndustryBenchmark(profileData);
      
      return benchmarkData;
    } catch (error) {
      console.error('Error getting industry benchmark:', error);
      throw new Error('Failed to get industry benchmark');
    }
  }

  /**
   * Get industry benchmarks for a specific industry
   */
  async getIndustryBenchmarks(industry) {
    try {
      // In a real implementation, this would fetch benchmark data from a database
      // For now returning mock benchmark data
      
      return {
        industry: industry,
        averageScore: 76,
        topPerformerScore: 92,
        medianScore: 68,
        benchmarks: {
          profileCompleteness: 85,
          engagementRate: 72,
          contentQuality: 68,
          networkGrowth: 62,
          endorsements: 58
        },
        recommendations: [
          'Add industry-specific keywords to your headline',
          'Increase posting frequency to 2-3 times per week',
          'Join and participate in the top 5 industry groups'
        ]
      };
    } catch (error) {
      console.error('Error getting industry benchmarks:', error);
      throw new Error('Failed to get industry benchmarks');
    }
  }

  /**
   * Scan for career opportunities based on the profile
   */
  async scanOpportunities() {
    try {
      const profileData = await this.fetchUserProfileData();
      const opportunities = await this.linkedinOptimizer.scanOpportunities(profileData);
      
      return opportunities;
    } catch (error) {
      console.error('Error scanning opportunities:', error);
      throw new Error('Failed to scan opportunities');
    }
  }

  /**
   * Sync LinkedIn profile data
   */
  async syncProfileData() {
    try {
      // Use the LinkedIn service to get fresh profile data
      const freshData = await this.linkedinService.getProfileData();
      
      return {
        success: true,
        message: 'Profile data synced successfully',
        timestamp: new Date(),
        profileData: freshData
      };
    } catch (error) {
      console.error('Error syncing profile data:', error);
      throw new Error('Failed to sync profile data');
    }
  }

  /**
   * Get profile update history
   */
  async getUpdateHistory() {
    try {
      // In a real implementation, this would fetch the history from a database
      
      return [
        {
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          section: 'title',
          oldValue: 'Marketing Manager',
          newValue: 'Strategic Marketing Leader | Digital Campaign Specialist | Brand Growth Expert',
          healthScoreImpact: '+8%'
        },
        {
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          section: 'bio',
          oldValue: 'Marketing professional with 5 years of experience',
          newValue: 'Results-driven marketing strategist with 5+ years spearheading digital campaigns...',
          healthScoreImpact: '+12%'
        }
      ];
    } catch (error) {
      console.error('Error getting update history:', error);
      throw new Error('Failed to get update history');
    }
  }

  /**
   * Update a section of the LinkedIn profile
   */
  async updateProfileSection(section, content) {
    try {
      // In a real implementation, this would update the LinkedIn profile
      // through the LinkedIn API
      
      return {
        success: true,
        message: `${section} updated successfully`,
        section: section,
        timestamp: new Date()
      };
    } catch (error) {
      console.error(`Error updating ${section}:`, error);
      throw new Error(`Failed to update ${section}`);
    }
  }

  /**
   * Fetch user profile data from LinkedIn service
   */
  async fetchUserProfileData() {
    try {
      // Get profile data from LinkedIn service
      const profileData = await this.linkedinService.getProfileData();
      return profileData;
    } catch (error) {
      console.error('Error fetching user profile data:', error);
      throw new Error('Failed to fetch user profile data: ' + error.message);
    }
  }
}

module.exports = ProfileAnalyzer;
