import { User, Code, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    ArrowRight,
    AlertCircle,
    Target,
    Layers,
    Calendar
} from 'lucide-react';
import { projects } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';
import { 
    isLocalizedPersonaChallenge, 
    isLegacyChallenge,
    getLocalizedString,
    getLocalizedStringArray,
    type ChallengeStructure, 
    type LocalizedPersonaChallengeStructure, 
    type LegacyChallengeStructure,
    type LocalizedString,
    type LocalizedStringArray
} from '../types/CaseStudy';

// =============================================================================
// HELPER FUNCTIONS FOR LOCALIZED CONTENT
// =============================================================================

// Get challenge content based on persona and locale
function getChallengeContent(
    challenge: ChallengeStructure,
    persona: 'standard' | 'executive' | 'technical',
    locale: string
) {
    if (isLocalizedPersonaChallenge(challenge)) {
        const personaContent = challenge[persona];
        return {
            situation: getLocalizedString(personaContent.situation, locale),
            keyTensions: getLocalizedStringArray(personaContent.keyTensions, locale),
            urgency: personaContent.urgency ? getLocalizedString(personaContent.urgency, locale) : 
                     getLocalizedString(challenge.standard.urgency!, locale),
            contextChips: challenge.contextChips?.map(chip => ({
                label: getLocalizedString(chip.label, locale),
                value: getLocalizedString(chip.value, locale)
            })) || [],
            why_prasad: getLocalizedString(challenge.why_prasad, locale),
            isPersonaBased: true
        };
    }
    
    // Legacy structure - derive key tensions from pain points
    if (isLegacyChallenge(challenge)) {
        const legacyChallenge = challenge as LegacyChallengeStructure;
        return {
            situation: legacyChallenge.situation,
            keyTensions: legacyChallenge.pain_points?.map(p => `${p.title}: ${p.description}`) || [],
            urgency: legacyChallenge.urgency,
            contextChips: [],
            why_prasad: legacyChallenge.why_prasad,
            isPersonaBased: false
        };
    }

    // Fallback for any edge case
    return {
        situation: '',
        keyTensions: [],
        urgency: '',
        contextChips: [],
        why_prasad: '',
        isPersonaBased: false
    };
}

// Helper to get localized value from potentially localized field
function getLocalized(value: LocalizedString | string | undefined, locale: string): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return locale === 'de' ? value.de : value.en;
}

// Helper to get localized array
function getLocalizedArray(value: LocalizedStringArray | string[] | undefined, locale: string): string[] {
    if (!value) return [];
    if (Array.isArray(value) && (value.length === 0 || typeof value[0] === 'string')) {
        return value as string[];
    }
    const localized = value as LocalizedStringArray;
    return locale === 'de' ? localized.de : localized.en;
}

