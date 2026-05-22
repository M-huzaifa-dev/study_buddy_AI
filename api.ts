import axios from 'axios';

export interface WorkflowPayload {
  subject: string;
  email: string;
  assignment: any; 
}

export interface WorkflowResponse {
  summary: string;
  important_questions: string;
  viva_questions: string;
}

const VITE_N8N_WEBHOOK_URL = "https://techdev786.app.n8n.cloud/webhook/study-buddy-pipeline";

export const executeAutomationPipeline = async (payload: WorkflowPayload): Promise<WorkflowResponse> => {
  try {
    
    const formData = new FormData();
    formData.append('subject', payload.subject);
    formData.append('email', payload.email);
    
    
    if (payload.assignment instanceof File) {
      formData.append('assignment', payload.assignment);
    } else {
      formData.append('assignment', payload.assignment); 
    }

    const response = await axios.post(VITE_N8N_WEBHOOK_URL, formData, {
      timeout: 0, 
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });

    return response.data;
  } catch (error) {
    console.error("n8n Axios Pipeline Error:", error);
    throw error;
  }
};
