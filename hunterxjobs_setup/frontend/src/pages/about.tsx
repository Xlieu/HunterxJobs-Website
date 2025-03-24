import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBuilding, FaUsers, FaLightbulb, FaHandshake } from 'react-icons/fa';
import type { NextPage } from 'next';

const AboutPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>About Us | HunterXJobs</title>
        <meta name="description" content="About HunterXJobs - AI-powered LinkedIn profile optimization" />
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
                  <span className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Pricing</span>
                </Link>
                <Link href="/about">
                  <span className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">About</span>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">About HunterXJobs</h1>
            <p className="text-xl max-w-3xl mx-auto">
              We're on a mission to revolutionize professional branding through intelligent automation, helping ambitious professionals unlock their full career potential.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                HunterXJobs was born from a simple observation: despite having incredible skills and experience, many professionals struggle to effectively showcase their value on LinkedIn.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our founder, after helping hundreds of colleagues optimize their LinkedIn profiles manually, recognized the need for an intelligent, scalable solution that could transform how professionals present themselves online.
              </p>
              <p className="text-lg text-gray-600">
                In 2024, we assembled a team of AI experts, career coaches, and LinkedIn specialists to build a platform that combines cutting-edge technology with strategic career insights. The result is HunterXJobs - a comprehensive system that transforms LinkedIn profiles into high-performance career assets.
              </p>
            </div>
            <div className="mt-10 lg:mt-0 flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <img src="/our-story.svg" alt="Our Story" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize career advancement by giving every professional access to the tools, insights, and strategies that were once available only to those with personal career coaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-5 mx-auto">
                <FaLightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Innovation</h3>
              <p className="text-gray-600 text-center">
                We continuously push the boundaries of what's possible with AI and career development technology.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-5 mx-auto">
                <FaUsers className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Inclusivity</h3>
              <p className="text-gray-600 text-center">
                We believe career advancement opportunities should be accessible to professionals from all backgrounds.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-5 mx-auto">
                <FaHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Integrity</h3>
              <p className="text-gray-600 text-center">
                We maintain the highest standards of data privacy, security, and ethical AI use in everything we do.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-5 mx-auto">
                <FaBuilding className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Impact</h3>
              <p className="text-gray-600 text-center">
                We measure our success by the tangible career advancements and opportunities we create for our users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've assembled a diverse team of experts in AI, career development, and professional branding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Sarah Johnson</h3>
              <p className="text-gray-600 text-center mb-4">Founder & CEO</p>
              <p className="text-gray-600 text-center">
                Former career coach with 10+ years of experience helping professionals optimize their LinkedIn presence and advance their careers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Michael Chen</h3>
              <p className="text-gray-600 text-center mb-4">CTO</p>
              <p className="text-gray-600 text-center">
                AI expert with a background in natural language processing and machine learning, previously at Google and OpenAI.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Jessica Williams</h3>
              <p className="text-gray-600 text-center mb-4">Head of Career Strategy</p>
              <p className="text-gray-600 text-center">
                Former LinkedIn executive with deep expertise in profile optimization and content strategy for professional branding.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">David Rodriguez</h3>
              <p className="text-gray-600 text-center mb-4">Lead AI Engineer</p>
              <p className="text-gray-600 text-center">
                Specializes in developing AI systems that can understand and optimize professional narratives across industries.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Emily Patel</h3>
              <p className="text-gray-600 text-center mb-4">Head of Security</p>
              <p className="text-gray-600 text-center">
                Cybersecurity expert with a focus on data privacy and secure AI implementations in consumer applications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">James Wilson</h3>
              <p className="text-gray-600 text-center mb-4">Head of Customer Success</p>
              <p className="text-gray-600 text-center">
                Dedicated to ensuring every user achieves measurable career advancement through our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who have transformed their LinkedIn presence with HunterXJobs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Robert Taylor</h4>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "After using HunterXJobs, my profile views increased by 215% and I received 3 job offers within a month. The AI optimization was spot-on!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Sophia Garcia</h4>
                  <p className="text-gray-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The content generation feature is incredible. My posts are getting 5x more engagement, and I've established myself as a thought leader in my field."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Marcus Johnson</h4>
                  <p className="text-gray-600">Career Coach</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I recommend HunterXJobs to all my clients. The results speak for themselves - better profiles, more opportunities, and accelerated career growth."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Optimize Your LinkedIn Profile?</h2>
            <p className="text-xl text-white mb-8">Join thousands of professionals who have transformed their online presence with HunterXJobs.</p>
            <Link href="/signup">
              <span className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 text-lg">Get Started Today</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/features">
                    <span className="text-gray-400 hover:text-white">Features</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing">
                    <span className="text-gray-400 hover:text-white">Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials">
                    <span className="text-gray-400 hover:text-white">Testimonials</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <span className="text-gray-400 hover:text-white">FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-12 md:mt-0">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about">
                    <span className="text-gray-400 hover:text-white">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/careers">
                    <span className="text-gray-400 hover:text-white">Career</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;