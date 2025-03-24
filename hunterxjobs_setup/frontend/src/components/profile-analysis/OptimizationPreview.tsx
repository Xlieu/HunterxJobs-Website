import React, { useState } from 'react';
import { FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface OptimizationPreviewProps {
  sectionType: string;
  currentContent: string;
  optimizedContent: string;
  onSelect: (sectionType: string, isSelected: boolean) => void;
  isSelected: boolean;
}

const OptimizationPreview: React.FC<OptimizationPreviewProps> = ({
  sectionType,
  currentContent,
  optimizedContent,
  onSelect,
  isSelected,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format section name for display
  const formatSectionName = (section: string) => {
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = () => {
    onSelect(sectionType, !isSelected);
  };

  // Function to highlight differences between texts
  const highlightDifferences = (text: string) => {
    // This is a simplified approach - in a real application, you might want to use a diff library
    return text;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`select-${sectionType}`}
              checked={isSelected}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={`select-${sectionType}`} className="ml-2 font-medium text-gray-900">
              {formatSectionName(sectionType)}
            </label>
            {isExpanded ? (
              <FaChevronUp onClick={toggleExpanded} className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
            ) : (
              <FaChevronDown onClick={toggleExpanded} className="ml-2 h-4 w-4 text-gray-500 cursor-pointer" />
            )}
          </div>
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700">AI Optimized</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Current {formatSectionName(sectionType)}</h4>
            <div className="p-3 bg-gray-50 rounded border border-gray-200 whitespace-pre-line">
              {currentContent || 'No content available'}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Optimized {formatSectionName(sectionType)}
            </h4>
            <div className="p-3 bg-blue-50 rounded border border-blue-200 whitespace-pre-line">
              {highlightDifferences(optimizedContent)}
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Why This Is Better:</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>More targeted to industry best practices</li>
              <li>Includes relevant keywords for improved visibility</li>
              <li>Clearer structure and improved readability</li>
              <li>Highlights key achievements more effectively</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizationPreview; 