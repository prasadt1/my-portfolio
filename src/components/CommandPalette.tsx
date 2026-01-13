import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, X, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { semanticSearch } from '../services/semanticSearch';

const CommandPalette: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Array<{ slug: string; title: string; relevance: string; score: number }>>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Toggle with Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        const handleOpenEvent = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-command-palette', handleOpenEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-command-palette', handleOpenEvent);
        };
    }, []);

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length > 2) {
                setLoading(true);
                const hits = await semanticSearch(query);
                setResults(hits);
                setLoading(false);
            } else {
                setResults([]);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (slug: string) => {
        setIsOpen(false);
        navigate(`/projects/${slug}`);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
                >
                    {/* Search Input */}
                    <div className="flex items-center border-b border-slate-200 dark:border-slate-800 p-4">
                        <Search className="text-slate-400 mr-3" size={20} />
                        <input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask me anything... (e.g., 'Show projects with HIPAA compliance')"
                            className="flex-1 bg-transparent outline-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400"
                        />
                        <div className="flex items-center gap-2">
                            {loading && <Loader2 className="animate-spin text-emerald-500" size={18} />}
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {query.length < 3 && (
                            <div className="p-8 text-center text-slate-500">
                                <Command size={32} className="mx-auto mb-3 opacity-20" />
                                <p>Type to search projects, skills, or ask questions.</p>
                            </div>
                        )}

                        {results.length > 0 && (
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2">AI Results</h3>
                                {results.map((hit) => (
                                    <button
                                        key={hit.slug}
                                        onClick={() => handleSelect(hit.slug)}
                                        className="w-full text-left p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-start gap-4 transition-colors group"
                                    >
                                        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded text-emerald-600 dark:text-emerald-400 mt-0.5">
                                            <Sparkles size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                                                    {hit.title}
                                                </span>
                                                <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">
                                                    {hit.score}% Match
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                                                {hit.relevance}
                                            </p>
                                        </div>
                                        <ArrowRight className="text-slate-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all self-center" size={18} />
                                    </button>
                                ))}
                            </div>
                        )}

                        {query.length > 3 && results.length === 0 && !loading && (
                            <div className="p-8 text-center text-slate-500">
                                <p>No matching projects found.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-2 text-xs text-slate-400 flex justify-between px-4">
                        <span>Pro Tip: You can ask natural questions.</span>
                        <div className="flex gap-2">
                            <span className="bg-slate-200 dark:bg-slate-700 px-1.5 rounded text-[10px]">↑↓</span> to navigate
                            <span className="bg-slate-200 dark:bg-slate-700 px-1.5 rounded text-[10px]">↵</span> to select
                            <span className="bg-slate-200 dark:bg-slate-700 px-1.5 rounded text-[10px]">esc</span> to close
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CommandPalette;
