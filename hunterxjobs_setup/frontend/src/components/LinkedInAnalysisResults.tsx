import React from 'react';

interface ProfileSection {
  name: string;
  score: number;
  maxScore: number;
  recommendations: string[];
}

interface ProfileAnalysis {
  overallScore: number;
  sections: ProfileSection[];
  topRecommendations: string[];
}

interface LinkedInAnalysisResultsProps {
  analysis: ProfileAnalysis;
}

/**
 * Component to display LinkedIn profile analysis results with scores and arrows
 */
const LinkedInAnalysisResults: React.FC<LinkedInAnalysisResultsProps> = ({ analysis }) => {
  if (!analysis) return null;
  
  // Helper function to determine arrow type based on score
  const getArrowByScore = (score: number) => {
    if (score >= 80) return <span className="text-green-500">↑</span>;
    if (score >= 60) return <span className="text-yellow-500">→</span>;
    return <span className="text-red-500">↓</span>;
  };
  
  // Helper function to determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Helper function to get background style based on score
  const getSectionBackgroundStyle = (score: number) => {
    if (score >= 80) return 'bg-green-900 bg-opacity-20 border-green-700';
    if (score >= 60) return 'bg-yellow-900 bg-opacity-20 border-yellow-700';
    return 'bg-red-900 bg-opacity-20 border-red-700';
  };
  
  return (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">LinkedIn Profile Optimization Score</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className={`text-5xl font-bold ${getScoreColor(analysis.overallScore)}`}>
            {analysis.overallScore}
          </span>
          <span className="text-3xl text-gray-400">/100</span>
          <span className="text-2xl">{getArrowByScore(analysis.overallScore)}</span>
        </div>
        <div className="w-full bg-zinc-800 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full ${
              analysis.overallScore >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
              analysis.overallScore >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
              'bg-gradient-to-r from-red-500 to-red-600'
            }`} 
            style={{ width: `${analysis.overallScore}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {analysis.sections.map((section, index) => (
          <div 
            key={index} 
            className={`rounded-lg border p-4 ${getSectionBackgroundStyle(section.score)}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">{section.name}</h3>
              <div className="flex items-center gap-1">
                <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                  {section.score}
                </span>
                <span className="text-sm text-gray-400">/{section.maxScore}</span>
                <span className="text-xl">{getArrowByScore(section.score)}</span>
              </div>
            </div>
            
            {section.recommendations.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-300 mb-1">Recommendations:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {section.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-gray-400">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-blue-900 bg-opacity-20 border border-blue-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Top Improvement Recommendations</h3>
        <ol className="list-decimal pl-5 space-y-2">
          {analysis.topRecommendations.map((rec, index) => (
            <li key={index} className="text-gray-300">{rec}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default LinkedInAnalysisResults; 