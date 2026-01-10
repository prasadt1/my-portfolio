
const QuickStats = () => {
    const stats = [
        { label: 'Years Experience', value: '15+', icon: '📊' },
        { label: 'Projects Delivered', value: '50+', icon: '✅' },
        { label: 'Cost Savings', value: '$1M+', icon: '💰' },
        { label: 'Team Size Led', value: '12+', icon: '👥' },
        { label: 'Industries', value: '8', icon: '🏢' },
        { label: 'Certifications', value: '3', icon: '🏆' }
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                At a Glance
            </h3>

            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-700">
                        <div className="text-2xl mb-1">{stat.icon}</div>
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
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Available Now
                </div>

                <div className="space-y-2">
                    <a
                        href="https://calendly.com/prasad-sgsits"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-sm"
                    >
                        Schedule Interview
                    </a>

                    <a
                        href="/resume.pdf"
                        download
                        className="block w-full text-center bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                    >
                        Download Resume
                    </a>
                </div>
            </div>
        </div>
    );
};

export default QuickStats;
