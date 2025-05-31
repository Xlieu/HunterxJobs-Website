import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FaCopyright, FaTrademark, FaRobot, FaCode, FaFileAlt } from 'react-icons/fa';

const IntellectualPropertyPage: React.FC = () => {
  return (
    <Layout
      title="Intellectual Property Rights | HunterXJobs"
      description="Information about our copyrights, trademarks, and licensing of AI-generated content at HunterXJobs."
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
              Intellectual Property Rights
            </h1>
            <p className="text-zinc-400 text-lg mb-3 max-w-2xl mx-auto">
              Last Updated: April 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Key Categories Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaCopyright className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Copyright</h3>
              <p className="text-zinc-400">
                Information about our copyright protections and how user-generated content is handled.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaTrademark className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Trademarks</h3>
              <p className="text-zinc-400">
                Details about our trademarks, logos, and proper usage guidelines for our brand assets.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaRobot className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI-Generated Content</h3>
              <p className="text-zinc-400">
                Our policies on ownership and licensing of content created using our AI optimization tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl border border-zinc-800">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-zinc-400 mb-4">
                  This Intellectual Property Rights document outlines the ownership and usage rights of various intellectual property components related to HunterXJobs, including our platform, content, branding, and AI-generated outputs. This document is intended to protect both our rights and yours, and to establish clear guidelines for proper usage.
                </p>
                <p className="text-zinc-400">
                  We respect the intellectual property rights of others and expect the same in return. If you believe your intellectual property rights have been infringed, please contact us immediately at <a href="mailto:legal@hunterxjobs.com" className="text-purple-400 hover:text-purple-300">legal@hunterxjobs.com</a>.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Copyright</h2>
                <p className="text-zinc-400 mb-4">
                  © {new Date().getFullYear()} HunterXJobs. All rights reserved.
                </p>
                <p className="text-zinc-400 mb-4">
                  All content on the HunterXJobs platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of HunterXJobs or its content suppliers and is protected by international copyright laws.
                </p>
                <div className="space-y-4 mt-6">
                  <h3 className="text-xl font-bold text-white">Platform Content</h3>
                  <p className="text-zinc-400">
                    All original content created by HunterXJobs for the platform, including website copy, blog posts, tutorials, documentation, and marketing materials, is owned by HunterXJobs and protected by copyright. Unauthorized reproduction, distribution, or use of such content is prohibited.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white">User-Generated Content</h3>
                  <p className="text-zinc-400">
                    Users retain ownership of their original content uploaded to or created on the platform, such as their LinkedIn profile information. However, by uploading or creating content on our platform, users grant HunterXJobs a non-exclusive, worldwide, royalty-free license to use, reproduce, adapt, publish, and process this information for the purpose of providing and improving our services.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white">Third-Party Content</h3>
                  <p className="text-zinc-400">
                    Our platform may include content from third-party sources, which remains the property of its respective owners. We strive to properly attribute such content where applicable.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Trademarks</h2>
                <p className="text-zinc-400 mb-4">
                  HunterXJobs™, the HunterXJobs logo, and other HunterXJobs marks, graphics, logos, and service names are trademarks of HunterXJobs. These trademarks may not be used in connection with any product or service that is not HunterXJobs', in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits HunterXJobs.
                </p>
                <div className="space-y-4 mt-6">
                  <h3 className="text-xl font-bold text-white">Brand Usage Guidelines</h3>
                  <p className="text-zinc-400 mb-4">
                    If you wish to use any of our trademarks for legitimate purposes, please follow these guidelines:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                    <li>Do not alter our logos, colors, or design elements</li>
                    <li>Do not incorporate our trademarks into your own product names, service names, trademarks, logos, or company names</li>
                    <li>Do not use our trademarks in a way that suggests a relationship with, or endorsement by, HunterXJobs where none exists</li>
                    <li>Do not use our trademarks for any illegal or defamatory purpose</li>
                  </ul>
                  <p className="text-zinc-400 mt-4">
                    If you wish to use our trademarks in a manner not described above, please contact us for approval at <a href="mailto:brand@hunterxjobs.com" className="text-purple-400 hover:text-purple-300">brand@hunterxjobs.com</a>.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">AI-Generated Content</h2>
                <p className="text-zinc-400 mb-4">
                  A key feature of HunterXJobs is our AI-powered content generation for LinkedIn profile optimization. This section outlines the ownership and usage rights for content created through our AI tools.
                </p>
                <div className="space-y-4 mt-6">
                  <h3 className="text-xl font-bold text-white">Ownership of AI-Generated Content</h3>
                  <p className="text-zinc-400">
                    When our AI tools generate content based on user input and data, the output is licensed to the user for whom it was created. Users have the right to use, modify, and publish such content on their LinkedIn profiles or other professional platforms, subject to the terms below.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white">Licensing Terms for AI-Generated Content</h3>
                  <p className="text-zinc-400 mb-4">
                    Users are granted a perpetual, worldwide, non-exclusive, transferable license to use AI-generated content created through our platform, subject to the following conditions:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                    <li>Content may be used for the user's professional purposes, including on LinkedIn and other professional platforms</li>
                    <li>Users may not claim intellectual property rights to the underlying AI algorithms or models</li>
                    <li>Users may not resell or redistribute AI-generated content as a standalone product</li>
                    <li>Users remain responsible for the accuracy and appropriateness of any AI-generated content they choose to use</li>
                  </ul>
                  
                  <h3 className="text-xl font-bold text-white">Feedback and Improvement</h3>
                  <p className="text-zinc-400">
                    HunterXJobs may use anonymized data about how users interact with and modify AI-generated content to improve our algorithms and services. This usage does not give HunterXJobs any ownership rights to the specific content created for and used by our users.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Software and Technology</h2>
                <p className="text-zinc-400 mb-4">
                  The HunterXJobs platform incorporates proprietary software, algorithms, and technology developed by our team, as well as open-source components.
                </p>
                <div className="space-y-4 mt-6">
                  <h3 className="text-xl font-bold text-white">Proprietary Software</h3>
                  <p className="text-zinc-400">
                    All proprietary software, including our AI optimization engines, analytics systems, and custom interfaces, is owned by HunterXJobs and protected by copyright and trade secret laws. Users are granted a limited license to use this software only through our platform as provided, and may not copy, modify, distribute, reverse engineer, or create derivative works based on this software.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white">Open Source Components</h3>
                  <p className="text-zinc-400">
                    Our platform incorporates certain open-source software components, which are used in accordance with their respective licenses. Acknowledgments and attributions for such components can be found in our <Link href="/open-source-licenses" className="text-purple-400 hover:text-purple-300">Open Source Licenses</Link> page.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white">APIs and Integrations</h3>
                  <p className="text-zinc-400">
                    If you use our APIs or integrate with our platform, additional terms may apply as outlined in our Developer Agreement. Any unauthorized use of our APIs or attempts to bypass security measures is strictly prohibited.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property Disputes</h2>
                <p className="text-zinc-400 mb-4">
                  We respect the intellectual property of others and expect our users to do the same. If you believe that material available on our platform infringes your copyright or other intellectual property rights, please follow these procedures:
                </p>
                <div className="space-y-4 mt-6">
                  <h3 className="text-xl font-bold text-white">DMCA Notices</h3>
                  <p className="text-zinc-400 mb-4">
                    If you believe that content on our platform infringes your copyright, you may request its removal by submitting a notice pursuant to the Digital Millennium Copyright Act (DMCA). Your notice must include:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                    <li>Identification of the copyrighted work you claim has been infringed</li>
                    <li>Identification of the material you claim is infringing and its location</li>
                    <li>Your contact information, including name, address, telephone number, and email</li>
                    <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law</li>
                    <li>A statement that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on their behalf</li>
                    <li>Your physical or electronic signature</li>
                  </ul>
                  <p className="text-zinc-400 mt-4">
                    Send DMCA notices to <a href="mailto:dmca@hunterxjobs.com" className="text-purple-400 hover:text-purple-300">dmca@hunterxjobs.com</a> or to our physical address: 123 AI Plaza, Suite 400, San Francisco, CA 94107.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white">Counter-Notices</h3>
                  <p className="text-zinc-400">
                    If you believe that material you posted was removed by mistake or misidentification, you may submit a counter-notice. Please contact us for specific requirements and procedures.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
                <p className="text-zinc-400">
                  We may update this Intellectual Property Rights policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. Any changes will be posted on this page, and the "Last Updated" date will be modified accordingly. For significant changes, we will provide a more prominent notice or direct notification to our users where appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl border border-zinc-800 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-6">
              <FaFileAlt className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Have Questions About IP Rights?</h2>
            <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
              If you have specific questions about intellectual property or need clarification on usage rights, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="btn btn-primary">
                Contact Our Legal Team
              </Link>
              <Link href="/faq" className="btn btn-outline">
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IntellectualPropertyPage; 