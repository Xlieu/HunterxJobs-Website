/**
 * API Service
 * Centralized service for making API calls with error handling and server health checks
 */

// Cache the API base URL to avoid checking on every request
let cachedApiUrl: string | null = null;
let lastServerCheck: number = 0;
const SERVER_CHECK_INTERVAL = 60000; // 1 minute

// Enable offline mode for GitHub Pages deployment
const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
let isOfflineMode = isGitHubPages;

// Safe access to environment variables
const getEnvVar = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] as string;
  }
  return undefined;
};

/**
 * Check if the API server is healthy
 */
export const checkApiServer = async (apiUrl: string): Promise<boolean> => {
  try {
    console.log(`🔍 Checking server at: ${apiUrl}`);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    // Try multiple endpoints to verify server is running
    const endpoints = [`${apiUrl}/api/healthcheck`, `${apiUrl}/healthcheck`, apiUrl];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`🔄 Trying endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          // Prevent caching
          cache: 'no-store'
        });
        
        if (response.ok) {
          console.log(`✅ Server healthy at ${endpoint}`);
          clearTimeout(timeoutId);
          return true;
        }
        console.log(`❌ Endpoint ${endpoint} returned status: ${response.status}`);
      } catch (endpointError) {
        console.log(`❌ Failed to check ${endpoint}:`, endpointError.message);
      }
    }
    
    clearTimeout(timeoutId);
    console.log(`❌ All endpoints failed for ${apiUrl}`);
    return false;
  } catch (error) {
    console.error('❌ API server health check failed:', error);
    return false;
  }
};

/**
 * Get a working API URL - prioritize user-configured URL
 */
export const getApiBaseUrl = async (forceCheck = false): Promise<string> => {
  // Return cached URL if it's recent enough to avoid excessive checks
  const now = Date.now();
  if (!forceCheck && cachedApiUrl && (now - lastServerCheck < SERVER_CHECK_INTERVAL)) {
    console.log('📌 Using cached API URL:', cachedApiUrl);
    return cachedApiUrl;
  }
  
  // Always prioritize the configured URL
  const configuredUrl = getEnvVar('NEXT_PUBLIC_API_URL');
  if (configuredUrl) {
    // Only check if it's healthy if we're forcing a check or don't have a cached URL
    if (forceCheck || !cachedApiUrl) {
      const isHealthy = await checkApiServer(configuredUrl);
      console.log(`🔍 Configured URL ${configuredUrl} health check:`, isHealthy ? 'healthy' : 'unhealthy');
      
      if (isHealthy) {
        cachedApiUrl = configuredUrl;
        lastServerCheck = now;
        return configuredUrl;
      }
    } else {
      // If we have a cached URL and it matches the configured one, use it
      return configuredUrl;
    }
  }
  
  // Try localhost fallbacks - this is only for development
  console.log('⚠️ Configured URL unavailable, trying localhost fallbacks');
  const fallbackUrls = [
    'http://localhost:5000',  // Primary port - use this first since we know it's running
    'http://localhost:5001',  // Secondary port from some hardcoded values
    'http://localhost:3001'
  ];
  
  for (const url of fallbackUrls) {
    const isHealthy = await checkApiServer(url);
    if (isHealthy) {
      console.log(`✅ Found working fallback URL: ${url}`);
      cachedApiUrl = url;
      lastServerCheck = now;
      return url;
    }
  }
  
  // If all fails, return the first fallback URL but log an error
  console.error('❌ No working API URL found - API calls will likely fail');
  return 'http://localhost:5000';
};

/**
 * Get a mock response for offline mode
 */
const getMockResponse = (endpoint: string): any => {
  // Profile data
  if (endpoint.includes('/api/linkedin/profile')) {
    return {
      id: 'mock-profile-id',
      firstName: 'Demo',
      lastName: 'User',
      headline: 'Software Engineer | Full Stack Developer',
      publicProfileUrl: 'https://www.linkedin.com/in/demo-user',
      industry: 'Software Development',
      location: { country: 'United States', city: 'San Francisco' },
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
      positions: [
        {
          title: 'Senior Software Engineer',
          company: 'Tech Company Inc.',
          startDate: { year: 2020, month: 1 },
          isCurrent: true
        }
      ]
    };
  }
  
  // Manual profile
  if (endpoint.includes('/api/linkedin/manual-profile')) {
    return {
      success: true,
      profile: {
        id: 'mock-profile-id',
        firstName: 'Demo',
        lastName: 'User',
        headline: 'Software Engineer | Full Stack Developer',
        publicProfileUrl: 'https://www.linkedin.com/in/demo-user',
        industry: 'Software Development',
        location: { country: 'United States', city: 'San Francisco' },
        skills: ['JavaScript', 'React', 'Node.js', 'TypeScript'],
        positions: [
          {
            title: 'Senior Software Engineer',
            company: 'Tech Company Inc.',
            startDate: { year: 2020, month: 1 },
            isCurrent: true
          }
        ]
      }
    };
  }
  
  if (endpoint.includes('/api/agent/generate-code')) {
    return {
      success: true,
      code: '// Sample generated code\nfunction sampleFunction() {\n  console.log("Hello, world!");\n  return "This is mock code generation in offline mode";\n}',
      explanation: 'This is a mock code response since the server is currently unavailable.'
    };
  }
  
  // Default mock response
  return {
    success: true,
    message: 'Mock response in offline mode',
    data: null
  };
};

/**
 * Make an API request with detailed error information
 */
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  timeout: number = 30000,
  retries = 2
): Promise<any> => {
  // Use mock data when on GitHub Pages
  if (isGitHubPages || isOfflineMode) {
    console.log(`📦 Using mock data for ${endpoint} (GitHub Pages deployment)`);
    return getMockResponse(endpoint);
  }
  
  const baseUrl = await getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  console.log(`📤 API Request: ${options.method || 'GET'} ${url}`);
  
  // Ensure we have the correct headers for CORS
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');
  
  // Add authorization token if available
  try {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  } catch (e) {
    console.log('Could not access localStorage for auth token');
  }
  
  // Set up timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.log(`⏱️ Request timeout for ${url}`);
    controller.abort();
  }, timeout);
  
  try {
    console.log(`📋 Request headers:`, Object.fromEntries(headers.entries()));
    
    // Prepare the fetch options with CORS settings
    const fetchOptions: RequestInit = {
      ...options,
      headers,
      credentials: 'include', // Include cookies for CORS requests
      signal: controller.signal,
      mode: 'cors', // Explicitly request CORS mode
    };
    
    const response = await fetch(url, fetchOptions);
    
    clearTimeout(timeoutId);
    console.log(`📄 Response status:`, response.status, response.statusText);
    
    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error response (${response.status}):`, errorText.substring(0, 500));
      
      let errorData;
      let errorMessage = `Request failed with status ${response.status}: ${response.statusText}`;
      
      // Try to parse JSON error
      if (errorText.trim().startsWith('{')) {
        try {
          errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          console.error('❌ Error parsing error response:', parseError);
        }
      } else if (errorText.includes('<!DOCTYPE html>') || errorText.includes('<html>')) {
        errorMessage = 'Server returned HTML instead of JSON (possible CORS or network issue)';
        
        if (errorText.includes('Access-Control-Allow-Origin')) {
          errorMessage = 'CORS policy error - server rejected the request';
        } else if (errorText.includes('Cannot GET') || errorText.includes('Cannot POST')) {
          errorMessage = 'Route not found on server - check endpoint URL';
        }
      }
      
      throw new Error(errorMessage);
    }
    
    // Check response content type
    const contentType = response.headers.get('content-type');
    console.log(`📄 Response content-type:`, contentType);
    
    if (contentType && contentType.includes('application/json')) {
      const jsonText = await response.text();
      console.log(`📊 Response preview:`, jsonText.substring(0, 100));
      try {
        return JSON.parse(jsonText);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        console.error('❌ Raw response:', jsonText.substring(0, 500));
        throw new Error('Invalid JSON response from server');
      }
    }
    
    const textResponse = await response.text();
    console.log(`📄 Text response preview:`, textResponse.substring(0, 100));
    return textResponse;
  } catch (fetchError) {
    clearTimeout(timeoutId);
    
    // Network error handling
    if (fetchError instanceof TypeError || 
        fetchError.message?.includes('Failed to fetch') || 
        fetchError.message?.includes('Network request failed')) {
      console.error(`🌐 Network error:`, fetchError.message);
      
      // Try to diagnose common network issues
      if (fetchError.message.includes('Failed to fetch')) {
        console.error('🔍 Likely causes: Server not running, CORS issues, or network connectivity');
      }
      
      if (retries > 0) {
        console.log(`⟳ Retrying... (${retries} retries left)`);
        // Add exponential backoff
        await new Promise(r => setTimeout(r, (3 - retries) * 1000));
        return apiRequest(endpoint, options, timeout, retries - 1);
      }
    }
    
    if (fetchError.name === 'AbortError') {
      throw new Error(`Request to ${url} timed out after ${timeout}ms`);
    }
    
    // Rethrow with more details
    throw new Error(`API request failed: ${fetchError.message}`);
  }
};

