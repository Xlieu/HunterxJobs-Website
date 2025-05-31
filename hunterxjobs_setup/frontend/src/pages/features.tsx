import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FaLinkedin, FaRobot, FaSearch, FaChartLine, FaLightbulb, FaFileAlt, FaShieldAlt, FaMagic } from 'react-icons/fa';

const FeaturesPage: React.FC = () => {
  return (
    <Layout
      title="Features | HunterXJobs"
      description="Discover how HunterXJobs can transform your LinkedIn presence with AI-powered profile optimization, content generation, and job matching."
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
              Our Features
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Discover the powerful tools that make HunterXJobs the ultimate platform for LinkedIn profile optimization and career advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {/* LinkedIn Profile Analysis */}
            <div id="profile-analysis" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <FaLinkedin className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">LinkedIn Profile Analysis</h2>
                </div>
                <p className="text-zinc-400 mb-6 text-lg">
                  Get detailed insights on your LinkedIn profile's strengths and weaknesses with actionable improvement suggestions.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaChartLine className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">78-Point Profile Evaluation</h3>
                        <p className="text-zinc-400">
                          Our AI analyzes your profile across 78 dimensions, from headline impact to experience descriptions, identifying exactly where you can improve.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaLightbulb className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Actionable Insights</h3>
                        <p className="text-zinc-400">
                          Receive specific, prioritized recommendations that have the most impact on profile visibility and engagement.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaFileAlt className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Industry Benchmarking</h3>
                        <p className="text-zinc-400">
                          See how your profile compares to top performers in your industry, with specific areas where you can gain competitive advantage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/signup" className="btn btn-primary">
                  Analyze My Profile
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="glass-card p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-purple-900/10 to-indigo-900/10">
                  <img 
                    src="/images/profile-analysis-demo.png" 
                    alt="LinkedIn Profile Analysis" 
                    className="rounded-lg w-full"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="mt-5 p-4 bg-zinc-800/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">What our analysis reveals:</h4>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Profile completeness score and optimization potential
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Keyword optimization opportunities for better visibility
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Content engagement prediction and improvement areas
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Content Generator */}
            <div id="content-generator" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2">
                <div className="glass-card p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-purple-900/10 to-indigo-900/10">
                  <img 
                    src="/images/content-generator-demo.png" 
                    alt="AI Content Generator" 
                    className="rounded-lg w-full"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="mt-5 p-4 bg-zinc-800/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Our AI generates optimized:</h4>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Professional headlines that capture attention
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Summary sections that highlight your unique value
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Experience descriptions that emphasize achievements
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="order-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <FaRobot className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">AI Content Generator</h2>
                </div>
                <p className="text-zinc-400 mb-6 text-lg">
                  Generate optimized content for your summary, experience, and skills sections that match industry standards.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaMagic className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Industry-Targeted Content</h3>
                        <p className="text-zinc-400">
                          Our AI understands the unique requirements of your industry and generates content that incorporates relevant keywords and phrases.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaLightbulb className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Achievement Highlighting</h3>
                        <p className="text-zinc-400">
                          Turn ordinary job descriptions into compelling narratives that emphasize your achievements and quantifiable results.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaFileAlt className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Personalized Voice</h3>
                        <p className="text-zinc-400">
                          Content maintains your authentic voice while implementing best practices for professional presentation and engagement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/signup" className="btn btn-primary">
                  Generate Content
                </Link>
              </div>
            </div>

            {/* Job Match Finder */}
            <div id="job-match" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <FaSearch className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Job Match Finder</h2>
                </div>
                <p className="text-zinc-400 mb-6 text-lg">
                  Find jobs that match your skills and experience with our AI-powered job search and get personalized recommendations.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaChartLine className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Skills-Based Matching</h3>
                        <p className="text-zinc-400">
                          Our algorithm analyzes your skills and experience against job requirements to find positions where you're most likely to succeed.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaLightbulb className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Application Enhancement</h3>
                        <p className="text-zinc-400">
                          Get tailored suggestions to optimize your profile and application for specific job opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="glass-card p-4 rounded-lg border border-zinc-800">
                    <div className="flex items-start">
                      <FaShieldAlt className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="text-white font-semibold mb-1">Hidden Opportunity Detection</h3>
                        <p className="text-zinc-400">
                          Discover positions you might not have considered that match your transferable skills and career objectives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/signup" className="btn btn-primary">
                  Find Matching Jobs
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="glass-card p-6 rounded-xl border border-zinc-800 bg-gradient-to-br from-purple-900/10 to-indigo-900/10">
                  <img 
                    src="/images/job-match-demo.png" 
                    alt="Job Match Finder" 
                    className="rounded-lg w-full"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <div className="mt-5 p-4 bg-zinc-800/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">How our matching works:</h4>
                    <ul className="space-y-2 text-zinc-400">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Match percentage based on skills, experience, and job requirements
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Gap analysis showing which additional skills would improve your fit
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Personalized job alerts when high-match opportunities appear
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">More Powerful Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaChartLine className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Performance Analytics</h3>
              <p className="text-zinc-400">
                Track your profile performance over time with detailed metrics on views, engagement, and search appearances.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaLightbulb className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Weekly Insights</h3>
              <p className="text-zinc-400">
                Receive personalized recommendations and industry trends to keep your profile optimized and relevant.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaShieldAlt className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure Integration</h3>
              <p className="text-zinc-400">
                Enterprise-grade security ensures your LinkedIn data is protected with end-to-end encryption and strict access controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 rounded-xl border border-zinc-800 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your LinkedIn profile?</h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have used HunterXJobs to optimize their LinkedIn presence and advance their careers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup" className="btn btn-primary">
                  Get Started Free
                </Link>
                <Link href="/pricing" className="btn btn-outline">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FeaturesPage;