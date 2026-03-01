import { buildApiUrl } from './apiBase';

interface FitCheckRequest {
    jobDescription: string;
}

interface FitCheckResult {
    score: number;
    matchSummary: string;
    keyMatches: string[];
    missingSkills: string[];
    coverLetter: string;
    recommendedProjects: string[]; // Project IDs to highlight
}

export const generateFitCheck = async (request: FitCheckRequest): Promise<FitCheckResult> => {
    const response = await fetch(buildApiUrl('/api/fit-check'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: request.jobDescription }),
    });

    if (!response.ok) {
        throw new Error(`Fit check failed: ${response.status}`);
    }

    return await response.json() as FitCheckResult;
};
