// src/components/ExpandableContent.tsx
// Phase 4 A1: Reusable expandable content component for progressive disclosure

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../services/analytics';

export interface ExpandableContentProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
    compactPreview?: React.ReactNode;
    compactMaxItems?: number;
    showCount?: boolean;
    sectionId?: string;
    pageId?: string;
    className?: string;
    variant?: 'default' | 'subtle';
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({
    title,
    children,
    defaultExpanded = false,
    compactPreview,
    compactMaxItems,
    showCount = false,
    sectionId,
    pageId,
    className = '',
    variant = 'default',
}) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const handleToggle = () => {
        const newState = !isExpanded;
        setIsExpanded(newState);

        // Track analytics
        trackEvent('show_more_clicked', {
            section: sectionId || title,
            page: pageId || window.location.pathname,
            action: newState ? 'expanded' : 'collapsed',
        });
    };

    const buttonClass = variant === 'subtle'
        ? 'text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors'
        : 'text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors';

    return (
        <div className={className}>
            <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
                {compactPreview && (
                    <button
                        onClick={handleToggle}
                        className={`${buttonClass} flex items-center gap-1`}
                        aria-expanded={isExpanded}
                        aria-label={isExpanded ? t('common.showLess', 'Show less') : t('common.showMore', 'Show more')}
                    >
                        {isExpanded ? (
                            <>
                                {t('common.showLess', 'Show less')} <ChevronUp size={16} />
                            </>
                        ) : (
                            <>
                                {t('common.showMore', 'Show more')}
                                {showCount && typeof compactMaxItems === 'number' && (
                                    <span className="text-xs opacity-75">
                                        ({compactMaxItems} more)
                                    </span>
                                )}
                                <ChevronDown size={16} />
                            </>
                        )}
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                ) : (
                    compactPreview && (
                        <motion.div
                            key="compact"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {compactPreview}
                            <button
                                onClick={handleToggle}
                                className={`${buttonClass} mt-3 flex items-center gap-1`}
                                aria-expanded={isExpanded}
                            >
                                {t('common.showMore', 'Show more')}
                                {showCount && typeof compactMaxItems === 'number' && (
                                    <span className="text-xs opacity-75">
                                        ({compactMaxItems} more)
                                    </span>
                                )}
                                <ChevronDown size={16} />
                            </button>
                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExpandableContent;
