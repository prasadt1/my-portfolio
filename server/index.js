import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { contextData } from './context.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

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

// Separate rate limiting for semantic search (more lenient)
const semanticSearchRateLimitStore = new Map();
const SEMANTIC_SEARCH_RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const SEMANTIC_SEARCH_RATE_LIMIT_MAX = 30; // 30 requests per minute (more lenient for search)

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

const checkSemanticSearchRateLimit = (ip) => {
    const now = Date.now();
    const key = `semantic_search_rate_limit_${ip}`;
    const record = semanticSearchRateLimitStore.get(key);

    if (!record || now - record.firstRequest > SEMANTIC_SEARCH_RATE_LIMIT_WINDOW) {
        semanticSearchRateLimitStore.set(key, { firstRequest: now, count: 1 });
        return true;
    }

    if (record.count >= SEMANTIC_SEARCH_RATE_LIMIT_MAX) {
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

// Risk Radar endpoint (server-side)
app.post('/api/risk-radar', async (req, res) => {
    try {
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        
        // Rate limiting
        if (!checkRateLimit(clientIp)) {
            return res.status(429).json({ 
                error: 'Rate limit exceeded. Please try again in a minute.' 
            });
        }

        const { industry, companySize, platformState, initiative, urgency, compliance, integration, constraints } = req.body;

        // Input validation
        if (!industry || !companySize || !platformState || !initiative) {
            return res.status(400).json({ 
                error: 'Missing required fields: industry, companySize, platformState, and initiative are required' 
            });
        }

        if (!process.env.VITE_GEMINI_API_KEY) {
            return res.status(500).json({ error: 'API Key not configured' });
        }

        const { SchemaType } = await import('@google/generative-ai');
        
        const prompt = `
REQUEST:
Industry: ${industry}
Company Size: ${companySize}
Current Platform State: ${platformState}
Primary Initiative: ${initiative}
Delivery Urgency: ${urgency || 'Not specified'}
Compliance Needs: ${compliance || 'Not specified'}
Integration Complexity: ${integration || 'Not specified'}
Constraints: ${constraints || 'None specified'}

TASK:
Generate a structured risk assessment and 3-week engagement plan for this modernization initiative.
Provide:
1. Top 3-5 risks with severity (high/medium/low), area, and mitigation
2. Key tradeoffs with 2-3 options showing pros/cons
3. Recommended 3-week engagement plan (Week 1, Week 2, Week 3 activities)
4. Deliverables list (4-6 items)

Keep output professional and focused on architecture/transformation risks.
Return ONLY valid JSON matching the schema.
`;

        const schema = {
            type: SchemaType.OBJECT,
            properties: {
                risks: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            title: { type: SchemaType.STRING },
                            severity: { type: SchemaType.STRING, enum: ['high', 'medium', 'low'] },
                            area: { type: SchemaType.STRING },
                            mitigation: { type: SchemaType.STRING }
                        },
                        required: ['title', 'severity', 'area', 'mitigation']
                    }
                },
                tradeoffs: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            title: { type: SchemaType.STRING },
                            options: {
                                type: SchemaType.ARRAY,
                                items: {
                                    type: SchemaType.OBJECT,
                                    properties: {
                                        label: { type: SchemaType.STRING },
                                        pros: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                                        cons: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
                                    },
                                    required: ['label', 'pros', 'cons']
                                }
                            }
                        },
                        required: ['title', 'options']
                    }
                },
                plan: {
                    type: SchemaType.OBJECT,
                    properties: {
                        week1: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                        week2: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                        week3: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
                    },
                    required: ['week1', 'week2', 'week3']
                },
                deliverables: {
                    type: SchemaType.ARRAY,
                    items: { type: SchemaType.STRING }
                }
            },
            required: ['risks', 'tradeoffs', 'plan', 'deliverables']
        };

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 4096,
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
        if (!data.risks || data.risks.length === 0) {
            return res.status(500).json({ error: 'Invalid response: missing risks' });
        }

        res.json(data);
    } catch (error) {
        console.error('Risk Radar error:', error);
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
        res.status(500).json({ error: 'Failed to generate risk assessment. Please try again.' });
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

// Semantic search endpoint (server-side)
app.post('/api/semantic-search', async (req, res) => {
    try {
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        
        // Rate limiting (more lenient for search) - disabled in development
        // In production, uncomment the following lines:
        // if (!checkSemanticSearchRateLimit(clientIp)) {
        //     return res.status(429).json({ 
        //         error: 'Rate limit exceeded. Please try again in a minute.' 
        //     });
        // }

        const { query } = req.body;

        // Input validation
        if (!query || typeof query !== 'string' || query.trim().length < 3) {
            return res.status(400).json({ 
                error: 'Query must be a string with at least 3 characters' 
            });
        }

        if (query.length > 200) {
            return res.status(400).json({ 
                error: 'Query must be under 200 characters' 
            });
        }

        if (!process.env.VITE_GEMINI_API_KEY) {
            return res.status(500).json({ error: 'API Key not configured' });
        }

        const { SchemaType } = await import('@google/generative-ai');
        
        // Load projects data - use comprehensive fallback list with cloud-related projects
        const projects = [
            { id: 'brita-ecommerce', slug: 'brita-ecommerce', header: { title: 'BRITA eCommerce Platform' }, technical: { after: { stack: ['Shopify', 'Vue.js', 'Azure', 'Cloud'] } }, outcomes: { hero_metric: { value: '6', label: 'Markets' }, secondary_metrics: [] }, challenge: { situation: 'Shopware to Shopify Plus migration for 6 EMEA markets with cloud infrastructure' } },
            { id: 'pact-protocol', slug: 'pact-protocol', header: { title: 'PACT PCF Network' }, technical: { after: { stack: ['Next.js', 'React', 'Java', 'Cloud'] } }, outcomes: { hero_metric: { value: '20+', label: 'Adopted' }, secondary_metrics: [] }, challenge: { situation: 'Global Product Carbon Footprint data exchange standard' } },
            { id: 'delivery-hero-ads', slug: 'delivery-hero-ads', header: { title: 'Delivery Hero Display Ads' }, technical: { after: { stack: ['AWS', 'Kubernetes', 'Cloud'] } }, outcomes: { hero_metric: { value: '20%', label: 'Revenue Increase' }, secondary_metrics: [] }, challenge: { situation: 'High-scale display ads platform with 5M+ daily transactions on cloud infrastructure' } },
            { id: 'boehringer-aiml', slug: 'boehringer-aiml', header: { title: 'Boehringer Ingelheim AI/ML Platform' }, technical: { after: { stack: ['Azure', 'Spark', 'Kafka', 'Cloud'] } }, outcomes: { hero_metric: { value: '50%', label: 'Faster Insights' }, secondary_metrics: [] }, challenge: { situation: 'Enterprise AI/ML Data Lake implementation with GDPR compliance on Azure cloud' } },
            { id: 'pwc-healthcare', slug: 'pwc-healthcare', header: { title: 'PwC Healthcare Modernization' }, technical: { after: { stack: ['Azure', 'C#', '.NET', 'Cloud'] } }, outcomes: { hero_metric: { value: '$650K', label: 'Savings' }, secondary_metrics: [] }, challenge: { situation: 'Legacy e-commerce and healthcare systems modernization with HIPAA compliance on cloud' } },
            { id: 'app-rationalization-cloud-readiness', slug: 'app-rationalization-cloud-readiness', header: { title: 'Application Rationalization & Cloud Readiness Framework' }, technical: { after: { stack: ['AWS', 'Azure', 'Migration Tools', 'Cloud'] } }, outcomes: { hero_metric: { value: '1000+', label: 'Apps Analyzed' }, secondary_metrics: [] }, challenge: { situation: 'Enterprises with 1000+ apps struggled to decide what to move to cloud, leading to stalled migrations or lift-and-shift cost disasters' } }
        ];

        // Flatten projects for context
        const PROJECT_CONTEXT = projects.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.header.title,
            technologies: p.technical.after?.stack || [],
            outcomes: [p.outcomes.hero_metric.value + ' ' + p.outcomes.hero_metric.label, ...p.outcomes.secondary_metrics.map((m) => m.value + ' ' + m.label)],
            summary: p.challenge.situation
        })).map(p => JSON.stringify(p)).join('\n');

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

        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: 'application/json',
                responseSchema: schema
            }
        });
        
        const responseText = result.response.text();
        if (!responseText || responseText.trim() === '') {
            return res.json([]);
        }
        
        const parsed = JSON.parse(responseText);
        
        // Validate results
        if (!Array.isArray(parsed)) {
            return res.json([]);
        }
        
        res.json(parsed);
    } catch (error) {
        console.error('Semantic search error:', error);
        if (error instanceof Error) {
            if (error.message.includes('API key') || error.message.includes('API Key')) {
                return res.status(500).json({ error: 'API configuration error. Please contact support.' });
            }
            if (error.message.includes('quota') || error.message.includes('Quota') || error.message.includes('429')) {
                return res.status(429).json({ error: 'API quota exceeded. Please try again later.' });
            }
        }
        res.status(500).json({ error: 'Failed to perform search. Please try again.' });
    }
});

