import { Zap, Clock, Users, Building, Euro, Cloud, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const QuickStats: React.FC = () => {
    const { t } = useTranslation();

    const stats = [
        { icon: <Clock className="text-emerald-500" />, value: '15+', label: t('quickStats.labels.experience') },
        { icon: <Building className="text-blue-500" />, value: '25+', label: t('quickStats.labels.projects') },
        { icon: <Euro className="text-amber-500" />, value: '€2M+', label: t('quickStats.labels.savings') },
        { icon: <Users className="text-purple-500" />, value: '30+', label: t('quickStats.labels.teamSize') },
        { icon: <Cloud className="text-sky-500" />, value: '8+', label: t('quickStats.labels.industries') },
        { icon: <Zap className="text-rose-500" />, value: '5+', label: t('quickStats.labels.certifications') }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                {t('quickStats.title')}
            </h3>
            <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{t('quickStats.available')}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-700">
                        <div className="text-2xl mb-1 flex justify-center">{stat.icon}</div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {stat.value}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="space-y-2">
                    <a
                        href="https://calendly.com/prasad-sgsits"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-sm"
                    >
                        {t('quickStats.schedule')}
                    </a>

                    <a
                        href="/resume.pdf"
                        download
                        className="block w-full text-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Download size={16} />
                            {t('quickStats.resume')}
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default QuickStats;
