import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaExclamationCircle, FaHome } from 'react-icons/fa';

const Custom500 = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>500 - Server Error | HunterXJobs</title>
        <meta name="description" content="We're experiencing some technical difficulties." />
      </Head>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <FaExclamationCircle className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Server Error</h1>
          <p className="mt-2 text-sm text-gray-600">
            We're experiencing some technical difficulties. Please try again later.
          </p>
          
          <div className="mt-8">
            <Link href="/" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FaHome className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom500;