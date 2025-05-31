import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaUser, FaLock, FaLinkedin, FaInfoCircle } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import type { NextPage } from 'next';
import Logo from '../components/Logo';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  
  // Function to handle LinkedIn OAuth login
  const handleLinkedInLogin = async () => {
    try {
      setIsLinkedInLoading(true);
      
      // Get API URL from environment or use fallback
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Display info toast to inform user
      toast.info('Connecting to LinkedIn. You will be redirected to authenticate with your LinkedIn credentials.');
      
      console.log('Redirecting to LinkedIn OAuth: ', `${apiBaseUrl}/api/linkedin/connect`);
      
      // Redirect to backend endpoint that initiates LinkedIn OAuth flow
      window.location.href = `${apiBaseUrl}/api/linkedin/connect`;
    } catch (error) {
      console.error('LinkedIn login error:', error);
      toast.error('Failed to connect to LinkedIn. Please try again later.');
      setIsLinkedInLoading(false);
    }
  };
  
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setIsLoading(true);
    setLoginErrorMessage('');
    
    try {
      console.log('Login attempt with:', values.email);
      
      // Get API URL from environment or use fallback
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Make API call to login endpoint
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMsg = data.message || 'Login failed. Please try again.';
        console.error('Login error:', errorMsg);
        setLoginErrorMessage(errorMsg);
        throw new Error(errorMsg);
      }
      
      console.log('Login successful for user:', data.user.email);
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Show success message
      toast.success('Login successful! Redirecting to dashboard...');
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
      setErrors({ submit: error.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Check for LinkedIn callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const linkedinStatus = urlParams.get('linkedin');
    
    if (linkedinStatus === 'connected') {
      const token = urlParams.get('token');
      const userInfo = urlParams.get('user');
      
      console.log('LinkedIn callback received:', { 
        status: linkedinStatus,
        hasToken: !!token,
        hasUserInfo: !!userInfo
      });
      
      // If we received token and user info from OAuth callback
      if (token && userInfo) {
        try {
          // Parse user info
          const user = JSON.parse(decodeURIComponent(userInfo));
          console.log('LinkedIn user info parsed successfully:', { 
            name: user.name,
            role: user.role
          });
          
          // Store token and user in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          
          // Show success message
          toast.success('LinkedIn account connected successfully!');
          
          // Redirect to dashboard
          window.location.href = '/dashboard';
        } catch (error) {
          console.error('Error parsing user info:', error);
          toast.error('Failed to process LinkedIn login');
        }
      } else {
        console.warn('LinkedIn connected but missing token or user info');
        toast.warning('LinkedIn connection incomplete. Please try again or use email login.');
      }
      
      // Remove query parameters from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (linkedinStatus === 'error') {
      const errorMessage = urlParams.get('message') || 'Failed to connect LinkedIn account';
      console.error('LinkedIn authentication error:', errorMessage);
      toast.error(errorMessage);
      // Remove query parameters from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Login | HunterXJobs</title>
        <meta name="description" content="Login to your HunterXJobs account" />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      <div className="flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Logo />
              <h2 className="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
              <p className="mt-2 text-sm text-gray-400">
                Or{' '}
                <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
                  create a new account
                </Link>
              </p>
            </div>

            {loginErrorMessage && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-md">
                <p className="text-sm text-red-300">{loginErrorMessage}</p>
              </div>
            )}

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Sign in with</p>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleLinkedInLogin}
                      disabled={isLinkedInLoading}
                      className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors"
                    >
                      {isLinkedInLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-blue-400 rounded-full"></div>
                          <span>Connecting to LinkedIn...</span>
                        </div>
                      ) : (
                        <>
                          <FaLinkedin className="h-5 w-5 text-blue-400 mr-2" />
                          <span>Sign in with LinkedIn</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 flex items-center">
                    <FaInfoCircle className="text-gray-500 mr-1" />
                    <span>LinkedIn is used only for profile analysis and is separate from your developer account</span>
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => {
                    // Cast errors.submit to string to fix TypeScript error
                    const submitError = errors.submit as string;
                    return (
                      <Form className="space-y-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email address
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaUser className="h-5 w-5 text-gray-500" />
                            </div>
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              className="block w-full pl-10 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                              placeholder="you@example.com"
                            />
                          </div>
                          <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-400" />
                        </div>

                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                          </label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FaLock className="h-5 w-5 text-gray-500" />
                            </div>
                            <Field
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              className="block w-full pl-10 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                            />
                          </div>
                          <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-400" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded bg-gray-800"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                              Remember me
                            </label>
                          </div>

                          <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
                              Forgot your password?
                            </Link>
                          </div>
                        </div>

                        {submitError && (
                          <div className="text-sm text-red-400">{submitError}</div>
                        )}

                        <div>
                          <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 ${(isSubmitting || isLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
                          >
                            {isLoading ? (
                              <div className="flex items-center">
                                <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                                <span>Signing in...</span>
                              </div>
                            ) : 'Sign in'}
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Need help? Go to the <Link href="/diagnostics" className="text-blue-400 hover:underline">diagnostics page</Link> to check your connection.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Logo/Image */}
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center p-12">
            <div className="max-w-md text-center">
              <h2 className="text-4xl font-bold text-white mb-8">Optimize Your LinkedIn Profile</h2>
              <p className="text-xl text-gray-200 mb-6">
                Use AI to improve your profile visibility, increase connection requests, and land more interviews.
              </p>
              <div className="space-y-4 text-left bg-gray-800/30 p-6 rounded-lg border border-blue-800">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-800/50 p-2 mr-3">
                    <svg className="h-5 w-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-200">AI-powered profile analysis</p>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-800/50 p-2 mr-3">
                    <svg className="h-5 w-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-200">Content suggestions tailored to your industry</p>
                </div>
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-800/50 p-2 mr-3">
                    <svg className="h-5 w-5 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-200">Personalized job search agent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
