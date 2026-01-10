
import { GoogleGenerativeAI, Tool, SchemaType } from '@google/generative-ai';
import { SYSTEM_PROMPT } from './aiContext';
import { products } from '../data/products';
import { caseStudies } from '../data/caseStudies';
import i18n from '../i18n';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');

// Define tools
const tools: Tool[] = [
    {
        functionDeclarations: [
            {
                name: 'get_products',
                description: 'Get a list of available consulting products and toolkits.',
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        category: {
                            type: SchemaType.STRING,
                            description: 'Optional category filter: "industry40", "compliance", "carbon", "consulting"',
                            enum: ['industry40', 'compliance', 'carbon', 'consulting']
                        }
                    },
                }
            },
            {
                name: 'get_case_studies',
                description: 'Get details about Prasad\'s past projects and case studies.',
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        industry: {
                            type: SchemaType.STRING,
                            description: 'Industry to filter by (e.g., "Healthcare", "Pharma", "eCommerce")'
                        }
                    }
                }
            },
            {
                name: 'check_availability',
                description: 'Check Prasad\'s calendar availability for a meeting.',
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {}
                }
            },
            {
                name: 'get_roi_estimate',
                description: 'Calculate a rough ROI estimate for a potential project.',
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        spend: { type: SchemaType.NUMBER, description: 'Monthly cloud spend or maintenance cost' },
                        type: { type: SchemaType.STRING, description: 'Type of project: "migration" or "modernization"', enum: ['migration', 'modernization'] }
                    },
                    required: ['spend', 'type']
                }
            }
        ]
    }
];

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-exp',
    tools: tools
});

// Tool implementations
const functions: Record<string, Function> = {
    get_products: ({ category }: { category?: string }) => {
        const filtered = category ? products.filter(p => p.category === category) : products;
        return filtered.map(p => ({
            title: i18n.t(`products.${p.id}.title`),
            price: p.price,
            link: `/products/${p.slug}`
        }));
    },
    get_case_studies: ({ industry }: { industry?: string }) => {
        const filtered = industry
            ? caseStudies.filter(c => JSON.stringify(c).toLowerCase().includes(industry.toLowerCase()))
            : caseStudies;
        return filtered.map(c => ({ client: c.header.client.type, title: c.header.title, outcome: c.outcomes.hero_metric }));
    },
    check_availability: () => {
        return {
            next_slots: ['Tomorrow 10:00 AM CET', 'Tomorrow 2:00 PM CET', 'Friday 11:00 AM CET'],
            booking_link: 'https://calendly.com/prasadtilloo/30min'
        };
    },
    get_roi_estimate: ({ spend, type }: { spend: number, type: string }) => {
        if (type === 'migration') {
            return { savings: spend * 12 * 0.4, message: "Estimated 40% annual savings on total cost of ownership." };
        }
        return { savings: spend * 0.6, message: "Estimated 60% reduction in maintenance costs." };
    }
};

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export const chatWithPrasad = async (history: ChatMessage[], message: string): Promise<string> => {
    if (!apiKey) throw new Error('Gemini API key not configured');

    const chat = model.startChat({
        history: [
            { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
            { role: 'model', parts: [{ text: "Understood. I am Prasad's Digital Agent." }] },
            ...history.map(msg => ({ role: msg.role, parts: [{ text: msg.content }] }))
        ]
    });

    try {
        let result = await chat.sendMessage(message);
        let response = await result.response;
        let functionCalls = response.functionCalls();

        // Handle function calling loop (basic single turn implementation for now)
        if (functionCalls && functionCalls.length > 0) {
            const call = functionCalls[0];
            const funcName = call.name;
            const args = call.args;

            console.log(`🤖 Calling function: ${funcName}`, args);

            if (functions[funcName]) {
                const apiResponse = functions[funcName](args);

                // Send result back to model
                result = await chat.sendMessage([{
                    functionResponse: {
                        name: funcName,
                        response: { result: apiResponse }
                    }
                }]);
                response = await result.response;
            }
        }

        return response.text();
    } catch (error) {
        console.error('Chat Error:', error);
        return "I'm having a bit of trouble accessing my tools right now, but I can still answer general questions!";
    }
};
