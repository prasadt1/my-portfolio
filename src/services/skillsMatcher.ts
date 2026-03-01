
import { buildApiUrl } from './apiBase';

export interface SkillsAnalysis {
    matchScore: number;
    matchLevel: 'Low' | 'Medium' | 'High' | 'Perfect';
    explanation: string;
    missingSkills: string[];
    matchingSkills: string[];
}

export const analyzeJobMatch = async (jobDescription: string): Promise<SkillsAnalysis> => {
    try {
        const response = await fetch(buildApiUrl('/api/skills-match'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobDescription }),
        });

        if (!response.ok) {
            throw new Error(`Skills match failed: ${response.status}`);
        }

        const data = await response.json();
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
