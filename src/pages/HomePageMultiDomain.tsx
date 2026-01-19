import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ArrowRight,
    AlertTriangle,
    Target,
    FileText,
    Search,
    TrendingUp,
    Package,
    Play,
    Briefcase,
    User,
    BookOpen
} from 'lucide-react';
import SEO from '../components/SEO';
import LogoCarousel from '../components/LogoCarousel';
import VideoModal from '../components/VideoModal';
import TestimonialsRotator from '../components/TestimonialsRotator';
import ImpactDashboard from '../components/ImpactDashboard';
import { trackEvent, AnalyticsEvents } from '../services/analytics';
import { isEnabled, isPromoted } from '../config/featureUtils';
import { setGlobalPersona, getGlobalPersona } from '../utils/personaPersistence';
import { isCompetitionMode } from '../config/competition';
import i18n from '../i18n';

type PersonaType = 'hire' | 'consult' | 'toolkit';

const HomePageMultiDomain: React.FC = () => {
    const { t } = useTranslation();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Get persona from URL param or localStorage, default to 'consult'
    const getInitialPersona = (): PersonaType => {
        const urlPersona = searchParams.get('persona') as PersonaType;
        if (urlPersona && ['hire', 'consult', 'toolkit'].includes(urlPersona)) {
            return urlPersona;
        }
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('pt_home_persona');
            if (stored === 'v1_hire') return 'hire';
            if (stored === 'v1_toolkit') return 'toolkit';
        }
        return 'consult'; // default
    };

    const [selectedPersona, setSelectedPersona] = useState<PersonaType>(getInitialPersona);
    const showPersonaTabs = isEnabled('HOMEPAGE_PERSONA_TABS');

    // Update URL and localStorage when persona changes
    useEffect(() => {
        if (selectedPersona) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('persona', selectedPersona);
            setSearchParams(newParams, { replace: true });
            
            if (typeof window !== 'undefined') {
                localStorage.setItem('pt_home_persona', `v1_${selectedPersona}`);
            }
        }
    }, [selectedPersona, searchParams, setSearchParams]);

    // Track persona selection and persist globally (Phase 3.3D)
    const handlePersonaChange = (persona: PersonaType, source: 'tabs' | 'url' = 'tabs') => {
        setSelectedPersona(persona);
        setGlobalPersona(persona); // Phase 3.3D: Persist globally
        if (source === 'tabs') {
            trackEvent('homepage_persona_selected', {
                selectedPersona: persona,
                source: 'tabs',
                locale: i18n.language || 'en',
            });
        }
    };

    // Initialize from global persona if available (Phase 3.3D)
    useEffect(() => {
        const globalPersona = getGlobalPersona();
        if (globalPersona && globalPersona !== selectedPersona) {
            setSelectedPersona(globalPersona);
        }
    }, []);

    return (
        <>
            <SEO
                title="Prasad Tilloo | Independent Architecture Consultant"
                description="Independent architecture assessments for EU mid-market companies. Validate cloud migration, platform modernization, and architecture decisions before committing to the wrong path."
                keywords="architecture consultant, architecture assessment, technical due diligence, cloud migration readiness, platform evaluation, enterprise architect, AWS, Azure, GCP"
                type="website"
            />

            <div className="min-h-screen font-sans">
                {/* SECTION 1: HERO */}
                <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 md:py-32 lg:py-48 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            {/* Phase 3.1: Persona Tabs - Larger and more prominent */}
                            {showPersonaTabs && (
                                <div className="mb-12 flex justify-center">
                                    <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-1.5 border border-white/20 shadow-lg">
                                        <button
                                            onClick={() => handlePersonaChange('hire')}
                                            className={`px-6 py-3 rounded-lg text-base font-semibold transition-all flex items-center gap-2 ${
                                                selectedPersona === 'hire'
                                                    ? 'bg-white text-slate-900 shadow-md'
                                                    : 'text-white hover:bg-white/10'
                                            }`}
                                        >
                                            <Briefcase size={20} />
                                            {t('homepage.personaTabs.hiring')}
                                        </button>
                                        <button
                                            onClick={() => handlePersonaChange('consult')}
                                            className={`px-6 py-3 rounded-lg text-base font-semibold transition-all flex items-center gap-2 ${
                                                selectedPersona === 'consult'
                                                    ? 'bg-white text-slate-900 shadow-md'
                                                    : 'text-white hover:bg-white/10'
                                            }`}
                                        >
                                            <User size={20} />
                                            {t('homepage.personaTabs.consulting')}
                                        </button>
                                        <button
                                            onClick={() => handlePersonaChange('toolkit')}
                                            className={`px-6 py-3 rounded-lg text-base font-semibold transition-all flex items-center gap-2 ${
                                                selectedPersona === 'toolkit'
                                                    ? 'bg-white text-slate-900 shadow-md'
                                                    : 'text-white hover:bg-white/10'
                                            }`}
                                        >
                                            <BookOpen size={20} />
                                            {t('homepage.personaTabs.toolkit')}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Badge */}
                            <div className="inline-block bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-6 py-3 rounded-full mb-8">
                                <span className="text-emerald-300 font-semibold text-sm">
                                    {t('hero.badge')}
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
                                {t('hero.headline')}
                            </h1>

                            {/* Tagline */}
                            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                                {t('hero.tagline')}
                            </p>

                            {/* Subtitle */}
                            <p className="text-base md:text-lg text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                                {t('hero.subtitle')}
                            </p>

                            {/* Differentiator Sentence */}
                            <p className="text-sm md:text-base text-emerald-300 font-medium mb-3 max-w-2xl mx-auto">
                                {t('hero.differentiator')}
                            </p>

                            {/* Proof Line */}
                            <p className="text-xs md:text-sm text-slate-400 mb-12 max-w-2xl mx-auto italic">
                                {t('hero.proofLine')}
                            </p>

                            {/* Phase 3.1: Persona-Specific CTAs */}
                            {showPersonaTabs ? (
                                <>
                                    {selectedPersona === 'hire' && (
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                            <Link
                                                to="/hiring"
                                                className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                            >
                                                {t('homepage.personaTabs.hiringPrimary')}
                                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                            </Link>
                                            <Link
                                                to="/projects"
                                                className="group text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 flex items-center gap-2 underline-offset-4 hover:underline"
                                            >
                                                {t('homepage.personaTabs.hiringSecondary')}
                                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                            </Link>
                                        </div>
                                    )}
                                    {selectedPersona === 'consult' && (
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                            <a
                                                href="https://calendly.com/prasad-sgsits/30min"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => trackEvent(AnalyticsEvents.CTA_BOOK_CALL_CLICK, { source: 'hero' })}
                                                className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                            >
                                                {t('homepage.personaTabs.consultingPrimary')}
                                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                            </a>
                                            {/* Only show checklist CTA if promoted */}
                                            {isPromoted('AI_CHECKLIST') && (
                                                <Link
                                                    to="/checklist"
                                                    className="group text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 flex items-center gap-2 underline-offset-4 hover:underline"
                                                >
                                                    {t('homepage.personaTabs.consultingSecondary')}
                                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                                </Link>
                                            )}
                                            {/* Show promoted AI tool CTAs if available */}
                                            {isPromoted('AI_ARCH_ENGINE') && (
                                                <Link
                                                    to="/architecture-engine"
                                                    className="group text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 flex items-center gap-2 underline-offset-4 hover:underline"
                                                >
                                                    {t('homepage.personaTabs.consultingArchEngine', { defaultValue: 'Try Architecture Engine' })}
                                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                    {selectedPersona === 'toolkit' && (
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                            {/* Only show toolkit library CTA if promoted */}
                                            {isPromoted('TOOLKIT_LIBRARY') ? (
                                                <Link
                                                    to="/services"
                                                    className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                                >
                                                    {t('homepage.personaTabs.toolkitPrimary')}
                                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                                </Link>
                                            ) : (
                                                <Link
                                                    to="/services"
                                                    className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                                >
                                                    {t('homepage.personaTabs.toolkitPrimary', { defaultValue: 'Browse Services' })}
                                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                                </Link>
                                            )}
                                            {isPromoted('AI_CHECKLIST') && (
                                                <Link
                                                    to="/checklist"
                                                    className="group text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 flex items-center gap-2 underline-offset-4 hover:underline"
                                                >
                                                    {t('homepage.personaTabs.toolkitSecondary')}
                                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                    <a
                                        href="https://calendly.com/prasad-sgsits/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackEvent(AnalyticsEvents.CTA_BOOK_CALL_CLICK, { source: 'hero' })}
                                        className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                    >
                                        {t('hero.cta')}
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                    </a>
                                    <Link
                                        to="/services"
                                        className="group text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 flex items-center gap-2 underline-offset-4 hover:underline"
                                    >
                                        {t('hero.ctaSecondary')}
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                    </Link>
                                </div>
                            )}

                            {/* Video CTA */}
                            <div className="mb-8">
                                <button
                                    onClick={() => {
                                        setIsVideoModalOpen(true);
                                        trackEvent(AnalyticsEvents.CTA_VIDEO_CLICK, { source: 'hero' });
                                    }}
                                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <Play size={14} className="ml-0.5" />
                                    </span>
                                    {t('hero.watchVideo', { defaultValue: 'Watch 75-sec overview' })}
                                </button>
                            </div>

                            {/* Trust Note */}
                            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
                                {t('hero.trustNote')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Phase 3.1: Persona-Specific Content Block - More prominent and useful */}
                {showPersonaTabs && selectedPersona && (
                    <section className="py-20 bg-white/10 backdrop-blur-sm border-b border-white/20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {selectedPersona === 'hire' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                                        {t('homepage.personaTabs.hiringTitle')}
                                    </h2>
                                    <p className="text-center text-white/80 mb-10 max-w-2xl mx-auto">
                                        {t('homepage.personaTabs.hiringSubtitle', { defaultValue: 'Senior Engineering Leader open to new opportunities' })}
                                    </p>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                            <div className="text-3xl font-bold text-emerald-300 mb-2">15+</div>
                                            <div className="text-sm font-semibold mb-1">{t('homepage.personaTabs.hiringYears')}</div>
                                            <div className="text-xs text-white/70">Enterprise architecture & transformation</div>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                            <div className="text-3xl font-bold text-emerald-300 mb-2">50+</div>
                                            <div className="text-sm font-semibold mb-1">Projects</div>
                                            <div className="text-xs text-white/70">Fortune 100 clients across industries</div>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                            <div className="text-3xl font-bold text-emerald-300 mb-2">€2M+</div>
                                            <div className="text-sm font-semibold mb-1">Cost Savings</div>
                                            <div className="text-xs text-white/70">Delivered through optimization</div>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                            <div className="text-3xl font-bold text-emerald-300 mb-2">100%</div>
                                            <div className="text-sm font-semibold mb-1">Compliance</div>
                                            <div className="text-xs text-white/70">Zero HIPAA violations, zero breaches</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link
                                                to="/hiring"
                                                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                                            >
                                                View Full Profile
                                                <ArrowRight size={18} />
                                            </Link>
                                        <Link
                                            to="/projects"
                                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                                        >
                                            View Case Studies
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                            {selectedPersona === 'consult' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                                        {t('homepage.personaTabs.consultingTitle')}
                                    </h2>
                                    <p className="text-center text-white/80 mb-10 max-w-2xl mx-auto">
                                        {t('homepage.personaTabs.consultingSubtitle', { defaultValue: 'Independent validation of architecture, modernization, and AI enablement decisions' })}
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                                        <Link
                                            to="/services"
                                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors group"
                                        >
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">Architecture Review</h3>
                                            <p className="text-sm text-white/80 mb-4">Independent validation of architecture decisions before commitment</p>
                                            <div className="text-xs text-emerald-300 font-medium">Learn more →</div>
                                        </Link>
                                        <Link
                                            to="/services"
                                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors group"
                                        >
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">Cloud Migration</h3>
                                            <p className="text-sm text-white/80 mb-4">Risk reduction and cost optimization for cloud transformation</p>
                                            <div className="text-xs text-emerald-300 font-medium">Learn more →</div>
                                        </Link>
                                        <Link
                                            to="/services"
                                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors group"
                                        >
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">AI Enablement</h3>
                                            <p className="text-sm text-white/80 mb-4">Strategic guidance for AI/ML adoption and integration</p>
                                            <div className="text-xs text-emerald-300 font-medium">Learn more →</div>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center">
                                        <Link
                                            to="/consulting"
                                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors text-lg"
                                        >
                                            Explore Consulting Services
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                            {selectedPersona === 'toolkit' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                                        {t('homepage.personaTabs.toolkitTitle')}
                                    </h2>
                                    <p className="text-center text-white/80 mb-10 max-w-2xl mx-auto">
                                        {t('homepage.personaTabs.toolkitSubtitle', { defaultValue: 'Free tools and resources to help you make better architecture decisions' })}
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                                        {isPromoted('AI_CHECKLIST') && (
                                            <Link
                                                to="/checklist"
                                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors group"
                                            >
                                                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">Vendor Proposal Checklist</h3>
                                                <p className="text-sm text-white/80 mb-4">7-area framework for evaluating vendor proposals</p>
                                                <div className="text-xs text-emerald-300 font-medium">Try it free →</div>
                                            </Link>
                                        )}
                                        {isPromoted('AI_ARCH_ENGINE') && (
                                            <Link
                                                to="/architecture-engine"
                                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors group"
                                            >
                                                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">Architecture Engine</h3>
                                                <p className="text-sm text-white/80 mb-4">Generate architecture diagrams and documentation</p>
                                                <div className="text-xs text-emerald-300 font-medium">Try it free →</div>
                                            </Link>
                                        )}
                                        {isPromoted('AI_RISK_RADAR') && (
                                            <Link
                                                to="/risk-radar"
                                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors group"
                                            >
                                                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">Risk Radar</h3>
                                                <p className="text-sm text-white/80 mb-4">Identify and mitigate project risks</p>
                                                <div className="text-xs text-emerald-300 font-medium">Try it free →</div>
                                            </Link>
                                        )}
                                    </div>
                                    <div className="flex justify-center">
                                        <Link
                                            to="/resources"
                                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors text-lg"
                                        >
                                            Browse All Resources
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </section>
                )}

                {/* Phase 3.4A: "Start Here" Competition Section */}
                {isCompetitionMode() && (
                    <section className="py-16 bg-gradient-to-br from-emerald-50 to-slate-50 dark:from-emerald-900/20 dark:to-slate-800 border-b border-emerald-200 dark:border-emerald-800">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-8"
                            >
                                <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1 rounded-full mb-4">
                                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                                        {t('competition.badge', { defaultValue: 'Google AI Portfolio Challenge Submission' })}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('competition.startHere.title', { defaultValue: 'Start Here' })}
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                                    {t('competition.startHere.subtitle', { defaultValue: 'This portfolio demonstrates enterprise architecture expertise, AI integration with Gemini, and a production-ready platform deployed on Google Cloud Run.' })}
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {/* CTA 1: Explore Hero Case Studies */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                                        <FileText className="text-emerald-600 dark:text-emerald-400" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        {t('competition.startHere.cta1.title', { defaultValue: 'Explore 5 Hero Case Studies' })}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        {t('competition.startHere.cta1.description', { defaultValue: 'Deep-dive case studies with executive snapshots, trust layers, and artifact previews' })}
                                    </p>
                                    <Link
                                        to="/projects"
                                        onClick={() => trackEvent('competition_cta_clicked', { cta: 'hero_case_studies' })}
                                        className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-sm"
                                    >
                                        {t('competition.startHere.cta1.button', { defaultValue: 'View Case Studies' })}
                                        <ArrowRight size={16} />
                                    </Link>
                                </motion.div>

                                {/* CTA 2: Try AI Tool */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                        <Target className="text-blue-600 dark:text-blue-400" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        {t('competition.startHere.cta2.title', { defaultValue: 'Try AI Tool' })}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        {t('competition.startHere.cta2.description', { defaultValue: 'Vendor Proposal Checklist - AI-powered proposal review tool' })}
                                    </p>
                                    <Link
                                        to="/checklist"
                                        onClick={() => trackEvent('competition_cta_clicked', { cta: 'ai_tool' })}
                                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm"
                                    >
                                        {t('competition.startHere.cta2.button', { defaultValue: 'Try Checklist' })}
                                        <ArrowRight size={16} />
                                    </Link>
                                </motion.div>

                                {/* CTA 3: Watch Executive Summary */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                        <Play className="text-purple-600 dark:text-purple-400" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        {t('competition.startHere.cta3.title', { defaultValue: 'Watch Executive Summary' })}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                        {t('competition.startHere.cta3.description', { defaultValue: 'View executive snapshot modal from any hero case study' })}
                                    </p>
                                    <Link
                                        to="/projects/brita-ecommerce"
                                        onClick={() => trackEvent('competition_cta_clicked', { cta: 'executive_summary' })}
                                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold text-sm"
                                    >
                                        {t('competition.startHere.cta3.button', { defaultValue: 'View Example' })}
                                        <ArrowRight size={16} />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                )}

                {/* SECTION 2: TRUST BAR */}
                <LogoCarousel />

                {/* Phase 3.3E: Impact Dashboard */}
                <section id="impact-dashboard" className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 scroll-mt-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-8"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                {t('impactDashboard.title', { defaultValue: 'Impact at a Glance' })}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                {t('impactDashboard.subtitle', { defaultValue: 'Measurable outcomes from real engagements' })}
                            </p>
                        </motion.div>
                        <ImpactDashboard
                            metrics={[
                                { value: '€2M+', label: t('impactDashboard.savings', { defaultValue: 'Cost Saved' }), type: 'savings' },
                                { value: '50+', label: t('impactDashboard.projects', { defaultValue: 'Projects' }), type: 'scope' },
                                { value: '100%', label: t('impactDashboard.compliance', { defaultValue: 'Compliance Rate' }), type: 'risk' },
                                { value: 'Zero', label: t('impactDashboard.breaches', { defaultValue: 'Data Breaches' }), type: 'risk' },
                            ]}
                            compact={true}
                        />
                    </div>
                </section>

                {/* Phase 3.3F: Testimonials Carousel */}
                <section className="py-8 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-6"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                {t('testimonials.title', { defaultValue: 'What Clients Say' })}
                            </h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                {t('testimonials.subtitle', { defaultValue: 'Hover to read full testimonials' })}
                            </p>
                        </motion.div>
                        <TestimonialsRotator />
                    </div>
                </section>

                {/* SECTION 3: THE PROBLEM */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                {t('homepage.problem.title')}
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                            {t('homepage.problem.bullet1.title')}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {t('homepage.problem.bullet1.desc')}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                                        <Target className="text-orange-600 dark:text-orange-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                            {t('homepage.problem.bullet2.title')}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {t('homepage.problem.bullet2.desc')}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                                        <FileText className="text-yellow-600 dark:text-yellow-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                            {t('homepage.problem.bullet3.title')}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {t('homepage.problem.bullet3.desc')}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <p className="text-xl font-semibold text-slate-900 dark:text-white italic">
                                {t('homepage.problem.close')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 4: HOW I WORK */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                {t('homepage.howIWork.title')}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                                {t('homepage.howIWork.subtitle')}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="w-16 h-16 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                                    <Search className="text-emerald-600 dark:text-emerald-400" size={32} />
                                </div>
                                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                                    STEP 1
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('homepage.howIWork.step1.title')}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('homepage.howIWork.step1.desc')}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                                    <TrendingUp className="text-blue-600 dark:text-blue-400" size={32} />
                                </div>
                                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                                    STEP 2
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('homepage.howIWork.step2.title')}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('homepage.howIWork.step2.desc')}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="w-16 h-16 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                                    <Package className="text-purple-600 dark:text-purple-400" size={32} />
                                </div>
                                <div className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                                    STEP 3
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('homepage.howIWork.step3.title')}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('homepage.howIWork.step3.desc')}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: MINI CASE STUDIES */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                {t('homepage.miniCases.title', { defaultValue: 'Proof in Outcomes' })}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                {t('homepage.miniCases.subtitle', { defaultValue: 'Real architecture decisions from recent engagements' })}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Case 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">🏭</div>
                                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case1.client', { defaultValue: 'Pharma Company (Germany)' })}
                                </div>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.situation', { defaultValue: 'Situation:' })}</strong>{' '}
                                    {t('homepage.miniCases.case1.situation', { defaultValue: 'AWS proposed €450K Kubernetes setup for 50-person team' })}
                                </p>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.decision', { defaultValue: 'Decision:' })}</strong>{' '}
                                    {t('homepage.miniCases.case1.decision', { defaultValue: 'Serverless alternative recommended' })}
                                </p>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case1.outcome', { defaultValue: '€415K saved' })}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    {t('homepage.miniCases.case1.detail', { defaultValue: 'Upfront + €65K/year ongoing' })}
                                </p>
                            </motion.div>

                            {/* Case 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">🏥</div>
                                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case2.client', { defaultValue: 'Healthcare Provider (Switzerland)' })}
                                </div>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.situation', { defaultValue: 'Situation:' })}</strong>{' '}
                                    {t('homepage.miniCases.case2.situation', { defaultValue: '8-month migration timeline from consultant' })}
                                </p>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.decision', { defaultValue: 'Decision:' })}</strong>{' '}
                                    {t('homepage.miniCases.case2.decision', { defaultValue: 'Phased approach with early value delivery' })}
                                </p>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case2.outcome', { defaultValue: '6 months faster' })}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    {t('homepage.miniCases.case2.detail', { defaultValue: 'First value in 6 weeks vs 8 months' })}
                                </p>
                            </motion.div>

                            {/* Case 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">🏢</div>
                                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case3.client', { defaultValue: 'Scale-up (Netherlands)' })}
                                </div>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.situation', { defaultValue: 'Situation:' })}</strong>{' '}
                                    {t('homepage.miniCases.case3.situation', { defaultValue: 'Multi-cloud proposal with vendor lock-in risk' })}
                                </p>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.decision', { defaultValue: 'Decision:' })}</strong>{' '}
                                    {t('homepage.miniCases.case3.decision', { defaultValue: 'Portable architecture with 3 viable vendor options' })}
                                </p>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case3.outcome', { defaultValue: 'Zero lock-in' })}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    {t('homepage.miniCases.case3.detail', { defaultValue: 'Freedom to negotiate or switch' })}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: LEAD MAGNET CTA */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full mb-6">
                                <FileText className="text-emerald-600 dark:text-emerald-400" size={48} />
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                {t('homepage.leadMagnetCta.title', { defaultValue: 'Free Download' })}
                            </h2>
                            
                            <h3 className="text-xl md:text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
                                {t('homepage.leadMagnetCta.subtitle', { defaultValue: 'Vendor Proposal Review Checklist' })}
                            </h3>
                            
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                                {t('homepage.leadMagnetCta.description', { defaultValue: 'Professional checklist to identify gaps, risks, and over-engineering in cloud, platform, and AI proposals before signing.' })}
                            </p>
                            
                            <div className="mb-4">
                                <Link
                                    to="/checklist"
                                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                                >
                                    <FileText size={20} />
                                    {t('homepage.leadMagnetCta.button', { defaultValue: 'Download PDF' })}
                                </Link>
                            </div>
                            
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                                {t('homepage.leadMagnetCta.privacy', { defaultValue: 'One-time send. No newsletter. Unsubscribe option included.' })}
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
                                <span>✓ {t('homepage.leadMagnetCta.features.1', { defaultValue: '7 assessment categories' })}</span>
                                <span>✓ {t('homepage.leadMagnetCta.features.2', { defaultValue: 'Red flag patterns' })}</span>
                                <span>✓ {t('homepage.leadMagnetCta.features.3', { defaultValue: 'Vendor-neutral' })}</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 7: FINAL CTA */}
                <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                {t('homepage.finalCta.title')}
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                <a
                                    href="https://calendly.com/prasad-sgsits/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                >
                                    {t('homepage.finalCta.cta')}
                                    <ArrowRight size={20} />
                                </a>
                                <Link
                                    to="/checklist"
                                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-10 py-5 rounded-xl font-semibold text-lg transition-all"
                                >
                                    {t('guide.homepageCta.button')}
                                </Link>
                            </div>
                            <p className="text-slate-300 text-sm">
                                {t('homepage.finalCta.trustNote')}
                            </p>
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* Video Modal */}
            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                title={t('hero.videoTitle', { defaultValue: '75-Second Overview' })}
                // Video URL will be added when available
                // videoUrl="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
            />
        </>
    );
};

export default HomePageMultiDomain;
