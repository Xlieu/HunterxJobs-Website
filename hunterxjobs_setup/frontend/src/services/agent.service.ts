import apiService from './api.service';

class AgentService {
  token: string | null;

  constructor() {
    this.token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  // Set auth token for API requests
  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  // Get auth headers
  getAuthHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': this.token || ''
      }
    };
  }

  // Analyze LinkedIn profile
  async analyzeProfile(profileId: string) {
    try {
      console.log('AgentService: Analyzing profile', profileId);
      
      // Use the real API endpoint - no fallback to mock data
      const data = await apiService.post('api/agent/analyze', { profileId });
      
      console.log('AgentService: API response:', data);
      return data;
    } catch (error) {
      console.error('AgentService: Error analyzing profile', error);
      throw error; // Propagate the error instead of falling back to mock data
    }
  }
  
  // Generate content
  async generateContent(prompt: string) {
    return await apiService.post('api/agent/generate-content', { prompt });
  }

  // Generate code
  async generateCode(requirements: string) {
    return await apiService.post('api/agent/generate-code', { requirements });
  }

  // Debug code
  async debugCode(code: string, error: string) {
    return await apiService.post('api/agent/debug-code', { code, error });
  }
}

export default new AgentService(); 