import { apiRequest } from './api.service';

interface ProfileSection {
  name: string;
  score: number;
  maxScore: number;
  recommendations: string[];
}

interface ProfileAnalysis {
  overallScore: number;
  sections: ProfileSection[];
  topRecommendations: string[];
}

/**
 * Service for analyzing LinkedIn profiles and generating scores
 */
class ProfileAnalyzerService {
  /**
   * Analyze a LinkedIn profile and get optimization recommendations
   * @param profileData The LinkedIn profile data to analyze
   * @returns Analysis results with scores and recommendations
   */
  async analyzeProfile(profileData: any): Promise<any> {
    try {
      // Create a simplified version of the profile to send to the API
      // This reduces payload size and focuses on the relevant data
      const simplifiedProfile = {
        url: profileData.profileUrl || profileData.publicProfileUrl,
        name: profileData.name || `${profileData.firstName} ${profileData.lastName}`,
        headline: profileData.headline,
        summary: profileData.summary || profileData.about,
        experience: profileData.experience,
        education: profileData.education,
        skills: profileData.skills,
        certifications: profileData.certifications,
        recommendations: profileData.recommendations,
        languages: profileData.languages,
      };

      const response = await apiRequest('/api/analyze/linkedin-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: simplifiedProfile }),
      });
      
      return response;
    } catch (error) {
      console.error('Error analyzing profile:', error);
      throw error;
    }
  }

  /**
   * Generate improvement suggestions for a specific section of the profile
   * @param profileData The LinkedIn profile data
   * @param section The section to generate improvements for (headline, summary, experience, etc.)
   * @returns Detailed improvement suggestions for the specified section
   */
  async generateSectionImprovements(profileData: any, section: string): Promise<any> {
    try {
      const response = await apiRequest(`/api/analyze/section/${section}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          profile: profileData,
          section: section
        }),
      });
      
      return response;
    } catch (error) {
      console.error(`Error generating improvements for ${section}:`, error);
      throw error;
    }
  }
}

const profileAnalyzerService = new ProfileAnalyzerService();
export default profileAnalyzerService; 