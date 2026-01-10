import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import type { ArchitectureRequest, GeneratedArchitecture } from '../types';

const PORTFOLIO_CONTEXT = `
REFERENCE PROJECTS (Prasad Tilloo's Portfolio):
1. Healthcare: PwC Healthcare Modernization - $650K, 70% traffic increase, HIPAA compliant
2. Healthcare: Boehringer Ingelheim AI/ML Platform - 50% faster insights, GDPR compliant
3. Financial: Insurance Claims Processing - 80% efficiency improvement
4. Financial: Bank of America Account Opening - Streamlined process, compliance automation
5. eCommerce: BRITA Platform - 6 markets, headless architecture, zero-downtime migration
6. eCommerce: Delivery Hero Ads - 5M+ daily transactions, 99.99% SLA, 20% revenue increase
7. AI/ML: Medical Research Platform - 100K+ studies, BioBERT semantic search
8. AI/ML: Photography Coach - Agentic AI, RAG system, production observability
9. Legacy: Mainframe Migration - 7.8M LOC COBOL, $25M+ savings
10. Climate: PACT PCF Network - Fortune 100 standard, Microsoft/SAP/Siemens adoption
`;

const AGENT_PERSONAS = `
You are the "Architecture Engine", a multi-agent system based on Prasad Tilloo's 15+ years of experience.

Specialist agents:
1. HEALTHCARE AGENT: HIPAA, FHIR, HL7, EMR/EHR systems
2. FINANCIAL AGENT: PCI-DSS, SOC2, banking systems
3. ECOMMERCE AGENT: High-traffic, multi-tenant, headless commerce
4. AI/ML AGENT: MLOps, RAG, vector databases
5. CLOUD AGENT: AWS/Azure/GCP architecture
6. SECURITY AGENT: IAM, Zero Trust, encryption

Generate practical, production-ready architecture based on Prasad's actual projects.
Keep responses concise and focused.
`;

export const generateArchitecture = async (
  request: ArchitectureRequest
): Promise<GeneratedArchitecture> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY not configured. Please add it to your .env.local file.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp'
  });

  const prompt = `
REQUEST:
Industry: ${request.industry}
Challenge: ${request.challenge}
Team: ${request.context.teamSize || 'Not specified'}
Budget: ${request.context.budget || 'Not specified'}
Timeline: ${request.context.timeline || 'Not specified'}

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
      summary: {
        type: SchemaType.STRING,
        description: 'Executive summary in 60-80 words'
      },
      recommendations: {
        type: SchemaType.ARRAY,
        items: { type: SchemaType.STRING },
        description: '3-5 key recommendations'
      },
      timeline: { type: SchemaType.STRING },
      budget: { type: SchemaType.STRING },
      risks: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            level: {
              type: SchemaType.STRING,
              enum: ['high', 'medium', 'low']
            },
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
                type: {
                  type: SchemaType.STRING,
                  enum: ['frontend', 'service', 'database', 'security', 'external']
                },
                description: { type: SchemaType.STRING },
                technologies: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING }
                },
                risks: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING }
                }
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

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      systemInstruction: AGENT_PERSONAS,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    });

    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No content generated');
    }

    // Clean and parse JSON
    let cleanText = text.trim();
    cleanText = cleanText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.substring(firstBrace, lastBrace + 1);
    }

    const data = JSON.parse(cleanText) as GeneratedArchitecture;

    // Validate and set defaults
    if (!data.diagram || !data.diagram.nodes || data.diagram.nodes.length === 0) {
      throw new Error('Invalid architecture: missing diagram nodes');
    }

    data.recommendations = data.recommendations || [];
    data.risks = data.risks || [];
    data.stack = data.stack || [];
    data.compliance = data.compliance || [];
    data.diagram.edges = data.diagram.edges || [];

    return data;
  } catch (error) {
    console.error('Architecture Engine Error:', error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid Gemini API key. Please check your .env.local file.');
      }
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
    }

    throw error;
  }
};
