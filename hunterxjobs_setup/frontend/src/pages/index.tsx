import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { FaLinkedin, FaRocket, FaChartLine, FaRobot, FaSearch, FaUser } from 'react-icons/fa';

const Home: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                Supercharge Your <span className="text-gradient">LinkedIn</span> Profile With AI
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl mb-8 max-w-xl">
                Let our AI analyze and optimize your LinkedIn profile to attract recruiters and land your dream job faster.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/signup" className="btn btn-primary btn-lg">
                  Get Started Free
                </Link>
                <Link href="/features" className="btn btn-outline btn-lg">
                  See Features
                </Link>
              </div>
              
              <div className="mt-8 flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#111111] bg-zinc-800 flex items-center justify-center text-white">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <p className="text-white font-medium">Join 2,000+ professionals</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-zinc-400 text-sm">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 blur-xl opacity-20 rounded-2xl"></div>
              <div className="relative glass-card p-6 rounded-2xl border border-zinc-800">
                <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-indigo-600 text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Profile Analysis
                </div>
                <div className="flex items-start mt-6">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mr-4">
                    <FaUser className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">John Developer</h3>
                    <p className="text-zinc-400">Senior Software Engineer</p>
                    <div className="flex items-center mt-1">
                      <div className="w-16 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-2 text-zinc-400 text-sm">85%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="glass-card-inner p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">Profile Completeness</h4>
                      <span className="text-zinc-400 text-sm">85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="glass-card-inner p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">Skills Match</h4>
                      <span className="text-zinc-400 text-sm">72%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  
                  <div className="glass-card-inner p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white font-medium">Experience Quality</h4>
                      <span className="text-zinc-400 text-sm">79%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600" style={{ width: '79%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="btn btn-primary w-full">
                    View Full Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful AI Features to Land Your Dream Job
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              HunterXJobs provides AI-powered tools to optimize your LinkedIn profile, match with relevant jobs, and increase your chances of getting noticed by recruiters.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FaLinkedin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LinkedIn Profile Analysis</h3>
              <p className="text-zinc-400 mb-4">
                Get detailed insights on your LinkedIn profile's strengths and weaknesses with actionable improvement suggestions.
              </p>
              <Link href="/profile-analysis" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center">
                Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FaRobot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Content Generator</h3>
              <p className="text-zinc-400 mb-4">
                Generate optimized content for your summary, experience, and skills sections that match industry standards.
              </p>
              <Link href="/content-generator" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center">
                Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FaSearch className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Job Match Finder</h3>
              <p className="text-zinc-400 mb-4">
                Find jobs that match your skills and experience with our AI-powered job search and get personalized recommendations.
              </p>
              <Link href="/job-search" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center">
                Learn more <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-card p-8 md:p-12 rounded-2xl border border-zinc-800 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to boost your professional profile?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of professionals who have improved their LinkedIn profiles and career opportunities with HunterXJobs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup" className="btn btn-primary btn-lg">
                Get Started Free
              </Link>
              <Link href="/login" className="btn btn-outline btn-lg">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
