/**
 * Profile Analysis Service
 * Handles interactions with the profile analysis API endpoints
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
const USE_REAL_DATA = process.env.NEXT_PUBLIC_USE_REAL_DATA === 'true';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token || '',
      'Use-Real-Data': USE_REAL_DATA ? 'true' : 'false'
    }
  };
};

/**
 * Analyze a LinkedIn profile using the AI system
 * @param token Auth token
 * @returns Analysis results
 */
export const analyzeProfile = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/profile/analyze`, 
      { useRealData: USE_REAL_DATA },
      { headers: { 'x-auth-token': token } }
    );
    return response.data;
  } catch (error) {
    console.error('Error analyzing profile:', error);
    throw error;
  }
};

/**
 * Generate optimization previews for specific profile sections
 * @param profileId The profile ID to optimize
 * @param sections Array of section names to generate previews for
 * @returns Preview results
 */
export const generateOptimizationPreview = async (profileId: string, sections: string[]) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/profile/optimization-preview`,
      { profileId, sections, useRealData: USE_REAL_DATA },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error generating optimization preview:', error);
    throw error;
  }
};

/**
 * Apply optimizations to the user's LinkedIn profile
 * @param profileId The profile ID to apply optimizations to
 * @param optimizations Object containing section optimizations
 * @returns Result of applying optimizations
 */
export const applyOptimizations = async (profileId: string, optimizations: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/profile/apply-optimizations`,
      { profileId, optimizations, useRealData: USE_REAL_DATA },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error applying optimizations:', error);
    throw error;
  }
};

/**
 * Get industry benchmarks for comparison
 * @param industry The industry name to get benchmarks for
 * @returns Benchmark data
 */
export const getIndustryBenchmarks = async (industry: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/profile/industry-benchmarks?industry=${encodeURIComponent(industry)}&useRealData=${USE_REAL_DATA}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error getting industry benchmarks:', error);
    throw error;
  }
};

// Export all functions as a service object
const profileAnalysisService = {
  analyzeProfile,
  generateOptimizationPreview,
  applyOptimizations,
  getIndustryBenchmarks
};

export default profileAnalysisService; 