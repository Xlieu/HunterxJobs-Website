import React, { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaSignOutAlt, FaLinkedin, FaBriefcase, FaChartLine, FaHome, FaTasks, FaCode, FaCog, FaBars, FaTimes } from 'react-icons/fa';

// Import components
import Logo from './Logo';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'HunterXJobs - AI-Powered LinkedIn Optimization', 
  description = 'Optimize your LinkedIn profile with HunterXJobs AI tools for better job hunting success.' 
}) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication status only on client side
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      {/* Header/Navbar */}
      <header className="bg-[#111111] border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Logo size="medium" linkToHome={true} />
              </div>
              
              {isAuthenticated && (
                <nav className="hidden md:ml-8 md:flex md:space-x-4">
                  <Link
                    href="/dashboard"
                    className={`nav-link flex items-center ${
                      router.pathname === '/dashboard' ? 'nav-link-active' : ''
                    }`}
                  >
                    <FaHome className="mr-2" />
                    Dashboard
                  </Link>
                  
                  <Link
                    href="/profile-analysis"
                    className={`nav-link flex items-center ${
                      router.pathname === '/profile-analysis' ? 'nav-link-active' : ''
                    }`}
                  >
                    <FaLinkedin className="mr-2" />
                    Profile Analysis
                  </Link>
                  
                  <Link
                    href="/linkedin-analysis"
                    className={`nav-link flex items-center ${
                      router.pathname === '/linkedin-analysis' ? 'nav-link-active' : ''
                    }`}
                  >
                    <FaChartLine className="mr-2" />
                    LinkedIn Analysis
                  </Link>
                  
                  <Link
                    href="/job-search"
                    className={`nav-link flex items-center ${
                      router.pathname === '/job-search' ? 'nav-link-active' : ''
                    }`}
                  >
                    <FaBriefcase className="mr-2" />
                    Job Search
                  </Link>
                </nav>
              )}
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex md:items-center md:space-x-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/profile"
                    className={`nav-link flex items-center ${
                      router.pathname === '/profile' ? 'nav-link-active' : ''
                    }`}
                  >
                    <FaUser className="mr-2" />
                    Profile
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="btn btn-outline"
                  >
                    Login
                  </Link>
                  
                  <Link
                    href="/signup"
                    className="btn btn-primary"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111111] border-t border-zinc-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isAuthenticated && (
                <>
                  <Link
                    href="/dashboard"
                    className={`nav-link block ${
                      router.pathname === '/dashboard' ? 'nav-link-active' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaHome className="mr-2" />
                      Dashboard
                    </div>
                  </Link>
                  
                  <Link
                    href="/profile-analysis"
                    className={`nav-link block ${
                      router.pathname === '/profile-analysis' ? 'nav-link-active' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaLinkedin className="mr-2" />
                      Profile Analysis
                    </div>
                  </Link>
                  
                  <Link
                    href="/linkedin-analysis"
                    className={`nav-link block ${
                      router.pathname === '/linkedin-analysis' ? 'nav-link-active' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaChartLine className="mr-2" />
                      LinkedIn Analysis
                    </div>
                  </Link>
                  
                  <Link
                    href="/job-search"
                    className={`nav-link block ${
                      router.pathname === '/job-search' ? 'nav-link-active' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaBriefcase className="mr-2" />
                      Job Search
                    </div>
                  </Link>
                  
                  <Link
                    href="/profile"
                    className={`nav-link block ${
                      router.pathname === '/profile' ? 'nav-link-active' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaUser className="mr-2" />
                      Profile
                    </div>
                  </Link>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="nav-link block w-full text-left"
                  >
                    <div className="flex items-center">
                      <FaSignOutAlt className="mr-2" />
                      Logout
                    </div>
                  </button>
                </>
              )}
              
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 p-2">
                  <Link
                    href="/login"
                    className="btn btn-outline w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  
                  <Link
                    href="/signup"
                    className="btn btn-primary w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-grow">{children}</main>
      
      {/* Footer */}
      <footer className="bg-[#111111] border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo size="small" linkToHome={false} />
              <p className="mt-2 text-sm text-zinc-500">
                AI-powered LinkedIn profile optimization for job hunters
              </p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <div>
                <h3 className="text-white font-medium mb-2">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy-policy" className="text-zinc-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="text-zinc-400 hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-zinc-500">
              &copy; {new Date().getFullYear()} HunterXJobs. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 