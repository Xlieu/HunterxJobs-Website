import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showText?: boolean;
  linkToHome?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  className = '', 
  showText = true,
  linkToHome = true
}) => {
  let dimensions = { width: 40, height: 40 };
  let textSize = 'text-xl';

  if (size === 'small') {
    dimensions = { width: 32, height: 32 };
    textSize = 'text-lg';
  } else if (size === 'large') {
    dimensions = { width: 48, height: 48 };
    textSize = 'text-2xl';
  }

  const logoContent = (
    <div className={`flex items-center ${className}`}>
      <div className="relative mr-2">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 blur-sm opacity-75 rounded-full"></div>
        <div className="relative bg-[#111111] rounded-full p-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${dimensions.width <= 32 ? 'w-5 h-5' : 'w-6 h-6'} text-white`}
          >
            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>
      {showText && (
        <div className="flex items-center">
          <span className={`font-bold ${textSize} text-white`}>
            Hunter<span className="text-gradient">X</span>Jobs
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return <Link href="/">{logoContent}</Link>;
  }

  return logoContent;
};

export default Logo;