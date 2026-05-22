# study_buddy_AI

## 🚀 AI Study Assistant
An intelligent, AI-powered study tool designed to analyze assignment content and automatically generate structured academic resources. It helps students prepare for exams and vivas by distilling complex text into key insights.

## 🌟 Key Features
AI Structural Summary: Get a concise, high-level summary of any assignment (max 150 words).

Technical Question Bank: Instantly generate 5 key technical questions focused on core concepts.

Viva Prep: Access 5 high-yield, direct questions tailored for oral exam (viva) preparation.

Automated Workflow: Powered by a robust n8n backend for seamless data processing.

## 🛠️ Tech Stack
Frontend: React.js, Tailwind CSS

Automation Engine: n8n (Workflow Automation)

Intelligence: Google Gemini AI API

## 📋 User Guide
Subject: Enter the title or subject of your assignment.

Content: Paste your assignment text into the content area.

Generate: Click the 'Generate' button.

Results: Your AI-processed, structured study guide will load automatically in the sections below.

## ⚙️ Development Setup
1. Frontend
Bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Set your n8n Webhook URL in services/api.ts
# Run the development server
npm run dev
2. n8n Backend Configuration
Import the provided workflow JSON into your n8n instance.

Webhook Node: Set to 'POST' method.

HTTP Request Node: Configure with your Google Gemini API Key.

Response Node: Ensure the "Response Body" is set to All Incoming Items for a seamless data pass-through.

Activate: Ensure the workflow is set to 'Active' to handle requests.

## 💡 Troubleshooting
"Service Unavailable": This usually indicates high demand on the AI model. Please wait a few seconds and try again.

Data Not Loading: Verify that your n8n Webhook URL is correctly updated in the frontend and the workflow is active.

Formatting Issues: If data appears unformatted, perform a hard refresh (Ctrl + F5) on your browser.

# Built with ❤️ to simplify academic preparation.
