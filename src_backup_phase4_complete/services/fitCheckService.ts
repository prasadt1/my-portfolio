import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

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

const PORTFOLIO_CONTEXT = `
USER: Prasad Tilloo
ROLE: Senior Engineering Leader & Enterprise Architect (15+ years)
HIGHLIGHTS:
- PACT PCF Network: Fortune 100 global standard (WBCSD).
- BRITA: Headless e-commerce across 6 EMEA markets.
- Boehringer Ingelheim: AI/ML Enterprise Data Lake.
- PwC: Managed $650K+ modernization programs.
- Legacy Migration: 7.8M LOC COBOL to Java transformation.
- Compliance: HIPAA, GDPR, SOC2 expert.
- Leadership: Managed teams of 10-30 engineers.
- Tech Stack: Azure, AWS, React, Python, Java, Kubernetes, AI/ML (RAG).
`;

export const generateFitCheck = async (request: FitCheckRequest): Promise<FitCheckResult> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('Gemini API Key missing');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
    ACT AS: A Senior Technical Recruiter and Hiring Manager.
    
    TASK: Analyze Prasad Tilloo's profile against the provided Job Description (JD).
    
    JD:
    "${request.jobDescription}"
    
    PROFILE:
    ${PORTFOLIO_CONTEXT}
    
    OUTPUT:
    1. Match Score (0-100).
    2. Summary of why he is a good fit (or not).
    3. Key matching skills (technical & leadership).
    4. Missing skills (gaps).
    5. A persuasive, professional Cover Letter (300 words max) tailored to this specific JD, citing specific projects from the profile.
    6. List of 3 relevant project IDs (pact-pcf-network, brita-platform, etc.) that prove the fit.
    
    Return JSON only.
    `;

    const schema = {
        type: SchemaType.OBJECT,
        properties: {
            score: { type: SchemaType.NUMBER },
            matchSummary: { type: SchemaType.STRING },
            keyMatches: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            missingSkills: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            coverLetter: { type: SchemaType.STRING },
            recommendedProjects: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
        },
        required: ['score', 'matchSummary', 'keyMatches', 'missingSkills', 'coverLetter', 'recommendedProjects']
    };

    const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: schema
        }
    });

    return JSON.parse(result.response.text()) as FitCheckResult;
};
