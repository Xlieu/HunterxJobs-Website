import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { FaBuilding, FaUsers, FaLightbulb, FaHandshake, FaRocket, FaShieldAlt } from 'react-icons/fa';
import type { NextPage } from 'next';

const AboutPage: NextPage = () => {
  return (
    <Layout
      title="About Us | HunterXJobs"
      description="Learn about HunterXJobs and our mission to transform LinkedIn profiles through AI-powered optimization."
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              About HunterXJobs
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              We're on a mission to revolutionize professional branding through intelligent automation, 
              helping ambitious professionals unlock their full career potential.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-zinc-400 mb-6">
                HunterXJobs was born from a simple observation: despite having incredible skills and experience, 
                many professionals struggle to effectively showcase their value on LinkedIn.
              </p>
              <p className="text-zinc-400 mb-6">
                Our founder, after helping hundreds of colleagues optimize their LinkedIn profiles manually, 
                recognized the need for an intelligent, scalable solution that could transform how professionals 
                present themselves online.
              </p>
              <p className="text-zinc-400">
                In 2024, we assembled a team of AI experts, career coaches, and LinkedIn specialists to build 
                a platform that combines cutting-edge technology with strategic career insights. The result is 
                HunterXJobs - a comprehensive system that transforms LinkedIn profiles into high-performance 
                career assets.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 blur-xl opacity-20 rounded-2xl"></div>
              <div className="glass-card p-6 rounded-2xl border border-zinc-800 relative">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                    <FaRocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">Our Vision</h3>
                  <p className="text-zinc-400 mb-0 text-center">
                    To create a world where every professional can present their best self online, 
                    unlocking opportunities that match their true potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-zinc-400 max-w-3xl mx-auto text-lg">
              To democratize career advancement by giving every professional access to the tools, 
              insights, and strategies that were once available only to those with personal career coaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 mx-auto">
                <FaLightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Innovation</h3>
              <p className="text-zinc-400 text-center">
                We continuously push the boundaries of what's possible with AI and career development technology.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 mx-auto">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Inclusivity</h3>
              <p className="text-zinc-400 text-center">
                We believe career advancement opportunities should be accessible to professionals from all backgrounds.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 mx-auto">
                <FaHandshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Integrity</h3>
              <p className="text-zinc-400 text-center">
                We maintain the highest standards of data privacy, security, and ethical AI use in everything we do.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 mx-auto">
                <FaBuilding className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Impact</h3>
              <p className="text-zinc-400 text-center">
                We measure our success by the tangible career advancements and opportunities we create for our users.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Our Approach</h2>
            <p className="text-zinc-400 max-w-3xl mx-auto text-lg">
              We combine AI intelligence with career expertise to deliver a comprehensive profile optimization experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl border border-zinc-800 flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 mx-auto">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Analyze</h3>
              <p className="text-zinc-400 text-center flex-grow">
                Our AI analyzes your LinkedIn profile across 78 dimensions, identifying strengths, weaknesses, and optimization opportunities.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 mx-auto">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Optimize</h3>
              <p className="text-zinc-400 text-center flex-grow">
                We generate tailored recommendations and content to enhance each section of your profile for maximum impact.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 flex flex-col">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 mx-auto">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Implement</h3>
              <p className="text-zinc-400 text-center flex-grow">
                With one-click implementation tools, you can apply our recommendations directly to your LinkedIn profile.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Commitment */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 rounded-2xl border border-zinc-800">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6 md:mb-0 md:mr-8">
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 md:text-left text-center">Our Security Commitment</h2>
                <p className="text-zinc-400 mb-0 md:text-left text-center">
                  We take data security seriously. HunterXJobs employs bank-level encryption, 
                  strict data access controls, and compliance with global privacy standards. 
                  We never share your data with third parties without your explicit permission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 rounded-2xl border border-zinc-800 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to transform your LinkedIn profile?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of professionals who have improved their LinkedIn profiles and career opportunities with HunterXJobs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/signup" className="btn btn-primary btn-lg">
                Get Started Free
              </a>
              <a href="/login" className="btn btn-outline btn-lg">
                Log In
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;