// Lead capture endpoint
// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const leadsFilePath = path.join(__dirname, '../leads.json');

// Ensure leads file exists
if (!fs.existsSync(leadsFilePath)) {
    fs.writeFileSync(leadsFilePath, JSON.stringify([], null, 2));
}

// Email configuration
const createEmailTransporter = () => {
    // If SMTP is configured, use it
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const port = parseInt(process.env.SMTP_PORT || '587', 10);
        const secure = process.env.SMTP_SECURE === 'true';
        const isGmail = process.env.SMTP_HOST === 'smtp.gmail.com';
        
        // For Gmail, ensure STARTTLS (port 587, secure: false)
        const config = {
            host: process.env.SMTP_HOST,
            port: port,
            secure: secure, // false for STARTTLS (port 587), true for SSL (port 465)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            // Gmail-specific settings for STARTTLS
            ...(isGmail && {
                requireTLS: true,
                tls: {
                    rejectUnauthorized: false // For dev/testing
                }
            })
        };
        
        console.log('[SMTP] Creating transporter with config:', {
            host: config.host,
            port: config.port,
            secure: config.secure,
            user: config.auth.user,
            isGmail: isGmail,
            requireTLS: config.requireTLS || false
        });
        
        const transporter = nodemailer.createTransport(config);
        
        // Verify connection on creation (async, but we'll catch errors in send)
        transporter.verify().catch((err) => {
            console.error('[SMTP] ❌ Connection verification failed');
            console.error('[SMTP] Error message:', err.message);
            console.error('[SMTP] Error code:', err.code);
            
            if (err.code === 'EAUTH') {
                console.error('[SMTP] ❌ Authentication failed!');
                console.error('[SMTP] Check the following:');
                console.error('   - SMTP_USER:', process.env.SMTP_USER);
                console.error('   - SMTP_PASS: [REDACTED - check if correct]');
                console.error('   - For Gmail: Ensure you are using an App Password, not your regular password');
                console.error('   - Generate App Password: https://myaccount.google.com/apppasswords');
                console.error('   - Make sure 2-Step Verification is enabled on your Google account');
            } else if (err.code === 'ECONNECTION') {
                console.error('[SMTP] ❌ Connection failed!');
                console.error('[SMTP] Check the following:');
                console.error('   - SMTP_HOST:', process.env.SMTP_HOST);
                console.error('   - SMTP_PORT:', process.env.SMTP_PORT);
                console.error('   - Network connectivity');
                console.error('   - Firewall settings');
            } else if (err.code === 'ETIMEDOUT') {
                console.error('[SMTP] ❌ Connection timeout!');
                console.error('[SMTP] Check network connectivity and firewall settings');
            } else {
                console.error('[SMTP] ❌ Unexpected error:', err);
                console.error('[SMTP] Full error details:', JSON.stringify(err, null, 2));
            }
        });
        
        return transporter;
    }
    
    console.warn('[SMTP] ⚠️  SMTP not configured. Missing required env vars:');
    if (!process.env.SMTP_HOST) console.warn('   - SMTP_HOST');
    if (!process.env.SMTP_USER) console.warn('   - SMTP_USER');
    if (!process.env.SMTP_PASS) console.warn('   - SMTP_PASS');
    
    return null;
};

