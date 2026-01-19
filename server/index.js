import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { contextData } from './context.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import createLeadStore, { logLeadStoreConfig } from './leadStore/index.js';
import { safeStr } from './utils.js';
import { getFeatureFlags, logFeatureFlagsConfig } from './featureFlags.js';

dotenv.config({ path: '../.env.local' });

const app = express();
const port = process.env.PORT || 3001;

// Email contact helper - consistent fallback pattern
const getContactEmail = () => {
    return process.env.CONTACT_EMAIL || process.env.REPLY_TO_EMAIL || process.env.FROM_EMAIL || 'prasad.sgsits@gmail.com';
};

// Fail-safe validation for domain email
const validateEmailConfig = () => {
    const contactEmail = process.env.CONTACT_EMAIL;
    const replyToEmail = process.env.REPLY_TO_EMAIL;
    
    if (contactEmail && contactEmail.endsWith('@prasadtilloo.com') && replyToEmail && replyToEmail.includes('@gmail.com')) {
        console.warn('[EMAIL CONFIG] ⚠️  WARNING: CONTACT_EMAIL looks like domain email but may not exist.');
        console.warn('[EMAIL CONFIG] CONTACT_EMAIL:', contactEmail);
        console.warn('[EMAIL CONFIG] REPLY_TO_EMAIL:', replyToEmail);
        console.warn('[EMAIL CONFIG] Set CONTACT_EMAIL to a real inbox (e.g., Gmail) until domain mailbox is configured.');
    }
};

// Run validation on startup
validateEmailConfig();

// Initialize lead store
logLeadStoreConfig();

// Initialize feature flags logging
logFeatureFlagsConfig();

