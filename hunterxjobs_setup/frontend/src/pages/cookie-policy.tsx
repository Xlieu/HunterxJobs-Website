import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FaCookie, FaShieldAlt, FaInfoCircle, FaUserShield } from 'react-icons/fa';

const CookiePolicyPage: React.FC = () => {
  return (
    <Layout
      title="Cookie Policy | HunterXJobs"
      description="Learn about how HunterXJobs uses cookies and similar technologies on our platform."
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
              Cookie Policy
            </h1>
            <p className="text-zinc-400 text-lg mb-3 max-w-2xl mx-auto">
              Last Updated: April 1, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Key Points Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaCookie className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cookie Usage</h3>
              <p className="text-zinc-400">
                We use cookies to enhance your browsing experience, personalize content, and analyze traffic patterns.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaShieldAlt className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Your Control</h3>
              <p className="text-zinc-400">
                You can control cookie settings through your browser preferences and our cookie consent manager.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaUserShield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Data Protection</h3>
              <p className="text-zinc-400">
                All cookie data is collected and processed in accordance with our Privacy Policy and applicable laws.
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
                <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
                <p className="text-zinc-400 mb-4">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site. Cookies can be "first party," meaning they are set by the website you are visiting, or "third party," meaning they are set by a domain other than the one you are visiting.
                </p>
                <p className="text-zinc-400">
                  Cookies may be stored on your device for different periods of time. Session cookies only last for as long as the session (usually the current visit to a website or a browser session), while persistent cookies remain on your device until they expire or are deleted.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
                <p className="text-zinc-400 mb-4">
                  At HunterXJobs, we use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>
                    <strong className="text-white">Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.
                  </li>
                  <li>
                    <strong className="text-white">Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
                  </li>
                  <li>
                    <strong className="text-white">Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                  </li>
                  <li>
                    <strong className="text-white">Targeting Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertising on other sites.
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="py-3 pr-4 text-white">Cookie Name</th>
                        <th className="py-3 pr-4 text-white">Purpose</th>
                        <th className="py-3 pr-4 text-white">Duration</th>
                        <th className="py-3 text-white">Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      <tr>
                        <td className="py-3 pr-4 text-zinc-300">_hjSession</td>
                        <td className="py-3 pr-4 text-zinc-400">Analytics session tracking</td>
                        <td className="py-3 pr-4 text-zinc-400">Session</td>
                        <td className="py-3 text-zinc-400">Third Party</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-zinc-300">_ga</td>
                        <td className="py-3 pr-4 text-zinc-400">Google Analytics tracking</td>
                        <td className="py-3 pr-4 text-zinc-400">2 years</td>
                        <td className="py-3 text-zinc-400">Third Party</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-zinc-300">auth_token</td>
                        <td className="py-3 pr-4 text-zinc-400">Authentication</td>
                        <td className="py-3 pr-4 text-zinc-400">30 days</td>
                        <td className="py-3 text-zinc-400">First Party</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-zinc-300">preferences</td>
                        <td className="py-3 pr-4 text-zinc-400">User preferences</td>
                        <td className="py-3 pr-4 text-zinc-400">1 year</td>
                        <td className="py-3 text-zinc-400">First Party</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-zinc-300">linkedin_auth</td>
                        <td className="py-3 pr-4 text-zinc-400">LinkedIn authentication</td>
                        <td className="py-3 pr-4 text-zinc-400">Session</td>
                        <td className="py-3 text-zinc-400">First Party</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
                <p className="text-zinc-400 mb-4">
                  We use several third-party services that may also set cookies on your device. These include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Google Analytics (for website analytics)</li>
                  <li>LinkedIn (for authentication and social features)</li>
                  <li>Stripe (for payment processing)</li>
                  <li>Intercom (for customer support)</li>
                  <li>Hotjar (for user behavior analysis)</li>
                </ul>
                <p className="text-zinc-400 mt-4">
                  Each of these services has its own privacy policy and cookie usage. We encourage you to review these policies for more information about how they process your data.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Your Cookie Choices</h2>
                <p className="text-zinc-400 mb-4">
                  You have several options for managing cookies:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>
                    <strong className="text-white">Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser.
                  </li>
                  <li>
                    <strong className="text-white">Our Cookie Consent Manager:</strong> When you first visit our site, you'll be presented with a cookie banner that allows you to select which types of cookies you accept.
                  </li>
                  <li>
                    <strong className="text-white">Opt-Out Tools:</strong> Some third-party services offer specific opt-out tools, such as Google Analytics' opt-out browser add-on.
                  </li>
                </ul>
                <p className="text-zinc-400 mt-4">
                  Please note that restricting cookies may impact the functionality of our website and your user experience.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Changes to This Cookie Policy</h2>
                <p className="text-zinc-400">
                  We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-zinc-400 mb-6">
                  If you have any questions about this Cookie Policy or our use of cookies, please contact us at:
                </p>
                <div className="flex items-center mb-2">
                  <FaInfoCircle className="text-purple-400 mr-2" />
                  <span className="text-zinc-300">Email: <a href="mailto:privacy@hunterxjobs.com" className="text-purple-400 hover:text-purple-300">privacy@hunterxjobs.com</a></span>
                </div>
                <div className="flex items-center">
                  <FaInfoCircle className="text-purple-400 mr-2" />
                  <span className="text-zinc-300">Address: 123 AI Plaza, Suite 400, San Francisco, CA 94107</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Settings CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 rounded-xl border border-zinc-800 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Manage Your Cookie Preferences</h2>
            <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
              You can review and adjust your cookie settings at any time to choose which cookies we can use while you're on HunterXJobs.
            </p>
            <button className="btn btn-primary">
              Cookie Settings
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CookiePolicyPage; 