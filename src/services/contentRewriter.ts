import { buildApiUrl } from './apiBase';

interface RewriteRequest {
    currentText: string;
    sectionType: 'executive_summary' | 'technical_deep_dive' | 'recruiter_pitch';
    persona: 'executive' | 'technical' | 'recruiter';
}

export const rewriteContent = async (req: RewriteRequest): Promise<string> => {
    try {
        const response = await fetch(buildApiUrl('/api/content-rewrite'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req),
        });

        if (!response.ok) {
            return req.currentText;
        }

        const data = await response.json();
        if (data && typeof data.text === 'string') {
            return data.text;
        }

        return req.currentText;
    } catch (e) {
        console.error("Rewrite failed", e);
        return req.currentText;
    }
};
