import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuideContent: React.FC = () => {
    const { t } = useTranslation();
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const decisions = [
        'guide.content.decision1',
        'guide.content.decision2',
        'guide.content.decision3',
        'guide.content.decision4',
        'guide.content.decision5',
        'guide.content.decision6',
        'guide.content.decision7',
        'guide.content.decision8',
        'guide.content.decision9',
        'guide.content.decision10',
    ];

    const toggleDecision = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-8">
                <BookOpen className="text-emerald-600 dark:text-emerald-400" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {t('guide.content.title')}
                </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-8">
                {t('guide.content.intro')}
            </p>

            <div className="space-y-3 mb-8">
                {decisions.map((decisionKey, index) => (
                    <div
                        key={index}
                        className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleDecision(index)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <span className="font-semibold text-slate-900 dark:text-white">
                                {index + 1}. {t(decisionKey)}
                            </span>
                            {expandedIndex === index ? (
                                <ChevronUp className="text-slate-400 flex-shrink-0" size={20} />
                            ) : (
                                <ChevronDown className="text-slate-400 flex-shrink-0" size={20} />
                            )}
                        </button>
                        <AnimatePresence>
                            {expandedIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {t(`${decisionKey}.desc`)}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {t('guide.content.ctaText')}
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                >
                    {t('guide.content.ctaButton')}
                    <ChevronDown className="rotate-[-90deg]" size={20} />
                </Link>
            </div>
        </div>
    );
};

export default GuideContent;
