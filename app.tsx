import React, { useState } from 'react';
import { Navigation } from './navigation';
import { InputForm } from './input_form';
import { ResultsDisplay } from './result_display';
import { executeAutomationPipeline, WorkflowResponse, WorkflowPayload } from './api';

export const App: React.FC = () => {
  const [pipelineData, setPipelineData] = useState<WorkflowResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

 const handlePipelineTrigger = async (payload: WorkflowPayload) => {
  setIsLoading(true);
  setPipelineData(null);
  try {
    const result = await executeAutomationPipeline(payload);
    
    if (Array.isArray(result) && result.length > 0) {
      setPipelineData(result[0]);
    } else {
      setPipelineData(result as unknown as WorkflowResponse);
    }
  } catch (err) {
    
    console.error("Pipeline Sync Notice:", err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="bg-[#0b0f19] text-slate-100 min-h-screen font-sans antialiased">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-5">
          <InputForm onExecute={handlePipelineTrigger} isLoading={isLoading} />
        </section>
        <section className="lg:col-span-7">
          <ResultsDisplay data={pipelineData} isLoading={isLoading} />
        </section>
      </main>
    </div>
  );
};
