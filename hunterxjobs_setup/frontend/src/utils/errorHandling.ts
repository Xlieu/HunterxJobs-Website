import { toast } from 'react-toastify';

/**
 * Handle API errors in a consistent way across the application
 * @param error The error object from catch block
 * @param customMessage Optional custom message to display
 */
export const handleApiError = (error: any, customMessage?: string): void => {
  console.error('API Error:', error);
  
  // Try to extract error message from response if available
  let errorMessage = customMessage || 'An unexpected error occurred';
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const data = error.response.data;
    if (data && data.message) {
      errorMessage = data.message;
    } else if (error.response.status === 401) {
      errorMessage = 'You must be logged in to perform this action';
      // Optionally redirect to login page
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else if (error.response.status === 403) {
      errorMessage = 'You do not have permission to perform this action';
    } else if (error.response.status === 404) {
      errorMessage = 'The requested resource was not found';
    } else if (error.response.status >= 500) {
      errorMessage = 'Server error. Please try again later.';
    }
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response from server. Please check your connection.';
  }
  
  toast.error(errorMessage);
};

/**
 * Check if the user is logged in
 * @returns boolean indicating if the user is logged in
 */
export const isLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  return !!(token && user);
};

/**
 * Redirect user to login page if not logged in
 * @param redirectPath Optional path to redirect after login
 */
export const redirectIfNotLoggedIn = (redirectPath?: string): void => {
  if (typeof window === 'undefined') return;
  
  if (!isLoggedIn()) {
    const redirectUrl = redirectPath 
      ? `/login?redirect=${encodeURIComponent(redirectPath)}`
      : '/login';
    
    window.location.href = redirectUrl;
  }
}; 