const leadStore = createLeadStore();

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
        // Feature flag check
        const { isFeatureEnabled } = await import('./featureFlags.js');
        if (!isFeatureEnabled('arch_generator', req)) {
            return res.status(403).json({ 
                error: 'Architecture Generator feature is currently disabled. Please contact support if you need access.' 
            });
        }

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
        
        // Debug: Check password length (help identify spacing issues)
        const passLength = process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0;
        if (isGmail && passLength !== 16 && passLength !== 20) {
            console.warn(`[SMTP] ⚠️  WARNING: Gmail App Password should be 16 chars (without spaces) or 20 chars (with spaces). Current length: ${passLength}`);
            console.warn('[SMTP] If password has spaces, remove them or Gmail auth will fail.');
        }
        
        console.log('[SMTP] Creating transporter with config:', {
            host: config.host,
            port: config.port,
            secure: config.secure,
            user: config.auth.user,
            passLength: passLength,
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

// Generate checklist email HTML (Vendor Proposal Review Checklist)
const generateChecklistEmail = (lang = 'en') => {
    const categories = {
        en: [
            {
                title: "CATEGORY 1: Architecture Quality & Trade-offs",
                checks: [
                    "Are 2+ alternative approaches presented?",
                    "Are trade-offs explicitly documented?",
                    "Is architecture modular (avoid lock-in)?",
                    "Does it match actual scale (not over-engineered)?",
                    "Are integration points well-defined?"
                ],
                redFlags: [
                    "Single vendor \"recommended architecture\"",
                    "No alternatives discussed",
                    "Over-engineered for current scale"
                ],
                goodPractice: [
                    "2-3 options with pros/cons",
                    "Clear decision criteria",
                    "Right-sized for 12-24 month horizon"
                ]
            },
            {
                title: "CATEGORY 2: Cost Transparency & FinOps",
                checks: [
                    "Is pricing broken down by component?",
                    "Are hidden costs surfaced (egress, support, licensing)?",
                    "Is cost compared to alternatives?",
                    "Is cost model aligned to growth?",
                    "Is there cost optimization plan?"
                ],
                redFlags: [
                    "Opaque pricing",
                    "\"Contact for pricing\"",
                    "No comparison to alternatives"
                ],
                goodPractice: [
                    "Detailed cost breakdown",
                    "TCO analysis (3-5 years)",
                    "Cost optimization roadmap"
                ]
            },
            {
                title: "CATEGORY 3: Risk Management & Compliance",
                checks: [
                    "Are compliance requirements mapped?",
                    "Is there rollback/rollforward plan?",
                    "Are dependencies identified?",
                    "Is vendor lock-in risk assessed?",
                    "Are single points of failure documented?"
                ],
                redFlags: [
                    "No compliance discussion",
                    "No rollback plan",
                    "Proprietary formats/APIs"
                ],
                goodPractice: [
                    "Compliance mapped to standards",
                    "Risk register with mitigations",
                    "Exit strategy documented"
                ]
            },
            {
                title: "CATEGORY 4: Integration & Sequencing",
                checks: [
                    "Are existing systems mapped?",
                    "Are integration patterns defined?",
                    "Is sequencing logical (dependencies)?",
                    "Are data migration risks identified?",
                    "Is there incremental delivery plan?"
                ],
                redFlags: [
                    "\"Lift and shift\" without analysis",
                    "Big-bang approach",
                    "No integration strategy"
                ],
                goodPractice: [
                    "Phased delivery (value increments)",
                    "Integration tested early",
                    "Dependencies mapped"
                ]
            },
            {
                title: "CATEGORY 5: Security Architecture",
                checks: [
                    "Is security built-in (not bolted-on)?",
                    "Are threat models documented?",
                    "Is zero-trust approach used?",
                    "Are secrets management defined?",
                    "Is observability included?"
                ],
                redFlags: [
                    "Security as afterthought",
                    "No threat modeling",
                    "Shared credentials"
                ],
                goodPractice: [
                    "Security-first design",
                    "Defense in depth",
                    "Automated compliance checks"
                ]
            },
            {
                title: "CATEGORY 6: Delivery Realism",
                checks: [
                    "Is timeline based on similar projects?",
                    "Are assumptions documented?",
                    "Is team capacity validated?",
                    "Are unknowns acknowledged?",
                    "Is there buffer for risks?"
                ],
                redFlags: [
                    "Aggressive timeline with no justification",
                    "No risk buffer",
                    "Assumes ideal conditions"
                ],
                goodPractice: [
                    "Timeline based on benchmarks",
                    "Risk-adjusted estimates",
                    "Phased milestones"
                ]
            },
            {
                title: "CATEGORY 7: Team & Operating Model",
                checks: [
                    "Is team structure defined?",
                    "Are skills gaps identified?",
                    "Is operating model clear (DevOps/SRE)?",
                    "Is knowledge transfer planned?",
                    "Is runbook/documentation included?"
                ],
                redFlags: [
                    "No team discussion",
                    "Assumes existing skills",
                    "No training plan"
                ],
                goodPractice: [
                    "Skills assessment done",
                    "Training included",
                    "Runbooks delivered"
                ]
            }
        ],
        de: [
            {
                title: "KATEGORIE 1: Architekturqualität & Trade-offs",
                checks: [
                    "Werden 2+ alternative Ansätze präsentiert?",
                    "Sind Trade-offs explizit dokumentiert?",
                    "Ist die Architektur modular (Lock-in vermeiden)?",
                    "Entspricht sie dem tatsächlichen Maßstab (nicht über-engineered)?",
                    "Sind Integrationspunkte klar definiert?"
                ],
                redFlags: [
                    "Einzelne Vendor-\"Empfohlene Architektur\"",
                    "Keine Alternativen diskutiert",
                    "Über-engineered für aktuellen Maßstab"
                ],
                goodPractice: [
                    "2-3 Optionen mit Vor-/Nachteilen",
                    "Klare Entscheidungskriterien",
                    "Richtig dimensioniert für 12-24 Monate"
                ]
            },
            {
                title: "KATEGORIE 2: Kostentransparenz & FinOps",
                checks: [
                    "Ist die Preisgestaltung nach Komponenten aufgeschlüsselt?",
                    "Werden versteckte Kosten aufgedeckt (Egress, Support, Lizenzen)?",
                    "Wird der Preis mit Alternativen verglichen?",
                    "Ist das Kostenmodell auf Wachstum ausgerichtet?",
                    "Gibt es einen Kostenoptimierungsplan?"
                ],
                redFlags: [
                    "Intransparente Preisgestaltung",
                    "\"Preis auf Anfrage\"",
                    "Kein Vergleich zu Alternativen"
                ],
                goodPractice: [
                    "Detaillierte Kostenaufschlüsselung",
                    "TCO-Analyse (3-5 Jahre)",
                    "Kostenoptimierungs-Roadmap"
                ]
            },
            {
                title: "KATEGORIE 3: Risikomanagement & Compliance",
                checks: [
                    "Sind Compliance-Anforderungen abgebildet?",
                    "Gibt es einen Rollback/Rollforward-Plan?",
                    "Sind Abhängigkeiten identifiziert?",
                    "Wird Vendor Lock-in-Risiko bewertet?",
                    "Sind Single Points of Failure dokumentiert?"
                ],
                redFlags: [
                    "Keine Compliance-Diskussion",
                    "Kein Rollback-Plan",
                    "Proprietäre Formate/APIs"
                ],
                goodPractice: [
                    "Compliance Standards zugeordnet",
                    "Risikoregister mit Mitigationen",
                    "Exit-Strategie dokumentiert"
                ]
            },
            {
                title: "KATEGORIE 4: Integration & Sequenzierung",
                checks: [
                    "Sind bestehende Systeme abgebildet?",
                    "Sind Integrationsmuster definiert?",
                    "Ist die Sequenzierung logisch (Abhängigkeiten)?",
                    "Sind Datenmigrationsrisiken identifiziert?",
                    "Gibt es einen inkrementellen Lieferplan?"
                ],
                redFlags: [
                    "\"Lift and Shift\" ohne Analyse",
                    "Big-Bang-Ansatz",
                    "Keine Integrationsstrategie"
                ],
                goodPractice: [
                    "Phasenweise Lieferung (Wertinkremente)",
                    "Integration früh getestet",
                    "Abhängigkeiten abgebildet"
                ]
            },
            {
                title: "KATEGORIE 5: Sicherheitsarchitektur",
                checks: [
                    "Ist Sicherheit eingebaut (nicht nachträglich)?",
                    "Sind Bedrohungsmodelle dokumentiert?",
                    "Wird Zero-Trust-Ansatz verwendet?",
                    "Ist Secrets Management definiert?",
                    "Ist Observability enthalten?"
                ],
                redFlags: [
                    "Sicherheit als Nachgedanke",
                    "Keine Bedrohungsmodellierung",
                    "Geteilte Credentials"
                ],
                goodPractice: [
                    "Security-First-Design",
                    "Defense in Depth",
                    "Automatisierte Compliance-Checks"
                ]
            },
            {
                title: "KATEGORIE 6: Lieferrealismus",
                checks: [
                    "Basiert der Zeitplan auf ähnlichen Projekten?",
                    "Sind Annahmen dokumentiert?",
                    "Ist Teamkapazität validiert?",
                    "Werden Unbekannte anerkannt?",
                    "Gibt es einen Puffer für Risiken?"
                ],
                redFlags: [
                    "Aggressiver Zeitplan ohne Begründung",
                    "Kein Risikopuffer",
                    "Geht von idealen Bedingungen aus"
                ],
                goodPractice: [
                    "Zeitplan basierend auf Benchmarks",
                    "Risikoadjustierte Schätzungen",
                    "Phasenweise Meilensteine"
                ]
            },
            {
                title: "KATEGORIE 7: Team & Operating Model",
                checks: [
                    "Ist Teamstruktur definiert?",
                    "Sind Kompetenzlücken identifiziert?",
                    "Ist Operating Model klar (DevOps/SRE)?",
                    "Ist Wissenstransfer geplant?",
                    "Sind Runbooks/Dokumentation enthalten?"
                ],
                redFlags: [
                    "Keine Team-Diskussion",
                    "Geht von bestehenden Fähigkeiten aus",
                    "Kein Schulungsplan"
                ],
                goodPractice: [
                    "Kompetenzbewertung durchgeführt",
                    "Schulung enthalten",
                    "Runbooks geliefert"
                ]
            }
        ]
    };

    const content = categories[lang] || categories.en;
    const checklistTitle = lang === 'de' 
        ? "Angebotsprüfungs-Checkliste (Herstellerneutral)"
        : "Vendor Proposal Review Checklist (Vendor-Neutral)";
    
    const howToUse = lang === 'de'
        ? "WIE SIE ES VERWENDEN:\n\n1. Überprüfen Sie jede Kategorie gegen Ihr aktuelles Angebot\n2. Aktivieren Sie Kontrollkästchen für Punkte, die das Angebot gut abdeckt\n3. Notieren Sie Warnsignale oder fehlende Elemente\n4. Berechnen Sie Ihre Punktzahl (Seite 12)"
        : "HOW TO USE IT:\n\n1. Review each category against your current proposal\n2. Check boxes for items the proposal addresses well\n3. Note red flags or missing elements\n4. Calculate your score (page 12)";

    const scoringTitle = lang === 'de' ? "BEWERTUNG" : "SCORING SECTION";
    const scoringText = lang === 'de'
        ? "Zählen Sie Häkchen pro Kategorie.\nGesamtpunktzahl = Summe aller Häkchen (max 35)\n\n0-12 Punkte: HOHES RISIKO\n→ Erhebliche Lücken. Empfehlung: Unabhängige Überprüfung vor Verpflichtung.\n\n13-24 Punkte: MODERATES RISIKO\n→ Einige Lücken zu beheben. Mit Vendor klären oder unabhängig validieren.\n\n25-35 Punkte: NIEDRIGES RISIKO\n→ Angebot erscheint gründlich. Spezifische Details vor Unterzeichnung prüfen."
        : "Count checkmarks per category.\nTotal score = sum of all checkmarks (max 35)\n\n0-12 points: HIGH RISK\n→ Significant gaps. Recommend independent review before committing.\n\n13-24 points: MODERATE RISK\n→ Some gaps to address. Clarify with vendor or validate independently.\n\n25-35 points: LOW RISK\n→ Proposal appears thorough. Review specific details before signing.";

    const ctaText = lang === 'de'
        ? "Wenn Sie <25 Punkte erzielt haben oder Lücken in kritischen Kategorien gefunden haben, erwägen Sie eine herstellerneutrale zweite Meinung."
        : "If you scored <25 or found gaps in critical categories, consider a vendor-neutral second opinion.";

    const ctaButton = lang === 'de' ? "30-Minuten-Beratung" : "30-minute consultation";
    const calendarLink = "https://calendly.com/prasad-sgsits/30min";
    const emailContact = getContactEmail();

    const greeting = lang === 'de' ? 'Hallo' : 'Hi';
    const pdfNote = lang === 'de'
        ? "Hier ist Ihre Checkliste—inline zur schnellen Referenz und als PDF zum Speichern/Teilen."
        : "Here's your checklist—inline for quick reference and as PDF for saving/sharing.";
    
    const optionalFeedbackTitle = lang === 'de' ? "OPTIONAL: FEEDBACK ERHALTEN" : "OPTIONAL: GET FEEDBACK";
    
    const psText = lang === 'de'
        ? "P.S. Wenn dies hilfreich war, teilen Sie es gerne mit Kollegen, die ähnliche Entscheidungen bewerten."
        : "P.S. If this was helpful, feel free to share with colleagues evaluating similar decisions.";

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${checklistTitle}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 700px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">${checklistTitle}</h1>
        <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 14px;">Professional architecture validation checklist</p>
    </div>
    
    <div style="background: #ffffff; padding: 30px 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="color: #475569; margin-bottom: 20px; font-size: 15px;">${greeting},</p>
        <p style="color: #475569; margin-bottom: 20px; font-size: 15px;">${pdfNote}</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-left: 4px solid #0284c7; border-radius: 4px; margin-bottom: 30px;">
            <h2 style="color: #0284c7; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">📋 HOW TO USE THIS:</h2>
            <div style="white-space: pre-line; color: #475569; font-size: 14px; line-height: 1.8;">
${howToUse}
            </div>
            <p style="color: #475569; font-size: 13px; margin: 12px 0 0 0; font-style: italic;">
                ${lang === 'de' ? 'Wenn Sie <25 Punkte erzielen, deutet dies normalerweise auf Bereiche hin, die es wert sind, mit einem unabhängigen Gutachter besprochen zu werden.' : 'If you score <25, that typically indicates areas worth discussing with an independent reviewer.'}
            </p>
        </div>
        
        ${content.map((category, catIndex) => `
            <div style="margin-bottom: 40px; padding-bottom: 30px; border-bottom: ${catIndex < content.length - 1 ? '2px solid #e2e8f0' : 'none'};">
                <div style="background: #f0f9ff; padding: 16px; border-left: 4px solid #0284c7; margin: 0 0 20px 0; border-radius: 4px;">
                    <h2 style="color: #0284c7; font-size: 18px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">
                        📋 ${category.title}
                    </h2>
                </div>
                
                <div style="margin-bottom: 20px;">
                    ${category.checks.map((check, index) => `
                        <div style="margin-bottom: 10px; padding-left: 25px; position: relative;">
                            <span style="position: absolute; left: 0; top: 2px; width: 18px; height: 18px; border: 2px solid #64748b; border-radius: 3px; display: inline-block;"></span>
                            <span style="color: #475569; font-size: 14px;">${check}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 16px; margin-bottom: 16px; border-radius: 4px;">
                    <strong style="color: #dc2626; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">⚠️ RED FLAGS:</strong>
                    <ul style="margin: 0; padding-left: 20px; color: #7f1d1d; font-size: 13px;">
                        ${category.redFlags.map(flag => `<li style="margin-bottom: 5px;">${flag}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 4px;">
                    <strong style="color: #16a34a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">✅ GOOD PRACTICE:</strong>
                    <ul style="margin: 0; padding-left: 20px; color: #14532d; font-size: 13px;">
                        ${category.goodPractice.map(practice => `<li style="margin-bottom: 5px;">${practice}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('')}
        
        <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-top: 40px; margin-bottom: 30px;">
            <h2 style="color: #0f172a; font-size: 18px; font-weight: 700; margin: 0 0 20px 0; text-transform: uppercase; text-align: center;">
                ${scoringTitle}
            </h2>
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="display: inline-block; text-align: left;">
                    <div style="margin: 8px 0;">
                        <span style="display: inline-block; width: 100px; background: #dc2626; height: 8px; border-radius: 4px; vertical-align: middle;"></span>
                        <span style="margin-left: 12px; color: #475569; font-size: 14px;">0-12: ${lang === 'de' ? 'HOHES RISIKO' : 'HIGH RISK'}</span>
                    </div>
                    <div style="margin: 8px 0;">
                        <span style="display: inline-block; width: 150px; background: #f59e0b; height: 8px; border-radius: 4px; vertical-align: middle;"></span>
                        <span style="margin-left: 12px; color: #475569; font-size: 14px;">13-24: ${lang === 'de' ? 'MODERATES RISIKO' : 'MODERATE RISK'}</span>
                    </div>
                    <div style="margin: 8px 0;">
                        <span style="display: inline-block; width: 200px; background: #16a34a; height: 8px; border-radius: 4px; vertical-align: middle;"></span>
                        <span style="margin-left: 12px; color: #475569; font-size: 14px;">25-35: ${lang === 'de' ? 'NIEDRIGES RISIKO' : 'LOW RISK'}</span>
                    </div>
                </div>
            </div>
            <div style="white-space: pre-line; color: #475569; font-size: 14px; line-height: 1.8;">
${scoringText}
            </div>
        </div>
        
        <!-- What AI Cannot Validate Section -->
        <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 32px 0;">
            <h3 style="color: #92400e; font-size: 16px; font-weight: 700; margin: 0 0 16px 0; text-transform: uppercase;">
                ${lang === 'de' ? '⚠️ Was KI nicht für Sie validieren kann' : '⚠️ What AI Cannot Validate for You'}
            </h3>
            <p style="color: #78350f; font-size: 13px; margin: 0 0 16px 0;">
                ${lang === 'de' ? 'Diese kritischen Bereiche erfordern menschliches Urteil und Kontextverständnis:' : 'These critical areas require human judgment and contextual understanding:'}
            </p>
            <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 13px; line-height: 1.8;">
                <li style="margin-bottom: 8px;"><strong>${lang === 'de' ? 'Versteckte Kostentreiber' : 'Hidden cost drivers'}</strong> — ${lang === 'de' ? 'Support-Tiers, Observability, Data Egress, Lizenzen' : 'support tiers, observability, data egress, licensing'}</li>
                <li style="margin-bottom: 8px;"><strong>${lang === 'de' ? 'Delivery-Sequenzierungsrisiko' : 'Delivery sequencing risk'}</strong> — ${lang === 'de' ? 'Abhängigkeiten, Cutover-Strategie, Übergangsarchitektur' : 'dependencies, cutover strategy, transitional architecture'}</li>
                <li style="margin-bottom: 8px;"><strong>${lang === 'de' ? 'Organisations-Reifegrad-Mismatch' : 'Org maturity mismatch'}</strong> — ${lang === 'de' ? 'Kubernetes vor Platform-Ops; KI ohne Data-Ownership' : 'Kubernetes before platform ops; AI without data ownership'}</li>
                <li style="margin-bottom: 8px;"><strong>${lang === 'de' ? 'Integrationsrealität' : 'Integration reality'}</strong> — ${lang === 'de' ? 'API-Eigentum, Legacy-Einschränkungen, Partnersysteme' : 'API ownership, legacy constraints, partner systems, data contracts'}</li>
                <li style="margin-bottom: 8px;"><strong>${lang === 'de' ? 'Compliance-Lücken' : 'Compliance gaps'}</strong> — ${lang === 'de' ? 'DPIA, Datenresidenz, Audit-Bereitschaft, ISO-Kontrollen' : 'DPIA, residency, audit readiness, ISO controls'}</li>
            </ul>
            <p style="color: #92400e; font-size: 13px; font-weight: 600; margin: 16px 0 0 0; font-style: italic;">
                ${lang === 'de' ? 'Wenn Sie eine herstellerneutrale zweite Meinung wünschen, biete ich einen festen Architecture Review an.' : 'If you want a vendor-neutral second opinion, I offer a fixed-scope Architecture Review.'}
            </p>
        </div>
        
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 32px; border-radius: 12px; margin: 32px 0; text-align: center;">
            <h3 style="color: white; margin: 0 0 16px 0; font-size: 18px;">
                ${lang === 'de' ? 'Lücken in Ihrem Angebot gefunden?' : 'Found Gaps in Your Proposal?'}
            </h3>
            <p style="color: #cbd5e1; margin-bottom: 24px; font-size: 15px; line-height: 1.6;">
                ${ctaText}
            </p>
            <div style="margin-bottom: 16px;">
                <a href="https://calendly.com/prasad-sgsits/30min" style="display: inline-block; background: #10b981; color: #ffffff !important; padding: 16px 32px; border-radius: 8px; text-decoration: none !important; font-weight: bold; font-size: 15px;">
                    ${lang === 'de' ? '📅 30-Minuten-Beratung buchen' : '📅 Book 30-Minute Consultation'} (${lang === 'de' ? 'keine Verpflichtung' : 'no obligation'})
                </a>
            </div>
            <p style="color: #cbd5e1; font-size: 14px; margin: 0;">
                ${lang === 'de' ? `Falls relevant, können Sie auf diese E-Mail antworten oder mich unter ${emailContact} erreichen.` : `If relevant, you can reply to this email or reach me at ${emailContact}.`}
            </p>
        </div>
        
        <div style="border-top: 2px solid #e2e8f0; padding-top: 24px; margin-top: 32px;">
            <h3 style="color: #0f172a; font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">
                ${optionalFeedbackTitle}
            </h3>
            <div style="color: #475569; font-size: 14px; line-height: 1.8; margin-bottom: 16px;">
                <p style="margin: 0 0 12px 0;">${lang === 'de' ? 'Wenn Sie eine kurze zweite Meinung zu Ihrer spezifischen Situation wünschen, helfe ich gerne:' : "If you'd like a brief second opinion on your specific situation, I'm happy to provide feedback:"}</p>
                <ul style="margin: 0 0 12px 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">${lang === 'de' ? `Antworten Sie auf diese E-Mail oder schreiben Sie an ${emailContact} mit Ihrem Kontext (Cloud/Plattform/AI, Budgetrahmen, Zeitplan)` : `Reply to this email or contact ${emailContact} with your context (cloud/platform/AI, budget range, timeline)`}</li>
                    <li style="margin-bottom: 8px;">${lang === 'de' ? 'Oder buchen Sie eine 30-minütige Diskussion (unverbindlich)' : 'Or book a 30-minute discussion (no obligation)'}</li>
                </ul>
            </div>
            <div style="text-align: center; margin-bottom: 24px;">
                <a href="https://calendly.com/prasad-sgsits/30min" style="display: inline-block; background: #059669; color: #ffffff !important; padding: 12px 24px; text-decoration: none !important; border-radius: 6px; font-weight: 600; font-size: 14px; border: none;">
                    ${lang === 'de' ? '📅 30-Minuten-Beratung buchen' : '📅 Book 30-Minute Consultation'}
                </a>
            </div>
        </div>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 32px; color: #64748b; font-size: 14px;">
            <p style="margin-bottom: 8px; color: #0f172a; font-weight: 600;">
                <strong>Prasad Tilloo</strong> | Independent Architecture & Transformation Consultant
            </p>
            <p style="margin-bottom: 16px; line-height: 1.6;">
                Vendor-neutral advice • No implementation upsell • Based in Germany<br />
                Global delivery experience: North America, Europe, Asia, South America
            </p>
            <p style="margin-bottom: 16px;">
                🌐 <a href="https://prasadtilloo.com" style="color: #10b981; text-decoration: none;">prasadtilloo.com</a>
                &nbsp; | &nbsp;
                📧 <a href="mailto:${emailContact}" style="color: #10b981; text-decoration: none;">${emailContact}</a>
                &nbsp; | &nbsp;
                💼 <a href="https://linkedin.com/in/prasadtilloo" style="color: #10b981; text-decoration: none;">LinkedIn</a>
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; font-style: italic;">
                ${psText}
            </p>
            <p style="color: #94a3b8; font-size: 11px; margin-top: 16px;">
                ${lang === 'de' ? 'Sie haben dies erhalten, weil Sie die Angebotsprüfungs-Checkliste angefordert haben.' : 'You received this because you requested the Vendor Proposal Review Checklist.'}
                <br />
                ${lang === 'de' ? 'Kein Newsletter. Kein Spam.' : 'No newsletter. No spam.'}
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
};

// Generate PDF version of checklist
const generateChecklistPDF = async (lang = 'en') => {
    try {
        console.log('[PDF] Attempting to import pdfkit...');
        let PDFDocument;
        try {
            const pdfkitModule = await import('pdfkit');
            PDFDocument = pdfkitModule.default;
            console.log('[PDF] pdfkit imported successfully');
        } catch (importError) {
            console.error('[PDF] ❌ Failed to import pdfkit:', importError.message);
            console.error('[PDF] ⚠️  PDF generation unavailable. To enable PDF attachments:');
            console.error('[PDF]    1. Run: cd server && npm install pdfkit');
            console.error('[PDF]    2. Restart the server');
            console.error('[PDF]    Email will still be sent without PDF attachment.');
            // Return null to allow email to be sent without PDF
            return null;
        }
        const doc = new PDFDocument({ 
            margin: 60,
            size: 'LETTER',
            info: {
                Title: lang === 'de' ? 'Angebotsprüfungs-Checkliste' : 'Vendor Proposal Review Checklist',
                Author: 'Prasad Tilloo',
                Subject: 'Vendor Proposal Review Checklist'
            }
        });
        
        // Collect PDF data
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        
        // Helper function to add section
        const addSection = (title, fontSize = 14, isBold = true) => {
            doc.moveDown(0.8);
            doc.fontSize(fontSize);
            if (isBold) doc.font('Helvetica-Bold');
            else doc.font('Helvetica');
            doc.text(title, { align: 'left' });
            doc.moveDown(0.4);
        };
        
        const addText = (text, fontSize = 10, options = {}) => {
            doc.fontSize(fontSize);
            doc.font('Helvetica');
            const opts = { align: 'left', continued: false, ...options };
            doc.text(text, opts);
            doc.moveDown(0.25);
        };
        
        // Title Page
        doc.fontSize(24).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'Angebotsprüfungs-Checkliste' : 'Vendor Proposal Review Checklist', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(14).font('Helvetica');
        doc.text(lang === 'de' ? 'Herstellerneutrale Architekturbewertung' : 'Vendor-Neutral Architecture Validation', { align: 'center' });
        doc.moveDown(1.5);
        
        // How to Use
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'WIE SIE ES VERWENDEN:' : 'HOW TO USE IT:', { align: 'left' });
        doc.moveDown(0.5);
        doc.fontSize(10).font('Helvetica');
        doc.text('1. ' + (lang === 'de' ? 'Überprüfen Sie jede Kategorie gegen Ihr aktuelles Angebot' : 'Review each category against your current proposal'), { align: 'left' });
        doc.moveDown(0.3);
        doc.text('2. ' + (lang === 'de' ? 'Aktivieren Sie Kontrollkästchen für Punkte, die das Angebot gut abdeckt' : 'Check boxes for items the proposal addresses well'), { align: 'left' });
        doc.moveDown(0.3);
        doc.text('3. ' + (lang === 'de' ? 'Notieren Sie Warnsignale oder fehlende Elemente' : 'Note red flags or missing elements'), { align: 'left' });
        doc.moveDown(0.3);
        doc.text('4. ' + (lang === 'de' ? 'Berechnen Sie Ihre Punktzahl (siehe unten)' : 'Calculate your score (see below)'), { align: 'left' });
        doc.moveDown(0.5);
        doc.fontSize(9).font('Helvetica');
        doc.text((lang === 'de' ? 'Wenn Sie <25 Punkte erzielen, deutet dies normalerweise auf Bereiche hin, die es wert sind, mit einem unabhängigen Gutachter besprochen zu werden.' : 'If you score <25, that typically indicates areas worth discussing with an independent reviewer.'), { align: 'left' });
        doc.moveDown(1);
        
        // Top 7 Red Flags Executive Summary Page
        doc.addPage();
        doc.moveDown(0.5);
        
        doc.fontSize(18).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'TOP 7 VENDOR PROPOSAL RED FLAGS' : 'TOP 7 VENDOR PROPOSAL RED FLAGS', { align: 'center' });
        doc.moveDown(0.3);
        doc.fontSize(12).font('Helvetica');
        doc.text(lang === 'de' ? 'Quick scan for critical issues' : 'Quick scan for critical issues', { align: 'center' });
        doc.moveDown(1);
        
        doc.fontSize(10).font('Helvetica');
        doc.text(lang === 'de' 
            ? 'Wenn Sie 3+ davon in Ihrem Angebot sehen, stoppen Sie und holen Sie eine unabhängige Überprüfung ein, bevor Sie sich verpflichten.'
            : 'If you see 3+ of these in your proposal, stop and get an independent review before committing.', 
            { align: 'left', width: 500 });
        doc.moveDown(1);
        
        const redFlags = lang === 'de' ? [
            {
                number: 1,
                title: 'EINZEL-ARCHITEKTUR-ANGEBOT',
                whatItLooksLike: 'Nur ein Ansatz präsentiert, keine Alternativen diskutiert',
                whyProblem: 'Vendor optimiert für seinen Umsatz/Expertise, nicht für Ihre spezifischen Bedürfnisse',
                whatToAsk: 'Welche Alternativen haben Sie in Betracht gezogen? Warum haben Sie sie abgelehnt? Zeigen Sie mir den Vergleich.'
            },
            {
                number: 2,
                title: 'KEINE KOSTENAUFSCHLÜSSELUNG',
                whatItLooksLike: '"Preis auf Anfrage" oder Gesamtkosten ohne Komponentenaufschlüsselung',
                whyProblem: 'Versteckte Kosten tauchen später auf (Support-Verträge, Data Egress, Lizenzen, Schulungen)',
                whatToAsk: 'Zeigen Sie mir die Komponentenpreise für 3 Jahre. Was ist in diesem Angebot nicht enthalten?'
            },
            {
                number: 3,
                title: '"LIFT & SHIFT" MIGRATION',
                whatItLooksLike: 'Keine Analyse, was migriert/modernisiert werden sollte',
                whyProblem: 'Sie replizieren bestehende Probleme in der Cloud, verpassen Modernisierungsmöglichkeiten',
                whatToAsk: 'Welche Anwendungen sind Kandidaten für Modernisierung vs. Migration wie sie sind? Zeigen Sie mir die Entscheidungskriterien.'
            },
            {
                number: 4,
                title: 'KEIN ROLLBACK-PLAN',
                whatItLooksLike: 'Keine Diskussion über "Was ist, wenn dies fehlschlägt?" oder wie man Änderungen rückgängig macht',
                whyProblem: 'Bedeutet, dass der Vendor Risiken nicht durchdacht hat oder unrealistisches Vertrauen hat',
                whatToAsk: 'Wie ist die Rollback-Strategie in jeder Phase? Was kostet es, rückgängig zu machen?'
            },
            {
                number: 5,
                title: 'SICHERHEIT NACHTRÄGLICH ANGEFÜGT',
                whatItLooksLike: 'Sicherheit als separates Add-on oder Phase-2-Punkt diskutiert',
                whyProblem: 'Sicherheit sollte von Tag 1 an eingebaut sein, nicht später nachgerüstet werden',
                whatToAsk: 'Wie ist Sicherheit von Anfang an integriert? Zeigen Sie mir das Bedrohungsmodell.'
            },
            {
                number: 6,
                title: 'KEINE INTEGRATIONSMAPPING',
                whatItLooksLike: 'Bestehende Systeme als "Legacy Blackbox" ohne Integrationsarchitektur behandelt',
                whyProblem: 'Integrationskomplexität ist, wo die meisten Projekte scheitern oder große Verzögerungen erleben',
                whatToAsk: 'Zeigen Sie mir die Integrationsarchitektur. Was sind die Abhängigkeiten? Wie ist die Sequenzierung?'
            },
            {
                number: 7,
                title: 'AGGRESSIVER ZEITPLAN, KEINE BEGRÜNDUNG',
                whatItLooksLike: '"6 Wochen bis Produktion" oder sehr lange Zeitpläne ohne Benchmarks oder Annahmen',
                whyProblem: 'Entweder aufgebläht für maximale Abrechnung oder unrealistisch ohne Risikopuffer',
                whatToAsk: 'Welche ähnlichen Projekte haben diesen Zeitplan informiert? Welche Annahmen treffen Sie? Was ist der Risikopuffer?'
            }
        ] : [
            {
                number: 1,
                title: 'SINGLE-ARCHITECTURE PROPOSAL',
                whatItLooksLike: 'Only one approach presented, no alternatives discussed',
                whyProblem: 'Vendor optimizes for their revenue/expertise, not your specific needs',
                whatToAsk: 'What alternatives did you consider? Why did you reject them? Show me the comparison.'
            },
            {
                number: 2,
                title: 'NO COST BREAKDOWN',
                whatItLooksLike: '"Contact us for pricing" or total cost without component breakdown',
                whyProblem: 'Hidden costs emerge later (support contracts, data egress, licensing, training)',
                whatToAsk: 'Show me component-level pricing for 3 years. What\'s not included in this quote?'
            },
            {
                number: 3,
                title: '"LIFT & SHIFT" MIGRATION',
                whatItLooksLike: 'No analysis of what should/shouldn\'t migrate or be modernized',
                whyProblem: 'You replicate existing problems in the cloud, miss modernization opportunities',
                whatToAsk: 'Which applications are candidates to modernize vs migrate as-is? Show me the decision criteria.'
            },
            {
                number: 4,
                title: 'NO ROLLBACK PLAN',
                whatItLooksLike: 'No discussion of "what if this fails?" or how to revert changes',
                whyProblem: 'Means vendor hasn\'t thought through risks or has unrealistic confidence',
                whatToAsk: 'What\'s the rollback strategy at each phase? What\'s the cost to revert?'
            },
            {
                number: 5,
                title: 'SECURITY BOLTED ON',
                whatItLooksLike: 'Security discussed as separate add-on or Phase 2 item',
                whyProblem: 'Security should be built-in from day 1, not retrofitted later',
                whatToAsk: 'How is security integrated from the beginning? Show me the threat model.'
            },
            {
                number: 6,
                title: 'NO INTEGRATION MAPPING',
                whatItLooksLike: 'Existing systems treated as "legacy blackbox" with no integration architecture',
                whyProblem: 'Integration complexity is where most projects fail or experience major delays',
                whatToAsk: 'Show me the integration architecture. What are the dependencies? What\'s the sequencing?'
            },
            {
                number: 7,
                title: 'AGGRESSIVE TIMELINE, NO JUSTIFICATION',
                whatItLooksLike: '"6 weeks to production" or very long timelines with no benchmarks or assumptions',
                whyProblem: 'Either padded for maximum billing or unrealistic without risk buffer',
                whatToAsk: 'What similar projects informed this timeline? What assumptions are you making? What\'s the risk buffer?'
            }
        ];
        
        redFlags.forEach((flag, idx) => {
            if (idx > 0 && idx % 2 === 0) {
                doc.addPage();
                doc.moveDown(0.3);
            }
            
            doc.fontSize(11).font('Helvetica-Bold');
            doc.text(`[!] RED FLAG #${flag.number}: ${flag.title}`, { align: 'left' });
            doc.moveDown(0.3);
            
            doc.fontSize(9).font('Helvetica-Bold');
            doc.text(lang === 'de' ? 'Wie es aussieht:' : 'What it looks like:', { align: 'left' });
            doc.fontSize(9).font('Helvetica');
            doc.text(flag.whatItLooksLike, { align: 'left', indent: 15, width: 500 });
            doc.moveDown(0.3);
            
            doc.fontSize(9).font('Helvetica-Bold');
            doc.text(lang === 'de' ? 'Warum es ein Problem ist:' : 'Why it\'s a problem:', { align: 'left' });
            doc.fontSize(9).font('Helvetica');
            doc.text(flag.whyProblem, { align: 'left', indent: 15, width: 500 });
            doc.moveDown(0.3);
            
            doc.fontSize(9).font('Helvetica-Bold');
            doc.text(lang === 'de' ? 'Was Sie fragen sollten:' : 'What to ask:', { align: 'left' });
            doc.fontSize(9).font('Helvetica');
            doc.text(flag.whatToAsk, { align: 'left', indent: 15, width: 500 });
            doc.moveDown(0.8);
        });
        
        // Scoring section for red flags
        doc.addPage();
        doc.moveDown(0.5);
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'BEWERTUNG IHRES ANGEBOTS:' : 'SCORING YOUR PROPOSAL:', { align: 'center' });
        doc.moveDown(0.8);
        
        doc.fontSize(10).font('Helvetica');
        doc.text(lang === 'de' 
            ? '0-1 Warnsignale: Angebot erscheint gründlich, Details prüfen'
            : '0-1 red flags: Proposal appears thorough, review details', 
            { align: 'left', width: 500 });
        doc.moveDown(0.5);
        doc.text(lang === 'de' 
            ? '2-3 Warnsignale: Vor Unterzeichnung unabhängig validieren'
            : '2-3 red flags: Validate independently before signing', 
            { align: 'left', width: 500 });
        doc.moveDown(0.5);
        doc.fontSize(11).font('Helvetica-Bold');
        doc.text(lang === 'de' 
            ? '4+ Warnsignale: Hohes Risiko - sofort zweite Meinung einholen'
            : '4+ red flags: High risk—get second opinion immediately', 
            { align: 'left', width: 500 });
        doc.moveDown(1);
        
        // Table of Contents
        doc.fontSize(11).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'INHALTSVERZEICHNIS' : 'TABLE OF CONTENTS', { align: 'left' });
        doc.moveDown(0.4);
        doc.fontSize(9).font('Helvetica');
        const tocItems = lang === 'de' 
            ? [
                'Kategorie 1: Architekturqualität & Trade-offs',
                'Kategorie 2: Kostentransparenz & FinOps',
                'Kategorie 3: Risikomanagement & Compliance',
                'Kategorie 4: Integration & Sequenzierung',
                'Kategorie 5: Sicherheitsarchitektur',
                'Kategorie 6: Lieferrealismus',
                'Kategorie 7: Team & Operating Model',
                'Bewertung'
            ]
            : [
                'Category 1: Architecture Quality & Trade-offs',
                'Category 2: Cost Transparency & FinOps',
                'Category 3: Risk Management & Compliance',
                'Category 4: Integration & Sequencing',
                'Category 5: Security Architecture',
                'Category 6: Delivery Realism',
                'Category 7: Team & Operating Model',
                'Scoring Section'
            ];
        tocItems.forEach((item, idx) => {
            doc.text(`${idx + 1}. ${item}`, { align: 'left', indent: 10 });
            doc.moveDown(0.2);
        });
        doc.moveDown(1);
        
        // Categories (using the same data structure with examples)
        const categories = lang === 'de' ? [
            { 
                title: "KATEGORIE 1: Architekturqualität & Trade-offs", 
                checks: ["Werden 2+ alternative Ansätze präsentiert?", "Sind Trade-offs explizit dokumentiert?", "Ist die Architektur modular (Lock-in vermeiden)?", "Entspricht sie dem tatsächlichen Maßstab (nicht über-engineered)?", "Sind Integrationspunkte klar definiert?"], 
                redFlags: ["Einzelne Vendor-\"Empfohlene Architektur\"", "Keine Alternativen diskutiert", "Über-engineered für aktuellen Maßstab"], 
                goodPractice: ["2-3 Optionen mit Vor-/Nachteilen", "Klare Entscheidungskriterien", "Richtig dimensioniert für 12-24 Monate"],
                examples: [
                    {
                        industry: "E-Commerce",
                        region: "Netherlands",
                        year: "2024",
                        situation: "Vendor proposed microservices architecture for new product launch (10-person team, 5K users initially)",
                        hiddenIssue: "Team had no microservices experience, would need 6 months just for infrastructure setup",
                        alternative: "Modular monolith with clear domain boundaries, plan to extract services when scale demands it",
                        outcome: "Launched in 8 weeks vs 6 months. Saved €120K in infrastructure costs. Team velocity increased 3x.",
                        lesson: "Match architecture to team capabilities AND current scale, not future hypothetical scale."
                    },
                    {
                        industry: "Healthcare",
                        region: "Switzerland",
                        year: "2023",
                        situation: "Cloud migration proposal with single-vendor recommended architecture (AWS-only)",
                        hiddenIssue: "No multi-cloud exit strategy, proprietary services throughout",
                        alternative: "Portable architecture using open standards, ability to run on AWS/Azure/GCP",
                        outcome: "When AWS pricing increased 40% in Year 2, client negotiated better rate by demonstrating exit capability",
                        lesson: "Build in optionality from day 1—it's cheaper than retrofitting later."
                    }
                ]
            },
            { 
                title: "KATEGORIE 2: Kostentransparenz & FinOps", 
                checks: ["Ist die Preisgestaltung nach Komponenten aufgeschlüsselt?", "Werden versteckte Kosten aufgedeckt (Egress, Support, Lizenzen)?", "Wird der Preis mit Alternativen verglichen?", "Ist das Kostenmodell auf Wachstum ausgerichtet?", "Gibt es einen Kostenoptimierungsplan?"], 
                redFlags: ["Intransparente Preisgestaltung", "\"Preis auf Anfrage\"", "Kein Vergleich zu Alternativen"], 
                goodPractice: ["Detaillierte Kostenaufschlüsselung", "TCO-Analyse (3-5 Jahre)", "Kostenoptimierungs-Roadmap"],
                examples: [
                    {
                        industry: "Pharma",
                        region: "Germany",
                        year: "2023",
                        situation: "AWS proposed €450K Kubernetes (EKS) setup for API backend (50 employees, 10K users, first cloud migration)",
                        hiddenIssue: "€80K/year support + €40K training + no DevOps team = €200K+ hidden costs in Year 1",
                        alternative: "Serverless (Lambda + API Gateway) - same functionality, zero DevOps overhead",
                        outcome: "€35K setup + €15K/year run cost. Saved €415K upfront + €105K/year. Deployed in 2 weeks vs 3 months.",
                        lesson: "Always ask \"What are ALL costs over 3 years, including support, training, and team hiring?\""
                    },
                    {
                        industry: "Scale-up",
                        region: "EU",
                        year: "2024",
                        situation: "Multi-cloud proposal with opaque \"contact for pricing\"",
                        hiddenIssue: "Data egress costs not mentioned (€50K/month at scale)",
                        alternative: "Architecture with minimal cross-cloud data movement",
                        outcome: "Saved €600K/year in hidden egress costs",
                        lesson: "Demand line-item pricing. If vendor won't provide it, that's a red flag."
                    }
                ]
            },
            { 
                title: "KATEGORIE 3: Risikomanagement & Compliance", 
                checks: ["Sind Compliance-Anforderungen abgebildet?", "Gibt es einen Rollback/Rollforward-Plan?", "Sind Abhängigkeiten identifiziert?", "Wird Vendor Lock-in-Risiko bewertet?", "Sind Single Points of Failure dokumentiert?"], 
                redFlags: ["Keine Compliance-Diskussion", "Kein Rollback-Plan", "Proprietäre Formate/APIs"], 
                goodPractice: ["Compliance Standards zugeordnet", "Risikoregister mit Mitigationen", "Exit-Strategie dokumentiert"],
                examples: [
                    {
                        industry: "Healthcare",
                        region: "Germany",
                        year: "2024",
                        situation: "Cloud migration with no GDPR compliance mapping",
                        hiddenIssue: "Vendor assumed \"AWS handles compliance\" but didn't map to specific GDPR articles",
                        alternative: "Compliance-first architecture with explicit mapping to GDPR requirements",
                        outcome: "Passed audit first time. Avoided €2M+ potential fines.",
                        lesson: "Compliance is your responsibility, not the vendor's. Demand explicit mapping to regulations."
                    },
                    {
                        industry: "Financial Services",
                        region: "Switzerland",
                        year: "2023",
                        situation: "Migration with no rollback plan",
                        hiddenIssue: "Vendor confidence = \"We've done 100 migrations, never needed rollback\"",
                        alternative: "Phased migration with rollback capability at each phase",
                        outcome: "Phase 3 had critical issue. Rolled back in 2 hours vs potential week-long outage.",
                        lesson: "Hope for best, plan for worst. Rollback plans cost 5% more but save 100x in failures."
                    }
                ]
            },
            { 
                title: "KATEGORIE 4: Integration & Sequenzierung", 
                checks: ["Sind bestehende Systeme abgebildet?", "Sind Integrationsmuster definiert?", "Ist die Sequenzierung logisch (Abhängigkeiten)?", "Sind Datenmigrationsrisiken identifiziert?", "Gibt es einen inkrementellen Lieferplan?"], 
                redFlags: ["\"Lift and Shift\" ohne Analyse", "Big-Bang-Ansatz", "Keine Integrationsstrategie"], 
                goodPractice: ["Phasenweise Lieferung (Wertinkremente)", "Integration früh getestet", "Abhängigkeiten abgebildet"],
                examples: [
                    {
                        industry: "Manufacturing",
                        region: "EU",
                        year: "2024",
                        situation: "\"Lift and shift\" migration of 50 applications",
                        hiddenIssue: "No analysis of integration dependencies—just migrate everything",
                        alternative: "Dependency mapping revealed 12 apps could be decommissioned, 15 needed modernization first",
                        outcome: "Migrated 23 apps instead of 50. Saved €800K + 4 months timeline.",
                        lesson: "Integration analysis often reveals apps you don't need to migrate at all."
                    }
                ]
            },
            { 
                title: "KATEGORIE 5: Sicherheitsarchitektur", 
                checks: ["Ist Sicherheit eingebaut (nicht nachträglich)?", "Sind Bedrohungsmodelle dokumentiert?", "Wird Zero-Trust-Ansatz verwendet?", "Ist Secrets Management definiert?", "Ist Observability enthalten?"], 
                redFlags: ["Sicherheit als Nachgedanke", "Keine Bedrohungsmodellierung", "Geteilte Credentials"], 
                goodPractice: ["Security-First-Design", "Defense in Depth", "Automatisierte Compliance-Checks"],
                examples: [
                    {
                        industry: "Healthcare",
                        region: "North America",
                        year: "2024",
                        situation: "Security mentioned as \"Phase 2\" after migration",
                        hiddenIssue: "Would need to retrofit security controls = 3x cost + 6 month delay",
                        alternative: "Security-first design—zero-trust from day 1",
                        outcome: "Passed HIPAA audit immediately. No retrofit needed.",
                        lesson: "Retrofitting security costs 3-5x more than building it in from start."
                    }
                ]
            },
            { 
                title: "KATEGORIE 6: Lieferrealismus", 
                checks: ["Basiert der Zeitplan auf ähnlichen Projekten?", "Sind Annahmen dokumentiert?", "Ist Teamkapazität validiert?", "Werden Unbekannte anerkannt?", "Gibt es einen Puffer für Risiken?"], 
                redFlags: ["Aggressiver Zeitplan ohne Begründung", "Kein Risikopuffer", "Geht von idealen Bedingungen aus"], 
                goodPractice: ["Zeitplan basierend auf Benchmarks", "Risikoadjustierte Schätzungen", "Phasenweise Meilensteine"],
                examples: [
                    {
                        industry: "E-commerce",
                        region: "EMEA",
                        year: "2023",
                        situation: "Consultant proposed 8-month migration timeline",
                        hiddenIssue: "No similar project benchmarks, just \"experience\"",
                        alternative: "Analyzed 5 comparable migrations—realistic timeline was 12-14 months",
                        outcome: "Set proper expectations, avoided rushed decisions that would have caused quality issues",
                        lesson: "Demand benchmarks from similar projects. Generic experience ≠ your specific context."
                    }
                ]
            },
            { 
                title: "KATEGORIE 7: Team & Operating Model", 
                checks: ["Ist Teamstruktur definiert?", "Sind Kompetenzlücken identifiziert?", "Ist Operating Model klar (DevOps/SRE)?", "Ist Wissenstransfer geplant?", "Sind Runbooks/Dokumentation enthalten?"], 
                redFlags: ["Keine Team-Diskussion", "Geht von bestehenden Fähigkeiten aus", "Kein Schulungsplan"], 
                goodPractice: ["Kompetenzbewertung durchgeführt", "Schulung enthalten", "Runbooks geliefert"],
                examples: [
                    {
                        industry: "Scale-up",
                        region: "Netherlands",
                        year: "2024",
                        situation: "Cloud-native proposal with no team assessment",
                        hiddenIssue: "Team had zero Kubernetes/cloud experience—would need 6 months training",
                        alternative: "Managed PaaS (Heroku/Render) while team builds cloud skills gradually",
                        outcome: "Launched in 4 weeks. Team learned cloud incrementally without blocking delivery.",
                        lesson: "Match technology to current team capabilities, not ideal future state."
                    }
                ]
            }
        ] : [
            { 
                title: "CATEGORY 1: Architecture Quality & Trade-offs", 
                checks: ["Are 2+ alternative approaches presented?", "Are trade-offs explicitly documented?", "Is architecture modular (avoid lock-in)?", "Does it match actual scale (not over-engineered)?", "Are integration points well-defined?"], 
                redFlags: ["Single vendor \"recommended architecture\"", "No alternatives discussed", "Over-engineered for current scale"], 
                goodPractice: ["2-3 options with pros/cons", "Clear decision criteria", "Right-sized for 12-24 month horizon"],
                examples: [
                    {
                        industry: "E-commerce",
                        region: "Netherlands",
                        year: "2024",
                        situation: "Vendor proposed microservices architecture for new product launch (10-person team, 5K users initially)",
                        hiddenIssue: "Team had no microservices experience, would need 6 months just for infrastructure setup",
                        alternative: "Modular monolith with clear domain boundaries, plan to extract services when scale demands it",
                        outcome: "Launched in 8 weeks vs 6 months. Saved €120K in infrastructure costs. Team velocity increased 3x.",
                        lesson: "Match architecture to team capabilities AND current scale, not future hypothetical scale."
                    },
                    {
                        industry: "Healthcare",
                        region: "Switzerland",
                        year: "2023",
                        situation: "Cloud migration proposal with single-vendor recommended architecture (AWS-only)",
                        hiddenIssue: "No multi-cloud exit strategy, proprietary services throughout",
                        alternative: "Portable architecture using open standards, ability to run on AWS/Azure/GCP",
                        outcome: "When AWS pricing increased 40% in Year 2, client negotiated better rate by demonstrating exit capability",
                        lesson: "Build in optionality from day 1—it's cheaper than retrofitting later."
                    }
                ]
            },
            { 
                title: "CATEGORY 2: Cost Transparency & FinOps", 
                checks: ["Is pricing broken down by component?", "Are hidden costs surfaced (egress, support, licensing)?", "Is cost compared to alternatives?", "Is cost model aligned to growth?", "Is there cost optimization plan?"], 
                redFlags: ["Opaque pricing", "\"Contact for pricing\"", "No comparison to alternatives"], 
                goodPractice: ["Detailed cost breakdown", "TCO analysis (3-5 years)", "Cost optimization roadmap"],
                examples: [
                    {
                        industry: "Pharma",
                        region: "Germany",
                        year: "2023",
                        situation: "AWS proposed €450K Kubernetes (EKS) setup for API backend (50 employees, 10K users, first cloud migration)",
                        hiddenIssue: "€80K/year support + €40K training + no DevOps team = €200K+ hidden costs in Year 1",
                        alternative: "Serverless (Lambda + API Gateway) - same functionality, zero DevOps overhead",
                        outcome: "€35K setup + €15K/year run cost. Saved €415K upfront + €105K/year. Deployed in 2 weeks vs 3 months.",
                        lesson: "Always ask \"What are ALL costs over 3 years, including support, training, and team hiring?\""
                    },
                    {
                        industry: "Scale-up",
                        region: "EU",
                        year: "2024",
                        situation: "Multi-cloud proposal with opaque \"contact for pricing\"",
                        hiddenIssue: "Data egress costs not mentioned (€50K/month at scale)",
                        alternative: "Architecture with minimal cross-cloud data movement",
                        outcome: "Saved €600K/year in hidden egress costs",
                        lesson: "Demand line-item pricing. If vendor won't provide it, that's a red flag."
                    }
                ]
            },
            { 
                title: "CATEGORY 3: Risk Management & Compliance", 
                checks: ["Are compliance requirements mapped?", "Is there rollback/rollforward plan?", "Are dependencies identified?", "Is vendor lock-in risk assessed?", "Are single points of failure documented?"], 
                redFlags: ["No compliance discussion", "No rollback plan", "Proprietary formats/APIs"], 
                goodPractice: ["Compliance mapped to standards", "Risk register with mitigations", "Exit strategy documented"],
                examples: [
                    {
                        industry: "Healthcare",
                        region: "Germany",
                        year: "2024",
                        situation: "Cloud migration with no GDPR compliance mapping",
                        hiddenIssue: "Vendor assumed \"AWS handles compliance\" but didn't map to specific GDPR articles",
                        alternative: "Compliance-first architecture with explicit mapping to GDPR requirements",
                        outcome: "Passed audit first time. Avoided €2M+ potential fines.",
                        lesson: "Compliance is your responsibility, not the vendor's. Demand explicit mapping to regulations."
                    },
                    {
                        industry: "Financial Services",
                        region: "Switzerland",
                        year: "2023",
                        situation: "Migration with no rollback plan",
                        hiddenIssue: "Vendor confidence = \"We've done 100 migrations, never needed rollback\"",
                        alternative: "Phased migration with rollback capability at each phase",
                        outcome: "Phase 3 had critical issue. Rolled back in 2 hours vs potential week-long outage.",
                        lesson: "Hope for best, plan for worst. Rollback plans cost 5% more but save 100x in failures."
                    }
                ]
            },
            { 
                title: "CATEGORY 4: Integration & Sequencing", 
                checks: ["Are existing systems mapped?", "Are integration patterns defined?", "Is sequencing logical (dependencies)?", "Are data migration risks identified?", "Is there incremental delivery plan?"], 
                redFlags: ["\"Lift and shift\" without analysis", "Big-bang approach", "No integration strategy"], 
                goodPractice: ["Phased delivery (value increments)", "Integration tested early", "Dependencies mapped"],
                examples: [
                    {
                        industry: "Manufacturing",
                        region: "EU",
                        year: "2024",
                        situation: "\"Lift and shift\" migration of 50 applications",
                        hiddenIssue: "No analysis of integration dependencies—just migrate everything",
                        alternative: "Dependency mapping revealed 12 apps could be decommissioned, 15 needed modernization first",
                        outcome: "Migrated 23 apps instead of 50. Saved €800K + 4 months timeline.",
                        lesson: "Integration analysis often reveals apps you don't need to migrate at all."
                    }
                ]
            },
            { 
                title: "CATEGORY 5: Security Architecture", 
                checks: ["Is security built-in (not bolted-on)?", "Are threat models documented?", "Is zero-trust approach used?", "Are secrets management defined?", "Is observability included?"], 
                redFlags: ["Security as afterthought", "No threat modeling", "Shared credentials"], 
                goodPractice: ["Security-first design", "Defense in depth", "Automated compliance checks"],
                examples: [
                    {
                        industry: "Healthcare",
                        region: "North America",
                        year: "2024",
                        situation: "Security mentioned as \"Phase 2\" after migration",
                        hiddenIssue: "Would need to retrofit security controls = 3x cost + 6 month delay",
                        alternative: "Security-first design—zero-trust from day 1",
                        outcome: "Passed HIPAA audit immediately. No retrofit needed.",
                        lesson: "Retrofitting security costs 3-5x more than building it in from start."
                    }
                ]
            },
            { 
                title: "CATEGORY 6: Delivery Realism", 
                checks: ["Is timeline based on similar projects?", "Are assumptions documented?", "Is team capacity validated?", "Are unknowns acknowledged?", "Is there buffer for risks?"], 
                redFlags: ["Aggressive timeline with no justification", "No risk buffer", "Assumes ideal conditions"], 
                goodPractice: ["Timeline based on benchmarks", "Risk-adjusted estimates", "Phased milestones"],
                examples: [
                    {
                        industry: "E-commerce",
                        region: "EMEA",
                        year: "2023",
                        situation: "Consultant proposed 8-month migration timeline",
                        hiddenIssue: "No similar project benchmarks, just \"experience\"",
                        alternative: "Analyzed 5 comparable migrations—realistic timeline was 12-14 months",
                        outcome: "Set proper expectations, avoided rushed decisions that would have caused quality issues",
                        lesson: "Demand benchmarks from similar projects. Generic experience ≠ your specific context."
                    }
                ]
            },
            { 
                title: "CATEGORY 7: Team & Operating Model", 
                checks: ["Is team structure defined?", "Are skills gaps identified?", "Is operating model clear (DevOps/SRE)?", "Is knowledge transfer planned?", "Is runbook/documentation included?"], 
                redFlags: ["No team discussion", "Assumes existing skills", "No training plan"], 
                goodPractice: ["Skills assessment done", "Training included", "Runbooks delivered"],
                examples: [
                    {
                        industry: "Scale-up",
                        region: "Netherlands",
                        year: "2024",
                        situation: "Cloud-native proposal with no team assessment",
                        hiddenIssue: "Team had zero Kubernetes/cloud experience—would need 6 months training",
                        alternative: "Managed PaaS (Heroku/Render) while team builds cloud skills gradually",
                        outcome: "Launched in 4 weeks. Team learned cloud incrementally without blocking delivery.",
                        lesson: "Match technology to current team capabilities, not ideal future state."
                    }
                ]
            }
        ];
        
        categories.forEach((category, index) => {
            if (index > 0) {
                doc.addPage();
                doc.moveDown(0.3);
            }
            
            // Category Title
            doc.fontSize(15).font('Helvetica-Bold');
            doc.text(category.title, { align: 'left' });
            doc.moveDown(0.6);
            
            // Checklist Items
            doc.fontSize(10).font('Helvetica');
            doc.text('CHECKLIST:', { align: 'left', continued: false });
            doc.moveDown(0.3);
            category.checks.forEach((check, i) => {
                // Use a simple checkbox format that PDFKit can render
                doc.fontSize(10).font('Helvetica');
                doc.text(`[ ] ${check}`, { 
                    indent: 20, 
                    align: 'left',
                    width: 500,
                    lineGap: 2
                });
                doc.moveDown(0.2);
            });
            
            doc.moveDown(0.5);
            
            // Red Flags Section
            doc.fontSize(11).font('Helvetica-Bold');
            doc.text('[!] RED FLAGS:', { align: 'left' });
            doc.moveDown(0.3);
            doc.fontSize(9).font('Helvetica');
            category.redFlags.forEach(flag => {
                doc.text(`- ${flag}`, { 
                    indent: 20, 
                    align: 'left',
                    width: 500,
                    lineGap: 2
                });
                doc.moveDown(0.15);
            });
            
            doc.moveDown(0.4);
            
            // Good Practice Section
            doc.fontSize(11).font('Helvetica-Bold');
            doc.text('[OK] GOOD PRACTICE:', { align: 'left' });
            doc.moveDown(0.3);
            doc.fontSize(9).font('Helvetica');
            category.goodPractice.forEach(practice => {
                doc.text(`- ${practice}`, { 
                    indent: 20, 
                    align: 'left',
                    width: 500,
                    lineGap: 2
                });
                doc.moveDown(0.15);
            });
            
            // Real Examples Section
            if (category.examples && category.examples.length > 0) {
                doc.moveDown(0.6);
                doc.fontSize(11).font('Helvetica-Bold');
                doc.text('[EX] REAL EXAMPLES:', { align: 'left' });
                doc.moveDown(0.4);
                
                category.examples.forEach((example, exIdx) => {
                    doc.fontSize(9).font('Helvetica-Bold');
                    doc.text(`Example ${exIdx + 1} (${example.industry}, ${example.region}, ${example.year}):`, { align: 'left' });
                    doc.moveDown(0.2);
                    
                    doc.fontSize(8).font('Helvetica-Bold');
                    doc.text('Situation:', { align: 'left', indent: 15 });
                    doc.fontSize(8).font('Helvetica');
                    doc.text(example.situation, { align: 'left', indent: 25, width: 480, lineGap: 1.5 });
                    doc.moveDown(0.2);
                    
                    doc.fontSize(8).font('Helvetica-Bold');
                    doc.text('Hidden issue:', { align: 'left', indent: 15 });
                    doc.fontSize(8).font('Helvetica');
                    doc.text(example.hiddenIssue, { align: 'left', indent: 25, width: 480, lineGap: 1.5 });
                    doc.moveDown(0.2);
                    
                    doc.fontSize(8).font('Helvetica-Bold');
                    doc.text('Alternative:', { align: 'left', indent: 15 });
                    doc.fontSize(8).font('Helvetica');
                    doc.text(example.alternative, { align: 'left', indent: 25, width: 480, lineGap: 1.5 });
                    doc.moveDown(0.2);
                    
                    doc.fontSize(8).font('Helvetica-Bold');
                    doc.text('Outcome:', { align: 'left', indent: 15 });
                    doc.fontSize(8).font('Helvetica');
                    doc.text(example.outcome, { align: 'left', indent: 25, width: 480, lineGap: 1.5 });
                    doc.moveDown(0.2);
                    
                    doc.fontSize(8).font('Helvetica-Bold');
                    doc.text('Lesson:', { align: 'left', indent: 15 });
                    doc.fontSize(8).font('Helvetica');
                    doc.text(example.lesson, { align: 'left', indent: 25, width: 480, lineGap: 1.5 });
                    doc.moveDown(0.5);
                });
            }
            
            doc.moveDown(0.8);
        });
        
        // Scoring section
        doc.addPage();
        doc.moveDown(0.5);
        
        // Scoring Title
        doc.fontSize(16).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'BEWERTUNG' : 'SCORING SECTION', { align: 'center' });
        doc.moveDown(1);
        
        // Scoring Instructions
        doc.fontSize(11).font('Helvetica');
        const scoringText = lang === 'de' 
            ? 'Zählen Sie Häkchen pro Kategorie.\nGesamtpunktzahl = Summe aller Häkchen (max 35)'
            : 'Count checkmarks per category.\nTotal score = sum of all checkmarks (max 35)';
        doc.text(scoringText, { align: 'left' });
        doc.moveDown(0.8);
        
        // Score Ranges
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text(lang === 'de' ? '0-12 Punkte: HOHES RISIKO' : '0-12 points: HIGH RISK', { align: 'left' });
        doc.moveDown(0.3);
        doc.fontSize(10).font('Helvetica');
        doc.text(lang === 'de' 
            ? '→ Erhebliche Lücken. Empfehlung: Unabhängige Überprüfung vor Verpflichtung.'
            : '→ Significant gaps. Recommend independent review before committing.', { align: 'left', indent: 15 });
        doc.moveDown(0.6);
        
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text(lang === 'de' ? '13-24 Punkte: MODERATES RISIKO' : '13-24 points: MODERATE RISK', { align: 'left' });
        doc.moveDown(0.3);
        doc.fontSize(10).font('Helvetica');
        doc.text(lang === 'de' 
            ? '→ Einige Lücken zu beheben. Mit Vendor klären oder unabhängig validieren.'
            : '→ Some gaps to address. Clarify with vendor or validate independently.', { align: 'left', indent: 15 });
        doc.moveDown(0.6);
        
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text(lang === 'de' ? '25-35 Punkte: NIEDRIGES RISIKO' : '25-35 points: LOW RISK', { align: 'left' });
        doc.moveDown(0.3);
        doc.fontSize(10).font('Helvetica');
        doc.text(lang === 'de' 
            ? '→ Angebot erscheint gründlich. Spezifische Details vor Unterzeichnung prüfen.'
            : '→ Proposal appears thorough. Review specific details before signing.', { align: 'left', indent: 15 });
        
        // What AI Cannot Validate Section
        doc.addPage();
        doc.moveDown(0.5);
        
        doc.fontSize(18).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'WAS KI NICHT FÜR SIE VALIDIEREN KANN' : 'WHAT AI CANNOT VALIDATE FOR YOU', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(11).font('Helvetica');
        doc.text(lang === 'de' 
            ? 'Automatisierte Tools und KI können Checklisten-Items überprüfen, aber diese kritischen Bereiche erfordern menschliches Urteil und Kontextverständnis:'
            : 'Automated tools and AI can check checklist items, but these critical areas require human judgment and contextual understanding:', 
            { align: 'left', width: 500 });
        doc.moveDown(1);
        
        const aiCannotValidate = lang === 'de' ? [
            {
                title: 'Versteckte Kostentreiber',
                items: ['Support-Tiers und SLA-Strafen', 'Observability- und Monitoring-Kosten', 'Data Egress bei realistischem Traffic', 'Lizenzierungs-Eskalationen bei Wachstum']
            },
            {
                title: 'Sequenzierungsrisiko bei Delivery',
                items: ['Abhängigkeiten zwischen Arbeitspaketen', 'Cutover-Strategie und Rollback-Fähigkeit', 'Übergangsarchitektur während der Migration', 'Team-Kapazität vs. Zeitplan-Realismus']
            },
            {
                title: 'Organisations-Reifegrad-Mismatch',
                items: ['Kubernetes-Adoption ohne Platform-Ops-Team', 'KI/ML-Initiativen ohne Data-Ownership-Klarheit', 'Microservices ohne DevOps-Kultur', 'Cloud-Native ohne Cloud-Finanz-Governance']
            },
            {
                title: 'Integrationsrealität',
                items: ['API-Eigentum und Vertragsklarheit', 'Legacy-System-Einschränkungen und Dokumentationslücken', 'Partnersystem-Abhängigkeiten und SLAs', 'Datenverträge und Schema-Evolution']
            },
            {
                title: 'Compliance-Lücken',
                items: ['DPIA-Anforderungen für Datenverarbeitung', 'Datenresidenz- und Souveränitätsanforderungen', 'Audit-Bereitschaft und Nachweisführung', 'ISO-27001/SOC2-Kontroll-Mapping']
            }
        ] : [
            {
                title: 'Hidden cost drivers',
                items: ['Support tiers and SLA penalties', 'Observability and monitoring costs', 'Data egress at realistic traffic', 'Licensing escalations at growth']
            },
            {
                title: 'Delivery sequencing risk',
                items: ['Dependencies between work packages', 'Cutover strategy and rollback capability', 'Transitional architecture during migration', 'Team capacity vs timeline realism']
            },
            {
                title: 'Org maturity mismatch',
                items: ['Kubernetes adoption without platform ops team', 'AI/ML initiatives without data ownership clarity', 'Microservices without DevOps culture', 'Cloud-native without cloud financial governance']
            },
            {
                title: 'Integration reality',
                items: ['API ownership and contract clarity', 'Legacy system constraints and documentation gaps', 'Partner system dependencies and SLAs', 'Data contracts and schema evolution']
            },
            {
                title: 'Compliance gaps',
                items: ['DPIA requirements for data processing', 'Data residency and sovereignty requirements', 'Audit readiness and evidence collection', 'ISO 27001/SOC2 control mapping']
            }
        ];
        
        aiCannotValidate.forEach((section, idx) => {
            doc.fontSize(11).font('Helvetica-Bold');
            doc.text(`${idx + 1}. ${section.title}`, { align: 'left' });
            doc.moveDown(0.3);
            doc.fontSize(9).font('Helvetica');
            section.items.forEach(item => {
                doc.text(`   • ${item}`, { align: 'left', indent: 15 });
                doc.moveDown(0.15);
            });
            doc.moveDown(0.5);
        });
        
        doc.moveDown(0.5);
        doc.fontSize(10).font('Helvetica');
        doc.text(lang === 'de' 
            ? 'Wenn Sie eine herstellerneutrale zweite Meinung wünschen, biete ich einen festen Architecture Review an.'
            : 'If you want a vendor-neutral second opinion, I offer a fixed-scope Architecture Review.', 
            { align: 'left', width: 500 });
        
        // Final CTA Section
        doc.addPage();
        doc.moveDown(0.5);
        
        doc.fontSize(16).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'LÜCKEN IN IHREM ANGEBOT GEFUNDEN?' : 'FOUND GAPS IN YOUR PROPOSAL?', { align: 'center' });
        doc.moveDown(0.8);
        
        doc.fontSize(10).font('Helvetica');
        doc.text(lang === 'de' 
            ? 'Wenn Sie <25 Punkte erzielt haben oder kritische Warnsignale identifiziert haben, erwägen Sie eine unabhängige Überprüfung vor der Verpflichtung.'
            : 'If you scored <25 or identified critical red flags, consider an independent review before committing.', 
            { align: 'left', width: 500 });
        doc.moveDown(1);
        
        doc.fontSize(14).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'UNABHÄNGIGE ANGEBOTSPRÜFUNG' : 'INDEPENDENT PROPOSAL REVIEW', { align: 'center' });
        doc.moveDown(0.3);
        doc.fontSize(10).font('Helvetica');
        doc.text(lang === 'de' ? '30 Minuten • Herstellerneutral • Antwort innerhalb von 24 Stunden' : '30 minutes • Vendor-neutral • Reply within 24 hours', { align: 'center' });
        doc.moveDown(0.8);
        
        doc.fontSize(11).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'Was ich überprüfen werde:' : 'What I\'ll review:', { align: 'left' });
        doc.moveDown(0.4);
        doc.fontSize(9).font('Helvetica');
        const reviewItems = lang === 'de' ? [
            '- Über-Engineering-Risiken',
            '- Versteckte Kostenexpositionen',
            '- Vendor Lock-in-Bedenken',
            '- Zeitplan-Realismus',
            '- Integrationskomplexität',
            '- Sicherheitslücken'
        ] : [
            '- Over-engineering risks',
            '- Hidden cost exposures',
            '- Vendor lock-in concerns',
            '- Timeline realism',
            '- Integration complexity',
            '- Security gaps'
        ];
        reviewItems.forEach(item => {
            doc.text(item, { align: 'left', indent: 15 });
            doc.moveDown(0.2);
        });
        doc.moveDown(0.6);
        
        doc.fontSize(9).font('Helvetica');
        doc.text(lang === 'de' ? 'Kein Verkaufspitch. Nur ehrliche Bewertung.' : 'No sales pitch. Just honest assessment.', { align: 'center', width: 500 });
        doc.moveDown(1);
        
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'Beratung buchen:' : 'Book Review:', { align: 'left' });
        doc.fontSize(9).font('Helvetica');
        doc.text('https://calendly.com/prasad-sgsits/30min', { align: 'left', indent: 15 });
        doc.moveDown(0.4);
        
        doc.fontSize(10).font('Helvetica-Bold');
        doc.text(lang === 'de' ? 'Angebotszusammenfassung senden:' : 'Send Proposal Summary:', { align: 'left' });
        doc.fontSize(9).font('Helvetica');
        doc.text(getContactEmail(), { align: 'left', indent: 15 });
        doc.moveDown(1.5);
        
        // Footer
        doc.fontSize(8).font('Helvetica');
        doc.text('Prasad Tilloo', { align: 'center' });
        doc.moveDown(0.1);
        doc.text('Independent Architecture & Transformation Consultant', { align: 'center' });
        doc.moveDown(0.3);
        doc.fontSize(7).font('Helvetica');
        doc.text(lang === 'de' 
            ? 'Herstellerneutrale Beratung • Keine Implementierungsvoreingenommenheit • Ansässig in Deutschland'
            : 'Vendor-neutral advice • No implementation upsell • Based in Germany', { align: 'center' });
        doc.moveDown(0.3);
        doc.text(lang === 'de' 
            ? 'Globale Liefererfahrung: Nordamerika • Europa • Asien • Südamerika'
            : 'Global delivery experience: North America • Europe • Asia • South America', { align: 'center' });
        doc.moveDown(0.3);
        doc.text('prasadtilloo.com', { align: 'center' });
        
        // Wait for PDF to be generated
        return new Promise((resolve, reject) => {
            doc.on('end', () => {
                try {
                    const pdfBuffer = Buffer.concat(buffers);
                    console.log('[PDF] PDF buffer created, size:', pdfBuffer.length, 'bytes');
                    resolve(pdfBuffer);
                } catch (bufferError) {
                    console.error('[PDF] Error creating buffer:', bufferError);
                    reject(bufferError);
                }
            });
            doc.on('error', (err) => {
                console.error('[PDF] PDF document error:', err);
                reject(err);
            });
            // Finalize the PDF
            doc.end();
        });
    } catch (error) {
        console.error('[PDF] ❌ Failed to generate PDF - Exception caught');
        console.error('[PDF] Error type:', error.constructor.name);
        console.error('[PDF] Error message:', error.message);
        console.error('[PDF] Error stack:', error.stack);
        // Return null if PDF generation fails - email will still be sent
        return null;
    }
};

