import { buildApiUrl } from './apiBase';

export interface ChatMessage {
    role: 'user' | 'model';
    content: string;
}

export const chatWithPrasad = async (history: ChatMessage[], message: string): Promise<string> => {
    const response = await fetch(buildApiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, message })
    });

    if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.response || 'I am having trouble responding right now. Please try again.';
};
