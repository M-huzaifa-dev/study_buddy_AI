import React, { useState } from 'react';
import { DropZone } from './dropzone';
import { WorkflowPayload } from '../services/api';

interface InputFormProps {
  onExecute: (payload: WorkflowPayload) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onExecute, isLoading }) => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [rawText, setRawText] = useState('');
  const [fileText, setFileText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalContent = fileText || rawText;
    if (!finalContent) {
      alert("Please upload a file or write assignment text content.");
      return;
    }
    onExecute({ subject, email, assignment: finalContent });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Upload & Parameters</h2>
        <p className="text-sm text-slate-400 mt-1">Provide your assignment document or raw notes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Subject Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500"><i className="fa-solid fa-book-bookmark"></i></span>
            <input type="text" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Artificial Intelligence" className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-200 transition-colors" disabled={isLoading} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Student Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500"><i className="fa-solid fa-envelope"></i></span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-200 transition-colors" disabled={isLoading} />
          </div>
        </div>

        <DropZone onFileLoaded={setFileText} disabled={isLoading} />

        <div className="flex items-center justify-center space-x-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
          <div className="h-[1px] bg-slate-800 w-full"></div>
          <span>OR</span>
          <div className="h-[1px] bg-slate-800 w-full"></div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">Paste Text Directly (Optional)</label>
          <textarea rows={4} value={rawText} onChange={(e) => setRawText(e.target.value)} placeholder="If you don't have a PDF, paste text here..." className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-slate-200 transition-colors resize-none" disabled={isLoading || !!fileText}></textarea>
        </div>

        <button type="submit" disabled={isLoading} className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <i className="fa-solid fa-bolt"></i>
          <span>{isLoading ? 'Processing Pipeline...' : 'Execute Automation'}</span>
        </button>
      </form>
    </div>
  );
};