// Generate nurture email #2 (Day 2): 3 red flags
const generateNurtureEmail2 = (lang = 'en') => {
    const subject = lang === 'de'
        ? "3 Warnsignale, die ich wiederholt in Vendor-Angeboten sehe"
        : "3 red flags I see repeatedly in vendor proposals";
    
    const content = lang === 'de'
        ? {
            greeting: "Hallo",
            intro: "Nach der Überprüfung von 50+ Architekturangeboten stechen drei Muster als sofortige Warnsignale hervor:",
            flag1: {
                title: "1. EINZELNE VENDOR-\"EMPFOHLENE ARCHITEKTUR\"",
                desc: "Wenn ein Angebot nur einen Ansatz präsentiert, bedeutet das normalerweise:\n- Der Vendor hat es entworfen, um seinen Umsatz zu maximieren\n- Alternativen wurden nicht ernsthaft in Betracht gezogen\n- Sie werden in Richtung Lock-in gelenkt",
                question: "Was zu fragen: \"Welche Alternativen haben Sie evaluiert? Warum haben Sie sie abgelehnt?\""
            },
            flag2: {
                title: "2. KEINE ROLLBACK/EXIT-STRATEGIE",
                desc: "Wenn das Angebot nicht enthält:\n- Wie man zurückrollt, wenn Probleme auftreten\n- Wie man wegmigriert, falls nötig\n- Kosten für den Ausstieg",
                note: "Das ist ein wichtiger Risikoindikator.",
                question: "Was zu fragen: \"Was ist unsere Exit-Strategie? Was kostet es?\""
            },
            flag3: {
                title: "3. AGGRESSIVER ZEITPLAN OHNE BEGRÜNDUNG",
                desc: "Wenn der Zeitplan verdächtig schnell (oder langsam) aussieht ohne Vergleich zu ähnlichen Projekten, basiert er normalerweise auf:\n- Idealen Bedingungen (keine Risiken berücksichtigt)\n- Aufgebläht, um Beratungsstunden zu maximieren\n- Nicht in der Realität verankert",
                question: "Was zu fragen: \"Welche vergleichbaren Projekte haben diesen Zeitplan beeinflusst? Welche Annahmen treffen Sie?\""
            },
            cta: "Wenn Sie diese Muster in Ihrem Angebot sehen, erwägen Sie eine unabhängige Überprüfung vor der Unterzeichnung.",
            button: "30-Minuten-Beratung"
        }
        : {
            greeting: "Hi",
            intro: "After reviewing 50+ architecture proposals, three patterns stand out as immediate red flags:",
            flag1: {
                title: "1. SINGLE VENDOR \"RECOMMENDED ARCHITECTURE\"",
                desc: "When a proposal presents only one approach, it usually means:\n- The vendor designed it to maximize their revenue\n- Alternatives weren't seriously considered\n- You're being steered toward lock-in",
                question: "What to ask: \"What alternatives did you evaluate? Why did you reject them?\""
            },
            flag2: {
                title: "2. NO ROLLBACK/EXIT STRATEGY",
                desc: "If the proposal doesn't include:\n- How to roll back if issues arise\n- How to migrate away if needed\n- Cost to exit",
                note: "That's a major risk indicator.",
                question: "What to ask: \"What's our exit strategy? What does it cost?\""
            },
            flag3: {
                title: "3. AGGRESSIVE TIMELINE WITH NO JUSTIFICATION",
                desc: "If the timeline looks suspiciously fast (or slow) with no comparison to similar projects, it's usually:\n- Based on ideal conditions (no risks accounted)\n- Padded to maximize consulting hours\n- Not grounded in reality",
                question: "What to ask: \"What comparable projects informed this timeline? What assumptions are you making?\""
            },
            cta: "If you're seeing these patterns in your proposal, consider an independent review before signing.",
            button: "30-minute consultation"
        };

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #ffffff; padding: 30px 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <p style="color: #475569; margin-bottom: 20px;">${content.greeting},</p>
        <p style="color: #475569; margin-bottom: 30px;">${content.intro}</p>
        
        <div style="margin-bottom: 30px; padding: 20px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px;">
            <h2 style="color: #991b1b; font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">${content.flag1.title}</h2>
            <p style="color: #7f1d1d; font-size: 14px; margin: 0 0 10px 0; white-space: pre-line;">${content.flag1.desc}</p>
            <p style="color: #991b1b; font-size: 13px; font-weight: 600; margin: 0;">${content.flag1.question}</p>
        </div>
        
        <div style="margin-bottom: 30px; padding: 20px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px;">
            <h2 style="color: #991b1b; font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">${content.flag2.title}</h2>
            <p style="color: #7f1d1d; font-size: 14px; margin: 0 0 10px 0; white-space: pre-line;">${content.flag2.desc}</p>
            ${content.flag2.note ? `<p style="color: #991b1b; font-size: 13px; font-weight: 600; margin: 0 0 10px 0;">${content.flag2.note}</p>` : ''}
            <p style="color: #991b1b; font-size: 13px; font-weight: 600; margin: 0;">${content.flag2.question}</p>
        </div>
        
        <div style="margin-bottom: 30px; padding: 20px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px;">
            <h2 style="color: #991b1b; font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">${content.flag3.title}</h2>
            <p style="color: #7f1d1d; font-size: 14px; margin: 0 0 10px 0; white-space: pre-line;">${content.flag3.desc}</p>
            <p style="color: #991b1b; font-size: 13px; font-weight: 600; margin: 0;">${content.flag3.question}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 8px; text-align: center;">
            <p style="color: #475569; margin-bottom: 15px; font-size: 14px;">${content.cta}</p>
            <a href="https://calendly.com/prasad-sgsits/30min" style="display: inline-block; background: #059669; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                ${content.button}
            </a>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 30px; text-align: center;">
            Best,<br>Prasad
        </p>
    </div>
</body>
</html>
    `.trim();
};

// Generate nurture email #3 (Day 5): Case example
const generateNurtureEmail3 = (lang = 'en') => {
    const subject = lang === 'de'
        ? "Fallbeispiel: Wie die Vereinfachung der Architektur €400K gespart hat"
        : "Case example: How simplifying architecture saved €400K";
    
    const content = lang === 'de'
        ? {
            greeting: "Hallo",
            intro: "Schnelles Beispiel aus einem kürzlichen Engagement:",
            case: {
                client: "KUNDE: Mittelständisches Pharmaunternehmen (Deutschland)",
                situation: "SITUATION: AWS schlug €450K Kubernetes-Setup für API-Backend vor (10K Benutzer, 50 Mitarbeiter)",
                proposal: {
                    title: "VENDOR-ANGEBOT:",
                    items: [
                        "Kubernetes (EKS)",
                        "Service Mesh (Istio)",
                        "Observability Stack (Prometheus, Grafana, ELK)",
                        "GitOps (ArgoCD)",
                        "Multi-Environment-Setup"
                    ],
                    cost: "Geschätzte Kosten: €450K Setup + €80K/Jahr Betrieb"
                },
                assessment: {
                    title: "MEINE BEWERTUNG:",
                    text: "Die Architektur war Enterprise-Grade—aber massiv über-engineered für ihren Maßstab.",
                    reality: "Realitätscheck:\n- 10K Benutzer = ~5K API-Aufrufe/Tag\n- 50 Mitarbeiter = kein DevOps-Team\n- Erste Cloud-Migration"
                },
                recommendation: {
                    title: "EMPFEHLUNG:",
                    text: "Serverless-Architektur (AWS Lambda + API Gateway):",
                    items: [
                        "Gleiche Funktionalität",
                        "Null DevOps-Overhead",
                        "Skaliert automatisch",
                        "€35K Setup + €15K/Jahr Betrieb"
                    ]
                },
                outcome: {
                    title: "ERGEBNIS:",
                    text: "Kunde sparte €415K vorab + €65K/Jahr\nIn 2 Wochen deployed (vs. 3 Monate)\nKein DevOps-Hiring nötig"
                }
            },
            lesson: {
                title: "DIE LEHRE:",
                text: "Vendor-Angebote optimieren oft für:\n- Ihre Expertise (Kubernetes-Spezialisten empfehlen K8s)\n- Ihren Umsatz (komplex = mehr abrechenbare Stunden)\n- Enterprise-Muster (auch wenn Sie sie nicht brauchen)",
                notFor: "Nicht für:\n- Ihren tatsächlichen Maßstab\n- Die Fähigkeiten Ihres Teams\n- Ihre Budgetbeschränkungen"
            },
            cta: "Wenn Sie eine Überprüfung Ihrer Architekturentscheidung wünschen, bin ich gerne bereit, eine schnelle Bewertung bereitzustellen.",
            button: "30-Minuten-Beratung"
        }
        : {
            greeting: "Hi",
            intro: "Quick example from a recent engagement:",
            case: {
                client: "CLIENT: Mid-market pharma company (Germany)",
                situation: "SITUATION: AWS proposed €450K Kubernetes setup for API backend (10K users, 50 employees)",
                proposal: {
                    title: "VENDOR PROPOSAL:",
                    items: [
                        "Kubernetes (EKS)",
                        "Service mesh (Istio)",
                        "Observability stack (Prometheus, Grafana, ELK)",
                        "GitOps (ArgoCD)",
                        "Multi-environment setup"
                    ],
                    cost: "Estimated cost: €450K setup + €80K/year run"
                },
                assessment: {
                    title: "MY ASSESSMENT:",
                    text: "The architecture was enterprise-grade—but massively over-engineered for their scale.",
                    reality: "Reality check:\n- 10K users = ~5K API calls/day\n- 50 employees = no DevOps team\n- First cloud migration"
                },
                recommendation: {
                    title: "RECOMMENDATION:",
                    text: "Serverless architecture (AWS Lambda + API Gateway):",
                    items: [
                        "Same functionality",
                        "Zero DevOps overhead",
                        "Scales automatically",
                        "€35K setup + €15K/year run"
                    ]
                },
                outcome: {
                    title: "OUTCOME:",
                    text: "Client saved €415K upfront + €65K/year\nDeployed in 2 weeks (vs 3 months)\nNo DevOps hiring needed"
                }
            },
            lesson: {
                title: "THE LESSON:",
                text: "Vendor proposals often optimize for:\n- Their expertise (Kubernetes specialists recommend K8s)\n- Their revenue (complex = more billable hours)\n- Enterprise patterns (even when you don't need them)",
                notFor: "Not for:\n- Your actual scale\n- Your team's capabilities\n- Your budget constraints"
            },
            cta: "If you'd like a sanity check on your architecture decision, I'm happy to provide a quick assessment.",
            button: "30-minute consultation"
        };

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #ffffff; padding: 30px 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <p style="color: #475569; margin-bottom: 20px;">${content.greeting},</p>
        <p style="color: #475569; margin-bottom: 30px;">${content.intro}</p>
        
        <div style="margin-bottom: 25px;">
            <p style="color: #0f172a; font-weight: 700; margin: 0 0 5px 0;">${content.case.client}</p>
            <p style="color: #0f172a; font-weight: 700; margin: 0 0 15px 0;">${content.case.situation}</p>
            
            <div style="background: #fef2f2; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                <p style="color: #991b1b; font-weight: 700; margin: 0 0 10px 0; font-size: 14px;">${content.case.proposal.title}</p>
                <ul style="margin: 0; padding-left: 20px; color: #7f1d1d; font-size: 13px;">
                    ${content.case.proposal.items.map(item => `<li style="margin-bottom: 5px;">${item}</li>`).join('')}
                </ul>
                <p style="color: #991b1b; font-weight: 600; margin: 10px 0 0 0; font-size: 13px;">${content.case.proposal.cost}</p>
            </div>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                <p style="color: #166534; font-weight: 700; margin: 0 0 10px 0; font-size: 14px;">${content.case.assessment.title}</p>
                <p style="color: #14532d; font-size: 13px; margin: 0 0 10px 0;">${content.case.assessment.text}</p>
                <p style="color: #14532d; font-size: 13px; margin: 0; white-space: pre-line;">${content.case.assessment.reality}</p>
            </div>
            
            <div style="background: #eff6ff; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
                <p style="color: #1e40af; font-weight: 700; margin: 0 0 10px 0; font-size: 14px;">${content.case.recommendation.title}</p>
                <p style="color: #1e3a8a; font-size: 13px; margin: 0 0 10px 0;">${content.case.recommendation.text}</p>
                <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 13px;">
                    ${content.case.recommendation.items.map(item => `<li style="margin-bottom: 5px;">${item}</li>`).join('')}
                </ul>
            </div>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 4px;">
                <p style="color: #166534; font-weight: 700; margin: 0 0 10px 0; font-size: 14px;">${content.case.outcome.title}</p>
                <p style="color: #14532d; font-size: 13px; margin: 0; white-space: pre-line;">${content.case.outcome.text}</p>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px;">
            <p style="color: #0f172a; font-weight: 700; margin: 0 0 10px 0; font-size: 14px;">${content.lesson.title}</p>
            <p style="color: #475569; font-size: 13px; margin: 0 0 10px 0; white-space: pre-line;">${content.lesson.text}</p>
            <p style="color: #475569; font-size: 13px; margin: 0; white-space: pre-line;">${content.lesson.notFor}</p>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: #f1f5f9; border-radius: 8px; text-align: center;">
            <p style="color: #475569; margin-bottom: 15px; font-size: 14px;">${content.cta}</p>
            <p style="color: #64748b; margin-bottom: 15px; font-size: 13px;">Reply with your situation or book 30 minutes:</p>
            <a href="https://calendly.com/prasad-sgsits/30min" style="display: inline-block; background: #059669; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                ${content.button}
            </a>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 30px; text-align: center;">
            Best,<br>Prasad
        </p>
    </div>
</body>
</html>
    `.trim();
};

