import { User, Code, Briefcase, ChevronDown, ChevronUp, Truck } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import CaseStudyCTA from '../components/CaseStudyCTA';
import { 
    isLocalizedPersonaChallenge, 
    isLegacyChallenge,
    getLocalizedString,
    getLocalizedStringArray,
    type ChallengeStructure, 
    type LocalizedPersonaChallengeStructure, 
    type LegacyChallengeStructure,
    type LocalizedString,
    type LocalizedStringArray,
    type CaseStudyExecutiveSnapshot,
    type PersonaChallenges
} from '../types/CaseStudy';
import { getLocalizedValue, getLocalizedArray as getLocalizedArrayUtil } from '../utils/localization';
import { setAttributionContext } from '../utils/attribution';
import { trackEvent } from '../services/analytics';
import { useFeatureFlag } from '../context/FeatureFlagsProvider';
import ArtifactRequestModal from '../components/ArtifactRequestModal';
import NDADisclaimer from '../components/NDADisclaimer';
import CredibilityStrip from '../components/CredibilityStrip';
import { isPromoted } from '../config/featureUtils';
import { getGlobalPersona } from '../utils/personaPersistence';
import CaseStudyNavigation, { type CaseStudySection } from '../components/CaseStudyNavigation';

// =============================================================================
// HELPER FUNCTIONS FOR LOCALIZED CONTENT
// =============================================================================

