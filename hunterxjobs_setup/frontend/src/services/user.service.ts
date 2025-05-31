import axios from 'axios';
import { API_URL } from '../config/constants';

/**
 * Get the current user's profile
 * @returns The user profile data
 */
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return null;
    }
    
    const response = await axios.get(`${API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Update the user's profile
 * @param profileData The updated profile data
 * @returns The updated user profile
 */
export const updateUserProfile = async (profileData: any) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await axios.put(`${API_URL}/api/users/profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Get the user's LinkedIn profile
 * @returns The user's LinkedIn profile data
 */
export const getLinkedInProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await axios.get(`${API_URL}/api/users/linkedin-profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
    throw error;
  }
}; 