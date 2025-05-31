import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle, FaServer, FaUserShield, FaLinkedin, FaDatabase } from 'react-icons/fa';
import Layout from '../components/Layout';

const DiagnosticsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState({
    server: false,
    database: false,
    api: false,
    version: '',
    environment: ''
  });
  const [userStatus, setUserStatus] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    role: '',
    accountType: '',
    linkedInConnected: false,
    linkedInTokenValid: false
  });
  const [diagnosticResults, setDiagnosticResults] = useState({
    serverConnection: { status: 'pending', message: 'Checking server connection...' },
    authStatus: { status: 'pending', message: 'Checking authentication status...' },
    linkedInStatus: { status: 'pending', message: 'Checking LinkedIn connection...' },
    databaseStatus: { status: 'pending', message: 'Checking database connection...' }
  });

  useEffect(() => {
    const runDiagnostics = async () => {
      setIsLoading(true);
      
      try {
        // Check if user is logged in
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        let isLoggedIn = false;
        let userData = null;
        
        if (storedToken && storedUser) {
          try {
            userData = JSON.parse(storedUser);
            isLoggedIn = true;
            
            setUserStatus({
              isLoggedIn: true,
              name: userData.name || '',
              email: userData.email || '',
              role: userData.role || '',
              accountType: userData.accountType || 'developer',
              linkedInConnected: userData.linkedInConnected || false,
              linkedInTokenValid: false
            });
            
            setDiagnosticResults(prev => ({
              ...prev,
              authStatus: { 
                status: 'success', 
                message: `Logged in as ${userData.name} (${userData.email})` 
              }
            }));
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
            setDiagnosticResults(prev => ({
              ...prev,
              authStatus: { 
                status: 'error', 
                message: 'Error parsing stored user data. Please log in again.' 
              }
            }));
          }
        } else {
          setDiagnosticResults(prev => ({
            ...prev,
            authStatus: { 
              status: 'warning', 
              message: 'Not logged in. Some features may not be available.' 
            }
          }));
        }
        
        // Check server connection and get system status
        try {
          const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
          const response = await fetch(`${apiBaseUrl}/api/auth/status`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(storedToken ? { 'Authorization': `Bearer ${storedToken}` } : {})
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            
            setSystemStatus({
              server: data.status.server || false,
              database: data.status.database || false,
              api: data.status.api || false,
              version: data.status.version || 'unknown',
              environment: data.status.environment || 'unknown'
            });
            
            setDiagnosticResults(prev => ({
              ...prev,
              serverConnection: { 
                status: 'success', 
                message: 'Connected to server successfully' 
              },
              databaseStatus: { 
                status: data.status.database ? 'success' : 'error', 
                message: data.status.database 
                  ? 'Database connection successful' 
                  : 'Database connection failed' 
              }
            }));
          } else {
            setDiagnosticResults(prev => ({
              ...prev,
              serverConnection: { 
                status: 'error', 
                message: `Server connection failed: ${response.status} ${response.statusText}` 
              },
              databaseStatus: { 
                status: 'error', 
                message: 'Could not verify database connection' 
              }
            }));
          }
        } catch (error) {
          console.error('Error checking server status:', error);
          setDiagnosticResults(prev => ({
            ...prev,
            serverConnection: { 
              status: 'error', 
              message: `Cannot connect to server: ${error.message}` 
            },
            databaseStatus: { 
              status: 'error', 
              message: 'Database status unknown due to server connection failure' 
            }
          }));
        }
        
        // Check LinkedIn connection if user is logged in
        if (isLoggedIn) {
          try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiBaseUrl}/api/linkedin/status`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              
              if (data.success) {
                setUserStatus(prev => ({
                  ...prev,
                  linkedInConnected: data.isConnected || false,
                  linkedInTokenValid: data.hasValidToken || false
                }));
                
                if (data.isConnected && data.hasValidToken) {
                  setDiagnosticResults(prev => ({
                    ...prev,
                    linkedInStatus: { 
                      status: 'success', 
                      message: `LinkedIn connected (${data.linkedInName || data.linkedInEmail})` 
                    }
                  }));
                } else if (data.isConnected && !data.hasValidToken) {
                  setDiagnosticResults(prev => ({
                    ...prev,
                    linkedInStatus: { 
                      status: 'warning', 
                      message: 'LinkedIn token expired. Please reconnect your account.' 
                    }
                  }));
                } else {
                  setDiagnosticResults(prev => ({
                    ...prev,
                    linkedInStatus: { 
                      status: 'warning', 
                      message: 'LinkedIn not connected. Some features may not be available.' 
                    }
                  }));
                }
              } else {
                setDiagnosticResults(prev => ({
                  ...prev,
                  linkedInStatus: { 
                    status: 'warning', 
                    message: data.message || 'Could not verify LinkedIn connection' 
                  }
                }));
              }
            } else {
              setDiagnosticResults(prev => ({
                ...prev,
                linkedInStatus: { 
                  status: 'error', 
                  message: `LinkedIn status check failed: ${response.status} ${response.statusText}` 
                }
              }));
            }
          } catch (error) {
            console.error('Error checking LinkedIn status:', error);
            setDiagnosticResults(prev => ({
              ...prev,
              linkedInStatus: { 
                status: 'error', 
                message: `LinkedIn status check error: ${error.message}` 
              }
            }));
          }
        } else {
          setDiagnosticResults(prev => ({
            ...prev,
            linkedInStatus: { 
              status: 'warning', 
              message: 'Not logged in. Cannot check LinkedIn connection.' 
            }
          }));
        }
      } catch (error) {
        console.error('Diagnostics error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    runDiagnostics();
  }, []);

  const StatusIndicator = ({ status, message, icon }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'success': return 'text-green-400';
        case 'warning': return 'text-yellow-400';
        case 'error': return 'text-red-400';
        default: return 'text-gray-400';
      }
    };
    
    const getStatusIcon = () => {
      if (status === 'success') return <FaCheckCircle className="h-5 w-5 text-green-400" />;
      if (status === 'warning') return <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />;
      if (status === 'error') return <FaTimesCircle className="h-5 w-5 text-red-400" />;
      return <FaInfoCircle className="h-5 w-5 text-gray-400" />;
    };
    
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="flex-shrink-0 mt-0.5">
          {icon || getStatusIcon()}
        </div>
        <div>
          <p className={`font-medium ${getStatusColor()}`}>{message}</p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>System Diagnostics | HunterXJobs</title>
        <meta name="description" content="System diagnostics and troubleshooting for HunterXJobs" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">System Diagnostics</h1>
          <p className="mt-2 text-lg text-gray-400">
            Check the status of your HunterXJobs installation
          </p>
        </div>

        <div className="bg-gray-800 shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Diagnostics Results</h2>
            
            {isLoading ? (
              <div className="animate-pulse flex flex-col space-y-4">
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                <div className="h-6 bg-gray-700 rounded w-2/3"></div>
                <div className="h-6 bg-gray-700 rounded w-1/3"></div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-3">Server Connection</h3>
                  <StatusIndicator 
                    status={diagnosticResults.serverConnection.status} 
                    message={diagnosticResults.serverConnection.message}
                    icon={<FaServer className={`h-5 w-5 ${diagnosticResults.serverConnection.status === 'success' ? 'text-green-400' : diagnosticResults.serverConnection.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`} />}
                  />
                  
                  <StatusIndicator 
                    status={diagnosticResults.databaseStatus.status}
                    message={diagnosticResults.databaseStatus.message}
                    icon={<FaDatabase className={`h-5 w-5 ${diagnosticResults.databaseStatus.status === 'success' ? 'text-green-400' : diagnosticResults.databaseStatus.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`} />}
                  />
                  
                  {systemStatus.version && (
                    <div className="mt-2 text-sm text-gray-500">
                      <span>Version: {systemStatus.version}</span>
                      <span className="mx-2">•</span>
                      <span>Environment: {systemStatus.environment}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-300 mb-3">User Account</h3>
                  <StatusIndicator 
                    status={diagnosticResults.authStatus.status}
                    message={diagnosticResults.authStatus.message}
                    icon={<FaUserShield className={`h-5 w-5 ${diagnosticResults.authStatus.status === 'success' ? 'text-green-400' : diagnosticResults.authStatus.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`} />}
                  />
                  
                  {userStatus.isLoggedIn && (
                    <div className="mt-1 mb-3 pl-8 text-sm text-gray-400">
                      <p>Account Type: {userStatus.accountType || 'Developer'}</p>
                      <p>Role: {userStatus.role || 'User'}</p>
                    </div>
                  )}
                  
                  <StatusIndicator 
                    status={diagnosticResults.linkedInStatus.status}
                    message={diagnosticResults.linkedInStatus.message}
                    icon={<FaLinkedin className={`h-5 w-5 ${diagnosticResults.linkedInStatus.status === 'success' ? 'text-green-400' : diagnosticResults.linkedInStatus.status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`} />}
                  />
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-medium text-gray-300 mb-3">Troubleshooting</h3>
                  
                  <div className="bg-gray-900 rounded-md p-4 text-sm text-gray-300">
                    {diagnosticResults.serverConnection.status === 'error' && (
                      <div className="mb-4">
                        <h4 className="font-medium text-red-400 mb-2">Server Connection Issues</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Make sure the backend server is running</li>
                          <li>Check that you're running <code className="text-gray-400">npm run dev</code> in the backend directory</li>
                          <li>Verify the API URL in your environment variables is correct</li>
                          <li>Current API URL: <code className="text-gray-400">{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}</code></li>
                        </ul>
                      </div>
                    )}
                    
                    {diagnosticResults.authStatus.status !== 'success' && (
                      <div className="mb-4">
                        <h4 className="font-medium text-yellow-400 mb-2">Authentication Issues</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Try logging out and logging back in</li>
                          <li>Clear your browser's local storage and cookies</li>
                          <li>Ensure you're using the correct credentials</li>
                        </ul>
                        <div className="mt-2">
                          <Link href="/login" className="text-blue-400 hover:text-blue-300">
                            Go to login page
                          </Link>
                        </div>
                      </div>
                    )}
                    
                    {diagnosticResults.linkedInStatus.status !== 'success' && userStatus.isLoggedIn && (
                      <div className="mb-4">
                        <h4 className="font-medium text-yellow-400 mb-2">LinkedIn Connection Issues</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Connect your LinkedIn account on the dashboard</li>
                          <li>If your token is expired, reconnect your account</li>
                          <li>Make sure you have granted the necessary permissions</li>
                        </ul>
                        <div className="mt-2">
                          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300">
                            Go to dashboard
                          </Link>
                        </div>
                      </div>
                    )}
                    
                    {diagnosticResults.databaseStatus.status === 'error' && (
                      <div>
                        <h4 className="font-medium text-red-400 mb-2">Database Connection Issues</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Verify MongoDB is running and accessible</li>
                          <li>Check database connection string in backend environment variables</li>
                          <li>Restart the backend server after fixing database issues</li>
                        </ul>
                      </div>
                    )}
                    
                    {Object.values(diagnosticResults).every(result => result.status === 'success') && (
                      <div className="text-green-400">
                        <h4 className="font-medium mb-2">All Systems Operational</h4>
                        <p>No issues detected. Your HunterXJobs installation is working correctly.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gray-900 px-4 py-4 sm:px-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Need more help? Contact support or check the documentation.
              </div>
              <div>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                >
                  Run Diagnostics Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DiagnosticsPage; 