// Get challenge content based on persona and locale
// Note: For new persona-based challenges, we use 'standard' content for display
// The new executiveSnapshot and personaChallenges structures handle persona-specific content separately
function getChallengeContent(
    challenge: ChallengeStructure,
    locale: string
) {
    if (isLocalizedPersonaChallenge(challenge)) {
        // Use 'standard' persona content for the main challenge display
        const personaContent = challenge.standard;
        return {
            situation: getLocalizedString(personaContent.situation, locale),
            keyTensions: getLocalizedStringArray(personaContent.keyTensions, locale),
            urgency: personaContent.urgency ? getLocalizedString(personaContent.urgency, locale) : '',
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
    const [persona, setPersona] = useState<'executive' | 'technical' | 'delivery'>('executive');
    const [showAllDeliverables, setShowAllDeliverables] = useState(false);
    const [showAllApproach, setShowAllApproach] = useState(false);
    const [showPersonaDetails, setShowPersonaDetails] = useState(false); // Phase 2: collapsed by default
    const [showFullDeliverables, setShowFullDeliverables] = useState(false); // Phase 4 Wireframe: Deliverables compact/expand
    const [isSticky, setIsSticky] = useState(false); // Phase 3.0 B: Track sticky state for CTAs
    const [artifactRequestModalOpen, setArtifactRequestModalOpen] = useState(false); // Phase 3.3: Artifact request modal
    const [activePersona, setActivePersona] = useState<'hire' | 'consult' | 'toolkit' | null>(null); // Phase 3.4D: For CTA resolution
    const [activeNavSection, setActiveNavSection] = useState<CaseStudySection>('snapshot'); // Phase 4 D1: Active section for nav pills
    
    // Feature flag for sticky CTAs
    const stickyCtaFlag = useFeatureFlag('sticky_cta');
    
    // Feature flag for Risk Radar
    const riskRadarFlag = useFeatureFlag('risk_radar');
    
    // Single source of truth: projects.ts
    const study = projects.find(s => s.slug === slug || s.id === slug);

    // Phase 3.0 B: Set attribution context when case study is viewed
    useEffect(() => {
        if (slug && study) {
            setAttributionContext({
                caseStudySlug: slug,
            });
            
            // Track page view
            trackEvent('case_study_view', {
                slug,
                locale,
            });
        }
    }, [slug, study, locale]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Phase 3.4D: Get active persona for CTA resolution
    useEffect(() => {
        const globalPersona = getGlobalPersona();
        if (globalPersona) {
            setActivePersona(globalPersona);
        }
    }, []);

    // Phase 3.0 B: Track scroll position for sticky CTAs
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Show sticky CTAs after scrolling past 300px
            setIsSticky(scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
    const challengeContent = getChallengeContent(study.challenge, locale);

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
    
    // Determine how many phases to show initially - Phase 2: show only 5 by default
    const initialItemCount = 5;
    const phasesToShow = showAllApproach 
        ? study.approach.phases 
        : study.approach.phases.slice(0, initialItemCount);
    const hasMorePhases = study.approach.phases.length > initialItemCount;
    
    // Phase 2: How I Delivered - show only 3 phases by default
    const initialPhaseCount = 3;
    const approachPhasesToShow = showAllDeliverables
        ? study.approach.phases
        : study.approach.phases.slice(0, initialPhaseCount);
    const hasMoreApproachPhases = study.approach.phases.length > initialPhaseCount;

    // Phase 4 D1: IntersectionObserver to track active section (throttled for performance)
    useEffect(() => {
        const observerOptions = {
            rootMargin: '-100px 0px -66%',
            threshold: 0.1,
        };

        // Phase 4 I: Throttled section view tracking
        let lastTracked: Record<string, number> = {};
        const TRACK_THROTTLE_MS = 2000; // Track each section view max once per 2 seconds

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id as CaseStudySection;
                    setActiveNavSection(sectionId);

                    // Throttle analytics tracking
                    const now = Date.now();
                    const lastTrackedTime = lastTracked[sectionId] || 0;
                    if (now - lastTrackedTime > TRACK_THROTTLE_MS) {
                        lastTracked[sectionId] = now;
                        trackEvent('case_study_section_viewed', {
                            section: sectionId,
                            caseStudySlug: slug || '',
                        });
                    }
                }
            });
        }, observerOptions);

        const sections = ['snapshot', 'challenge', 'delivery', 'proof', 'artifacts', 'contact'];
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [slug]);

    // Phase 4 D1: Handle nav pill click - smooth scroll
    const handleNavClick = (section: CaseStudySection) => {
        const element = document.getElementById(section);
        if (element) {
            const offset = 100; // Account for sticky nav
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });

            // Update active section immediately
            setActiveNavSection(section);
        }
    };

    return (
        <div className={`min-h-screen bg-white dark:bg-slate-900 pt-20 relative ${isSticky ? 'pb-20 lg:pb-0' : ''}`}>
            {/* Phase 3.0 B2: Sticky Sidebar CTA (Desktop Only) - Gated by feature flag */}
            {study && stickyCtaFlag.enabled && (
                <aside className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-300" style={{ opacity: isSticky ? 1 : 0, pointerEvents: isSticky ? 'auto' : 'none' }}>
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: isSticky ? 0 : 100, opacity: isSticky ? 1 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 max-w-[280px]"
                    >
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            {t('caseStudy.cta.sidebarTitle', 'Ready to discuss?')}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            {t('caseStudy.cta.sidebarText', "Get a 30-min discovery call to explore how we can help.")}
                        </p>
                        <div className="space-y-3">
                            <CaseStudyCTA variant="primary" caseStudySlug={slug} className="w-full justify-center" />
                            <CaseStudyCTA variant="secondary" caseStudySlug={slug} className="w-full justify-center" />
                        </div>
                    </motion.div>
                </aside>
            )}

            {/* Phase 3.0 B3: Sticky Bottom Bar CTA (Mobile Only) - Gated by feature flag */}
            {study && stickyCtaFlag.enabled && (
                <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300" style={{ transform: isSticky ? 'translateY(0)' : 'translateY(100%)' }}>
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: isSticky ? 0 : 100 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-2xl p-4"
                    >
                        <div className="max-w-sm mx-auto flex gap-3">
                            <CaseStudyCTA variant="primary" caseStudySlug={slug} className="flex-1 justify-center text-sm py-2.5" />
                            <CaseStudyCTA variant="secondary" caseStudySlug={slug} className="flex-1 justify-center text-sm py-2.5" />
                        </div>
                    </motion.div>
                </div>
            )}
            {/* Phase 4 D1: Sticky Navigation Pills */}
            {study && (
                <CaseStudyNavigation
                    activeSection={activeNavSection}
                    onSectionClick={handleNavClick}
                />
            )}

            {/* SECTION 1: HERO HEADER - Phase 4 Wireframe: Breadcrumb, H1, Subhead, Proof Chips, CTAs */}
            <section id="snapshot" className="bg-slate-50 dark:bg-slate-800 pb-16 pt-12 border-b border-slate-200 dark:border-slate-700 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Phase 4 Wireframe: Breadcrumb */}
                    <div className="flex items-center mb-6">
                        <Link to="/projects" className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm">
                            <ArrowLeft size={16} />
                            Projects &gt; Case Studies
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start mb-8">
                        {/* Left Column: Title & Metadata */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-2"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                                    <span className="w-8 h-0.5 bg-emerald-600 dark:text-emerald-400 inline-block"></span>
                                    {headerEyebrow}
                                </div>
                            </div>
                            {/* Phase 4 Wireframe: H1 - e.g. "BRITA — Shopware → Shopify modernization" */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                                {headerTitle}
                            </h1>
                            {/* Phase 4 Wireframe: Subhead - 1 sentence */}
                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                {challengeContent.situation.split('.').slice(0, 1).join('.') + '.'}
                            </p>
                        </motion.div>

                        {/* Right Column: Phase 4 Wireframe: 3 Proof Chips (Outcome, Scope, Constraints) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-3"
                        >
                            {/* Outcome */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Outcome</div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white">
                                    {study.outcomes.hero_metric.value} {getLocalized(study.outcomes.hero_metric.label, locale)}
                                </div>
                            </div>
                            {/* Scope */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Scope</div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white">
                                    {study.projectType === 'migration' ? 'Platform re-architecture' :
                                     study.projectType === 'standard' ? 'Standards framework' :
                                     study.projectType === 'product' ? 'Product build' :
                                     study.domains[0] || 'Transformation'}
                                </div>
                            </div>
                            {/* Constraints */}
                            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Constraints</div>
                                <div className="text-lg font-bold text-slate-900 dark:text-white">
                                    {study.executiveSnapshot?.keyTensions 
                                        ? getLocalizedArrayUtil(study.executiveSnapshot.keyTensions, locale)[0]?.split(' ').slice(0, 4).join(' ') + '...'
                                        : 'Compliance + vendor'}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Phase 4 Wireframe: CTA Row - Primary (Book Discovery Call) + Secondary (Request Artifacts Pack) */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
                        <a
                            href="https://calendly.com/prasad-sgsits/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            onClick={() => trackEvent('case_study_cta_click', { cta: 'primary', section: 'hero', slug: study.slug })}
                        >
                            Book Discovery Call
                            <ArrowRight size={18} />
                        </a>
                        {study.artifactPreviews && study.artifactPreviews.length > 0 && (
                            <button
                                onClick={() => {
                                    setArtifactRequestModalOpen(true);
                                    trackEvent('case_study_cta_click', { cta: 'secondary', section: 'hero', slug: study.slug });
                                }}
                                className="bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 text-slate-700 dark:text-white px-8 py-4 rounded-xl font-semibold text-base transition-all flex items-center gap-2"
                            >
                                Request Artifacts Pack
                                <ArrowRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION 3: EXECUTIVE SNAPSHOT - Phase 4 Wireframe: Always visible, compact, 2-column grid (max 6 blocks) */}
            <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                        {/* Phase 4 Wireframe: 2-column card grid (max 6 blocks) */}
                        <div className="grid md:grid-cols-2 gap-4">
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

            {/* Challenge Section - Phase 2 Redesign */}
            <section id="challenge" className="py-16 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Row with Context Chips */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                            {t('caseStudy.challenge.title', 'The Challenge')}
                        </h2>
                        
                        {/* Context Chips - Max 6 */}
                        {challengeContent.contextChips.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {challengeContent.contextChips.slice(0, 6).map((chip, idx) => (
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



                    {/* Phase 3.1: Trust Layer Section */}
                    {study.trustLayer && (
                        <>
                            {(() => {
                                // Track impression once per page view using useOnceEffect pattern
                                const hasTrackedRef = React.useRef(false);
                                React.useEffect(() => {
                                    if (!hasTrackedRef.current) {
                                        hasTrackedRef.current = true;
                                        trackEvent('case_study_trust_layer_viewed', {
                                            slug: study.slug,
                                            locale: locale
                                        });
                                    }
                                }, [study.slug, locale]); // Track once per study/page view
                                return null;
                            })()}
                            {/* Phase 4 D4: Trust Layer - More compact (2-column, not stacked paragraphs) */}
                            <div className="mb-6 bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                                    {t('caseStudy.trustLayer.title', 'Trust & Scope')}
                                </h3>
                                
                                <div className="grid md:grid-cols-2 gap-3">
                                    {/* Phase 4 D4: Compact Trust Layer - 2-column pills */}
                                    {/* My Role */}
                                    <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                            {t('caseStudy.trustLayer.myRole', 'My Role')}
                                        </h4>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug line-clamp-2">
                                            {getLocalized(study.trustLayer.myRole, locale)}
                                        </p>
                                    </div>

                                    {/* Scope Owned */}
                                    <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                            {t('caseStudy.trustLayer.scopeOwned', 'Scope Owned')}
                                        </h4>
                                        <ul className="space-y-1">
                                            {getLocalizedArray(study.trustLayer.scopeOwned, locale).slice(0, 2).map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                                                    <CheckCircle2 size={10} className="text-emerald-500 mt-0.5 shrink-0" />
                                                    <span className="line-clamp-1">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Delivered With Team */}
                                    <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                            {t('caseStudy.trustLayer.deliveredWithTeam', 'With Team')}
                                        </h4>
                                        <ul className="space-y-1">
                                            {getLocalizedArray(study.trustLayer.deliveredWithTeam, locale).slice(0, 2).map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300 leading-snug">
                                                    <Layers size={10} className="text-blue-500 mt-0.5 shrink-0" />
                                                    <span className="line-clamp-1">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Phase 4 D4: Subtle inline NDA note (not full heavy component) */}
                                    <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-lg p-2 border border-amber-200/50 dark:border-amber-800/50">
                                        <p className="text-xs text-amber-700 dark:text-amber-400 leading-snug">
                                            <span className="font-semibold">NDA:</span> {getLocalized(study.trustLayer.confidentialityNote, locale).slice(0, 80)}...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Persona Challenges - Phase 2: Collapsed by default */}
                    {study.personaChallenges && (
                        <div className="mb-8">
                            {/* Phase 4 D2: Expand/Collapse Button with analytics */}
                            <button
                                onClick={() => {
                                    setShowPersonaDetails(!showPersonaDetails);
                                    trackEvent('persona_block_expanded', {
                                        persona,
                                        expanded: !showPersonaDetails,
                                        caseStudySlug: slug || '',
                                    });
                                }}
                                className="w-full flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                aria-expanded={showPersonaDetails}
                                aria-label={showPersonaDetails ? t('caseStudy.executiveSnapshot.hidePersonaDetails', 'Hide persona details') : t('caseStudy.executiveSnapshot.viewPersonaDetails', 'View challenges by persona')}
                            >
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    {showPersonaDetails 
                                        ? t('caseStudy.executiveSnapshot.hidePersonaDetails', 'Hide persona details')
                                        : t('caseStudy.executiveSnapshot.viewPersonaDetails', 'View challenges by persona')
                                    }
                                </span>
                                {showPersonaDetails ? (
                                    <ChevronUp className="text-slate-500" size={20} />
                                ) : (
                                    <ChevronDown className="text-slate-500" size={20} />
                                )}
                            </button>

                            {/* Expandable Persona Content */}
                            <AnimatePresence>
                                {showPersonaDetails && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                            {/* Persona Tabs */}
                                            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 border-b border-slate-200 dark:border-slate-700">
                                                {(['executive', 'technical', 'delivery'] as const).map((p) => (
                                                    <button
                                                        key={p}
                                                        onClick={() => setPersona(p)}
                                                        className={`
                                                            flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                                            ${persona === p
                                                                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm'
                                                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}
                                                        `}
                                                    >
                                                        {p === 'executive' && <User size={14} />}
                                                        {p === 'technical' && <Code size={14} />}
                                                        {p === 'delivery' && <Truck size={14} />}
                                                        {t(`caseStudy.persona.${p}`, p.charAt(0).toUpperCase() + p.slice(1))}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Persona Content */}
                                            <div className="p-6">
                                                <motion.div
                                                    key={`${persona}-${locale}`}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="space-y-6"
                                                >
                                                    {/* Phase 4 D2: Challenges - Max 3 bullets only */}
                                                    <div>
                                                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                                                            {t('caseStudy.challenge.challenges', 'Challenges')}
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {getLocalizedArrayUtil(study.personaChallenges[persona].challenges, locale).slice(0, 3).map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Risk If Ignored */}
                                                    <div>
                                                        <h4 className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-3">
                                                            {t('caseStudy.challenge.riskIfIgnored', 'Risk if ignored')}
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {getLocalizedArrayUtil(study.personaChallenges[persona].riskIfIgnored, locale).slice(0, 3).map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                                    <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Decision Points */}
                                                    <div>
                                                        <h4 className="text-xs font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider mb-3">
                                                            {t('caseStudy.challenge.decisionPoints', 'Decision points')}
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {getLocalizedArrayUtil(study.personaChallenges[persona].decisionPoints, locale).slice(0, 3).map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                                    <Target size={14} className="text-blue-500 mt-0.5 shrink-0" />
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Legacy Challenge Display - for projects without new structure */}
                    {!study.executiveSnapshot && !study.personaChallenges && (
                        <div className="max-w-4xl">
                            {/* Legacy Narrative Box */}
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                    {challengeContent.situation}
                                </p>
                            </div>

                            {/* Legacy Key Tensions List */}
                            {challengeContent.keyTensions.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                                        {t('caseStudy.challenge.keyTensions', 'Key Tensions')}
                                    </h3>
                                    {/* Phase 4 D2: Max 4 key tensions in 2-column */}
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {challengeContent.keyTensions.slice(0, 4).map((tension, idx) => (
                                            <div 
                                                key={idx}
                                                className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                                <span className="text-sm text-slate-700 dark:text-slate-300">{tension}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Legacy Urgency Callout */}
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
                    )}
                </div>
            </section>

            {/* Phase 3.0 B4: Inline CTA Block */}
            {study && (
                <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-700">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 rounded-2xl p-8 md:p-10 border border-emerald-200 dark:border-emerald-800">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                {t('caseStudy.cta.inlineTitle', 'Need similar architecture validation?')}
                            </h2>
                            <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                                {t('caseStudy.cta.inlineText', 'I offer independent reviews to help identify risks, gaps, and optimization opportunities before committing budget.')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Phase 3.4D: Only ONE primary CTA based on persona */}
                                <CaseStudyCTA variant="primary" caseStudySlug={slug} />
                                {/* Secondary CTA (visually weaker) */}
                                <CaseStudyCTA variant="tertiary" caseStudySlug={slug} className="opacity-75 hover:opacity-100" />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 7: WHAT I DELIVERED - Phase 4 Wireframe: Compact first (6-8 bullets), expandable */}
            <section id="delivery" className="py-12 bg-slate-50 dark:bg-slate-800 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader 
                        title={t('caseStudy.whatIDelivered.title', 'What I Delivered')} 
                    />
                    
                    {/* Phase 4 Wireframe: Show deliverables_compact first (6-8 bullets), or derive from approach.phases */}
                    {(() => {
                        // Get deliverables_compact if exists, otherwise derive from approach.phases (first 8)
                        const deliverablesList = study.deliverables_compact 
                            ? study.deliverables_compact.map(d => getLocalized(d.title, locale))
                            : study.approach.phases.slice(0, 8).map(p => getLocalized(p.deliverable, locale));
                        
                        const compactDeliverables = deliverablesList.slice(0, 8);
                        const hasMoreDeliverables = deliverablesList.length > 8 || study.approach.phases.length > 8;
                        
                        return (
                            <>
                                {/* Default view: deliverables_compact (6-8 bullets) */}
                                <ul className="grid md:grid-cols-2 gap-3 mb-6">
                                    {compactDeliverables.slice(0, showFullDeliverables ? deliverablesList.length : 8).map((deliverable, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-start gap-3 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700"
                                        >
                                            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{deliverable}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Phase 4 Wireframe: Button to expand full deliverables */}
                                {hasMoreDeliverables && !showFullDeliverables && (
                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                setShowFullDeliverables(true);
                                                trackEvent('show_more_clicked', { section: 'deliverables', page: 'case_study', slug: study.slug });
                                            }}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                        >
                                            Show full deliverables ({study.approach.phases.length - 8} more)
                                            <ChevronDown size={16} />
                                        </button>
                                    </div>
                                )}
                                {showFullDeliverables && hasMoreDeliverables && (
                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                setShowFullDeliverables(false);
                                                trackEvent('show_more_clicked', { section: 'deliverables', page: 'case_study', action: 'collapse', slug: study.slug });
                                            }}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                        >
                                            Show less
                                            <ChevronUp size={16} />
                                        </button>
                                    </div>
                                )}
                            </>
                        );
                    })()}

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

            {/* How I Delivered Section - Phase 2: Compact Timeline (3 phases only by default) */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader 
                        title={t('caseStudy.howIDelivered.title', `The Approach: ${methodology}`)}
                        subtitle={`${t('caseStudy.howIDelivered.whyMe', 'Why me')}: ${challengeContent.why_prasad}`}
                    />

                    {/* Compact Timeline - Phase 2: Only 3 phases by default */}
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>

                        <div className="space-y-6">
                            {approachPhasesToShow.map((phase, idx) => (
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

                                    {/* Phase 4 D3: Compressed phase card */}
                                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <div className="flex items-start gap-3 mb-2">
                                            <span className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                                                {phase.number}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                                                        {getLocalized(phase.title, locale)}
                                                    </h3>
                                                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                                                        <Clock size={12} />
                                                        {phase.duration}
                                                    </span>
                                                </div>
                                                
                                                {/* Phase 4 D3: Max 3 bullets per phase (compact) */}
                                                <ul className="space-y-1 mb-2">
                                                    {getLocalizedArray(phase.activities, locale).slice(0, 3).map((activity, aIdx) => (
                                                        <li key={aIdx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                                                            <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                            <span>{activity}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                
                                                <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                                                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                        {t('caseStudy.outcome', 'Outcome')}:
                                                    </span>
                                                    <span className="text-xs text-slate-900 dark:text-white font-medium">
                                                        {getLocalized(phase.outcome, locale)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Show More/Less for Approach */}
                        {hasMoreApproachPhases && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => setShowAllDeliverables(!showAllDeliverables)}
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                >
                                    {showAllDeliverables ? (
                                        <>
                                            {t('caseStudy.showLess', 'Show less')}
                                            <ChevronUp size={16} />
                                        </>
                                    ) : (
                                        <>
                                            {t('caseStudy.showMore', 'Show execution details')} ({study.approach.phases.length - initialPhaseCount} more)
                                            <ChevronDown size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive / Proof */}
            <section id="proof" className="py-16 bg-slate-50 dark:bg-slate-800 scroll-mt-24">
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

            {/* Proof Section / Outcomes */}
            <section id="proof" className="py-16 bg-slate-50 dark:bg-slate-800 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionHeader title={t('caseStudy.deliverables.title', 'Deliverables Preview')} />
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

            {/* Phase 3.1: Artifact Previews Section - Phase 4 D5: Redesign */}
            {study.artifactPreviews && study.artifactPreviews.length > 0 && (
                <section id="artifacts" className="py-16 bg-slate-50 dark:bg-slate-800 scroll-mt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeader 
                            title={t('caseStudy.artifacts.title', 'Artifacts (Preview)')}
                        />
                        
                        {/* Phase 4 D5: Horizontal scroll on mobile, 2x3 grid on desktop */}
                        <div className="mb-8">
                            {/* Desktop: 2x3 grid */}
                            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                {study.artifactPreviews.map((artifact, idx) => {
                                    const iconMap: Record<string, string> = {
                                        'ADR': '📋',
                                        'Diagram': '📊',
                                        'Checklist': '✅',
                                        'Roadmap': '🗺️',
                                        'TCO': '💰',
                                        'Risk': '⚠️'
                                    };
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start gap-3 mb-2">
                                                <div className="text-2xl flex-shrink-0">{iconMap[artifact.type] || '📄'}</div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 line-clamp-1">
                                                        {getLocalized(artifact.title, locale)}
                                                    </h3>
                                                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                                                        {getLocalized(artifact.description, locale)}
                                                    </p>
                                                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
                                                        {t('caseStudy.artifacts.onRequest', 'On request')}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                            
                            {/* Mobile: Horizontal scroll */}
                            <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4">
                                <div className="flex gap-4" style={{ width: 'max-content' }}>
                                    {study.artifactPreviews.map((artifact, idx) => {
                                        const iconMap: Record<string, string> = {
                                            'ADR': '📋',
                                            'Diagram': '📊',
                                            'Checklist': '✅',
                                            'Roadmap': '🗺️',
                                            'TCO': '💰',
                                            'Risk': '⚠️'
                                        };
                                        return (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm min-w-[280px] flex-shrink-0"
                                            >
                                                <div className="flex items-start gap-3 mb-2">
                                                    <div className="text-2xl flex-shrink-0">{iconMap[artifact.type] || '📄'}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                                                            {getLocalized(artifact.title, locale)}
                                                        </h3>
                                                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                                                            {getLocalized(artifact.description, locale)}
                                                        </p>
                                                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
                                                            {t('caseStudy.artifacts.onRequest', 'On request')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        
                        {/* Phase 4 D5: Request Full Artifacts Pack CTA */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                {t('caseStudy.artifacts.privacyNote', 'Artifacts are anonymized and shared selectively to protect client confidentiality. All diagrams are recreated from memory and represent patterns, not internal architectures.')}
                            </p>
                            {isPromoted('CASE_STUDY_ARTIFACTS_REQUEST') ? (
                                <button
                                    onClick={() => {
                                        setArtifactRequestModalOpen(true);
                                        trackEvent('artifact_request_opened', {
                                            slug: study.slug,
                                            locale: locale,
                                        });
                                    }}
                                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                                >
                                    {t('caseStudy.artifacts.requestFullPack', { defaultValue: 'Request Full Artifacts Pack' })}
                                    <ArrowRight size={18} />
                                </button>
                            ) : (
                                <Link
                                    to="/contact?interest=artifacts"
                                    onClick={() => {
                                        setAttributionContext({ ctaSource: 'artifact_gate' });
                                        trackEvent('artifact_gate_cta_click', {
                                            slug: study.slug,
                                            locale: locale
                                        });
                                    }}
                                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                                >
                                    {t('caseStudy.artifacts.requestFullPack', { defaultValue: 'Request Full Artifacts Pack' })}
                                    <ArrowRight size={18} />
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Phase 3.3: Artifact Request Modal */}
            {isPromoted('CASE_STUDY_ARTIFACTS_REQUEST') && study.artifactPreviews && (
                <ArtifactRequestModal
                    isOpen={artifactRequestModalOpen}
                    onClose={() => setArtifactRequestModalOpen(false)}
                    caseStudySlug={study.slug}
                    artifactIds={study.artifactPreviews.map((_, idx) => `artifact-${idx}`)}
                />
            )}

            {/* SECTION 11: FINAL CTA - Phase 4 Wireframe: Split (Consulting | Hiring) */}
            <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white scroll-mt-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Phase 4 Wireframe: Two CTAs split */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Consulting CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 text-center"
                        >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Ready to de-risk your decision?
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                Book a 30-min discovery call to explore how we can help.
                            </p>
                            <a
                                href="https://calendly.com/prasad-sgsits/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl"
                                onClick={() => trackEvent('case_study_final_cta_click', { cta: 'consulting', slug: study.slug })}
                            >
                                Book Discovery Call
                                <ArrowRight size={18} />
                            </a>
                        </motion.div>

                        {/* Hiring CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 text-center"
                        >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                Want the short version?
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                                View my full profile, resume, and hiring details.
                            </p>
                            <Link
                                to="/hiring"
                                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl"
                                onClick={() => trackEvent('case_study_final_cta_click', { cta: 'hiring', slug: study.slug })}
                            >
                                View Hiring Profile
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudyPage;