// Generate guide email HTML
const generateGuideEmail = (lang = 'en') => {
    const decisions = {
        en: [
            { title: "Vendor reference architectures ≠ your architecture", desc: "Vendor reference architectures are starting points, not final solutions. They're optimized for the vendor's ecosystem, not your specific constraints, team capabilities, or business context." },
            { title: "\"Start with Kubernetes\" is often a maturity mismatch", desc: "Kubernetes requires significant operational maturity. Many teams jump to Kubernetes before they have the skills, processes, or scale to justify it, creating unnecessary complexity." },
            { title: "Ignoring integration complexity early creates hidden delivery risk", desc: "Integration patterns are often underestimated. Legacy systems, data formats, and API contracts create hidden complexity that can derail timelines if not addressed early." },
            { title: "Treating compliance as a constraint (not just documentation)", desc: "Compliance requirements (HIPAA, GDPR, PCI-DSS) must be architected into the system from day one, not added as documentation after the fact." },
            { title: "Not defining NFRs upfront", desc: "Non-functional requirements (performance, scalability, availability) are often vague or missing. Without clear NFRs, you can't make informed architecture decisions." },
            { title: "Confusing \"target state\" with \"end state\"", desc: "Target state is a milestone, not a final destination. Architecture should evolve. Treating it as a one-time destination leads to rigid, hard-to-maintain systems." },
            { title: "Big bang migrations instead of sequencing for value", desc: "Attempting to migrate everything at once is high-risk. Sequencing migrations by business value and technical dependencies reduces risk and delivers value incrementally." },
            { title: "Underestimating data migration and data ownership", desc: "Data migration is often the most complex and risky part of modernization. Data quality, ownership, and governance must be addressed early." },
            { title: "Operating model not aligned with architecture", desc: "A microservices architecture requires different operating models than monoliths. Team structure, deployment processes, and monitoring must align with the architecture." },
            { title: "Not creating a decision package (blueprint + risk register + roadmap)", desc: "Architecture decisions need documentation: a blueprint showing current and target state, a risk register with mitigation strategies, and a roadmap for execution." },
        ],
        de: [
            { title: "Vendor-Referenzarchitekturen ≠ Ihre Architektur", desc: "Vendor-Referenzarchitekturen sind Ausgangspunkte, keine finalen Lösungen. Sie sind für das Ökosystem des Vendors optimiert, nicht für Ihre spezifischen Constraints, Team-Fähigkeiten oder Business-Kontext." },
            { title: "\"Start mit Kubernetes\" ist oft ein Reifegrad-Mismatch", desc: "Kubernetes erfordert erhebliche operative Reife. Viele Teams springen zu Kubernetes, bevor sie die Fähigkeiten, Prozesse oder Skalierung haben, um es zu rechtfertigen, was unnötige Komplexität schafft." },
            { title: "Frühes Ignorieren der Integrationskomplexität erzeugt verstecktes Delivery-Risiko", desc: "Integrationsmuster werden oft unterschätzt. Legacy-Systeme, Datenformate und API-Verträge schaffen versteckte Komplexität, die Zeitpläne durcheinander bringen kann, wenn sie nicht früh angegangen wird." },
            { title: "Compliance als Constraint behandeln (nicht nur Dokumentation)", desc: "Compliance-Anforderungen (HIPAA, GDPR, PCI-DSS) müssen von Tag eins an in die Architektur des Systems integriert werden, nicht als Dokumentation nachträglich hinzugefügt." },
            { title: "NFRs nicht von Anfang an definieren", desc: "Nicht-funktionale Anforderungen (Performance, Skalierbarkeit, Verfügbarkeit) sind oft vage oder fehlen. Ohne klare NFRs können Sie keine informierten Architekturentscheidungen treffen." },
            { title: "\"Zielzustand\" mit \"Endzustand\" verwechseln", desc: "Zielzustand ist ein Meilenstein, kein finales Ziel. Architektur sollte sich entwickeln. Sie als einmaliges Ziel zu behandeln führt zu starren, schwer wartbaren Systemen." },
            { title: "Big-Bang-Migrationen statt Sequenzierung nach Wert", desc: "Der Versuch, alles auf einmal zu migrieren, ist hochriskant. Die Sequenzierung von Migrationen nach Geschäftswert und technischen Abhängigkeiten reduziert Risiken und liefert Wert inkrementell." },
            { title: "Datenmigration und Datenbesitz unterschätzen", desc: "Datenmigration ist oft der komplexeste und riskanteste Teil der Modernisierung. Datenqualität, Besitz und Governance müssen früh angegangen werden." },
            { title: "Operating Model nicht mit Architektur abgestimmt", desc: "Eine Microservices-Architektur erfordert andere Operating Models als Monolithen. Teamstruktur, Deployment-Prozesse und Monitoring müssen mit der Architektur übereinstimmen." },
            { title: "Kein Decision Package erstellen (Blueprint + Risiko-Register + Roadmap)", desc: "Architekturentscheidungen brauchen Dokumentation: einen Blueprint mit Ist- und Zielzustand, ein Risiko-Register mit Mitigationsstrategien und eine Roadmap für die Umsetzung." },
        ],
    };

    const content = decisions[lang] || decisions.en;
    const ctaText = lang === 'de' 
        ? "Möchten Sie diese Entscheidungen im Kontext Ihrer Architektur diskutieren?"
        : "Want to discuss these decisions in the context of your architecture?";
    const ctaButton = lang === 'de' ? "Discovery Call buchen" : "Book a discovery call";
    const guideTitle = lang === 'de' 
        ? "10 Architekturentscheidungen, die unnötige Risiken (und Kosten) erzeugen"
        : "10 Architecture Decisions That Create Unnecessary Risk (and Cost)";

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${guideTitle}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">${guideTitle}</h1>
        <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 14px;">A vendor-neutral checklist for modernization decisions</p>
    </div>
    
    <div style="background: #ffffff; padding: 30px 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="color: #64748b; margin-bottom: 30px;">Short, practical, and based on real enterprise patterns.</p>
        
        ${content.map((decision, index) => `
            <div style="margin-bottom: 25px; padding-bottom: 25px; border-bottom: ${index < content.length - 1 ? '1px solid #e2e8f0' : 'none'};">
                <h2 style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0 0 10px 0;">
                    ${index + 1}. ${decision.title}
                </h2>
                <p style="color: #475569; font-size: 14px; margin: 0; line-height: 1.6;">
                    ${decision.desc}
                </p>
            </div>
        `).join('')}
        
        <div style="margin-top: 40px; padding: 30px; background: #f1f5f9; border-radius: 8px; text-align: center;">
            <p style="color: #475569; margin-bottom: 20px; font-size: 16px;">
                ${ctaText}
            </p>
            <a href="https://calendly.com/prasad-sgsits/30min" style="display: inline-block; background: #059669; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                ${ctaButton}
            </a>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 30px; text-align: center;">
            Prasad Tilloo | Independent Architecture & Transformation Consultant<br>
            <a href="https://prasadtilloo.com" style="color: #059669;">prasadtilloo.com</a>
        </p>
    </div>
</body>
</html>
    `.trim();
};

app.post('/api/lead', async (req, res) => {
    try {
        const { email, language } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Valid email is required' });
        }

        // Validate and normalize language
        const lang = (language === 'de' || language === 'en') ? language : 'en';

        // Read existing leads
        let leads = [];
        try {
            if (fs.existsSync(leadsFilePath)) {
                const data = fs.readFileSync(leadsFilePath, 'utf8');
                leads = JSON.parse(data);
            }
        } catch (err) {
            console.error('Error reading leads file:', err);
            leads = [];
        }

        // Check if email already exists
        if (leads.some(lead => lead.email === email)) {
            return res.status(200).json({ success: true, message: 'Email already registered' });
        }

        // Add new lead with language preference
        const newLead = {
            email,
            language: lang,
            timestamp: new Date().toISOString(),
            source: 'guide',
            consent: true // User must have consented to submit
        };

        leads.push(newLead);

        // Write back to file
        try {
            fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
        } catch (writeErr) {
            console.error('Error writing leads file:', writeErr);
            // Still return success even if file write fails (graceful degradation)
        }

        // Send guide via email
        try {
            const transporter = createEmailTransporter();
            const fromEmail = process.env.FROM_EMAIL;
            const fromName = process.env.FROM_NAME || 'Prasad Tilloo';
            
            if (!fromEmail) {
                console.warn('[WARN] FROM_EMAIL not configured. Email sending disabled.');
                console.warn('[WARN] Set FROM_EMAIL in .env.local to enable email sending.');
                return res.status(200).json({ 
                    success: true, 
                    message: 'Email captured successfully',
                    warning: 'Email sending not configured. Guide will be sent once SMTP is configured.'
                });
            }

            const guideTitle = lang === 'de' 
                ? "10 Architekturentscheidungen, die unnötige Risiken (und Kosten) erzeugen"
                : "10 Architecture Decisions That Create Unnecessary Risk (and Cost)";
            
            if (transporter) {
                // Send email using configured SMTP
                try {
                    await transporter.sendMail({
                        from: `"${fromName}" <${fromEmail}>`,
                        to: email,
                        subject: guideTitle,
                        html: generateGuideEmail(lang),
                        text: generateGuideEmail(lang).replace(/<[^>]*>/g, ''), // Plain text version
                    });
                    console.log(`✅ Guide email sent to ${email} (${lang})`);
                } catch (sendError) {
                    // Enhanced error logging for SMTP issues
                    console.error('[SMTP] ❌ Failed to send guide email');
                    console.error('[SMTP] Error message:', sendError.message);
                    console.error('[SMTP] Error code:', sendError.code);
                    
                    if (sendError.code === 'EAUTH') {
                        console.error('[SMTP] ❌ Authentication failed!');
                        console.error('[SMTP] Check the following:');
                        console.error('   - SMTP_USER:', process.env.SMTP_USER);
                        console.error('   - SMTP_PASS: [REDACTED - verify it is correct]');
                        console.error('   - For Gmail: Ensure you are using an App Password (not regular password)');
                        console.error('   - Generate App Password: https://myaccount.google.com/apppasswords');
                        console.error('   - Make sure 2-Step Verification is enabled on your Google account');
                        console.error('   - Verify the App Password was copied correctly (no extra spaces)');
                    } else if (sendError.code === 'ECONNECTION') {
                        console.error('[SMTP] ❌ Connection failed!');
                        console.error('[SMTP] Check the following:');
                        console.error('   - SMTP_HOST:', process.env.SMTP_HOST);
                        console.error('   - SMTP_PORT:', process.env.SMTP_PORT);
                        console.error('   - Network connectivity');
                        console.error('   - Firewall settings');
                    } else if (sendError.code === 'ETIMEDOUT') {
                        console.error('[SMTP] ❌ Connection timeout!');
                        console.error('[SMTP] Check network connectivity and firewall settings');
                    } else {
                        console.error('[SMTP] ❌ Unexpected error:', sendError);
                        console.error('[SMTP] Full error details:', JSON.stringify(sendError, Object.getOwnPropertyNames(sendError), 2));
                    }
                    throw sendError; // Re-throw to be caught by outer catch
                }
            } else {
                // SMTP not configured - fail gracefully
                console.warn(`[WARN] SMTP not configured. Guide email not sent to ${email}`);
                console.warn('[WARN] Configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local to enable email sending');
                return res.status(200).json({ 
                    success: true, 
                    message: 'Email captured successfully',
                    warning: 'SMTP not configured. Guide will be sent once email service is configured.'
                });
            }
        } catch (emailError) {
            console.error('Error sending guide email:', emailError);
            // Don't fail the request if email fails - lead is still captured
            // Log the error but return success
            return res.status(200).json({ 
                success: true, 
                message: 'Email captured successfully',
                warning: 'Email sending failed. Please contact support if you do not receive the guide.'
            });
        }

        res.status(200).json({ success: true, message: 'Email captured successfully' });
    } catch (error) {
        console.error('Lead capture error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: 'Failed to capture lead', details: error.message });
    }
});

// Test email endpoint (dev-only)
app.post('/api/email/test', async (req, res) => {
    // Only allow in development
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ error: 'Test endpoint not available in production' });
    }

    try {
        const { email } = req.body;
        
        if (!email || !email.includes('@')) {
            return res.status(400).json({ error: 'Valid email address is required' });
        }

        const transporter = createEmailTransporter();
        const fromEmail = process.env.FROM_EMAIL;
        const fromName = process.env.FROM_NAME || 'Prasad Tilloo';

        if (!transporter) {
            return res.status(500).json({ 
                error: 'SMTP not configured',
                details: 'Please configure SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local'
            });
        }

        if (!fromEmail) {
            return res.status(500).json({ 
                error: 'FROM_EMAIL not configured',
                details: 'Please configure FROM_EMAIL in .env.local'
            });
        }

        console.log('[TEST EMAIL] Sending test email to:', email);
        console.log('[TEST EMAIL] From:', `${fromName} <${fromEmail}>`);

        // Send test email
        const testEmailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SMTP Test Email</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">✅ SMTP Configuration Test</h1>
        <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">Your email configuration is working correctly!</p>
    </div>
    
    <div style="background: #ffffff; padding: 30px 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="color: #64748b; margin-bottom: 20px;">
            This is a test email to verify your SMTP configuration.
        </p>
        
        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0f172a; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">Configuration Details:</h2>
            <ul style="color: #475569; font-size: 14px; margin: 0; padding-left: 20px;">
                <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST || 'Not set'}</li>
                <li><strong>SMTP Port:</strong> ${process.env.SMTP_PORT || 'Not set'}</li>
                <li><strong>SMTP Secure:</strong> ${process.env.SMTP_SECURE || 'Not set'}</li>
                <li><strong>From Email:</strong> ${fromEmail}</li>
                <li><strong>From Name:</strong> ${fromName}</li>
                <li><strong>Test Time:</strong> ${new Date().toISOString()}</li>
            </ul>
        </div>
        
        <p style="color: #64748b; font-size: 14px; margin: 0;">
            If you received this email, your SMTP configuration is working correctly and you can proceed with sending guide emails.
        </p>
    </div>
</body>
</html>
        `.trim();

        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: email,
            subject: '✅ SMTP Configuration Test - Portfolio',
            html: testEmailContent,
            text: 'This is a test email to verify your SMTP configuration. If you received this, your email setup is working correctly!'
        });

        console.log('[TEST EMAIL] ✅ Test email sent successfully to:', email);

        res.status(200).json({ 
            success: true, 
            message: 'Test email sent successfully',
            details: {
                to: email,
                from: `${fromName} <${fromEmail}>`,
                smtpHost: process.env.SMTP_HOST,
                smtpPort: process.env.SMTP_PORT,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('[TEST EMAIL] ❌ Failed to send test email');
        console.error('[TEST EMAIL] Error:', error.message);
        console.error('[TEST EMAIL] Error code:', error.code);
        
        if (error.code === 'EAUTH') {
            return res.status(500).json({ 
                error: 'SMTP Authentication failed',
                details: 'Check SMTP_USER and SMTP_PASS. For Gmail, ensure you are using an App Password.',
                code: error.code
            });
        } else if (error.code === 'ECONNECTION') {
            return res.status(500).json({ 
                error: 'SMTP Connection failed',
                details: 'Check SMTP_HOST and SMTP_PORT, and verify network connectivity.',
                code: error.code
            });
        } else if (error.code === 'ETIMEDOUT') {
            return res.status(500).json({ 
                error: 'SMTP Connection timeout',
                details: 'Check network connectivity and firewall settings.',
                code: error.code
            });
        }
        
        res.status(500).json({ 
            error: 'Failed to send test email',
            details: error.message,
            code: error.code
        });
    }
});

// Serve static files from the React app
// (__filename and __dirname already declared above for lead capture endpoint)

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