// Section Header component for consistent styling
const SectionHeader: React.FC<{ title: string; subtitle?: string; className?: string }> = ({ 
    title, 
    subtitle,
    className = ''
}) => (
    <div className={`mb-8 ${className}`}>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            {title}
        </h2>
        {subtitle && (
            <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle}</p>
        )}
    </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const CaseStudyPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    const [persona, setPersona] = useState<'executive' | 'technical' | 'standard'>('standard');
    const [showAllDeliverables, setShowAllDeliverables] = useState(false);
    const [showAllApproach, setShowAllApproach] = useState(false);
    
    // Single source of truth: projects.ts
    const study = projects.find(s => s.slug === slug || s.id === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!study) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Case Study Coming Soon
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            The full case study for this project is currently being prepared.
                        </p>
                        <Link 
                            to="/projects" 
                            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                        >
                            <ArrowLeft size={18} />
                            Return to Projects
                        </Link>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Need Similar Architecture Validation?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            If you're evaluating a similar project or architecture decision, I offer independent reviews 
                            to help identify risks, gaps, and optimization opportunities before committing budget.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                            >
                                Request Architecture Review
                                <ArrowRight size={18} />
                            </Link>
                            <a
                                href="https://calendly.com/prasad-sgsits/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white px-6 py-3 rounded-lg font-semibold transition-all hover:border-emerald-500"
                            >
                                Book 30-Min Consultation
                            </a>
                        </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            <strong className="text-slate-900 dark:text-white">Full case study available upon request.</strong>
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Contact: <a href="mailto:prasad.sgsits@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">prasad.sgsits@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Get challenge content based on current persona and locale
    const challengeContent = getChallengeContent(study.challenge, persona, locale);

    // Get localized header content
    const headerTitle = getLocalized(study.header.title, locale);
    const headerEyebrow = getLocalized(study.header.eyebrow, locale);
    const clientType = getLocalized(study.header.client.type, locale);
    const clientIndustry = getLocalized(study.header.client.industry, locale);

    // Get localized approach content
    const methodology = getLocalized(study.approach.methodology, locale);
    const uniqueDifferentiator = getLocalized(study.approach.unique_differentiator, locale);

    // Get localized outcomes
    const heroMetricLabel = getLocalized(study.outcomes.hero_metric.label, locale);
    
    // Determine how many phases to show initially
    const initialItemCount = 4;
    const phasesToShow = showAllApproach 
        ? study.approach.phases 
        : study.approach.phases.slice(0, initialItemCount);
    const hasMorePhases = study.approach.phases.length > initialItemCount;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
            {/* Header */}
            <section className="bg-slate-50 dark:bg-slate-800 pb-16 pt-12 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Row: Back Link */}
                    <div className="flex items-center mb-8">
                        <Link to="/projects" className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                            <div className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 group-hover:border-emerald-500/50 transition-colors">
                                <ArrowLeft size={18} />
                            </div>
                            {t('common.viewAllProjects', 'Back to Projects')}
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column: Title & Metadata */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                                    <span className="w-8 h-0.5 bg-emerald-600 dark:text-emerald-400 inline-block"></span>
                                    {headerEyebrow}
                                </div>
                                {study.visualType && (
                                    <div className="ml-4 opacity-60">
                                        <ProjectVisual visualType={study.visualType} size="md" />
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                                {headerTitle}
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed max-w-2xl">
                                {challengeContent.situation.split('.').slice(0, 2).join('.') + '.'}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8 text-sm">
                                <span className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 font-medium text-slate-700 dark:text-slate-300">
                                    {clientType}
                                </span>
                                <span className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 font-medium text-slate-700 dark:text-slate-300">
                                    {clientIndustry}
                                </span>
                                {study.domains.slice(0, 2).map((domain, idx) => (
                                    <span key={idx} className="px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 font-medium text-emerald-700 dark:text-emerald-400">
                                        {domain}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Column: Hero Metric Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative mt-8 lg:mt-0"
                        >
                            <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-20 dark:opacity-10 rounded-full"></div>
                            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/20">
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                                            <span className="text-3xl">{study.outcomes.hero_metric.icon || '🚀'}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-emerald-100 text-sm font-medium uppercase tracking-wider mb-1">Impact</div>
                                            <div className="text-5xl lg:text-6xl font-bold tracking-tight">{study.outcomes.hero_metric.value}</div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-medium leading-snug mb-8 text-white/90">
                                        {heroMetricLabel}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                                        {study.outcomes.secondary_metrics.slice(0, 2).map((metric, idx) => (
                                            <div key={idx}>
                                                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                                                <div className="text-sm text-emerald-100/80 font-medium">
                                                    {getLocalized(metric.label, locale)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Executive Summary Card */}
            <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <Target className="text-emerald-600 dark:text-emerald-400" size={20} />
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t('caseStudy.executiveSummary.impact')}
                                    </h3>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                    {study.outcomes.hero_metric.value}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {heroMetricLabel}
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <Layers className="text-blue-600 dark:text-blue-400" size={20} />
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t('caseStudy.executiveSummary.scope')}
                                    </h3>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                    {study.approach.phases.length > 0 ? study.approach.phases.length + ' Phases' : 'Full Engagement'}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {methodology}
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <Briefcase className="text-purple-600 dark:text-purple-400" size={20} />
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t('caseStudy.executiveSummary.role')}
                                    </h3>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                    {study.projectType === 'framework' || study.projectType === 'standard' ? 'Lead Architect' : 'Solution Architect'}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {challengeContent.why_prasad}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge Section - Redesigned */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Row with Context Chips */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                            {t('caseStudy.challenge.title', 'The Challenge')}
                        </h2>
                        
                        {/* Context Chips */}
                        {challengeContent.contextChips.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {challengeContent.contextChips.map((chip, idx) => (
                                    <div 
                                        key={idx}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium"
                                    >
                                        <span className="text-slate-500 dark:text-slate-400">{chip.label}:</span>
                                        <span className="text-slate-900 dark:text-white">{chip.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="max-w-4xl">
                        {/* Persona Tabs - Only show if persona-based challenge */}
                        {challengeContent.isPersonaBased && (
                            <div className="mb-0">
                                <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-t-xl w-fit border-t border-x border-slate-200 dark:border-slate-700">
                                    {(['standard', 'executive', 'technical'] as const).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPersona(p)}
                                            className={`
                                                flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                                ${persona === p
                                                    ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm ring-1 ring-black/5'
                                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}
                                            `}
                                        >
                                            {p === 'standard' && <Briefcase size={14} />}
                                            {p === 'executive' && <User size={14} />}
                                            {p === 'technical' && <Code size={14} />}
                                            {t(`caseStudy.persona.${p}`, p.charAt(0).toUpperCase() + p.slice(1))}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Narrative Box */}
                        <div className={`bg-white dark:bg-slate-900 p-8 ${challengeContent.isPersonaBased ? 'rounded-b-xl rounded-tr-xl' : 'rounded-xl'} border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden`}>
                            {challengeContent.isPersonaBased && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 to-transparent"></div>
                            )}
                            <motion.p 
                                key={`${persona}-${locale}`}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg"
                            >
                                {challengeContent.situation}
                            </motion.p>
                        </div>

                        {/* Key Tensions List */}
                        {challengeContent.keyTensions.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                                    {t('caseStudy.challenge.keyTensions', 'Key Tensions')}
                                </h3>
                                <motion.div 
                                    key={`${persona}-${locale}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid md:grid-cols-2 gap-3"
                                >
                                    {challengeContent.keyTensions.slice(0, 6).map((tension, idx) => (
                                        <div 
                                            key={idx}
                                            className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{tension}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        )}

                        {/* Urgency Callout - Compact */}
                        {challengeContent.urgency && (
                            <div className="mt-6">
                                <div className="bg-amber-50 dark:bg-amber-900/20 px-4 py-3 rounded-lg border border-amber-200 dark:border-amber-700/50 flex items-center gap-3">
                                    <AlertCircle className="text-amber-600 dark:text-amber-500 shrink-0" size={18} />
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide">
                                            {t('caseStudy.challenge.urgency', 'Urgency')}:
                                        </span>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">{challengeContent.urgency}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* What I Delivered Section - Compact */}
            <section className="py-16 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader 
                        title={t('caseStudy.whatIDelivered.title')} 
                    />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        {phasesToShow.map((phase, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm shrink-0">
                                        {phase.number}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                                            {getLocalized(phase.title, locale)}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 line-clamp-2">
                                            {getLocalized(phase.deliverable, locale)}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {phase.duration}
                                            </span>
                                            {phase.outcome && (
                                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                                    → {getLocalized(phase.outcome, locale)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Show More Button */}
                    {hasMorePhases && (
                        <div className="mt-6 text-center">
                            <button
                                onClick={() => setShowAllApproach(!showAllApproach)}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                                {showAllApproach ? (
                                    <>
                                        {t('caseStudy.showLess', 'Show less')}
                                        <ChevronUp size={16} />
                                    </>
                                ) : (
                                    <>
                                        {t('caseStudy.showMore', 'Show more')} ({study.approach.phases.length - initialItemCount} more)
                                        <ChevronDown size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Key Differentiator */}
                    {uniqueDifferentiator && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-8 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shrink-0">
                                    ⭐
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                                        {t('caseStudy.whatIDelivered.differentiator')}
                                    </h3>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">
                                        {uniqueDifferentiator}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* How I Delivered Section - Compact Timeline */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader 
                        title={t('caseStudy.howIDelivered.title', `The Approach: ${methodology}`)}
                        subtitle={`${t('caseStudy.howIDelivered.whyMe', 'Why me')}: ${challengeContent.why_prasad}`}
                    />

                    {/* Compact Timeline */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                        <div className="space-y-6">
                            {study.approach.phases.map((phase, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative pl-0 md:pl-12"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-emerald-600 border-4 border-white dark:border-slate-900 flex items-center justify-center text-white font-bold text-xs z-10 hidden md:flex">
                                        {phase.number}
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="md:hidden w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                                                    {phase.number}
                                                </span>
                                                <h3 className="font-bold text-slate-900 dark:text-white">
                                                    {getLocalized(phase.title, locale)}
                                                </h3>
                                            </div>
                                            <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                                                <Clock size={14} />
                                                {phase.duration}
                                            </span>
                                        </div>
                                        
                                        <ul className="space-y-1.5 mb-4">
                                            {getLocalizedArray(phase.activities, locale).slice(0, 3).map((activity, aIdx) => (
                                                <li key={aIdx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                    <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <div className="flex items-center gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                                                {t('caseStudy.outcome', 'Outcome')}:
                                            </span>
                                            <span className="text-sm text-slate-900 dark:text-white font-medium">
                                                {getLocalized(phase.outcome, locale)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="py-16 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader title={t('caseStudy.technical.title', 'Technical Transformation')} />

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Before */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <AlertCircle size={20} /> {t('caseStudy.technical.before', 'Before State')}
                            </h3>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                <div className="space-y-4">
                                    {study.technical.before.stack.length > 0 && (
                                        <div>
                                            <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Legacy Stack</div>
                                            <div className="flex flex-wrap gap-2">
                                                {study.technical.before.stack.map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {getLocalizedArray(study.technical.before.issues, locale).length > 0 && (
                                        <div>
                                            <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Issues</div>
                                            <ul className="space-y-1.5">
                                                {getLocalizedArray(study.technical.before.issues, locale).map((issue, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> {issue}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* After */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                <CheckCircle2 size={20} /> {t('caseStudy.technical.after', 'After State')}
                            </h3>
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-2 border-emerald-500/20 shadow-lg">
                                <div className="space-y-4">
                                    {study.technical.after.stack.length > 0 && (
                                        <div>
                                            <div className="text-xs font-semibold text-emerald-600/80 uppercase mb-2">Modern Stack</div>
                                            <div className="flex flex-wrap gap-2">
                                                {study.technical.after.stack.map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {getLocalizedArray(study.technical.after.improvements, locale).length > 0 && (
                                        <div>
                                            <div className="text-xs font-semibold text-emerald-600/80 uppercase mb-2">Improvements</div>
                                            <ul className="space-y-1.5">
                                                {getLocalizedArray(study.technical.after.improvements, locale).map((imp, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-sm text-slate-900 dark:text-white font-medium">
                                                        <CheckCircle2 size={14} className="text-emerald-500" /> {imp}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            {study.testimonial && (
                <section className="py-16 bg-emerald-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <div className="text-5xl text-emerald-500 mb-6 opacity-50 font-serif">"</div>
                        <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                            {getLocalized(study.testimonial.quote, locale)}
                        </blockquote>
                        <cite className="not-italic">
                            <div className="font-bold text-lg">{study.testimonial.author.name}</div>
                            <div className="text-emerald-300">
                                {getLocalized(study.testimonial.author.role, locale)}, {study.testimonial.author.company}
                            </div>
                        </cite>
                    </div>
                </section>
            )}

            {/* How I would approach this today */}
            {study.approachToday && (
                <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-700">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 md:p-10 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                {t('projects.approachToday.title')}
                            </h2>
                            <ul className="space-y-3">
                                {(locale === 'de' ? study.approachToday.bulletsDe : study.approachToday.bullets).map((bullet, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                                        <CheckCircle2 className="text-emerald-500 mt-1 shrink-0" size={18} />
                                        <span className="text-sm">{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* Deliverables Preview */}
            <section className="py-16 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader title={t('caseStudy.deliverables.title')} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {
                                icon: Layers,
                                title: t('caseStudy.deliverables.blueprint.title'),
                                description: t('caseStudy.deliverables.blueprint.description'),
                                color: 'blue'
                            },
                            {
                                icon: AlertCircle,
                                title: t('caseStudy.deliverables.riskRegister.title'),
                                description: t('caseStudy.deliverables.riskRegister.description'),
                                color: 'red'
                            },
                            {
                                icon: Calendar,
                                title: t('caseStudy.deliverables.roadmap.title'),
                                description: t('caseStudy.deliverables.roadmap.description'),
                                color: 'emerald'
                            },
                            {
                                icon: Target,
                                title: t('caseStudy.deliverables.decisionMatrix.title'),
                                description: t('caseStudy.deliverables.decisionMatrix.description'),
                                color: 'purple'
                            }
                        ].map((deliverable, idx) => {
                            const Icon = deliverable.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-${deliverable.color}-100 dark:bg-${deliverable.color}-900/30`}>
                                        <Icon className={`text-${deliverable.color}-600 dark:text-${deliverable.color}-400`} size={20} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">
                                        {deliverable.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">
                                        {deliverable.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Block */}
            <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        {t('caseStudy.cta.title')}
                    </h2>
                    <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {t('caseStudy.cta.text')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://calendly.com/prasad-sgsits/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                        >
                            {t('caseStudy.cta.primary')}
                            <ArrowRight size={20} />
                        </a>
                        <Link
                            to="/risk-radar"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                        >
                            {t('caseStudy.cta.secondary')}
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudyPage;
