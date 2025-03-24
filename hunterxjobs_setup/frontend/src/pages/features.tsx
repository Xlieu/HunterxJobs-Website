import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FaLinkedin, FaLightbulb, FaUsers, FaShieldAlt, FaRocket } from 'react-icons/fa';

const FeaturesPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Features | HunterXJobs</title>
        <meta name="description" content="HunterXJobs features - AI-powered LinkedIn profile optimization" />
      </Head>
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <span className="text-2xl font-bold text-primary-700">HunterXJobs</span>
                </Link>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/">
                  <span className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Home
                  </span>
                </Link>
                <Link href="/features" legacyBehavior>
                  <a className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Features
                  </a>
                </Link>
                <Link href="/pricing">
                  <span className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Pricing
                  </span>
                </Link>
                <Link href="/about">
                  <span className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    About
                  </span>
                </Link>
              </nav>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link href="/login">
                <span className="btn btn-outline mr-4">Log in</span>
              </Link>
              <Link href="/signup">
                <span className="btn btn-primary">Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-10">Features</h1>
          <p className="text-center text-xl mb-12">
            Discover how HunterXJobs can transform your LinkedIn presence
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaLinkedin className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-xl font-bold">LinkedIn Integration</h3>
              </div>
              <p>Securely connect and optimize your LinkedIn profile with our powerful AI tools.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaLightbulb className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-xl font-bold">AI Optimization</h3>
              </div>
              <p>Our AI analyzes your profile across 78 dimensions to identify improvement opportunities.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <FaUsers className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-xl font-bold">Profile Analyzer</h3>
              </div>
              <p>Get detailed insights on how your profile compares to industry benchmarks.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;