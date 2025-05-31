import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaLock, FaUserShield, FaDatabase } from 'react-icons/fa';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Privacy Policy | HunterXJobs</title>
        <meta name="description" content="Learn how HunterXJobs collects, uses, and protects your personal information." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              HunterXJobs
            </Link>
            <nav>
              <Link href="/" className="text-gray-300 hover:text-white mx-4">
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="bg-gray-800 p-8 rounded-lg">
          <p className="mb-6 text-gray-300">
            At HunterXJobs, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our LinkedIn profile optimization services.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4 text-gray-300">
            We may collect personally identifiable information, such as:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-300">
            <li>Your name and email address when you create an account</li>
            <li>Your LinkedIn profile information when you connect your account</li>
            <li>Payment information when you subscribe to our premium services</li>
            <li>Communication records when you contact our support team</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4 text-gray-300">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-300">
            <li>Provide, maintain, and improve our services</li>
            <li>Process and complete transactions</li>
            <li>Analyze your LinkedIn profile and generate optimization suggestions</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments and questions</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Share Your Information</h2>
          <p className="mb-4 text-gray-300">
            We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers, for business transfers, legal requirements, or with your consent.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
          <p className="mb-6 text-gray-300">
            We implement appropriate technical and organizational security measures to protect your personal information, including encryption of sensitive data and secure data storage.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Privacy Rights</h2>
          <p className="mb-4 text-gray-300">
            Depending on your location, you may have rights to access, correct, delete, restrict processing, and port your data. To exercise these rights, please contact us at privacy@hunterxjobs.com.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
          <p className="mb-4 text-gray-300">
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="text-gray-300">
            Email: privacy@hunterxjobs.com<br />
            Address: 123 AI Boulevard, Suite 500, San Francisco, CA 94103, USA
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/privacy-policy" className="text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-300 hover:text-white">
              Terms of Service
            </Link>
          </div>
          <p className="text-gray-400">© {new Date().getFullYear()} HunterXJobs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage; 