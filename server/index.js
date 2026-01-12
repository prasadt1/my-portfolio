import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { contextData } from './context.js';

dotenv.config({ path: '../.env.local' });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const apiKey = process.env.VITE_GEMINI_API_KEY;
console.log('----------------------------------------');
console.log('Server Context:', {
    cwd: process.cwd(),
    apiKeyLength: apiKey ? apiKey.length : 0,
    hasApiKey: !!apiKey
});
console.log('----------------------------------------');
console.log('Loading API Key from env:', apiKey ? 'Found (Starts with ' + apiKey.substring(0, 4) + '...)' : 'Not Found');

const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });


// Rate limiting (simple in-memory store - use Redis in production)
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute

const checkRateLimit = (ip) => {
    const now = Date.now();
    const key = `rate_limit_${ip}`;
    const record = rateLimitStore.get(key);

    if (!record || now - record.firstRequest > RATE_LIMIT_WINDOW) {
        rateLimitStore.set(key, { firstRequest: now, count: 1 });
        return true;
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return false;
    }

    record.count++;
    return true;
};

app.post('/api/chat', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!process.env.VITE_GEMINI_API_KEY) {
            return res.status(500).json({ error: 'API Key not configured' });
        }

        // Construct the chat session
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `System Instruction: ${contextData}` }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to answer questions about Prasad Tilloo based on the provided profile." }],
                },
                ...history.map(msg => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                }))
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

// Architecture generation endpoint (server-side)
app.post('/api/architecture/generate', async (req, res) => {
    try {
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        
        // Rate limiting
        if (!checkRateLimit(clientIp)) {
            return res.status(429).json({ 
                error: 'Rate limit exceeded. Please try again in a minute.' 
            });
        }

        const { industry, challenge, context } = req.body;

        // Input validation
        if (!industry || !challenge) {
            return res.status(400).json({ 
                error: 'Missing required fields: industry and challenge are required' 
            });
        }

        if (typeof challenge !== 'string' || challenge.length > 2000) {
            return res.status(400).json({ 
                error: 'Challenge must be a string under 2000 characters' 
            });
        }

        if (!process.env.VITE_GEMINI_API_KEY) {
            return res.status(500).json({ error: 'API Key not configured' });
        }

        const { SchemaType } = await import('@google/generative-ai');
        
        if (!model) {
            return res.status(500).json({ error: 'API Key not configured' });
        }
        
        const PORTFOLIO_CONTEXT = `
REFERENCE PROJECTS (Prasad Tilloo's Portfolio):
1. Healthcare: PwC Healthcare Modernization - $650K, 70% traffic increase, HIPAA compliant
2. Healthcare: Boehringer Ingelheim AI/ML Platform - 50% faster insights, GDPR compliant
3. Financial: Insurance Claims Processing - 80% efficiency improvement
4. eCommerce: BRITA Platform - 6 markets, headless architecture, zero-downtime migration
5. eCommerce: Delivery Hero Ads - 5M+ daily transactions, 99.99% SLA, 20% revenue increase
6. AI/ML: Medical Research Platform - 100K+ studies, BioBERT semantic search
7. Legacy: Mainframe Migration - 7.8M LOC COBOL, $25M+ savings
8. Climate: PACT PCF Network - Fortune 100 standard, Microsoft/SAP/Siemens adoption
`;

        const prompt = `
REQUEST:
Industry: ${industry}
Challenge: ${challenge}
Team: ${context?.teamSize || 'Not specified'}
Budget: ${context?.budget || 'Not specified'}
Timeline: ${context?.timeline || 'Not specified'}

${PORTFOLIO_CONTEXT}

TASK:
Design a system architecture with 5-8 key components.
Select proven tech stack for this industry.
Provide timeline, budget, risks.
Reference relevant projects from Prasad's portfolio.
Keep summary under 80 words.
Return ONLY valid JSON matching the schema.
`;

        const schema = {
            type: SchemaType.OBJECT,
            properties: {
                summary: { type: SchemaType.STRING },
                recommendations: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING }
                },
                timeline: { type: SchemaType.STRING },
                budget: { type: SchemaType.STRING },
                risks: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            level: { type: SchemaType.STRING, enum: ['high', 'medium', 'low'] },
                            text: { type: SchemaType.STRING }
                        },
                        required: ['level', 'text']
                    }
                },
                stack: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            category: { type: SchemaType.STRING },
                            tech: { type: SchemaType.STRING },
                            reason: { type: SchemaType.STRING }
                        },
                        required: ['category', 'tech', 'reason']
                    }
                },
                compliance: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING }
                },
                diagram: {
                    type: SchemaType.OBJECT,
                    properties: {
                        nodes: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    id: { type: SchemaType.STRING },
                                    label: { type: SchemaType.STRING },
                                    type: { type: SchemaType.STRING, enum: ['frontend', 'service', 'database', 'security', 'external'] },
                                    description: { type: SchemaType.STRING },
                                    technologies: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                                    risks: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
                                },
                                required: ['id', 'label', 'type', 'description', 'technologies', 'risks']
                            }
                        },
                        edges: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.OBJECT,
                                properties: {
                                    source: { type: SchemaType.STRING },
                                    target: { type: SchemaType.STRING }
                                },
                                required: ['source', 'target']
                            }
                        }
                    },
                    required: ['nodes', 'edges']
                }
            },
            required: ['summary', 'recommendations', 'timeline', 'budget', 'risks', 'stack', 'compliance', 'diagram']
        };

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192,
                responseMimeType: 'application/json',
                responseSchema: schema
            }
        });

        const response = result.response;
        let text = response.text();
        
        // Clean JSON
        text = text.trim().replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            text = text.substring(firstBrace, lastBrace + 1);
        }

        const data = JSON.parse(text);
        
        // Validate
        if (!data.diagram || !data.diagram.nodes || data.diagram.nodes.length === 0) {
            return res.status(500).json({ error: 'Invalid architecture: missing diagram nodes' });
        }

        res.json(data);
    } catch (error) {
        console.error('Architecture generation error:', error);
        if (error instanceof Error) {
            if (error.message.includes('API key') || error.message.includes('API Key')) {
                return res.status(500).json({ error: 'API configuration error. Please contact support.' });
            }
            if (error.message.includes('quota') || error.message.includes('Quota') || error.message.includes('429')) {
                return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
            }
            if (error.message.includes('429 Too Many Requests')) {
                return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
            }
        }
        res.status(500).json({ error: 'Failed to generate architecture. Please try again.' });
    }
});

// Serve static files from the React app
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory (one level up from server)
app.use(express.static(path.join(__dirname, '../dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
