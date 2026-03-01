
import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { buildApiUrl } from '../services/apiBase';

interface SmartFiltersProps {
    onFilter: (tags: string[]) => void;
    availableTags: string[];
}

const SmartProjectFilter: React.FC<SmartFiltersProps> = ({ onFilter, availableTags }) => {
    const [query, setQuery] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSmartSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsAnalyzing(true);
        try {
            const response = await fetch(buildApiUrl('/api/smart-tags'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, availableTags })
            });

            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    onFilter(data);
                    return;
                }
            }

            // Fallback: simple tag match when AI is unavailable
            const lowerQuery = query.toLowerCase();
            const fallbackTags = availableTags.filter(tag => lowerQuery.includes(tag.toLowerCase()));
            onFilter(fallbackTags);
        } catch (error) {
            console.error('Smart Search Error:', error);
            const lowerQuery = query.toLowerCase();
            const fallbackTags = availableTags.filter(tag => lowerQuery.includes(tag.toLowerCase()));
            onFilter(fallbackTags);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-10">
            <form onSubmit={handleSmartSearch} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-slate-200 p-1">
                    <Search className="ml-4 text-emerald-500" size={20} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask me: 'Show me projects with AI and Cloud'..."
                        className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400 font-sans"
                    />
                    <button
                        type="submit"
                        disabled={isAnalyzing || !query.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all disabled:opacity-70 flex items-center gap-2"
                    >
                        {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : 'Ask AI'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SmartProjectFilter;
