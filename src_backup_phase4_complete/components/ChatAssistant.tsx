import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithPrasad } from '../services/chatService';

interface Message {
    role: 'user' | 'model';
    content: string;
}

const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load history from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('chat_history');
        if (saved) {
            setMessages(JSON.parse(saved));
        } else {
            setMessages([{ role: 'model', content: "Hello! I'm Prasad's Digital Assistant. I can answer questions about his architectural experience, leadership style, and technical skills. How can I help you today?" }]);
        }
    }, []);

    // Save history to local storage whenever messages change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chat_history', JSON.stringify(messages));
        }
    }, [messages]);

    const suggestedQuestions = [
        "What is Prasad's experience with Cloud Architecture?",
        "Tell me about his cost savings achievements.",
        "What industries has he worked in?",
        "Does he have experience with AI/ML?",
        "What is his leadership philosophy?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage = { role: 'user' as const, content: text };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Get history (excluding the first greeting message from the UI state if needed, 
            // but the service handles system prompt. We just pass the relevant history).
            const history = messages.slice(1).map(m => ({
                role: m.role as 'user' | 'model',
                content: m.content
            }));

            const responseText = await chatWithPrasad(history, text);
            setMessages(prev => [...prev, { role: 'model', content: responseText }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                role: 'model',
                content: "I'm having trouble connecting to my brain. Please try again in a moment."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-44 right-4 md:right-8 w-[90vw] md:w-[400px] h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-[100] flex flex-col font-sans"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 dark:bg-slate-950 p-4 flex justify-between items-center text-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center border-2 border-slate-800 shadow-sm relative">
                                    {/* Online Indicator */}
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                                    <span className="font-serif font-bold text-lg">PT</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base">Prasad's Digital Agent</h3>
                                    <div className="text-xs text-slate-400 flex items-center gap-1">
                                        Powered by Gemini 2.0 Flash
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                                aria-label="Close chat"
                            >
                                <X size={20} className="text-slate-400 hover:text-white" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 scroll-smooth">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'model' && (
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mr-2 mt-1 shrink-0">
                                            <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-emerald-600 text-white rounded-br-none'
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mr-2 mt-1 shrink-0">
                                        <Sparkles size={14} className="text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Analyzing portfolio data...</span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions & Input Area */}
                        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shrink-0">
                            {/* Persistent Horizontal Scrollable Suggestions */}
                            <div className="px-4 py-3 overflow-x-auto flex gap-2 no-scrollbar border-b border-slate-100 dark:border-slate-800">
                                {suggestedQuestions.map((q, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSendMessage(q)}
                                        disabled={isLoading}
                                        className="whitespace-nowrap flex-shrink-0 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-500/30 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all disabled:opacity-50"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>

                            {/* Input Form */}
                            <form onSubmit={handleSubmit} className="p-3">
                                <div className="flex gap-2 relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask a question..."
                                        className="flex-1 pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 border border-transparent rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm dark:text-white transition-all placeholder:text-slate-400"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        aria-label="Send message"
                                        className="absolute right-2 top-1.5 p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                                <div className="text-center mt-2">
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                        AI responses may vary.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
                className="fixed bottom-24 right-4 md:right-8 p-0 w-14 h-14 bg-slate-900 dark:bg-emerald-600 text-white rounded-full 
                   shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-emerald-900/40 
                   transition-all z-50 group flex items-center justify-center border-2 border-white/10"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />}
            </motion.button>
        </>
    );
};

export default ChatAssistant;
