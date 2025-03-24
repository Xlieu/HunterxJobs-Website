import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaCheck, FaTimes, FaQuestionCircle } from 'react-icons/fa';
import type { NextPage } from 'next';

const PricingPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Pricing | HunterXJobs</title>
        <meta name="description" content="HunterXJobs pricing plans - Transform your LinkedIn presence" />
      </Head>

      {/* Header/Navigation */}
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
                  <span className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</span>
                </Link>
                <Link href="/features">
                  <span className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Features</span>
                </Link>
                <Link href="/pricing">
                  <span className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Pricing</span>
                </Link>
                <Link href="/about">
                  <span className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">About</span>
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

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan to transform your LinkedIn presence and accelerate your career growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Free</h2>
                <p className="text-gray-600 mb-6">Basic tools to get started with LinkedIn optimization</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">$0</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Basic profile analysis</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Limited optimization suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">3 AI content generations per month</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-400">Advanced optimization modules</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-400">Performance metrics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <FaTimes className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-400">Competitive benchmarking</span>
                  </li>
                </ul>
                <Link href="/signup" className="btn btn-outline w-full">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Professional Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-primary-500 transform scale-105">
              <div className="bg-primary-500 py-2">
                <p className="text-center text-white font-medium">Most Popular</p>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional</h2>
                <p className="text-gray-600 mb-6">Complete toolkit for serious career advancement</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">$29</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Comprehensive profile analysis</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Full optimization suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Unlimited AI content generation</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">All optimization modules</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Performance metrics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Competitive benchmarking</span>
                  </li>
                </ul>
                <Link href="/signup" className="btn btn-primary w-full">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h2>
                <p className="text-gray-600 mb-6">Advanced features for teams and career coaches</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-extrabold text-gray-900">$99</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Everything in Professional</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Multi-user collaboration</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Client management dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">White-label reporting</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">API access</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Priority support</span>
                  </li>
                </ul>
                <Link href="/contact" className="btn btn-outline w-full">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Can I cancel my subscription at any time?</h4>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">Is there a free trial available?</h4>
                <p className="text-gray-600">
                  Yes, all paid plans come with a 14-day free trial. No credit card required to start.
                </p>
              </div>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-2">How secure is my LinkedIn data?</h4>
                <p className="text-gray-600">
                  We use military-grade encryption and a zero-knowledge architecture. Your LinkedIn credentials are never stored, and all data processing complies with GDPR and other privacy regulations.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Do you offer discounts for annual billing?</h4>
                <p className="text-gray-600">
                  Yes, you can save 20% by choosing annual billing on any of our plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your LinkedIn Presence?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who have accelerated their career growth with HunterXJobs.
            </p>
            <Link href="/signup" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 text-lg">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">HunterXJobs</h3>
              <p className="text-gray-400">
                AI-Powered Career Catalyst - Transform Your LinkedIn Presence into Opportunity Magnetism
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/testimonials" className="text-gray-400 hover:text-white">Testimonials</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} HunterXJobs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