app.post('/api/lead', async (req, res) => {
    try {
        const { 
            email: rawEmail, 
            language, 
            sourcePath: rawSourcePath, 
            leadMagnet: rawLeadMagnet,
            // Attribution fields (optional, Phase 3.0)
            utm_source: rawUtmSource,
            utm_medium: rawUtmMedium,
            utm_campaign: rawUtmCampaign,
            utm_content: rawUtmContent,
            utm_term: rawUtmTerm,
            landingPath: rawLandingPath,
            currentPath: rawCurrentPath,
            caseStudySlug: rawCaseStudySlug,
            projectsCategory: rawProjectsCategory,
            projectsSearchQuery: rawProjectsSearchQuery,
            ctaSource: rawCtaSource
        } = req.body;

        // ========================================
        // Input validation and sanitization
        // ========================================
        
        // Validate email
        if (!rawEmail || !rawEmail.includes('@')) {
            return res.status(400).json({ error: 'Invalid input.' });
        }
        
        // Sanitize email: trim, lowercase, max 160 chars
        const email = String(rawEmail).trim().toLowerCase().substring(0, 160);
        
        // Reject if email is still too long after sanitization (shouldn't happen, but safety check)
        if (email.length > 160) {
            return res.status(400).json({ error: 'Invalid input.' });
        }
        
        // Validate and sanitize sourcePath (if provided)
        const sourcePath = safeStr(rawSourcePath, 200) || '/guide';
        if (rawSourcePath && String(rawSourcePath).trim().length > 200) {
            return res.status(400).json({ error: 'Invalid input.' });
        }
        
        // Validate and sanitize leadMagnet (if provided)
        const leadMagnet = safeStr(rawLeadMagnet, 80) || 'guide';
        if (rawLeadMagnet && String(rawLeadMagnet).trim().length > 80) {
            return res.status(400).json({ error: 'Invalid input.' });
        }

        // Validate and normalize language
        const lang = (language === 'de' || language === 'en') ? language : 'en';

        // Get client info for lead tracking (sanitize for safety)
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        const userAgent = safeStr(req.get('user-agent'), 250);
        // Use referrer from header (attribution referrer comes from client)
        const referrer = safeStr(req.get('referer'), 300);
        
        // Sanitize attribution fields (all optional, preserve backwards compatibility)
        const utm_source = safeStr(rawUtmSource, 100);
        const utm_medium = safeStr(rawUtmMedium, 100);
        const utm_campaign = safeStr(rawUtmCampaign, 200);
        const utm_content = safeStr(rawUtmContent, 200);
        const utm_term = safeStr(rawUtmTerm, 200);
        const landingPath = safeStr(rawLandingPath, 200);
        const currentPath = safeStr(rawCurrentPath, 200);
        const caseStudySlug = safeStr(rawCaseStudySlug, 100);
        const projectsCategory = safeStr(rawProjectsCategory, 100);
        const projectsSearchQuery = safeStr(rawProjectsSearchQuery, 200);
        const ctaSource = safeStr(rawCtaSource, 100);

        // Check if email already exists using lead store
        try {
            const emailAlreadyExists = await leadStore.emailExists(email);
            if (emailAlreadyExists) {
                return res.status(200).json({ success: true, message: 'Email already registered' });
            }
        } catch (err) {
            // Log but continue - we don't want to block lead capture if dedupe check fails
            console.warn('[LEAD] Dedupe check failed, proceeding with capture:', err.message);
        }

        // Hash IP for privacy (simple hash)
        const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex').substring(0, 16);

        // Add new lead with sanitized data (includes attribution fields from Phase 3.0)
        const newLead = {
            email,
            locale: lang,
            sourcePath,
            timestamp: new Date().toISOString(),
            ipHash,
            leadMagnet,
            userAgent,
            referrer,
            consent: true, // User must have consented to submit
            consentTimestamp: new Date().toISOString(),
            // Attribution fields (Phase 3.0) - all optional, backwards compatible
            utm_source,
            utm_medium,
            utm_campaign,
            utm_content,
            utm_term,
            landingPath,
            currentPath,
            caseStudySlug,
            projectsCategory,
            projectsSearchQuery,
            ctaSource
        };

        // Save lead using lead store (handles both JSON and Google Sheets with fallback)
        try {
            await leadStore.saveLead(newLead);
            // Log success with masked email for privacy
            const maskedEmail = email.substring(0, 3) + '***';
            console.log('[LEAD] Lead captured successfully:', maskedEmail);
        } catch (saveErr) {
            console.error('[LEAD] Error saving lead:', saveErr.message);
            // Still return success - graceful degradation, don't block email sending
        }

        // Send guide via email
        try {
            console.log('[EMAIL] Starting email send process...');
            console.log('[EMAIL] Environment check:');
            console.log('  - SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
            console.log('  - SMTP_USER:', process.env.SMTP_USER || 'NOT SET');
            console.log('  - SMTP_PASS:', process.env.SMTP_PASS ? '[SET]' : 'NOT SET');
            console.log('  - FROM_EMAIL:', process.env.FROM_EMAIL || 'NOT SET');
            
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

            // Determine email content based on leadMagnet type
            const isChecklist = leadMagnet === 'vendor-proposal-checklist';
            console.log('[EMAIL] Lead magnet type:', leadMagnet, '→ isChecklist:', isChecklist);
            const emailSubject = isChecklist
                ? (lang === 'de' 
                    ? "Ihre Angebotsprüfungs-Checkliste"
                    : "Your Vendor Proposal Review Checklist")
                : (lang === 'de' 
                    ? "10 Architekturentscheidungen, die unnötige Risiken (und Kosten) erzeugen"
                    : "10 Architecture Decisions That Create Unnecessary Risk (and Cost)");
            
            if (transporter) {
                console.log('[EMAIL] ✅ Transporter created successfully, attempting to send email...');
                // Send email using configured SMTP
                try {
                    const emailContent = isChecklist ? generateChecklistEmail(lang) : generateGuideEmail(lang);
                    console.log('[EMAIL] Email content generated, length:', emailContent.length, 'chars');
                    
                    // Debug: Verify button text in email content
                    if (isChecklist) {
                        const buttonTextEN = '📅 Book 30-Minute Consultation';
                        const buttonTextDE = '📅 30-Minuten-Beratung buchen';
                        const hasButtonText = emailContent.includes(buttonTextEN) || emailContent.includes(buttonTextDE);
                        const calendarUrl = 'https://calendly.com/prasad-sgsits/30min';
                        const hasUrlAsButtonText = emailContent.includes(`<a href="${calendarUrl}">${calendarUrl}</a>`) || 
                                                   emailContent.includes(`>${calendarUrl}<`);
                        
                        // Extract button sections for debugging
                        const buttonMatches = emailContent.match(/<a[^>]*href="https:\/\/calendly\.com[^"]*"[^>]*>([^<]+)<\/a>/g);
                        if (buttonMatches) {
                            console.log('[EMAIL] Found Calendly buttons in email:');
                            buttonMatches.forEach((match, idx) => {
                                console.log(`[EMAIL]   Button ${idx + 1}: ${match.substring(0, 150)}...`);
                            });
                        }
                        
                        if (hasUrlAsButtonText) {
                            console.error('[EMAIL] ❌ ERROR: Calendar URL is being used as button text!');
                            console.error('[EMAIL] This indicates a template rendering issue.');
                        } else if (hasButtonText) {
                            console.log('[EMAIL] ✅ Button text verified: Contains proper button text');
                        } else {
                            console.warn('[EMAIL] ⚠️  WARNING: Could not verify button text in email content');
                            console.warn('[EMAIL] Looking for:', buttonTextEN, 'or', buttonTextDE);
                        }
                    }
                    
                    // Generate PDF attachment for checklist
                    let attachments = [];
                    if (isChecklist) {
                        try {
                            console.log('[PDF] Starting PDF generation...');
                            const pdfBuffer = await generateChecklistPDF(lang);
                            if (pdfBuffer && Buffer.isBuffer(pdfBuffer)) {
                                console.log('[PDF] ✅ PDF generated successfully, size:', pdfBuffer.length, 'bytes');
                                attachments.push({
                                    filename: lang === 'de' 
                                        ? 'Angebotsprüfungs-Checkliste.pdf'
                                        : 'Vendor-Proposal-Review-Checklist.pdf',
                                    content: pdfBuffer,
                                    contentType: 'application/pdf'
                                });
                            } else {
                                console.warn('[PDF] ⚠️  PDF generation returned null or invalid buffer, sending email without attachment');
                                console.warn('[PDF] pdfBuffer type:', typeof pdfBuffer, 'isBuffer:', Buffer.isBuffer(pdfBuffer));
                            }
                        } catch (pdfError) {
                            console.error('[PDF] ❌ Failed to generate PDF');
                            console.error('[PDF] Error:', pdfError);
                            console.error('[PDF] Error message:', pdfError.message);
                            console.error('[PDF] Error stack:', pdfError.stack);
                            console.warn('[PDF] ⚠️  Sending email without PDF attachment');
                            // Continue sending email even if PDF fails
                        }
                    }
                    
                    const replyToEmail = process.env.REPLY_TO_EMAIL || fromEmail;
                    
                    console.log('[EMAIL] Sending email via SMTP...');
                    console.log('[EMAIL] From:', `"${fromName}" <${fromEmail}>`);
                    console.log('[EMAIL] Reply-To:', replyToEmail);
                    console.log('[EMAIL] To:', email);
                    console.log('[EMAIL] Subject:', emailSubject);
                    console.log('[EMAIL] Attachments:', attachments.length);
                    
                    await transporter.sendMail({
                        from: `"${fromName}" <${fromEmail}>`,
                        replyTo: replyToEmail,
                        to: email,
                        subject: emailSubject,
                        html: emailContent,
                        text: emailContent.replace(/<[^>]*>/g, ''), // Plain text version
                        attachments: attachments.length > 0 ? attachments : undefined
                    });
                    console.log(`[EMAIL] ✅ ${isChecklist ? 'Checklist' : 'Guide'} email sent successfully to ${email} (${lang})${attachments.length > 0 ? ' with PDF attachment' : ''}`);
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
// Feature Flags API endpoints
app.get('/api/featureflags', (req, res) => {
    try {
        const flags = getFeatureFlags(req);
        // Debug: log if flags are all disabled (helps diagnose env var issues)
        const enabledCount = Object.values(flags).filter(f => f.enabled).length;
        if (enabledCount === 0 && process.env.NODE_ENV !== 'production') {
            console.warn('[Feature Flags] ⚠️  All flags are disabled. Check .env.local file for FEATURE_* variables.');
        }
        res.json({ flags });
    } catch (error) {
        console.error('[Feature Flags] Error getting flags:', error);
        res.status(500).json({ error: 'Failed to get feature flags' });
    }
});

app.post('/api/featureflags/refresh', (req, res) => {
    // Dev-only endpoint for re-evaluating flags
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ error: 'Refresh endpoint not available in production' });
    }
    
    try {
        const flags = getFeatureFlags(req);
        res.json({ flags });
    } catch (error) {
        console.error('[Feature Flags] Error refreshing flags:', error);
        res.status(500).json({ error: 'Failed to refresh feature flags' });
    }
});

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

        const replyToEmail = process.env.REPLY_TO_EMAIL || fromEmail;
        const contactEmail = getContactEmail();
        
        console.log('[TEST EMAIL] Sending test email to:', email);
        console.log('[TEST EMAIL] From:', `${fromName} <${fromEmail}>`);
        console.log('[TEST EMAIL] Reply-To:', replyToEmail);
        console.log('[TEST EMAIL] Contact Email:', contactEmail);

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
                <li><strong>Reply-To Email:</strong> ${replyToEmail}</li>
                <li><strong>Contact Email:</strong> ${contactEmail}</li>
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
            replyTo: replyToEmail,
            to: email,
            subject: '✅ SMTP Configuration Test - Portfolio',
            html: testEmailContent,
            text: 'This is a test email to verify your SMTP configuration. If you received this, your email setup is working correctly!'
        });

        console.log('[TEST EMAIL] ✅ Test email sent successfully to:', email);
        console.log('[TEST EMAIL] Reply-To configured as:', replyToEmail);

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

// Analytics events endpoint
app.post('/api/events', async (req, res) => {
    try {
        const { name, props, timestamp, url } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Event name is required' });
        }

        // Log event (in production, could send to analytics service)
        console.log('[Analytics Event]', {
            name,
            props: props || {},
            timestamp: timestamp || new Date().toISOString(),
            url: url || '',
            ip: req.ip || req.connection.remoteAddress || 'unknown'
        });

        // In production, you could:
        // - Send to Google Analytics Measurement Protocol
        // - Send to Mixpanel, Amplitude, or similar
        // - Store in a database for custom analytics

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('[Analytics Event] Error:', error.message);
        // Don't expose error details - analytics should fail silently
        res.status(200).json({ success: true });
    }
});

// ============================================
// DEV-ONLY ENDPOINTS: LeadStore Debugging
// These endpoints are blocked in production
// ============================================

/**
 * Middleware to block dev-only endpoints in production
 */
const devOnlyMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(403).json({ error: 'Not available' });
    }
    next();
};

