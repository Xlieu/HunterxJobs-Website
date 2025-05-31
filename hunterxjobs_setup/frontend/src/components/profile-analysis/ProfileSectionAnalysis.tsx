import React, { useState } from 'react';
import { FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';

interface ProfileSectionAnalysisProps {
  profileData: any;
  sectionScores: any;
}

const ProfileSectionAnalysis: React.FC<ProfileSectionAnalysisProps> = ({ 
  profileData, 
  sectionScores 
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  // Format section name for display
  const formatSectionName = (section: string) => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };
  
  // Get section status icon
  const getSectionIcon = (score: number) => {
    if (score >= 70) {
      return <FaCheck className="text-green-500" />;
    } else {
      return <FaTimes className="text-red-500" />;
    }
  };
  
  // Get color class based on score
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        LinkedIn Profile Section Analysis
      </h2>
      
      <p className="text-gray-700 mb-4">
        This analysis breaks down your LinkedIn profile by section, showing strengths and areas for improvement.
      </p>
      
      <div className="space-y-4">
        {Object.keys(sectionScores).map((section) => (
          <div 
            key={section} 
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            {/* Section header */}
            <div 
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() => toggleSection(section)}
            >
              <div className="flex items-center">
                {getSectionIcon(sectionScores[section].score)}
                <h3 className="ml-2 font-medium text-gray-900">
                  {formatSectionName(section)}
                </h3>
              </div>
              
              <div className="flex items-center">
                <span className={`font-semibold ${getScoreColorClass(sectionScores[section].score)}`}>
                  Score: {sectionScores[section].score}/100
                </span>
                <FaArrowRight className={`ml-2 transform transition-transform ${expandedSection === section ? 'rotate-90' : ''}`} />
              </div>
            </div>
            
            {/* Expanded section content */}
            {expandedSection === section && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Feedback</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-3">
                  {sectionScores[section].feedback.map((feedback: string, index: number) => (
                    <li key={index}>{feedback}</li>
                  ))}
                </ul>
                
                {section === 'headline' && profileData.headline && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-500">Current {formatSectionName(section)}</div>
                    <div className="mt-1 text-gray-900">{profileData.headline}</div>
                  </div>
                )}
                
                {section === 'about' && profileData.about && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-500">Current {formatSectionName(section)}</div>
                    <div className="mt-1 text-gray-900 whitespace-pre-line">
                      {profileData.about.length > 300 
                        ? `${profileData.about.substring(0, 300)}...` 
                        : profileData.about
                      }
                    </div>
                  </div>
                )}
                
                {section === 'experience' && profileData.positions && profileData.positions.length > 0 && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-500">
                      Latest Experience ({profileData.positions[0].companyName})
                    </div>
                    <div className="mt-1">
                      <div className="font-medium text-gray-900">{profileData.positions[0].title}</div>
                      <div className="text-gray-700">{profileData.positions[0].dateRange}</div>
                      <div className="mt-1 text-gray-900">
                        {profileData.positions[0].description?.length > 200
                          ? `${profileData.positions[0].description.substring(0, 200)}...`
                          : profileData.positions[0].description
                        }
                      </div>
                    </div>
                  </div>
                )}
                
                {section === 'skills' && profileData.skills && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="text-sm font-medium text-gray-500">Top Skills</div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {profileData.skills.slice(0, 10).map((skill: string, index: number) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {profileData.skills.length > 10 && (
                        <span className="text-gray-500 text-sm self-center">
                          +{profileData.skills.length - 10} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSectionAnalysis; 