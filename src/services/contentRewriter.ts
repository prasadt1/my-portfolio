import { GoogleGenerativeAI } from '@google/generative-ai';

interface RewriteRequest {
    currentText: string;
    sectionType: 'executive_summary' | 'technical_deep_dive' | 'recruiter_pitch';
    persona: 'executive' | 'technical' | 'recruiter';
}

export const rewriteContent = async (req: RewriteRequest): Promise<string> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return req.currentText;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    let prompt = '';

    if (req.persona === 'executive') {
        prompt = `
        Rewrite the following text for a C-Level Executive (CEO/CTO).
        Focus on: ROI, Business Impact, Risk Mitigation, Strategy.
        Remove: Low-level technical jargon.
        Tone: Professional, Concise, Strategic.
        Output ONLY the rewritten text. Do not include "Here is the rewritten text" or markers.
        Text: "${req.currentText}"
        `;
    } else if (req.persona === 'technical') {
        prompt = `
        Rewrite the following text for a Senior Software Engineer.
        Focus on: Architecture, Tech Stack, Patterns, Complexity, Performance.
        Add: Technical specifics.
        Tone: Technical, Detailed.
        Output ONLY the rewritten text. Do not include "Here is the rewritten text" or markers.
        Text: "${req.currentText}"
        `;
    } else {
        // Default or Recruiter
        prompt = `
        Rewrite the following text for a Technical Recruiter involved in hiring.
        Focus on: Key Skills, Keywords, Leadership, Project Management.
        Tone: Professional, Resume-style.
        Output ONLY the rewritten text. Do not include "Here is the rewritten text" or markers.
        Text: "${req.currentText}"
        `;
    }

    try {
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });
        return result.response.text();
    } catch (e) {
        console.error("Rewrite failed", e);
        return req.currentText;
    }
};
