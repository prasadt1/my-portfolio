// src/components/CaseStudyNavigation.tsx
// Phase 4 D1: Sticky navigation pills for CaseStudyPage

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../services/analytics';

export type CaseStudySection = 'snapshot' | 'challenge' | 'delivery' | 'proof' | 'artifacts' | 'contact';

interface CaseStudyNavigationProps {
    activeSection: CaseStudySection;
    onSectionClick: (section: CaseStudySection) => void;
}

const CaseStudyNavigation: React.FC<CaseStudyNavigationProps> = ({ activeSection, onSectionClick }) => {
    const { t } = useTranslation();

    const sections: { id: CaseStudySection; label: string; labelKey?: string }[] = [
        { id: 'snapshot', label: 'Snapshot', labelKey: 'caseStudy.nav.snapshot' },
        { id: 'challenge', label: 'Challenge', labelKey: 'caseStudy.nav.challenge' },
        { id: 'delivery', label: 'Delivery', labelKey: 'caseStudy.nav.delivery' },
        { id: 'proof', label: 'Proof', labelKey: 'caseStudy.nav.proof' },
        { id: 'artifacts', label: 'Artifacts', labelKey: 'caseStudy.nav.artifacts' },
        { id: 'contact', label: 'Contact', labelKey: 'caseStudy.nav.contact' },
    ];

    const handleClick = (section: CaseStudySection) => {
        onSectionClick(section);
        trackEvent('case_study_nav_pill_clicked', {
            section,
            caseStudySlug: window.location.pathname.split('/').pop() || '',
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-20 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => handleClick(section.id)}
                            className={`
                                px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap
                                ${
                                    activeSection === section.id
                                        ? 'bg-emerald-600 text-white shadow-md'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                                }
                            `}
                            aria-label={t(section.labelKey || `caseStudy.nav.${section.id}`, { defaultValue: section.label })}
                            aria-current={activeSection === section.id ? 'page' : undefined}
                        >
                            {t(section.labelKey || `caseStudy.nav.${section.id}`, { defaultValue: section.label })}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default CaseStudyNavigation;
