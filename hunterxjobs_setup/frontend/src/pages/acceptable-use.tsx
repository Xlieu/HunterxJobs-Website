import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const AcceptableUsePage: React.FC = () => {
  return (
    <Layout
      title="Acceptable Use Policy | HunterXJobs"
      description="Guidelines on how our platform can and cannot be used by our customers."
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
              Acceptable Use Policy
            </h1>
            <p className="text-zinc-400 text-lg mb-3 max-w-2xl mx-auto">
              Last Updated: April 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl border border-zinc-800 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-zinc-400 mb-4">
                This Acceptable Use Policy ("AUP") outlines the permitted and prohibited uses of the HunterXJobs platform and services. We've created this policy to protect our users, our platform, and the broader community from harmful or illegal activities.
              </p>
              <p className="text-zinc-400">
                By accessing or using HunterXJobs, you agree to comply with this AUP. We reserve the right to modify this policy at any time, with changes becoming effective upon posting to our website. Continued use of our services after such changes constitutes your acceptance of the revised policy.
              </p>
            </div>
          </div>

          {/* Permitted Uses */}
          <div className="glass-card p-8 rounded-xl border border-zinc-800 mb-12">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <FaCheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Permitted Uses</h2>
                <p className="text-zinc-400 mb-4">
                  HunterXJobs is designed to help users optimize their LinkedIn profiles and enhance their professional presence. Permitted uses include:
                </p>
                <ul className="list-disc pl-5 space-y-3 text-zinc-400">
                  <li>Optimizing your own LinkedIn profile or profiles you have explicit permission to manage</li>
                  <li>Creating and refining professional content for legitimate business purposes</li>
                  <li>Analyzing and improving your professional presence and personal brand</li>
                  <li>Engaging with our AI tools to generate professional content that is truthful and accurately represents your skills and experience</li>
                  <li>Collaborating with team members on shared projects within our platform</li>
                  <li>Using our services for career advancement and professional development</li>
                  <li>Providing feedback to help improve our services</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Prohibited Uses */}
          <div className="glass-card p-8 rounded-xl border border-zinc-800 mb-12">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-pink-600/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <FaTimesCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Prohibited Uses</h2>
                <p className="text-zinc-400 mb-4">
                  The following uses of HunterXJobs are strictly prohibited:
                </p>
                <ul className="list-disc pl-5 space-y-3 text-zinc-400">
                  <li>
                    <strong className="text-white">Fraudulent Activities:</strong> Creating false, misleading, or deceptive profiles or content, including misrepresenting your qualifications, experience, or credentials.
                  </li>
                  <li>
                    <strong className="text-white">Identity Misrepresentation:</strong> Impersonating another individual or organization, or creating profiles for individuals without their explicit consent.
                  </li>
                  <li>
                    <strong className="text-white">Illegal Content:</strong> Using our services to create, store, or transmit content that violates applicable laws or regulations.
                  </li>
                  <li>
                    <strong className="text-white">Harmful Content:</strong> Creating or distributing content that promotes discrimination, harassment, or hatred against any individual or group.
                  </li>
                  <li>
                    <strong className="text-white">Privacy Violations:</strong> Harvesting or collecting information about other users without their consent, or using our services to violate others' privacy rights.
                  </li>
                  <li>
                    <strong className="text-white">Security Violations:</strong> Attempting to breach or circumvent our security measures, accessing accounts without authorization, or interfering with the proper functioning of our platform.
                  </li>
                  <li>
                    <strong className="text-white">Spam and Abuse:</strong> Using our services to send unsolicited messages, engage in spamming activities, or distribute malware.
                  </li>
                  <li>
                    <strong className="text-white">Commercial Misuse:</strong> Reselling our services without permission, or using our platform to develop competing products.
                  </li>
                  <li>
                    <strong className="text-white">API Abuse:</strong> Exceeding rate limits, scraping data, or using our APIs in ways that interfere with the performance or accessibility of our services.
                  </li>
                  <li>
                    <strong className="text-white">Intellectual Property Violations:</strong> Using our services to infringe upon the intellectual property rights of others.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Content Guidelines */}
          <div className="glass-card p-8 rounded-xl border border-zinc-800 mb-12">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/30 to-amber-600/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <FaExclamationTriangle className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Content Guidelines</h2>
                <p className="text-zinc-400 mb-6">
                  All content generated, stored, or transmitted through our platform must adhere to the following guidelines:
                </p>
                
                <h3 className="text-xl font-bold text-white mb-3">Accuracy and Honesty</h3>
                <p className="text-zinc-400 mb-4">
                  Content should be truthful and accurately represent your skills, experience, and qualifications. While our AI tools can help you present your achievements in the best light, they should not be used to fabricate credentials or experience.
                </p>
                
                <h3 className="text-xl font-bold text-white mb-3">Respectful Communication</h3>
                <p className="text-zinc-400 mb-4">
                  Content must be respectful and professional. We prohibit language that is hateful, discriminatory, harassing, or threatening toward any individual or group based on race, ethnicity, national origin, religion, gender, gender identity, sexual orientation, age, disability, or medical condition.
                </p>
                
                <h3 className="text-xl font-bold text-white mb-3">Appropriate Material</h3>
                <p className="text-zinc-400 mb-4">
                  Content must be appropriate for a professional context. This prohibits sexually explicit material, profanity, graphic violence, and content that promotes illegal activities.
                </p>
                
                <h3 className="text-xl font-bold text-white mb-3">Intellectual Property</h3>
                <p className="text-zinc-400">
                  Respect the intellectual property rights of others. Do not use our platform to create content that infringes on copyrights, trademarks, or other proprietary rights.
                </p>
              </div>
            </div>
          </div>

          {/* Monitoring and Enforcement */}
          <div className="glass-card p-8 rounded-xl border border-zinc-800 mb-12">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <FaShieldAlt className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Monitoring and Enforcement</h2>
                <p className="text-zinc-400 mb-4">
                  We reserve the right to monitor the use of our platform to ensure compliance with this AUP. While we respect your privacy and will not routinely review private content, we may take action if we become aware of violations through user reports or other means.
                </p>
                <p className="text-zinc-400 mb-4">
                  If we determine that you have violated this AUP, we may take any of the following actions:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Issue a warning</li>
                  <li>Temporarily suspend your account</li>
                  <li>Permanently terminate your account</li>
                  <li>Remove or modify violating content</li>
                  <li>Restrict your access to certain features</li>
                  <li>Report your activities to appropriate authorities if they appear to be illegal</li>
                </ul>
                <p className="text-zinc-400 mt-4">
                  The severity of the action will depend on the nature and seriousness of the violation. We will make reasonable efforts to notify you of any actions taken against your account, except where prohibited by law or where such notification would compromise our security measures.
                </p>
              </div>
            </div>
          </div>

          {/* Reporting Violations */}
          <div className="glass-card p-8 rounded-xl border border-zinc-800">
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <FaHeadset className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Reporting Violations</h2>
                <p className="text-zinc-400 mb-4">
                  If you encounter content or behavior on our platform that you believe violates this AUP, please report it immediately. We take all reports seriously and will investigate them promptly.
                </p>
                <p className="text-zinc-400 mb-4">
                  To report a violation, please:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Email us at <a href="mailto:abuse@hunterxjobs.com" className="text-purple-400 hover:text-purple-300">abuse@hunterxjobs.com</a></li>
                  <li>Include "AUP Violation" in the subject line</li>
                  <li>Provide details about the violation, including URLs or screenshots if available</li>
                  <li>Include your contact information so we can follow up if needed</li>
                </ul>
                <p className="text-zinc-400 mt-4">
                  We appreciate your help in maintaining a safe and respectful environment for all users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl border border-zinc-800 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Have Questions About Our Acceptable Use Policy?</h2>
            <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
              If you're unsure whether a particular use case is permitted, or if you have any questions about this policy, please don't hesitate to contact us.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Our Support Team
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AcceptableUsePage; 