import React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { FaSpinner } from 'react-icons/fa';
import Layout from '../components/Layout';

// Client Components with No SSR
const LinkedInAnalysisClient = dynamic(
  () => import('../components/linkedin-analysis/LinkedInAnalysisClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center min-h-screen py-20">
        <FaSpinner className="animate-spin text-blue-600 text-3xl mb-4" />
        <h2 className="text-lg font-medium text-gray-700">Loading LinkedIn analysis...</h2>
      </div>
    )
  }
);

const LinkedInAnalysis: NextPage = () => {
  return (
    <Layout>
      <LinkedInAnalysisClient />
    </Layout>
  );
};

export default LinkedInAnalysis;