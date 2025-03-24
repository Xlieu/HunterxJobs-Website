import React from 'react';

interface ConnectionStatusProps {
  serverStatus: 'online' | 'checking' | 'error';
  apiUrl: string;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ serverStatus, apiUrl }) => {
  if (serverStatus === 'online') {
    return (
      <div className="bg-emerald-900/30 border border-emerald-800 text-emerald-400 px-4 py-2 rounded-md mb-4 text-sm flex items-center justify-between">
        <span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
          Connected to API server at {apiUrl}
        </span>
        <span className="text-xs text-emerald-500">✓ All systems operational</span>
      </div>
    );
  }

  if (serverStatus === 'checking') {
    return (
      <div className="bg-amber-900/30 border border-amber-800 text-amber-400 px-4 py-2 rounded-md mb-4 text-sm flex items-center">
        <div className="spinner-sm mr-2"></div>
        Checking connection to API server...
      </div>
    );
  }

  return (
    <div className="bg-red-900/30 border border-red-800 text-red-400 px-4 py-2 rounded-md mb-4 text-sm flex items-center justify-between">
      <span>
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
        API connection error: Cannot connect to {apiUrl}
      </span>
      <span className="text-xs">Try refreshing the page or check your network connection</span>
    </div>
  );
}; 