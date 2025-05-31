import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FaCheck, FaTimes, FaQuestionCircle, FaRocket, FaUsers, FaCrown } from 'react-icons/fa';

const PricingPage: React.FC = () => {
  return (
    <Layout
      title="Pricing | HunterXJobs"
      description="Choose the perfect plan to transform your LinkedIn presence and accelerate your career growth."
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
              Pricing Plans
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
              Choose the perfect plan to transform your LinkedIn presence and accelerate your career growth.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="glass-card rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                  <FaRocket className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Free</h2>
                <p className="text-zinc-400 mb-6">Basic tools to get started with LinkedIn optimization</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-white">$0</span>
                  <span className="text-zinc-400 ml-1">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Basic profile analysis</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Limited optimization suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">3 AI content generations per month</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-zinc-500">Advanced optimization modules</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-zinc-500">Performance metrics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-zinc-500">Competitive benchmarking</span>
                  </li>
                </ul>
                <Link href="/signup" className="btn btn-outline w-full">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="glass-card rounded-xl border-2 border-purple-500 overflow-hidden relative transform scale-105 z-10">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-2">
                <p className="text-center text-white font-medium">Most Popular</p>
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <FaUsers className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Professional</h2>
                <p className="text-zinc-400 mb-6">Complete toolkit for serious career advancement</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-white">$29</span>
                  <span className="text-zinc-400 ml-1">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Comprehensive profile analysis</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Full optimization suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Unlimited AI content generation</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">All optimization modules</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Performance metrics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Competitive benchmarking</span>
                  </li>
                </ul>
                <Link href="/signup" className="btn btn-primary w-full">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-card rounded-xl border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300">
              <div className="p-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                  <FaCrown className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Enterprise</h2>
                <p className="text-zinc-400 mb-6">Advanced features for teams and career coaches</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-white">$99</span>
                  <span className="text-zinc-400 ml-1">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Everything in Professional</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Multi-user collaboration</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Client management dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">White-label reporting</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">API access</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-zinc-300">Priority support</span>
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-outline w-full">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          </div>
          
          <div className="max-w-3xl mx-auto grid gap-6">
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-medium text-white mb-3">Can I cancel my subscription at any time?</h3>
              <p className="text-zinc-400">
                Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-medium text-white mb-3">Is there a free trial available?</h3>
              <p className="text-zinc-400">
                Yes, our Free plan allows you to try the basic features of our platform. You can upgrade to a paid plan anytime to access more advanced features.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-medium text-white mb-3">What payment methods do you accept?</h3>
              <p className="text-zinc-400">
                We accept all major credit cards, including Visa, MasterCard, and American Express. We also support PayPal for subscription payments.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-medium text-white mb-3">Do you offer any discounts?</h3>
              <p className="text-zinc-400">
                Yes, we offer a 20% discount for annual subscriptions. We also have special pricing for nonprofit organizations and educational institutions.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800">
              <h3 className="text-xl font-medium text-white mb-3">How do I change my subscription plan?</h3>
              <p className="text-zinc-400">
                You can easily upgrade or downgrade your subscription plan from your account settings. Changes will take effect at the start of your next billing cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 rounded-xl border border-zinc-800 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your LinkedIn profile?</h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have accelerated their careers with HunterXJobs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup" className="btn btn-primary">
                  Get Started Now
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PricingPage;
