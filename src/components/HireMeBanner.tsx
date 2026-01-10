
import { Download, Calendar } from 'lucide-react';

const HireMeBanner = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-slate-900 dark:to-slate-900 dark:border-t dark:border-emerald-500/30 text-white shadow-2xl z-50 animate-slide-up">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-300 dark:bg-emerald-400 rounded-full animate-pulse" />
                    <span className="font-semibold">Available for Opportunities</span>
                    <span className="text-emerald-100 dark:text-slate-400 text-sm hidden sm:inline">
                        | Freelance, Contract, Full-time
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <a
                        href="/resume.pdf"
                        download
                        className="bg-white dark:bg-emerald-600 text-emerald-600 dark:text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-500 transition-all flex items-center gap-2 text-sm"
                    >
                        <Download size={16} />
                        Download Resume
                    </a>

                    <a
                        href="https://calendly.com/prasad-sgsits"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-700 dark:bg-slate-800 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-800 dark:hover:bg-slate-700 transition-all flex items-center gap-2 text-sm"
                    >
                        <Calendar size={16} />
                        Schedule Call
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HireMeBanner;
