
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

export interface SkillsAnalysis {
    matchScore: number;
    matchLevel: 'Low' | 'Medium' | 'High' | 'Perfect';
    explanation: string;
    missingSkills: string[];
    matchingSkills: string[];
}

export const analyzeJobMatch = async (jobDescription: string): Promise<SkillsAnalysis> => {
    if (!apiKey) {
        throw new Error('Gemini API key not configured');
    }

    const prompt = `
    Analyze the following Job Description against Prasad Tilloo's profile.
    
    PRASAD'S PROFILE:
    - 15+ years experience: Enterprise Architect, Cloud Architect, AI Engineer
    - Core Skills: AWS, Azure, GCP, Kubernetes, Docker, Terraform
    - Languages: Python, TypeScript, React, Java, Golang, C#
    - Compliance: HIPAA, GDPR, PCI-DSS, SOC2
    - Leadership: Led teams of 10-15, managed $650K+ budgets
    - AI/ML: RAG, Vector DBs, LLM integration, MLOps

    JOB DESCRIPTION:
    ${jobDescription}

    TASK:
    - Calculate a match percentage (0-100).
    - Identify key matching skills mentioned in JD.
    - Identify missing skills or gaps.
    - Provide a 1-sentence explanation of the fit.

    OUTPUT JSON ONLY:
    {
      "matchScore": number,
      "matchLevel": "Low" | "Medium" | "High" | "Perfect",
      "explanation": "string",
      "missingSkills": ["string"],
      "matchingSkills": ["string"]
    }
  `;

    try {
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: 'application/json'
            }
        });

        const response = result.response;
        const text = response.text();

        // Clean markdown formatting if present
        const jsonStr = text.replace(/```json\n?|\n?```/g, '').trim();
        const data = JSON.parse(jsonStr);

        return data as SkillsAnalysis;
    } catch (error) {
        console.error('Skills Match Error:', error);
        // Fallback for demo if API fails
        return {
            matchScore: 0,
            matchLevel: 'Low',
            explanation: 'Unable to analyze at the moment. Please try again.',
            missingSkills: [],
            matchingSkills: []
        };
    }
};