/**
 * GET /api/leadstore/status
 * Returns current LeadStore configuration status (dev-only)
 * Sensitive values are masked for security
 */
app.get('/api/leadstore/status', devOnlyMiddleware, (req, res) => {
    try {
        const status = leadStore.getStatus ? leadStore.getStatus() : {
            provider: process.env.LEAD_STORE_PROVIDER || 'json',
            configured: true,
            message: 'Status method not available on this store type'
        };
        
        res.json({
            success: true,
            status
        });
    } catch (err) {
        console.error('[LeadStore Debug] Error getting status:', err.message);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve status'
        });
    }
});

/**
 * POST /api/leadstore/verify
 * Verifies Google Sheets access and connectivity (dev-only)
 */
app.post('/api/leadstore/verify', devOnlyMiddleware, async (req, res) => {
    try {
        const provider = process.env.LEAD_STORE_PROVIDER || 'json';
        const isGSheets = ['gsheets', 'googlesheets', 'google_sheets'].includes(provider.toLowerCase());
        
        if (!isGSheets) {
            return res.json({
                success: true,
                message: 'JSON provider is active, no external verification needed'
            });
        }
        
        // Check if store has verifyPrimaryAccess method (FallbackLeadStore)
        if (!leadStore.verifyPrimaryAccess) {
            return res.json({
                success: false,
                message: 'Verification not available for this store type'
            });
        }
        
        // Check configuration first
        const status = leadStore.getStatus ? leadStore.getStatus() : {};
        if (!status.configured) {
            return res.json({
                success: false,
                message: 'Google Sheets not configured',
                errors: status.errors || []
            });
        }
        
        // Attempt verification
        console.log('[LeadStore Debug] Verifying Google Sheets access...');
        const verified = await leadStore.verifyPrimaryAccess();
        
        if (verified) {
            console.log('[LeadStore Debug] Verification successful');
            return res.json({
                success: true,
                message: 'Google Sheets access verified'
            });
        } else {
            console.log('[LeadStore Debug] Verification failed');
            return res.json({
                success: false,
                message: 'Google Sheets access verification failed. Check spreadsheet ID and sharing permissions.'
            });
        }
    } catch (err) {
        console.error('[LeadStore Debug] Verification error:', err.message);
        res.json({
            success: false,
            message: `Verification failed: ${err.message}`
        });
    }
});

