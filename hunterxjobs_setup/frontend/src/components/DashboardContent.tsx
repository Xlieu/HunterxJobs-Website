import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaChartLine, FaUserEdit, FaShieldAlt, FaRocket, FaSignOutAlt, FaCode, FaUser, FaPen, FaBriefcase, FaChartBar, FaBug, FaTasks, FaLink, FaCheck, FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { NextRouter, useRouter } from 'next/router';
import agentService from '../services/agent.service';
import apiService, { apiRequest } from '../services/api.service';
import LinkedInService from '../services/linkedin.service';
import profileAnalyzerService from '../services/profile-analyzer.service';
import LinkedInAnalysisResults from './LinkedInAnalysisResults';
import { ConnectionStatus } from './ConnectionStatus';
import axios from 'axios';

interface DashboardContentProps {
  router: NextRouter;
}

// API server check function
const checkApiServer = async (apiUrl: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for health check
    
    console.log('Checking API server health at:', apiUrl);
    const response = await fetch(`${apiUrl}/healthcheck`, {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.error('API server health check failed:', error);
    return false;
  }
}

// Fallback between multiple API URLs
const getWorkingApiUrl = async (): Promise<string> => {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Try the configured URL first if it exists
  if (configuredUrl) {
    if (await checkApiServer(configuredUrl)) {
      console.log('Using configured API URL:', configuredUrl);
      return configuredUrl;
    }
    console.warn('Configured API URL is not responding, trying fallbacks...');
  }
  
  // Try localhost fallbacks with different ports
  const fallbackUrls = ['http://localhost:5001', 'http://localhost:5000', 'http://localhost:3001/api'];
  
  for (const url of fallbackUrls) {
    if (await checkApiServer(url)) {
      console.log('Using fallback API URL:', url);
      return url;
    }
  }
  
  // If all fails, return the default
  console.warn('No working API URL found, defaulting to localhost:5001');
  return 'http://localhost:5001';
}

const DashboardContent: React.FC<DashboardContentProps> = ({ router }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [isProfileFetched, setIsProfileFetched] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlSubmitted, setUrlSubmitted] = useState(false);
  
  // Programmer agent state
  const [featureDescription, setFeatureDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeExplanation, setCodeExplanation] = useState('');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);

  // LinkedIn connection state
  const [connectionStatus, setConnectionStatus] = useState({
    connected: false,
    lastSynced: null as Date | null
  });

  // Add state to track server connection status
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [linkedInProfile, setLinkedInProfile] = useState<any>(null);
  const [lastGeneratedCode, setLastGeneratedCode] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'online'|'checking'|'error'>('checking');
  const [apiUrl, setApiUrl] = useState<string>('');
  
  // Add a state for profile analysis
  const [profileAnalysis, setProfileAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Check for direct login parameters in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userInfo = urlParams.get('user');
    
    if (token && userInfo) {
      console.log('Found direct login parameters in URL');
      try {
        // Parse user info and store in localStorage
        const user = JSON.parse(decodeURIComponent(userInfo));
        console.log('Direct login user:', user);
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Stored direct login credentials in localStorage');
        
        // Clean URL without reloading page
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Force refresh user state
        setUser(user);
        setLoading(false);
        
        toast.success('Developer login successful!');
      } catch (error) {
        console.error('Error parsing direct login parameters:', error);
      }
    }
  }, []);

  // Check if we just connected LinkedIn and should prompt for the URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const linkedinConnected = urlParams.get('linkedin') === 'connected';
      const promptUrl = urlParams.get('prompt_url') === 'true';
      
      if (linkedinConnected && promptUrl) {
        setShowUrlInput(true);
        // Remove the parameters from the URL to avoid showing the prompt again on refresh
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Dashboard mounted. Checking URL params:', router.query);
        // Check if we have linkedin authentication parameters in the URL
        const { token: urlToken, user: urlUser, linkedin } = router.query;
        
        // If we have linkedin parameters in the URL, save them to localStorage
        if (linkedin === 'connected' && urlToken && urlUser) {
          console.log('LinkedIn authentication successful, storing credentials');
          localStorage.setItem('token', urlToken as string);
          
          try {
            // Try to parse the user data - it might be a JSON string or URL encoded JSON
            let parsedUser;
            if (typeof urlUser === 'string') {
              if (urlUser.startsWith('%7B')) {
                // URL encoded JSON
                parsedUser = JSON.parse(decodeURIComponent(urlUser));
                console.log('Parsed URL-encoded user data', parsedUser);
              } else {
                // Regular JSON string
                parsedUser = JSON.parse(urlUser);
                console.log('Parsed JSON user data', parsedUser);
              }
              localStorage.setItem('user', JSON.stringify(parsedUser));
            }
          } catch (parseError) {
            console.error('Failed to parse user data from URL', parseError);
            localStorage.setItem('user', urlUser as string);
          }
          
          // Clean up URL by removing query parameters
          router.replace('/dashboard', undefined, { shallow: true });
          
          // Show the URL input form after LinkedIn connection
          setShowUrlInput(true);
        }
        
        // Check if user is logged in
        console.log('Checking stored credentials...');
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (!storedUser || !token) {
          // Redirect to login if not logged in
          console.log('No stored user or token found, redirecting to login');
          window.location.href = '/login';
          return;
        }

        console.log('Found user in localStorage, parsing...');
        
        // Set initial user data without waiting for profile fetch
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log('Successfully parsed user data:', { 
            id: parsedUser.id, 
            email: parsedUser.email,
            role: parsedUser.role
          });
          setUser(parsedUser);
        } catch (parseError) {
          console.error('Error parsing stored user data:', parseError);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.href = '/login';
          return;
        }

        // Fetch LinkedIn profile data only if we haven't already fetched it
        if (!isProfileFetched && !profileData) {
          console.log('Initial profile fetch');
          setIsProfileFetched(true);
          
          // Try to load profile data, but don't let it block the dashboard loading
          fetchLinkedInProfile().catch(error => {
            console.error('Background profile fetch failed:', error);
            // Don't block the dashboard on profile fetch errors
          });
        }
        
        // Only show loading spinner for initial page load
        setLoading(false);
      } catch (error) {
        console.error('Error in dashboard initialization:', error);
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router.query, router, isProfileFetched, profileData]);

  // Function to connect to LinkedIn
  const connectToLinkedIn = () => {
    try {
      // Display connecting message
      toast.info('Connecting to LinkedIn. You will be redirected to authenticate with your LinkedIn credentials.');
      
      // Redirect to LinkedIn OAuth endpoint
      window.location.href = `${apiUrl}/api/linkedin/connect`;
    } catch (error) {
      console.error('Error connecting to LinkedIn:', error);
      toast.error('Failed to connect to LinkedIn');
    }
  };

  // Function to fetch LinkedIn profile data
  const fetchLinkedInProfile = async () => {
    if (!user) {
      console.error('Cannot fetch LinkedIn profile: User not logged in');
      return;
    }
    
    try {
      console.log('Manually fetching LinkedIn profile data');
      
      setLoading(true);
      
      try {
        console.log('Calling API service for LinkedIn profile data');
        const data = await apiService.get('api/linkedin/profile');
        
        if (!data || typeof data !== 'object') {
          console.error('Invalid profile data format received:', data);
          throw new Error('Invalid profile data format');
        }
        
        // If we got a profile, that means the user is connected to LinkedIn
        setProfileData(data.profile || data);
        setConnectionStatus({
          connected: true,
          lastSynced: new Date()
        });
        
        // Show success toast
        toast.success('LinkedIn profile loaded successfully');
      } catch (apiError) {
        console.error('Error during API call for LinkedIn profile:', apiError);
        
        // Better error handling based on error status codes
        if (apiError.status === 403) {
          toast.warning('LinkedIn account not connected. Please connect your LinkedIn account first.');
          setConnectionStatus({
            connected: false,
            lastSynced: null
          });
        } else if (apiError.status === 401) {
          if (apiError.message.includes('token expired') || apiError.message.includes('tokenExpired')) {
            toast.warning('LinkedIn token has expired. Please reconnect your account.');
          } else {
            toast.error('Authentication error. Please log in again.');
          }
          setConnectionStatus({
            connected: false,
            lastSynced: null
          });
        } else {
          toast.error(apiError.message || 'Failed to load LinkedIn profile data');
        }
        
        // Don't create fallback profile - developer and LinkedIn accounts are separate
        throw apiError;
      }
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
      
      // Don't create fallback profile from user - these should be separate entities
      // Keep the toast error that will be shown in the finally block
    } finally {
      setLoading(false);
    }
  };

  // Validate LinkedIn URL format
  const validateLinkedInUrl = (url: string): boolean => {
    if (!url || typeof url !== 'string') {
      return false;
    }
    
    const urlToCheck = url.trim();
    
    // Accept bare usernames (no URL structure)
    if (urlToCheck.match(/^[a-zA-Z0-9_-]{5,100}$/)) {
      return true;
    }
    
    // Handle URLs without protocol
    if (urlToCheck.startsWith('www.')) {
      return true;
    }
    
    // Handle URLs with linkedin.com prefix without /in/
    if (urlToCheck.match(/^linkedin\.com\/[a-zA-Z0-9_-]+$/)) {
      return true;
    }
    
    // Standard validation for full URLs
    const regex = /^https?:\/\/(www\.)?linkedin\.com\/(in\/)?[\w\-\.]+\/?(\?.*)?$/;
    return regex.test(urlToCheck);
  };
  
  // Extract username from LinkedIn URL (handles various formats)
  const extractLinkedInUsername = (url) => {
    // If it's a bare username with no URL structure
    if (url.match(/^[a-zA-Z0-9-_]+$/)) {
      return url;
    }
    
    // Try to extract the username from common URL patterns
    const patterns = [
      /linkedin\.com\/in\/([^\/\?\#]+)/,    // Standard format
      /linkedin\.com\/([^\/\?\#]+)/,        // Missing /in/
      /\/in\/([^\/\?\#]+)/,                // Just /in/username
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        // Remove trailing slashes, query params, or hash
        return match[1].replace(/\/$/, '');
      }
    }
    
    // Fallback: try simple splitting 
    if (url.includes('/in/')) {
      return url.split('/in/')[1]?.split(/[\/#\?]/)[0].replace(/\/$/, '') || '';
    }
    
    return '';
  };
  
  // Function to test LinkedIn URL directly with native fetch for debugging
  const testLinkedInUrlWithFetch = async (url: string) => {
    setIsProcessing(true);
    setErrorMessage(null);
    
    try {
      console.log('Testing LinkedIn URL with direct fetch:', url);
      
      // Use the apiUrl from the connection check
      if (!apiUrl) {
        throw new Error('API URL is not available');
      }
      
      // Set up fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      // Make the direct API call with detailed logging
      console.log(`Sending request to ${apiUrl}/api/linkedin/process`);
      console.log('Request body:', JSON.stringify({ linkedInUrl: url }));
      
      const response = await fetch(`${apiUrl}/api/linkedin/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ linkedInUrl: url }),
        signal: controller.signal,
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store'
      });
      
      clearTimeout(timeoutId);
      
      // Log the response
      console.log(`Response status: ${response.status} ${response.statusText}`);
      console.log('Content-Type:', response.headers.get('content-type'));
      console.log('Content-Length:', response.headers.get('content-length'));
      
      // Check if the response is successful
      if (!response.ok) {
        // Handle HTTP errors
        let errorMessage = `HTTP error: ${response.status} ${response.statusText}`;
        
        // Attempt to get more detailed error from response body
        try {
          const errorBody = await response.json();
          if (errorBody && errorBody.message) {
            errorMessage = errorBody.message;
          }
        } catch (parseError) {
          // If we can't parse JSON, try to get text
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage += ` - ${errorText.substring(0, 100)}`;
            }
          } catch (textError) {
            // Ignore text extraction errors
          }
        }
        
        throw new Error(errorMessage);
      }
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        console.log('Response text preview:', text.substring(0, 100));
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error('Error parsing JSON response:', e);
          throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
        }
      } else {
        throw new Error(`Unexpected content type: ${contentType || 'unknown'}`);
      }
      
      // Check for valid profile data
      if (!data || !data.success) {
        throw new Error(data.message || 'Failed to get profile data');
      }
      
      // Return the actual profile data, not wrapped in mock data
      return data.profile || data.data;
    } catch (error) {
      console.error('Error testing LinkedIn URL with fetch:', error);
      setErrorMessage(`Error: ${error.message}`);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Modify handleLinkedInUrlSubmit to analyze profile after fetching
  const handleLinkedInUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!validateLinkedInUrl(linkedInUrl)) {
        setErrorMessage('Please enter a valid LinkedIn URL or username');
        return;
      }
      
      setErrorMessage(null);
      setIsProcessing(true);
      setIsAnalyzing(false);
      setProfileAnalysis(null);
      
      // Try with direct fetch first (for debugging)
      const profileData = await testLinkedInUrlWithFetch(linkedInUrl);
      
      if (profileData) {
        setLinkedInProfile(profileData);
        setIsModalOpen(false);
        
        // Now analyze the profile
        setIsAnalyzing(true);
        try {
          const analysis = await profileAnalyzerService.analyzeProfile(profileData);
          setProfileAnalysis(analysis);
        } catch (analysisError) {
          console.error('Error analyzing profile:', analysisError);
        } finally {
          setIsAnalyzing(false);
        }
      } else {
        // If direct fetch failed, fallback to the API service
        console.log('Direct fetch failed, trying API service');
        const linkedInService = new LinkedInService();
        const data = await linkedInService.processManualProfile(linkedInUrl);
        setLinkedInProfile(data);
        setIsModalOpen(false);
        
        // Now analyze the profile
        setIsAnalyzing(true);
        try {
          const analysis = await profileAnalyzerService.analyzeProfile(data);
          setProfileAnalysis(analysis);
        } catch (analysisError) {
          console.error('Error analyzing profile:', analysisError);
        } finally {
          setIsAnalyzing(false);
        }
      }
    } catch (error) {
      console.error('Error submitting LinkedIn URL:', error);
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Display LinkedIn profile data in the dashboard
  const renderLinkedInProfile = () => {
    return (
      <div className="glass-card rounded-xl mb-8 border border-zinc-800">
        <div className="px-6 py-5 border-b border-zinc-800 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-medium text-white">LinkedIn Integration</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Connect your LinkedIn account to analyze and optimize your professional profile.
            </p>
          </div>
          <div className="flex items-center">
            {connectionStatus.connected ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Not Connected
              </span>
            )}
          </div>
        </div>
        <div className="px-6 py-5">
          <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Account Separation</h4>
            <p className="text-xs text-gray-400">
              Your developer account and LinkedIn integration are separate. You can connect or disconnect 
              LinkedIn without affecting your main account. LinkedIn is used only for profile analysis.
            </p>
          </div>
          
          {!connectionStatus.connected ? (
            <div className="flex flex-col items-center justify-center p-6 space-y-4 border border-dashed border-gray-700 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-blue-900/30 flex items-center justify-center">
                <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                </svg>
              </div>
              <div className="text-center">
                <h5 className="text-lg font-medium text-white mb-1">Connect LinkedIn Account</h5>
                <p className="text-sm text-gray-400 mb-4">Connect your LinkedIn account to analyze and optimize your profile</p>
                <button
                  onClick={connectToLinkedIn}
                  disabled={isProcessing}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                      <span>Connecting...</span>
                    </div>
                  ) : 'Connect LinkedIn'}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {profileData ? (
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-shrink-0 mb-4 md:mb-0">
                    {profileData.profilePicture ? (
                      <img 
                        src={profileData.profilePicture} 
                        alt={`${profileData.firstName} ${profileData.lastName}`} 
                        className="h-20 w-20 rounded-full border-2 border-gray-700"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 text-2xl font-bold">
                        {profileData.firstName?.charAt(0) || ''}
                        {profileData.lastName?.charAt(0) || ''}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-white">
                      {profileData.firstName} {profileData.lastName}
                    </h4>
                    {profileData.headline && (
                      <p className="text-sm text-gray-300 mb-2">{profileData.headline}</p>
                    )}
                    {profileData.email && (
                      <p className="text-sm text-gray-400 mb-3">{profileData.email}</p>
                    )}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-700 rounded-md text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
                      >
                        Analyze Profile
                      </button>
                      <button
                        onClick={() => fetchLinkedInProfile()}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-700 rounded-md text-xs font-medium text-gray-300 bg-gray-800 hover:bg-gray-700"
                      >
                        Refresh Data
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 space-y-4 border border-dashed border-gray-700 rounded-lg">
                  <button
                    onClick={fetchLinkedInProfile}
                    disabled={isProcessing}
                    className="flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                        <span>Loading Profile...</span>
                      </div>
                    ) : 'Load LinkedIn Profile'}
                  </button>
                </div>
              )}
              
              {/* Display profile analysis results if available */}
              {profileAnalysis && (
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <h4 className="text-lg font-medium text-white mb-4">Profile Analysis</h4>
                  {/* Insert LinkedInAnalysisResults component here */}
                  {LinkedInAnalysisResults && (
                    <LinkedInAnalysisResults analysis={profileAnalysis} />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const handleRunAgentAnalysis = async () => {
    setLoading(true);
    setAnalysisResults(null);
    setError('');
    
    try {
      console.log('------- STARTING PROFILE ANALYSIS -------');
      toast.info('Running AI analysis on your profile...');
      
      // Get token and profile ID
      const token = localStorage.getItem('token');
      const userObj = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {};
      
      console.log('Token available:', !!token);
      if (token) console.log('Token first 10 chars:', token.substring(0, 10));
      console.log('User object:', userObj);
      console.log('User profile data available:', !!profileData);
      
      if (!token) {
        throw new Error('Authentication token not found. Please login again.');
      }
      
      // Set token in agent service
      agentService.setToken(token);
      
      // Use agent service to analyze profile
      const profileId = userObj.id || '';
      console.log('Analyzing profile with ID:', profileId);
      
      const data = await agentService.analyzeProfile(profileId);
      console.log('Analysis response:', data);
      
      if (data.success && (data.results || data.profile?.analysis)) {
        console.log('Analysis completed successfully');
        
        // Handle both formats: data.results or data.profile.analysis
        const analysisData = data.results || (data.profile?.analysis || null);
        setAnalysisResults(analysisData);
        
        toast.success('Profile analysis completed successfully!');
      } else {
        console.error('Analysis returned success: false or no results');
        throw new Error(data.message || 'No analysis results received');
      }
    } catch (error: any) {
      console.error('Profile analysis error:', error);
      console.error('Error stack:', error.stack);
      setError('An error occurred when analyzing your profile. Try again later.');
      toast.error('Profile analysis failed: ' + (error.message || 'Unknown error'));
    } finally {
      console.log('------- PROFILE ANALYSIS COMPLETED -------');
      setLoading(false);
    }
  };

  // Function to handle programmer agent code generation
  const handleGenerateCode = async () => {
    if (!featureDescription) {
      toast.error('Please provide a feature description');
      return;
    }

    setIsGeneratingCode(true);

    try {
      console.log('Generating code with programmer agent');
      
      const data = await apiService.post('api/agent/generate-code', {
        feature: 'LinkedIn Profile Analyzer',
        requirements: featureDescription
      });

      if (data.code) {
        setGeneratedCode(data.code);
        setCodeExplanation(data.explanation);
        toast.success('Code generated successfully!');
      } else {
        toast.warning('Code was generated but response format was unexpected');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      
      // Special handling for permission errors
      if (error.message && error.message.includes('permission')) {
        toast.error('You do not have permission to use the Programmer Agent. Developer role required.');
      } else {
        toast.error(error.message || 'Failed to generate code');
      }
    } finally {
      setIsGeneratingCode(false);
    }
  };

  // Function to render agent tabs based on user role
  const renderAgentTabs = () => {
    return (
      <div className="glass-card rounded-xl border border-zinc-800">
        <div className="px-6 py-5 border-b border-zinc-800">
          <h3 className="text-xl font-medium text-white">AI Agents</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Leverage our AI agents to help with your job search and profile optimization.
          </p>
        </div>
        <div className="border-b border-zinc-800">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === 'profile' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser className="mr-2" />
              Profile Optimizer
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === 'content' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('content')}
            >
              <FaPen className="mr-2" />
              Content Generator
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center ${
                activeTab === 'code' 
                  ? 'text-white border-b-2 border-purple-500' 
                  : 'text-zinc-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('code')}
            >
              <FaCode className="mr-2" />
              Programmer
            </button>
          </nav>
        </div>
        <div className="px-6 py-5">
          {activeTab === 'profile' && (
            <div>
              <p className="text-zinc-300 mb-4">
                The profile optimizer agent will analyze your LinkedIn profile and provide actionable recommendations
                to increase your visibility to recruiters and improve your chances of landing interviews.
              </p>
              <div className="glass-card-inner rounded-lg p-4 mb-4">
                <h4 className="text-white font-medium mb-2">Agent Services</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-start">
                    <FaChartBar className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>In-depth profile scoring across 12 dimensions</span>
                  </li>
                  <li className="flex items-start">
                    <FaUserEdit className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Personalized improvement suggestions for each section</span>
                  </li>
                  <li className="flex items-start">
                    <FaBriefcase className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Industry-specific keyword recommendations</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Link href="/profile-analysis" className="btn btn-primary">
                  <FaChartLine className="mr-2" />
                  Run Profile Analysis
                </Link>
              </div>
            </div>
          )}
          
          {activeTab === 'content' && (
            <div>
              <p className="text-zinc-300 mb-4">
                Our content generator uses AI to help you create compelling LinkedIn content including posts,
                comments, and messages that will increase your engagement and expand your network.
              </p>
              <div className="glass-card-inner rounded-lg p-4 mb-4">
                <h4 className="text-white font-medium mb-2">Content Types</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-start">
                    <FaRocket className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Attention-grabbing LinkedIn posts</span>
                  </li>
                  <li className="flex items-start">
                    <FaUserEdit className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Professional connection requests</span>
                  </li>
                  <li className="flex items-start">
                    <FaBriefcase className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Recruiter outreach messages</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Link href="/content-generator" className="btn btn-primary">
                  <FaPen className="mr-2" />
                  Open Content Generator
                </Link>
              </div>
            </div>
          )}
          
          {activeTab === 'code' && (
            <div>
              <p className="text-zinc-300 mb-4">
                The programmer agent can help you generate code snippets and solve technical problems
                for your portfolio projects or technical interviews.
              </p>
              
              <div className="mb-4">
                <label htmlFor="featureDescription" className="block text-sm font-medium text-zinc-300 mb-1">
                  Describe what you want to build:
                </label>
                <textarea
                  id="featureDescription"
                  rows={3}
                  className="form-input glass-card-inner w-full rounded-lg bg-[#1a1a1a] border-zinc-700 text-white"
                  placeholder="E.g., Create a function that sorts an array of objects by multiple properties..."
                  value={featureDescription}
                  onChange={(e) => setFeatureDescription(e.target.value)}
                />
              </div>
              
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleGenerateCode}
                  disabled={isGeneratingCode || !featureDescription.trim()}
                  className={`btn btn-primary ${isGeneratingCode || !featureDescription.trim() ? 'opacity-70' : ''}`}
                >
                  {isGeneratingCode ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FaCode className="mr-2" />
                      Generate Code
                    </>
                  )}
                </button>
              </div>
              
              {generatedCode && (
                <div className="rounded-lg overflow-hidden mb-4">
                  <div className="bg-[#111827] p-3 text-xs text-white flex justify-between items-center">
                    <span>Generated Code</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedCode);
                        toast.success('Code copied to clipboard!');
                      }}
                      className="text-zinc-400 hover:text-white text-xs"
                    >
                      Copy to clipboard
                    </button>
                  </div>
                  <pre className="p-4 bg-[#1a1a1a] rounded-b-lg overflow-auto max-h-96 text-zinc-300 text-sm">
                    <code>{generatedCode}</code>
                  </pre>
                </div>
              )}
              
              {codeExplanation && (
                <div className="glass-card-inner rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Code Explanation</h4>
                  <p className="text-zinc-400 text-sm whitespace-pre-line">{codeExplanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleConnectLinkedIn = async () => {
    try {
      // Check if user is logged in first
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in with your developer account to connect LinkedIn');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }
      
      // Explain the connection process to the user
      toast.info('Connecting to LinkedIn. You will be redirected to authenticate with your LinkedIn credentials.');
      
      // For LinkedIn connection, we need to redirect to the OAuth page
      const linkedInService = new LinkedInService();
      const redirectUrl = await linkedInService.connectAccount();
      
      // Store current user info in local storage to remember after redirect
      localStorage.setItem('pre_linkedin_connect_path', window.location.pathname);
      
      // Redirect to LinkedIn OAuth
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Failed to connect to LinkedIn:', error);
      toast.error('Failed to connect to LinkedIn. Please try again later.');
    }
  };

  const handleDisconnectLinkedIn = async () => {
    try {
      // Confirm the disconnection
      if (!confirm('Are you sure you want to disconnect your LinkedIn account? This will not affect your developer account login.')) {
        return;
      }
      
      toast.info('Disconnecting LinkedIn account...');
      
      const linkedInService = new LinkedInService();
      await linkedInService.disconnectAccount();
      
      // Update state to reflect disconnection
      setConnectionStatus({ connected: false, lastSynced: null });
      setProfileData(null);
      setLinkedInProfile(null);
      setProfileAnalysis(null);
      
      toast.success('LinkedIn account disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting LinkedIn:', error);
      toast.error(error.message || 'Failed to disconnect LinkedIn account');
    }
  };

  // Add effect to check server connection status
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        // Force a server check
        const url = await apiService.getApiBaseUrl(true);
        setApiUrl(url);
        
        // Use the direct fetch method to test without our API layer
        try {
          const response = await fetch(`${url}/api/healthcheck`, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache'
            }
          });
          
          if (response.ok) {
            console.log('✅ Direct health check succeeded');
            setServerStatus('online');
          } else {
            console.error('❌ Direct health check failed:', response.status);
            setServerStatus('error');
          }
        } catch (fetchError) {
          console.error('❌ Direct fetch failed:', fetchError.message);
          setServerStatus('error');
        }
      } catch (error) {
        console.error('❌ Server connection check failed:', error);
        setServerStatus('error');
      }
    };
    
    checkServerConnection();
    
    // Check connection periodically
    const interval = setInterval(checkServerConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  // Add a new section to display profile analysis results
  const renderProfileAnalysis = () => {
    if (!linkedInProfile) return null;
    
    return (
      <div className="glass-card rounded-xl mb-8 border border-zinc-800">
        <div className="px-6 py-5 border-b border-zinc-800">
          <h3 className="text-xl font-medium text-white">Profile Analysis</h3>
          <p className="mt-1 text-sm text-zinc-400">
            Comprehensive assessment of your LinkedIn profile across multiple dimensions.
          </p>
        </div>
        <div className="px-6 py-5">
          {isAnalyzing ? (
            <div className="flex items-center justify-center py-10">
              <div className="spinner mr-3"></div>
              <p className="text-zinc-300">Analyzing your profile...</p>
            </div>
          ) : profileAnalysis ? (
            <LinkedInAnalysisResults analysis={profileAnalysis} />
          ) : (
            <div className="text-center py-8">
              <p className="text-zinc-400 mb-4">Profile analysis not available</p>
              <button
                onClick={async () => {
                  if (!linkedInProfile) return;
                  
                  setIsAnalyzing(true);
                  try {
                    const analysis = await profileAnalyzerService.analyzeProfile(linkedInProfile);
                    setProfileAnalysis(analysis);
                  } catch (error) {
                    console.error('Error analyzing profile:', error);
                  } finally {
                    setIsAnalyzing(false);
                  }
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
              >
                Analyze Profile
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Function to test key functionality
  const runFunctionalityCheck = () => {
    console.group('HunterXJobs Functionality Check');
    
    // Check developer account
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log('Developer account:', {
      loggedIn: !!token,
      tokenExists: !!token,
      userExists: !!user,
    });
    
    // Check LinkedIn connection
    console.log('LinkedIn connection:', {
      profileData: !!profileData,
      linkedInProfile: !!linkedInProfile,
      connectionStatus: connectionStatus
    });
    
    // Check server connection
    console.log('Server connection:', {
      serverStatus,
      apiUrl
    });
    
    // Check that key functions exist
    console.log('Key functions available:', {
      handleConnectLinkedIn: typeof handleConnectLinkedIn === 'function',
      handleDisconnectLinkedIn: typeof handleDisconnectLinkedIn === 'function',
      handleLogout: typeof handleLogout === 'function',
      handleLinkedInUrlSubmit: typeof handleLinkedInUrlSubmit === 'function',
      fetchLinkedInProfile: typeof fetchLinkedInProfile === 'function'
    });
    
    console.groupEnd();
    
    // Display a toast message
    toast.info('Functionality check complete. Check browser console for details.');
    
    return {
      developerAccount: { loggedIn: !!token, hasToken: !!token, hasUser: !!user },
      linkedIn: { hasProfile: !!profileData, connectionStatus },
      server: { status: serverStatus, url: apiUrl },
      functionsAvailable: {
        handleConnectLinkedIn: typeof handleConnectLinkedIn === 'function',
        handleDisconnectLinkedIn: typeof handleDisconnectLinkedIn === 'function',
        handleLogout: typeof handleLogout === 'function',
        handleLinkedInUrlSubmit: typeof handleLinkedInUrlSubmit === 'function',
        fetchLinkedInProfile: typeof fetchLinkedInProfile === 'function'
      }
    };
  };

  // Make the function available globally for browser console testing
  if (typeof window !== 'undefined') {
    // @ts-ignore
    window.checkFunctionality = () => runFunctionalityCheck();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-2">Loading Dashboard</h2>
          <p className="text-gray-400 mb-4">Please wait while we load your data...</p>
          <Link href="/diagnostics" className="text-blue-400 hover:text-blue-300 underline">
            Having trouble? Run diagnostics
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Server connection status indicator */}
      <ConnectionStatus serverStatus={serverStatus} apiUrl={apiUrl} />
      
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
        
        {/* LinkedIn Profile Section */}
        {renderLinkedInProfile()}
        
        {/* LinkedIn Profile Analysis Section */}
        {renderProfileAnalysis()}
        
        {/* Agent Tabs */}
        {renderAgentTabs()}
      </div>
    </main>
  );
};

export default DashboardContent; 