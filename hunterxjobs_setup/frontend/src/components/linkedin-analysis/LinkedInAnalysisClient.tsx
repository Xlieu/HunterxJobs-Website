import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaSpinner, FaArrowLeft, FaChartLine } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LinkedInAnalysisClient: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please log in to view your LinkedIn analysis');
          router.push('/login');
          return;
        }

        // Fetch profile data and analysis results
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/linkedin/analyze`, {
          headers: {
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile analysis');
        }

        const data = await response.json();
        setProfileData(data.profile);
        setAnalysisResults(data.analysis);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile analysis:', error);
        toast.error('Failed to load profile analysis');
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleApplyOptimizations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/linkedin/optimize`, {
        method: 'POST',
        headers: {
          'x-auth-token': token || ''
        }
      });

      if (!response.ok) {
        throw new Error('Failed to apply optimizations');
      }

      toast.success('Profile optimizations applied successfully!');
    } catch (error) {
      console.error('Error applying optimizations:', error);
      toast.error('Failed to apply optimizations');
    }
  };

  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-green-600 border-green-500';
    if (score >= 60) return 'text-yellow-600 border-yellow-500';
    return 'text-red-600 border-red-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FaSpinner className="animate-spin text-blue-600 text-3xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800">
          <FaArrowLeft className="mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">LinkedIn Profile Analysis</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Preview Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {profileData?.name}
            </h2>
            <p className="text-gray-600 mb-6">
              {profileData?.headline}
            </p>

            <div className="flex justify-center my-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center border-8 ${getScoreColorClass(analysisResults?.overallScore)} animate-scale-in`}>
                <span className="text-3xl font-bold">{analysisResults?.overallScore}</span>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Section Scores
            </h3>
            {Object.entries(analysisResults?.scores || {}).map(([section, score]: [string, any]) => {
              const numericScore = typeof score === 'number' ? score : 0;
              return (
                <div key={section} className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {numericScore}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        numericScore >= 80 ? 'bg-green-600' :
                        numericScore >= 60 ? 'bg-yellow-500' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${numericScore}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleApplyOptimizations}
              className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <FaChartLine className="mr-2" />
              Apply All Optimizations
            </button>
          </div>
        </div>

        {/* Main Analysis Area */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex flex-wrap -mb-px">
                {['overview', 'headline', 'about', 'experience', 'skills', 'ats'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`mr-6 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              {analysisResults?.recommendations
                ?.filter((rec: any) => activeTab === 'overview' || rec.section === activeTab)
                .map((recommendation: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-lg font-medium text-red-600 mb-2">
                      {recommendation.issue}
                    </h3>
                    <p className="text-gray-700">
                      {recommendation.recommendation}
                    </p>
                  </div>
                ))}

              {(analysisResults?.recommendations?.filter((rec: any) => 
                activeTab === 'overview' || rec.section === activeTab).length === 0) && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-yellow-700">
                    No recommendations found for this section.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInAnalysisClient; 