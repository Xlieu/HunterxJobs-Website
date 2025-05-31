import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';
import { FaBook, FaFileAlt, FaVideo, FaToolbox, FaUserTie, FaChartLine, FaRocket } from 'react-icons/fa';

const ResourcesPage: React.FC = () => {
  return (
    <Layout
      title="Resources | HunterXJobs"
      description="Explore our collection of resources to help optimize your LinkedIn profile and advance your career."
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Career Resources
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              We've assembled the best resources to help you optimize your LinkedIn profile, 
              advance your career, and land your dream job.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories Section */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Guides Category */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FaBook className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LinkedIn Optimization Guides</h3>
              <p className="text-zinc-400 mb-4">
                Comprehensive guides on optimizing every section of your LinkedIn profile for maximum impact.
              </p>
              <ul className="space-y-2 text-zinc-400 mb-6">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Profile Headline Optimization
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Crafting a Compelling Summary
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Experience Section Best Practices
                </li>
              </ul>
              <a href="#" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center">
                Access guides <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
            
            {/* Templates Category */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FaFileAlt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Profile Templates</h3>
              <p className="text-zinc-400 mb-4">
                Ready-to-use templates for different industries and career stages to jumpstart your LinkedIn presence.
              </p>
              <ul className="space-y-2 text-zinc-400 mb-6">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Software Developer Templates
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Marketing Professional Templates
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Executive & Leadership Templates
                </li>
              </ul>
              <a href="#" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center">
                Get templates <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
            
            {/* Video Tutorials Category */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FaVideo className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Video Tutorials</h3>
              <p className="text-zinc-400 mb-4">
                Step-by-step video guides on profile optimization, networking, and using LinkedIn features effectively.
              </p>
              <ul className="space-y-2 text-zinc-400 mb-6">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  LinkedIn Profile Makeover Series
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  How to Engage with Recruiters
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  Content Creation for Job Seekers
                </li>
              </ul>
              <a href="#" className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center">
                Watch tutorials <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Free LinkedIn Tools
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Access these career-boosting tools to enhance your LinkedIn profile without spending a dime.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Headline Generator */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <FaUserTie className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Headline Generator</h3>
              </div>
              <p className="text-zinc-400 mb-6">
                Create attention-grabbing LinkedIn headlines that make recruiters stop scrolling and notice your profile.
              </p>
              <a href="#" className="btn btn-primary">Try Headline Generator</a>
            </div>
            
            {/* Skills Analyzer */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <FaToolbox className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Skills Analyzer</h3>
              </div>
              <p className="text-zinc-400 mb-6">
                Identify the most in-demand skills for your industry and find gaps in your current LinkedIn profile.
              </p>
              <a href="#" className="btn btn-primary">Analyze Your Skills</a>
            </div>
            
            {/* Profile Checker */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <FaChartLine className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Profile Checker</h3>
              </div>
              <p className="text-zinc-400 mb-6">
                Get a quick assessment of your LinkedIn profile's completeness and effectiveness with actionable tips.
              </p>
              <a href="#" className="btn btn-primary">Check Your Profile</a>
            </div>
            
            {/* Job Description Matcher */}
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <FaRocket className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Job Description Matcher</h3>
              </div>
              <p className="text-zinc-400 mb-6">
                Compare your profile against job descriptions to see how well you match and what keywords to add.
              </p>
              <a href="#" className="btn btn-primary">Match to a Job</a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 rounded-2xl border border-zinc-800">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Subscribe to our newsletter to receive the latest LinkedIn optimization tips, career resources, and exclusive tools.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input flex-grow"
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
              <p className="text-zinc-500 text-xs mt-3 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourcesPage; 