/**
 * POST /api/leadstore/test-write
 * Writes a deterministic test lead to verify end-to-end functionality (dev-only)
 */
app.post('/api/leadstore/test-write', devOnlyMiddleware, async (req, res) => {
    try {
        const testLead = {
            email: 'test+gsheets@prasadtilloo.com',
            locale: 'en',
            sourcePath: '/debug/gsheets',
            leadMagnet: 'debug-test',
            timestamp: new Date().toISOString(),
            userAgent: 'leadstore-debug',
            referrer: 'local-debug',
            consent: true,
            consentTimestamp: new Date().toISOString(),
            ipHash: 'debug000000000000'
        };
        
        console.log('[LeadStore Debug] Attempting test write...');
        await leadStore.saveLead(testLead);
        console.log('[LeadStore Debug] Test write successful');
        
        res.json({
            success: true,
            message: 'Test lead written successfully',
            testEmail: testLead.email
        });
    } catch (err) {
        console.error('[LeadStore Debug] Test write failed:', err.message);
        res.json({
            success: false,
            error: `Write failed: ${err.message}`
        });
    }
});

/**
 * POST /api/artifact-request
 * Phase 3.3: Artifact request endpoint - stores requests in Google Sheets
 * Phase 3.4B: Hardened with honeypot, rate limiting, and stricter validation
 */
