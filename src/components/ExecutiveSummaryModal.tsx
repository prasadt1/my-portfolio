import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Lightbulb, Package, TrendingUp, ShieldCheck } from 'lucide-react';
import { 
    CaseStudy, 
    type LocalizedString,
    getLocalizedString, 
    getLocalizedStringArray,
    isLocalizedPersonaChallenge,
    isLegacyChallenge
} from '../types/CaseStudy';

interface ExecutiveSummaryModalProps {
    project: CaseStudy;
    isOpen: boolean;
    onClose: () => void;
}

const ExecutiveSummaryModal: React.FC<ExecutiveSummaryModalProps> = ({ project, isOpen, onClose }) => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    // Close on escape key
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    // Get localized string helper
    const getStr = (value: string | LocalizedString | undefined): string => {
        if (!value) return '';
        if (typeof value === 'string') return value;
        return getLocalizedString(value, locale);
    };

    // Get challenge situation for business context
    const getBusinessContext = (): string => {
        if (isLocalizedPersonaChallenge(project.challenge)) {
            return getLocalizedString(project.challenge.executive?.situation || project.challenge.standard.situation, locale);
        }
        if (isLegacyChallenge(project.challenge)) {
            return project.challenge.situation;
        }
        return '';
    };

    // Get key decisions from executive persona or key tensions
    const getKeyDecisions = (): string[] => {
        if (project.personaChallenges?.executive) {
            const decisions = getLocalizedStringArray(project.personaChallenges.executive.decisionPoints, locale);
            return decisions.slice(0, 3);
        }
        if (isLocalizedPersonaChallenge(project.challenge)) {
            const tensions = getLocalizedStringArray(project.challenge.executive?.keyTensions || project.challenge.standard.keyTensions, locale);
            return tensions.slice(0, 3);
        }
        if (isLegacyChallenge(project.challenge)) {
            return project.challenge.pain_points?.slice(0, 3).map(p => `${p.title}: ${p.description}`) || [];
        }
        return [];
    };

    // Get deliverables
    const getDeliverables = (): string[] => {
        if (project.deliverables_compact) {
            return project.deliverables_compact.slice(0, 4).map(d => getStr(d.title));
        }
        if (project.approach?.phases) {
            return project.approach.phases.slice(0, 4).map(p => getStr(p.deliverable));
        }
        return [];
    };

    // Get impact items
    const getImpact = (): { value: string; label: string }[] => {
        const impacts: { value: string; label: string }[] = [];
        if (project.outcomes?.hero_metric) {
            impacts.push({
                value: project.outcomes.hero_metric.value,
                label: getStr(project.outcomes.hero_metric.label)
            });
        }
        if (project.outcomes?.secondary_metrics) {
            project.outcomes.secondary_metrics.slice(0, 2).forEach(m => {
                impacts.push({ value: m.value, label: getStr(m.label) });
            });
        }
        return impacts;
    };

    // Get risks avoided
    const getRisksAvoided = (): string[] => {
        if (project.personaChallenges?.executive) {
            const risks = getLocalizedStringArray(project.personaChallenges.executive.riskIfIgnored, locale);
            return risks.slice(0, 3);
        }
        return [];
    };

    const title = getStr(project.header.title);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    
                    {/* Modal - Sheet style on mobile, centered modal on desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                                   max-h-[90vh] md:max-h-[85vh] md:max-w-2xl md:w-full
                                   bg-white dark:bg-slate-800 rounded-t-2xl md:rounded-2xl shadow-2xl z-50 
                                   flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                            <div className="flex-1 min-w-0 pr-4">
                                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
                                    {t('caseStudies.executiveSummary')}
                                </p>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                                    {title}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                    {getStr(project.header.client.industry)} · {project.header.client.size}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                                aria-label={t('caseStudies.close')}
                            >
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Business Context */}
                            <section>
                                <div className="flex items-center gap-2 mb-3">
                                    <Target size={16} className="text-emerald-600 dark:text-emerald-400" />
                                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                                        {t('caseStudies.businessContext')}
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {getBusinessContext()}
                                </p>
                            </section>

                            {/* Key Decisions */}
                            {getKeyDecisions().length > 0 && (
                                <section>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Lightbulb size={16} className="text-amber-500" />
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                                            {t('caseStudies.keyDecisions')}
                                        </h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {getKeyDecisions().map((decision, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <span className="text-slate-400 mt-1">•</span>
                                                <span>{decision}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* What I Delivered */}
                            {getDeliverables().length > 0 && (
                                <section>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Package size={16} className="text-blue-500" />
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                                            {t('caseStudies.whatIDelivered')}
                                        </h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {getDeliverables().map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <span className="text-slate-400 mt-1">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}

                            {/* Impact */}
                            {getImpact().length > 0 && (
                                <section>
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp size={16} className="text-emerald-500" />
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                                            {t('caseStudies.impact')}
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {getImpact().map((item, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 text-center">
                                                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                                    {item.value}
                                                </div>
                                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                                    {item.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Risks Avoided */}
                            {getRisksAvoided().length > 0 && (
                                <section>
                                    <div className="flex items-center gap-2 mb-3">
                                        <ShieldCheck size={16} className="text-purple-500" />
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
                                            {t('caseStudies.risksAvoided')}
                                        </h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {getRisksAvoided().map((risk, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                <span className="text-purple-400 mt-1">✓</span>
                                                <span>{risk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ExecutiveSummaryModal;
