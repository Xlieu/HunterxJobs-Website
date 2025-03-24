import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaLinkedin, FaChartLine, FaUserEdit, FaShieldAlt, FaRocket, FaSignOutAlt, FaCode, FaUser, FaPen, FaBriefcase, FaChartBar, FaBug, FaTasks } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import agentService from '../services/agent.service';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import components that use browser APIs with SSR disabled
const DashboardContent = dynamic(() => import('../components/DashboardContent'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-zinc-300">Loading your dashboard...</p>
      </div>
    </div>
  )
});

const Dashboard: NextPage = () => {
  const router = useRouter();
  
  return (
    <Layout>
      <Head>
        <title>Dashboard | HunterXJobs</title>
        <meta name="description" content="Your HunterXJobs dashboard" />
      </Head>
      
      <DashboardContent router={router} />
    </Layout>
  );
};

export default Dashboard;
