import { apiRequest } from './api.service';

/**
 * LinkedIn Service for the frontend
 * Handles LinkedIn profile operations
 */
class LinkedInService {
  /**
   * Process manually entered LinkedIn URL or username
   * @param linkedInUrlOrUsername The LinkedIn URL or username to process
   * @returns The processed LinkedIn profile data
   */
  async processManualProfile(linkedInUrlOrUsername: string): Promise<any> {
    try {
      const response = await apiRequest('/api/linkedin/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ linkedInUrl: linkedInUrlOrUsername }),
      });
      
      return response;
    } catch (error) {
      console.error('Error processing LinkedIn profile:', error);
      throw error;
    }
  }

  /**
   * Fetch user's connected LinkedIn profile
   * @returns The user's LinkedIn profile data
   */
  async getUserLinkedInProfile(): Promise<any> {
    try {
      const response = await apiRequest('/api/linkedin/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        }
      });
      
      return response;
    } catch (error) {
      // Check if this is an authentication error for the LinkedIn connection
      // specifically, not the developer account
      if (error.message && (
        error.message.includes('LinkedIn') || 
        error.message.includes('not connected') ||
        error.message.includes('authorization')
      )) {
        throw new Error('LinkedIn account not connected. Please connect your LinkedIn account to access this feature.');
      }
      
      console.error('Error fetching LinkedIn profile:', error);
      throw error;
    }
  }
  
  /**
   * Get connected profile information
   * @returns The connected LinkedIn profile
   */
  async getConnectedProfile(): Promise<any> {
    try {
      const response = await apiRequest('/api/linkedin/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        }
      });
      
      if (response.success && response.profile) {
        return response.profile;
      }
      
      throw new Error('Failed to get LinkedIn profile');
    } catch (error) {
      console.error('Error getting connected profile:', error);
      throw error;
    }
  }
  
  /**
   * Get LinkedIn connection status
   * @returns Connection status information
   */
  async getConnectionStatus(): Promise<any> {
    try {
      const response = await apiRequest('/api/linkedin/status', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        }
      });
      
      return {
        connected: response.connected || false,
        lastSynced: response.lastSynced ? new Date(response.lastSynced) : null,
        profile: response.profile || null
      };
    } catch (error) {
      console.error('Error checking LinkedIn connection status:', error);
      return { connected: false, lastSynced: null, profile: null };
    }
  }
  
  /**
   * Connect LinkedIn account - begins the OAuth flow
   * @returns Redirect URL
   */
  async connectAccount(): Promise<string> {
    try {
      const response = await apiRequest('/api/linkedin/connect', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        }
      });
      
      if (response.success && response.redirectUrl) {
        return response.redirectUrl;
      }
      
      throw new Error('Failed to get LinkedIn connection URL');
    } catch (error) {
      console.error('Error connecting LinkedIn account:', error);
      throw error;
    }
  }
  
  /**
   * Disconnect LinkedIn account
   */
  async disconnectAccount(): Promise<void> {
    try {
      await apiRequest('/api/linkedin/disconnect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        }
      });
    } catch (error) {
      console.error('Error disconnecting LinkedIn account:', error);
      throw error;
    }
  }
}

export default LinkedInService; 