// Export common API methods
export default {
  get: (endpoint: string, options: RequestInit = {}) => 
    apiRequest(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint: string, data: any, options: RequestInit = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    }),
    
  put: (endpoint: string, data: any, options: RequestInit = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    }),
    
  delete: (endpoint: string, options: RequestInit = {}) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
    
  getApiBaseUrl,
  
  // For debugging
  get isOfflineMode() {
    return isOfflineMode;
  },
  
  // Helper function to diagnose issues (can be called from browser console)
  async diagnose() {
    console.log('🔍 Starting API diagnostic...');
    
    // Check environment variables
    console.log('📋 Environment:', {
      isGitHubPages,
      isOfflineMode,
      apiUrl: getEnvVar('NEXT_PUBLIC_API_URL'),
      nodeEnv: getEnvVar('NODE_ENV'),
    });
    
    // Try to get config from localStorage
    try {
      console.log('📋 Auth state:', {
        hasToken: !!localStorage.getItem('token'),
        hasUser: !!localStorage.getItem('user'),
        tokenLength: localStorage.getItem('token')?.length
      });
    } catch (e) {
      console.log('❌ Could not access localStorage');
    }
    
    // Check server health at various URLs
    const possibleUrls = [
      getEnvVar('NEXT_PUBLIC_API_URL'),
      'http://localhost:5000',
      'http://localhost:5001',
      'http://localhost:3001'
    ].filter(Boolean);
    
    console.log('🔄 Checking server health at possible URLs...');
    for (const url of possibleUrls) {
      try {
        console.log(`🔍 Testing ${url}...`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${url}/healthcheck`, {
          signal: controller.signal,
          cache: 'no-store'
        });
        
        clearTimeout(timeoutId);
        console.log(`${url}: ${response.ok ? '✅ Working' : '❌ Not working'} (${response.status})`);
        
        if (response.ok) {
          const data = await response.text();
          console.log(`${url} response:`, data.substring(0, 100));
        }
      } catch (error) {
        console.log(`${url}: ❌ Error - ${error.message}`);
      }
    }
    
    // Try a direct API call
    try {
      const baseUrl = await getApiBaseUrl(true);
      console.log(`🔍 Using API base URL: ${baseUrl}`);
      
      console.log('🔄 Testing direct API call to /api/healthcheck...');
      const healthResponse = await fetch(`${baseUrl}/api/healthcheck`, { 
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      console.log(`API healthcheck: ${healthResponse.ok ? '✅ Success' : '❌ Failed'} (${healthResponse.status})`);
      
      if (healthResponse.ok) {
        const data = await healthResponse.json();
        console.log('Health check response:', data);
      }
    } catch (error) {
      console.error('❌ API test failed:', error);
    }
    
    const results: Record<string, any> = {
      timestamp: new Date().toISOString(),
      environment: {
        isGitHubPages,
        isOfflineMode,
        apiUrl: getEnvVar('NEXT_PUBLIC_API_URL'),
        nodeEnv: getEnvVar('NODE_ENV'),
      },
      // ... rest of existing method ...
    };
    
    console.log('🏁 Diagnostics complete');
    return results;
  }
}; 