import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateFitCheck } from '../services/fitCheckService';
import { Briefcase, CheckCircle, AlertTriangle, FileText, Loader2, ArrowRight, Copy } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

const FitCheckPage: React.FC = () => {
    const { t } = useTranslation();
    const [jd, setJd] = useState('');
    const [status, setStatus] = useState<'idle' | 'analyzing' | 'complete'>('idle');
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!jd) return;
        setStatus('analyzing');
        try {
            const data = await generateFitCheck({ jobDescription: jd });
            setResult(data);
            setStatus('complete');
        } catch (error) {
            console.error(error);
            setStatus('idle');
            alert('Analysis failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4">
            <SEO title="AI Fit Check | Prasad Tilloo" description="Instant AI analysis of your Job Description against my portfolio." />

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white">
                            {t('fitCheck.title')}
                        </h1>
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-emerald-200">{t('fitCheck.beta')}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t('fitCheck.subtitle')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* INPUT SECTION */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 h-fit">
                        <label className="block font-bold text-slate-900 dark:text-white mb-3">
                            {t('fitCheck.inputLabel')}
                        </label>
                        <textarea
                            className="w-full h-80 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none resize-none mb-6 text-sm"
                            placeholder={t('fitCheck.placeholder')}
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                        />
                        <button
                            onClick={handleAnalyze}
                            disabled={!jd || status === 'analyzing'}
                            className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors disabled:opacity-50"
                        >
                            {status === 'analyzing' ? (
                                <><Loader2 className="animate-spin" /> {t('fitCheck.analyzing')}</>
                            ) : (
                                <>{t('fitCheck.analyzeButton')} <ArrowRight size={18} /></>
                            )}
                        </button>
                    </div>

                    {/* RESULTS SECTION */}
                    <div className="space-y-6">
                        {status === 'idle' && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12">
                                <Briefcase size={48} className="mb-4 opacity-50" />
                                <p>{t('fitCheck.results.placeholderTitle')}</p>
                            </div>
                        )}

                        {status === 'complete' && result && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                {/* SCORE CARD */}
                                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg mb-6 flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-bold uppercase tracking-wider text-slate-500">{t('fitCheck.results.matchScore')}</div>
                                        <div className={`text-5xl font-bold ${result.score > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {result.score}%
                                        </div>
                                    </div>
                                    <div className="text-right max-w-xs">
                                        <div className="font-bold text-slate-900 dark:text-white mb-1">
                                            {result.score > 80 ? t('fitCheck.results.highAlignment') : t('fitCheck.results.potentialMatch')}
                                        </div>
                                        <p className="text-sm text-slate-500">{result.matchSummary}</p>
                                    </div>
                                </div>

                                {/* SKILLS BREAKDOWN */}
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                                        <h3 className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 mb-3">
                                            <CheckCircle size={18} /> {t('fitCheck.results.topMatches')}
                                        </h3>
                                        <ul className="text-sm space-y-2">
                                            {result.keyMatches.map((skill: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                                        <h3 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 mb-3">
                                            <AlertTriangle size={18} /> {t('fitCheck.results.missingGaps')}
                                        </h3>
                                        <ul className="text-sm space-y-2">
                                            {result.missingSkills.length > 0 ? result.missingSkills.map((skill: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                    {skill}
                                                </li>
                                            )) : <li>No significant gaps identified.</li>}
                                        </ul>
                                    </div>
                                </div>

                                {/* GENERATED COVER LETTER */}
                                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative">
                                    <h3 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-4">
                                        <FileText size={20} className="text-blue-500" /> {t('fitCheck.results.generatedPitch')}
                                    </h3>
                                    <div className="prose prose-slate dark:prose-invert text-sm max-w-none whitespace-pre-wrap">
                                        {result.coverLetter}
                                    </div>
                                    <button
                                        className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                                        onClick={() => navigator.clipboard.writeText(result.coverLetter)}
                                        title="Copy to Clipboard"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FitCheckPage;
