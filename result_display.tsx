import React from 'react';
import { WorkflowResponse } from '../services/api';

interface ResultsDisplayProps {
  data: WorkflowResponse | null;
  isLoading: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[550px] space-y-6">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-800 border-t-blue-500"></div>
          <i className="fa-solid fa-microchip text-blue-400 text-xl absolute animate-pulse"></i>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-200">n8n Automation Pipeline Running...</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">Parsing and structural segmenting data streams...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[550px]">
        <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-slate-800 text-slate-500 text-2xl mb-4"><i className="fa-solid fa-terminal"></i></div>
        <h3 className="text-lg font-semibold text-slate-300">Execution Pipeline Idle</h3>
        <p className="text-sm text-slate-500 max-w-sm mt-1 mx-auto">Drop your assignment payload to trigger segment routing.</p>
      </div>
    );
  }

  
  const normalizedData = Array.isArray(data) ? data[0] : data;
  
  
  const rawText = String(normalizedData?.Summary || normalizedData?.Important_Questions || normalizedData?.Viva_Questions || "");

  
  let summaryContent = "Processing summary formatting...";
  let questionsContent = "Processing questions formatting...";
  let vivaContent = "Processing viva preparation...";

  if (rawText && rawText.trim() !== "") {
    
    const summaryMarker = rawText.search(/(?:#+|\*\*)\s*(?:1\.\s*)?Structural Summary/i);
    const questionsMarker = rawText.search(/(?:#+|\*\*)\s*(?:2\.\s*)?Important Technical Questions/i);
    const vivaMarker = rawText.search(/(?:#+|\*\*)\s*(?:3\.\s*)?High-Yield Viva/i);

    if (summaryMarker !== -1 && questionsMarker !== -1 && vivaMarker !== -1) {
      
      summaryContent = rawText.substring(summaryMarker, questionsMarker).trim();
      
      
      questionsContent = rawText.substring(questionsMarker, vivaMarker).trim();
      
      
      vivaContent = rawText.substring(vivaMarker).trim();
    } else {
      
      summaryContent = rawText;
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* 1. AI Structural Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><i className="fa-solid fa-file-invoice"></i></div>
          <h3 className="text-lg font-bold text-slate-200">AI Structural Summary</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap tracking-wide font-sans">
          {summaryContent}
        </p>
      </div>

      {/* 2. Important Technical Questions Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><i className="fa-solid fa-circle-question"></i></div>
          <h3 className="text-lg font-bold text-slate-200">Important Technical Questions</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line tracking-wide font-sans">
          {questionsContent}
        </p>
      </div>

      {/* 3. High-Yield Viva / Oral Exam Prep Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><i className="fa-solid fa-comments"></i></div>
          <h3 className="text-lg font-bold text-slate-200">High-Yield Viva / Oral Exam Prep</h3>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line tracking-wide font-sans">
          {vivaContent}
        </p>
      </div>

    </div>
  );
};