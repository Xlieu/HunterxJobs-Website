// API Constants
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// LinkedIn Constants
export const LINKEDIN_APP_ID = process.env.NEXT_PUBLIC_LINKEDIN_APP_ID;
export const LINKEDIN_REDIRECT_URI = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || `${window.location.origin}/linkedin-callback`;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;

// Authentication
export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

// Navigation
export const DASHBOARD_ROUTE = '/dashboard';
export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';
export const PROFILE_ROUTE = '/profile';
export const LINKEDIN_CALLBACK_ROUTE = '/linkedin-callback';
 