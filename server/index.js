import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { contextData } from './context.js';

dotenv.config({ path: '../.env.local' });

const app = express();
const port = 3001;

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
