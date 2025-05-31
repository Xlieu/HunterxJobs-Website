import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { FaShieldAlt, FaGlobe, FaServer, FaLock, FaFileContract } from 'react-icons/fa';

const DataProcessingPage: React.FC = () => {
  return (
    <Layout
      title="Data Processing Agreement | HunterXJobs"
      description="Our GDPR-compliant data processing agreement outlining how we handle and process data on behalf of our customers."
    >
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-fixed opacity-5"></div>
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-6">
              Data Processing Agreement
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaShieldAlt className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">GDPR Compliant</h3>
              <p className="text-zinc-400">
                Our agreement is fully compliant with the EU General Data Protection Regulation (GDPR).
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaGlobe className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Standards</h3>
              <p className="text-zinc-400">
                We adhere to international data protection standards beyond just GDPR requirements.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaServer className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure Processing</h3>
              <p className="text-zinc-400">
                All data processing occurs on secure, encrypted servers with strict access controls.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-lg flex items-center justify-center mb-4">
                <FaLock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Data Subject Rights</h3>
              <p className="text-zinc-400">
                We fully support and facilitate all data subject rights under applicable regulations.
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
                <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                <p className="text-zinc-400 mb-4">
                  This Data Processing Agreement ("DPA") forms part of the Terms of Service between HunterXJobs ("Processor") and the customer using our services ("Controller") and reflects the parties' agreement with regard to the processing of personal data.
                </p>
                <p className="text-zinc-400">
                  This DPA is designed to ensure compliance with applicable data protection laws and regulations, including the European Union General Data Protection Regulation (GDPR), and establishes the rights and obligations of both parties regarding the processing of personal data.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Definitions</h2>
                <p className="text-zinc-400 mb-4">
                  The terms "Controller", "Processor", "Data Subject", "Personal Data", "Processing", "Appropriate Technical and Organizational Measures", and "Supervisory Authority" shall have the meanings given to them in applicable data protection laws.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>
                    <strong className="text-white">Customer Data:</strong> Any personal data that the Controller provides to the Processor for processing under this DPA.
                  </li>
                  <li>
                    <strong className="text-white">Services:</strong> The HunterXJobs platform and related services provided to the Controller as described in the Terms of Service.
                  </li>
                  <li>
                    <strong className="text-white">Subprocessor:</strong> Any processor engaged by the Processor to process Customer Data.
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Scope and Purpose of Processing</h2>
                <p className="text-zinc-400 mb-4">
                  The Processor will process Customer Data only for the purpose of providing the Services to the Controller as outlined in the Terms of Service and in accordance with the Controller's documented instructions, unless required to do otherwise by applicable law.
                </p>
                <p className="text-zinc-400 mb-4">
                  The scope of processing includes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Collection, storage, and analysis of LinkedIn profile data</li>
                  <li>Generation of profile optimization suggestions</li>
                  <li>Authentication and identity verification</li>
                  <li>Provision of analytics and reporting services</li>
                  <li>Customer support and communication</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Data Subject Categories</h2>
                <p className="text-zinc-400 mb-4">
                  The categories of Data Subjects whose personal data may be processed under this DPA include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>The Controller's employees and representatives</li>
                  <li>The Controller's clients, if the Controller is using our platform for client management</li>
                  <li>Job applicants, if recruitment functionality is utilized</li>
                  <li>Other individuals whose data is provided by the Controller or collected through LinkedIn integration</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Types of Personal Data</h2>
                <p className="text-zinc-400 mb-4">
                  The types of personal data that may be processed under this DPA include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Professional information (job titles, skills, work experience)</li>
                  <li>Education information</li>
                  <li>LinkedIn profile data and analytics</li>
                  <li>Authentication credentials</li>
                  <li>Usage data and interaction with the platform</li>
                  <li>Communication content related to support or service delivery</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Duration of Processing</h2>
                <p className="text-zinc-400">
                  The Processor will process Customer Data for the duration of the service agreement, unless otherwise instructed by the Controller or as required by law. Upon termination of the agreement, the Processor shall delete or return all Customer Data to the Controller, in accordance with the terms of the agreement and applicable law.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Obligations of the Processor</h2>
                <p className="text-zinc-400 mb-4">
                  As a Processor, HunterXJobs shall:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Process Customer Data only on documented instructions from the Controller</li>
                  <li>Ensure that persons authorized to process Customer Data have committed themselves to confidentiality</li>
                  <li>Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk</li>
                  <li>Respect the conditions for engaging subprocessors</li>
                  <li>Assist the Controller in responding to requests from Data Subjects</li>
                  <li>Assist the Controller in ensuring compliance with security obligations, data breach notifications, data protection impact assessments, and consultations with supervisory authorities</li>
                  <li>Delete or return all Customer Data to the Controller after the end of the provision of services</li>
                  <li>Make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in this DPA</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Subprocessors</h2>
                <p className="text-zinc-400 mb-4">
                  The Controller grants the Processor general authorization to engage Subprocessors for the processing of Customer Data, provided that:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>The Processor maintains an up-to-date list of Subprocessors available to the Controller</li>
                  <li>The Processor gives the Controller prior notice of the addition or replacement of any Subprocessor</li>
                  <li>The Processor imposes data protection terms on any Subprocessor that are no less protective than those in this DPA</li>
                  <li>The Processor remains fully liable to the Controller for the performance of the Subprocessor's obligations</li>
                </ul>
                <p className="text-zinc-400 mt-4">
                  Current Subprocessors include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Amazon Web Services (hosting and infrastructure)</li>
                  <li>MongoDB Atlas (database services)</li>
                  <li>Stripe (payment processing)</li>
                  <li>Intercom (customer support)</li>
                  <li>Google Cloud (analytics and AI processing)</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
                <p className="text-zinc-400 mb-4">
                  The Processor may transfer Personal Data outside the European Economic Area (EEA) only when:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>The transfer is to a country recognized by the European Commission as providing adequate protection</li>
                  <li>The transfer is governed by appropriate safeguards, such as Standard Contractual Clauses</li>
                  <li>A derogation under applicable data protection law applies</li>
                </ul>
                <p className="text-zinc-400 mt-4">
                  For transfers to Subprocessors located outside the EEA, the Processor shall ensure appropriate transfer mechanisms are in place.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Security Measures</h2>
                <p className="text-zinc-400 mb-4">
                  The Processor implements and maintains appropriate technical and organizational measures to protect Customer Data, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>Encryption of personal data during transit and at rest</li>
                  <li>Regular testing and evaluation of security measures</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Regular security assessments and vulnerability scanning</li>
                  <li>Employee training on data protection and security</li>
                  <li>Business continuity and disaster recovery procedures</li>
                  <li>Incident management and response processes</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Data Breach Notification</h2>
                <p className="text-zinc-400">
                  In the event of a personal data breach affecting Customer Data, the Processor shall notify the Controller without undue delay after becoming aware of the breach. The notification will include all information required to allow the Controller to fulfill any data breach reporting obligations under applicable law. The Processor will also take reasonable steps to mitigate the effects of the breach and to minimize any damage resulting from the breach.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Assistance to the Controller</h2>
                <p className="text-zinc-400">
                  The Processor will provide reasonable assistance to the Controller in ensuring compliance with the Controller's obligations regarding:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                  <li>The security of processing</li>
                  <li>Data breach notification</li>
                  <li>Data protection impact assessments</li>
                  <li>Prior consultation with supervisory authorities</li>
                  <li>Responding to Data Subject requests to exercise their rights</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Audit Rights</h2>
                <p className="text-zinc-400">
                  The Processor shall make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in this DPA and allow for and contribute to audits, including inspections, conducted by the Controller or another auditor mandated by the Controller. The Controller shall give reasonable notice of any audit or inspection and shall bear the costs of such audit or inspection unless material non-compliance is identified.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Liability</h2>
                <p className="text-zinc-400">
                  Each party shall be liable for any damages caused by its processing activities that do not comply with the requirements of applicable data protection law or the contractual obligations under this DPA. If one party is held liable for a violation of this DPA committed by the other party, the latter shall, to the extent to which it is liable, indemnify the first party for any cost, charge, damages, expenses or loss incurred.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                <p className="text-zinc-400">
                  This DPA shall be governed by the laws specified in the Terms of Service between the Controller and the Processor, and any disputes shall be resolved in accordance with the dispute resolution provisions therein.
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
              <FaFileContract className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Data Processing Agreement?</h2>
            <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
              Enterprise customers with specific compliance requirements can request a customized DPA tailored to their needs.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Contact Our Legal Team
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DataProcessingPage; 