import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage, NextPageContext } from 'next';

interface ErrorProps {
  statusCode: number;
  message?: string;
}

const Error: NextPage<ErrorProps> = ({ statusCode, message }) => {
  const errorMessage = message || 
    statusCode === 404
      ? "The page you're looking for can't be found."
      : "An unexpected error occurred.";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <Head>
        <title>{statusCode ? `${statusCode}: Error` : 'Error'} | HunterXJobs</title>
        <meta name="description" content="Error page" />
      </Head>

      <main className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="bg-white shadow rounded-lg p-8 max-w-md mx-auto">
            <h1 className="text-6xl font-bold text-primary-600 mb-4">{statusCode || 'Error'}</h1>
            <p className="text-xl text-gray-700 mb-8">{errorMessage}</p>
            <Link href="/" className="btn btn-primary w-full">Return to Home</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;