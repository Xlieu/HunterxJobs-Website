import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaShieldAlt, FaUsers, FaFileContract, FaMoneyBillWave, FaExclamationTriangle } from 'react-icons/fa';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Head>
        <title>Terms of Service | HunterXJobs</title>
        <meta name="description" content="Terms and conditions for using HunterXJobs platform." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Header */}
      <header className="bg-[#111111] border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              HunterXJobs
            </Link>
            <nav>
              <Link href="/" className="text-zinc-400 hover:text-white mx-4">
                Home
              </Link>
              <Link href="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-zinc-400 text-lg mb-4 max-w-2xl mx-auto">
              Last Updated: April 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-12 bg-[#0c0c0c] flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl border border-zinc-800">
            <div className="prose prose-invert prose-zinc max-w-none">
              <p className="text-zinc-400">
                Welcome to HunterXJobs. These Terms of Service ("Terms") govern your use of the HunterXJobs website, platform, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
              </p>
              
              <p className="text-zinc-400">
                Please read these Terms carefully before using our Service. If you do not agree with any part of these Terms, you may not access or use our Service.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Accounts</h2>
              
              <p className="text-zinc-400">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
              </p>
              
              <p className="text-zinc-400">
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              
              <p className="text-zinc-400">
                We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. LinkedIn Integration and Data Usage</h2>
              
              <p className="text-zinc-400">
                Our Service allows you to connect your LinkedIn account to analyze and optimize your profile. By connecting your LinkedIn account, you authorize us to:
              </p>
              
              <ul className="list-disc pl-6 mb-6 text-zinc-400">
                <li>Access your LinkedIn profile information</li>
                <li>Analyze your profile data to provide optimization recommendations</li>
                <li>Suggest changes to your profile based on our AI-powered analysis</li>
                <li>Store relevant data necessary to provide our services</li>
              </ul>
              
              <p className="text-zinc-400">
                You retain ownership of your LinkedIn profile and data. We will only access and process the data necessary to provide our services. We handle your data in accordance with our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Intellectual Property</h2>
              
              <p className="text-zinc-400">
                The Service and its original content, features, and functionality are and will remain the exclusive property of HunterXJobs and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              
              <p className="text-zinc-400">
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of HunterXJobs.
              </p>
              
              <p className="text-zinc-400">
                The content generated by our AI tools for your LinkedIn profile optimization is licensed to you for your personal use. You may use this content on your LinkedIn profile, but you may not sell, license, or distribute this content to third parties.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Subscription and Payment</h2>
              
              <p className="text-zinc-400">
                Some features of our Service require a paid subscription. By subscribing to a paid plan, you agree to the following terms:
              </p>
              
              <ul className="list-disc pl-6 mb-6 text-zinc-400">
                <li>You will be charged according to the pricing plan you select</li>
                <li>Subscriptions automatically renew unless canceled before the renewal date</li>
                <li>You can cancel your subscription at any time through your account settings</li>
                <li>Refunds are provided in accordance with our refund policy</li>
                <li>We reserve the right to change subscription prices with notice to subscribers</li>
              </ul>
              
              <p className="text-zinc-400">
                All payments are processed by secure third-party payment processors. We do not store your full credit card details on our servers.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Limitation of Liability</h2>
              
              <p className="text-zinc-400">
                In no event shall HunterXJobs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              
              <ul className="list-disc pl-6 mb-6 text-zinc-400">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              
              <p className="text-zinc-400">
                We cannot guarantee that our AI-powered recommendations will result in specific job offers, career advancements, or increased engagement on your LinkedIn profile.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Termination</h2>
              
              <p className="text-zinc-400">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <p className="text-zinc-400">
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or delete your account through the account settings.
              </p>
              
              <p className="text-zinc-400">
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Changes</h2>
              
              <p className="text-zinc-400">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              
              <p className="text-zinc-400">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Governing Law</h2>
              
              <p className="text-zinc-400">
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
              
              <p className="text-zinc-400">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
              
              <p className="text-zinc-400">
                If you have questions about these Terms, please contact us at:
              </p>
              
              <p className="text-zinc-400">
                Email: legal@hunterxjobs.com<br />
                Address: 123 AI Boulevard, Suite 500, San Francisco, CA 94103, USA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111111] border-t border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">HunterXJobs</h3>
              <p className="text-zinc-400">AI-powered LinkedIn profile optimization for career success.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-zinc-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-zinc-400 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
              <p className="text-zinc-400">Email: legal@hunterxjobs.com</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800 text-center text-zinc-400">
            <p>© {new Date().getFullYear()} HunterXJobs. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .btn {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          transition: all 0.2s;
        }
        .btn-sm {
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
        }
        .btn-outline {
          border: 1px solid #3f3f46;
          color: #d4d4d8;
        }
        .btn-outline:hover {
          background-color: #27272a;
          color: white;
        }
        .glass-card {
          background-color: rgba(24, 24, 27, 0.8);
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  );
};

export default TermsOfServicePage; 