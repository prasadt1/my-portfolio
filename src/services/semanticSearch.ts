import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { projects } from '../data/projects';

// Flatten projects for context
const PROJECT_CONTEXT = projects.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.header.title,
    technologies: p.technical.after?.stack || [],
    outcomes: [p.outcomes.hero_metric.value + ' ' + p.outcomes.hero_metric.label, ...p.outcomes.secondary_metrics.map((m: { value: string; label: string }) => m.value + ' ' + m.label)],
    summary: p.challenge.situation
})).map(p => JSON.stringify(p)).join('\n');

interface SearchResult {
    slug: string;
    title: string;
    relevance: string;
    score: number;
}

export const semanticSearch = async (query: string): Promise<SearchResult[]> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return []; // Graceful fallback

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `
    CONTEXT:
    ${PROJECT_CONTEXT}

    TASK:
    Find the top 3 projects from the list above that are most relevant to this user query: "${query}".
    Return a relevance score (0-100) and a 1-sentence explanation of why it matches.
    If no project matches, return an empty array.

    OUTPUT JSON ONLY.
    `;

    const schema = {
        type: SchemaType.ARRAY,
        items: {
            type: SchemaType.OBJECT,
            properties: {
                slug: { type: SchemaType.STRING },
                title: { type: SchemaType.STRING },
                relevance: { type: SchemaType.STRING },
                score: { type: SchemaType.NUMBER }
            },
            required: ['slug', 'title', 'relevance', 'score']
        }
    };

    try {
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: schema
            }
        });
        return JSON.parse(result.response.text()) as SearchResult[];
    } catch (e) {
        console.error("Semantic search failed", e);
        return [];
    }
};
