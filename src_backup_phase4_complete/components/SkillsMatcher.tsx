
import { useState } from 'react';
import { Search, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { analyzeJobMatch, type SkillsAnalysis } from '../services/skillsMatcher';

const SkillsMatcher = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState<SkillsAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCalculateMatch = async () => {
        if (!jobDescription.trim()) return;

        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const result = await analyzeJobMatch(jobDescription);
            setAnalysis(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to analyze. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-emerald-200 dark:border-slate-700 shadow-sm relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none" />

            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-slate-900 dark:text-white">
                <Search className="text-emerald-600 dark:text-emerald-400" />
                AI Fit Analyzer
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm relative z-10">
                Paste a job description to see how Prasad's skills match using Gemini AI.
            </p>

            <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded-lg mb-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/80 dark:bg-slate-950/50 backdrop-blur-sm text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors"
            />

            <button
                onClick={handleCalculateMatch}
                disabled={loading || !jobDescription.trim()}
                className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Analyzing...
                    </>
                ) : (
                    'Analyze Match'
                )}
            </button>

            {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30 flex items-center gap-2 text-sm">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {analysis && (
                <div className="mt-6 p-5 bg-white dark:bg-slate-800 rounded-xl border-2 border-emerald-100 dark:border-slate-700 shadow-sm animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Match Score</div>
                            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{analysis.matchScore}%</div>
                        </div>
                        <div className={`
              px-3 py-1 rounded-full text-sm font-bold border
              ${analysis.matchLevel === 'High' || analysis.matchLevel === 'Perfect' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                                analysis.matchLevel === 'Medium' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' :
                                    'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'}
            `}>
                            {analysis.matchLevel} Fit
                        </div>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 mb-6">
                        <div
                            className={`h-2.5 rounded-full transition-all duration-1000 ${analysis.matchScore > 70 ? 'bg-emerald-500' :
                                analysis.matchScore > 40 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${analysis.matchScore}%` }}
                        />
                    </div>

                    <div className="mb-4">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Analysis</h4>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                            {analysis.explanation}
                        </p>
                    </div>

                    {analysis.matchingSkills.length > 0 && (
                        <div className="mb-4">
                            <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2 text-sm flex items-center gap-1">
                                <CheckCircle2 size={14} /> Matching Skills
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {analysis.matchingSkills.map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded border border-emerald-100 dark:border-emerald-800">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {analysis.matchScore > 80 && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
                            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mb-2">
                                Great fit! Let's discuss this role.
                            </p>
                            <a
                                href="https://calendly.com/prasad-sgsits"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
                            >
                                Schedule Interview
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SkillsMatcher;
