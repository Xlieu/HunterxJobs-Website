import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';

interface ProfileScoreCardProps {
  score: number;
}

const ProfileScoreCard: React.FC<ProfileScoreCardProps> = ({ score }) => {
  // Determine score range styling and messaging
  const getScoreInfo = () => {
    if (score >= 80) {
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-500',
        icon: <FaCheckCircle className="h-8 w-8 text-green-500" />,
        message: 'Great Profile',
        description: 'Your LinkedIn profile is well-optimized and making a strong impression.'
      };
    } else if (score >= 60) {
      return {
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-500',
        icon: <FaExclamationTriangle className="h-8 w-8 text-yellow-500" />,
        message: 'Good Profile with Room for Improvement',
        description: 'Your profile is doing well but could benefit from some optimizations.'
      };
    } else {
      return {
        color: 'text-red-600',
        bgColor: 'bg-red-500',
        icon: <FaTimesCircle className="h-8 w-8 text-red-500" />,
        message: 'Needs Optimization',
        description: 'Your profile needs significant improvements to make a strong impression.'
      };
    }
  };

  const scoreInfo = getScoreInfo();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Score</h3>
      
      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg className="w-32 h-32" viewBox="0 0 36 36">
            <path
              className="stroke-current text-gray-200"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className={`stroke-current ${scoreInfo.bgColor}`}
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
              strokeLinecap="round"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.5" className="text-3xl font-bold" textAnchor="middle">
              {score}
            </text>
          </svg>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center p-2 bg-gray-50 rounded-full mb-4">
          {scoreInfo.icon}
        </div>
        <h4 className={`text-lg font-medium ${scoreInfo.color} mb-2`}>{scoreInfo.message}</h4>
        <p className="text-gray-600">{scoreInfo.description}</p>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Score Breakdown</h5>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="bg-blue-100 rounded-lg p-2">
              <div className="font-semibold text-blue-700">Profile</div>
              <div className="text-xs text-gray-500">Basic Info</div>
            </div>
          </div>
          <div>
            <div className="bg-purple-100 rounded-lg p-2">
              <div className="font-semibold text-purple-700">Content</div>
              <div className="text-xs text-gray-500">Quality</div>
            </div>
          </div>
          <div>
            <div className="bg-green-100 rounded-lg p-2">
              <div className="font-semibold text-green-700">SEO</div>
              <div className="text-xs text-gray-500">Visibility</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScoreCard; 