// Rate limiting store for artifact requests (in-memory, best effort)
const artifactRequestRateLimit = new Map();
const ARTIFACT_RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const ARTIFACT_RATE_LIMIT_MAX = 5; // 5 requests per hour per IP

// Hero case studies list (must match frontend)
const HERO_CASE_STUDIES = [
    'brita-ecommerce',
    'delivery-hero-ads',
    'insurance-performance',
    'pact-pcf-data-exchange-network',
    'photography-coach-ai'
];

app.post('/api/artifact-request', async (req, res) => {
    try {
        const {
            name: rawName,
            email: rawEmail,
            company: rawCompany,
            role: rawRole,
            reason: rawReason,
            understandsNDA,
            caseStudySlug: rawCaseStudySlug,
            artifactIds: rawArtifactIds,
            attribution: rawAttribution,
            // Phase 3.4B: Honeypot fields
            website: rawWebsite,
            companyUrl: rawCompanyUrl,
        } = req.body;

        // Phase 3.4B: Honeypot check - silently reject if filled
        if ((rawWebsite && String(rawWebsite).trim().length > 0) || 
            (rawCompanyUrl && String(rawCompanyUrl).trim().length > 0)) {
            // Silently return 200 OK (don't reveal it's a honeypot)
            return res.status(200).json({ success: true, message: 'Request submitted successfully' });
        }

        // Get client info for rate limiting
        const clientIp = req.ip || req.connection.remoteAddress || 'unknown';
        const ipHash = crypto.createHash('sha256').update(clientIp).digest('hex').substring(0, 16);

        // Phase 3.4B: Rate limiting check
        const now = Date.now();
        const rateLimitKey = `artifact_${ipHash}`;
        const rateLimitRecord = artifactRequestRateLimit.get(rateLimitKey);

        if (rateLimitRecord) {
            // Check if within time window
            if (now - rateLimitRecord.firstRequest < ARTIFACT_RATE_LIMIT_WINDOW) {
                if (rateLimitRecord.count >= ARTIFACT_RATE_LIMIT_MAX) {
                    return res.status(429).json({ 
                        error: 'Too many requests. Please try again later.',
                        retryAfter: Math.ceil((ARTIFACT_RATE_LIMIT_WINDOW - (now - rateLimitRecord.firstRequest)) / 1000)
                    });
                }
                rateLimitRecord.count++;
            } else {
                // Reset window
                artifactRequestRateLimit.set(rateLimitKey, { firstRequest: now, count: 1 });
            }
        } else {
            artifactRequestRateLimit.set(rateLimitKey, { firstRequest: now, count: 1 });
        }

        // Validate required fields
        if (!rawEmail || !rawEmail.includes('@')) {
            return res.status(400).json({ error: 'Invalid input.' });
        }
        // Phase 3.4B: Stricter email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(rawEmail).trim())) {
            return res.status(400).json({ error: 'Invalid input.' });
        }
        if (!rawName || !rawName.trim()) {
            return res.status(400).json({ error: 'Invalid input.' });
        }
        if (!rawReason || !rawReason.trim()) {
            return res.status(400).json({ error: 'Invalid input.' });
        }
        if (!understandsNDA) {
            return res.status(400).json({ error: 'NDA acknowledgment required.' });
        }

        // Sanitize inputs
        const email = String(rawEmail).trim().toLowerCase().substring(0, 160);
        const name = safeStr(rawName, 200);
        const company = safeStr(rawCompany, 200);
        const role = safeStr(rawRole, 200);
        const reason = safeStr(rawReason, 200);
        const caseStudySlug = safeStr(rawCaseStudySlug, 100);
        const artifactIds = Array.isArray(rawArtifactIds) ? rawArtifactIds.join(',') : safeStr(rawArtifactIds, 500);

        // Phase 3.4B: Stricter validation - caseStudySlug must be in hero list
        if (!caseStudySlug || !HERO_CASE_STUDIES.includes(caseStudySlug)) {
            return res.status(400).json({ error: 'Invalid input.' });
        }

        // Phase 3.4B: Validate artifactIds (basic check - should match case study artifacts)
        // Note: Full validation would require loading project data, keeping it simple for now
        if (!artifactIds || artifactIds.trim().length === 0) {
            return res.status(400).json({ error: 'Invalid input.' });
        }

        // Prepare artifact request record
        const artifactRequest = {
            timestamp: new Date().toISOString(),
            name,
            email,
            company: company || '',
            role: role || '',
            reason,
            understandsNDA: true,
            caseStudySlug: caseStudySlug || '',
            artifactIds: artifactIds || '',
            ipHash,
            // Attribution (no PII)
            utm_source: rawAttribution?.utm_source || '',
            utm_medium: rawAttribution?.utm_medium || '',
            utm_campaign: rawAttribution?.utm_campaign || '',
            referrer: safeStr(rawAttribution?.referrer, 300) || '',
            landingPath: safeStr(rawAttribution?.landingPath, 200) || '',
        };

        // Save to Google Sheets (use lead store with special leadMagnet type for filtering)
        try {
            // Format as lead with special leadMagnet type for easy filtering
            const artifactLead = {
                email,
                locale: 'en', // Default, can be enhanced
                sourcePath: `/projects/${caseStudySlug}`,
                timestamp: artifactRequest.timestamp,
                ipHash: artifactRequest.ipHash,
                leadMagnet: 'artifact-request', // Special marker
                userAgent: safeStr(req.get('user-agent'), 250),
                referrer: artifactRequest.referrer,
                consent: true,
                consentTimestamp: artifactRequest.timestamp,
                // Additional fields for artifact requests
                name,
                company: company || '',
                role: role || '',
                reason,
                understandsNDA: true,
                caseStudySlug,
                artifactIds,
                // Attribution
                utm_source: artifactRequest.utm_source,
                utm_medium: artifactRequest.utm_medium,
                utm_campaign: artifactRequest.utm_campaign,
                landingPath: artifactRequest.landingPath,
            };

            await leadStore.saveLead(artifactLead);
            // Phase 3.4B: Server logging (no email, no PII)
            const artifactCount = artifactIds.split(',').length;
            console.log('[ARTIFACT REQUEST] Request saved:', {
                timestamp: new Date().toISOString(),
                slug: caseStudySlug,
                artifactCount,
                ipHash,
            });
        } catch (saveErr) {
            console.error('[ARTIFACT REQUEST] Error saving to store:', saveErr.message);
            // Continue - don't block response
        }

        // Send confirmation email
        try {
            const transporter = createEmailTransporter();
            const fromEmail = process.env.FROM_EMAIL;
            const fromName = process.env.FROM_NAME || 'Prasad Tilloo';
            const contactEmail = getContactEmail();

            if (transporter && fromEmail) {
                await transporter.sendMail({
                    from: `"${fromName}" <${fromEmail}>`,
                    to: email,
                    replyTo: contactEmail,
                    subject: 'Artifact Request Received',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2>Artifact Request Received</h2>
                            <p>Thank you for your interest, ${name}.</p>
                            <p>We've received your request for access to case study artifacts. We'll review your request and get back to you within 48 hours.</p>
                            <p>Best regards,<br>Prasad Tilloo</p>
                        </div>
                    `,
                });

                // Also notify you
                await transporter.sendMail({
                    from: `"${fromName}" <${fromEmail}>`,
                    to: contactEmail,
                    subject: `New Artifact Request: ${caseStudySlug}`,
                    html: `
                        <div style="font-family: sans-serif;">
                            <h2>New Artifact Request</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                            <p><strong>Role:</strong> ${role || 'Not provided'}</p>
                            <p><strong>Reason:</strong> ${reason}</p>
                            <p><strong>Case Study:</strong> ${caseStudySlug}</p>
                            <p><strong>Artifacts:</strong> ${artifactIds}</p>
                        </div>
                    `,
                });
            }
        } catch (emailErr) {
            console.error('[ARTIFACT REQUEST] Error sending email:', emailErr.message);
            // Continue - don't block response
        }

        res.status(200).json({ success: true, message: 'Request submitted successfully' });
    } catch (error) {
        console.error('[ARTIFACT REQUEST] Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * GET /health
 * Phase 3.2C: Health check endpoint for Cloud Run
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'portfolio-api',
    });
});

/**
 * GET /api/version
 * Phase 3.4E: Deployment diagnostics endpoint
 */
app.get('/api/version', (req, res) => {
    const gitSha = process.env.GIT_SHA || process.env.COMMIT_SHA || 'unknown';
    const buildTimestamp = process.env.BUILD_TIMESTAMP || process.env.BUILD_DATE || 'unknown';
    const nodeEnv = process.env.NODE_ENV || 'unknown';
    const leadStoreProvider = process.env.LEAD_STORE_PROVIDER || 'json';

    res.status(200).json({
        gitSha,
        buildTimestamp,
        nodeEnv,
        leadStoreProvider,
        timestamp: new Date().toISOString(),
    });
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
