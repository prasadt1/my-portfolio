import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const apiKey = process.env.VITE_GEMINI_API_KEY;
console.log("Checking API Key:", apiKey ? "Present (" + apiKey.substring(0, 5) + "...)" : "MISSING");

const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-2.0-flash-exp",
    "gemini-1.5-pro",
    "gemini-pro"
];

async function test() {
    for (const modelName of modelsToTest) {
        console.log(`Testing model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, are you there?");
            const response = await result.response;
            console.log(`✅ SUCCESS: ${modelName} responded:`, response.text().substring(0, 50) + "...");
            return; // Exit on first success
        } catch (e) {
            console.log(`❌ FAILED: ${modelName} - ${e.message.split('\n')[0]}`);
        }
    }
}

test();
