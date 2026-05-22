import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-xl text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <i className="fa-solid fa-graduation-cap text-xl"></i>
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">StudyBuddy AI</span>
          <span className="text-xs block text-slate-500 font-medium tracking-wider uppercase">Workflow Automation</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/50">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-xs text-slate-400 font-medium">n8n Connected</span>
      </div>
    </nav>
  );
};