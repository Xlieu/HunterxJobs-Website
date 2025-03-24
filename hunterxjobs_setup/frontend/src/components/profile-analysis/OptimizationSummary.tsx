import React from 'react';
import { FaCheckCircle, FaArrowRight, FaSpinner } from 'react-icons/fa';

interface OptimizationSummaryProps {
  selectedOptimizations: string[];
  onApplyOptimizations: () => void;
  isApplying: boolean;
  appliedSuccess: boolean;
}

const OptimizationSummary: React.FC<OptimizationSummaryProps> = ({
  selectedOptimizations,
  onApplyOptimizations,
  isApplying,
  appliedSuccess,
}) => {
  // Format section name for display
  const formatSectionName = (section: string) => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Optimization Summary
      </h3>
      
      {selectedOptimizations.length === 0 ? (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-6">
          <p className="text-yellow-700">
            You haven't selected any optimizations to apply. Please select at least one section to optimize.
          </p>
        </div>
      ) : (
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            You've selected the following sections to optimize:
          </p>
          
          <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
            {selectedOptimizations.map((section) => (
              <li key={section}>
                {formatSectionName(section)}
              </li>
            ))}
          </ul>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-700 text-sm">
              These optimizations will be applied to your LinkedIn profile. This will enhance your visibility to recruiters and improve your profile strength.
            </p>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <button
          onClick={onApplyOptimizations}
          disabled={selectedOptimizations.length === 0 || isApplying || appliedSuccess}
          className={`flex items-center justify-center w-full px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            selectedOptimizations.length === 0 || isApplying || appliedSuccess
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isApplying ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Applying Optimizations...
            </>
          ) : appliedSuccess ? (
            <>
              <FaCheckCircle className="mr-2" />
              Optimizations Applied
            </>
          ) : (
            <>
              Apply Optimizations
              <FaArrowRight className="ml-2" />
            </>
          )}
        </button>
        
        {appliedSuccess && (
          <div className="mt-4 text-center text-green-700">
            <FaCheckCircle className="inline-block mr-2" />
            Your LinkedIn profile has been successfully optimized!
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizationSummary; 