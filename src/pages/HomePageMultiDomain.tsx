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
    BookOpen,
    CheckCircle2,
    Mail,
    Quote
} from 'lucide-react';
import SEO from '../components/SEO';
import LogoCarousel from '../components/LogoCarousel';
import VideoModal from '../components/VideoModal';
import TestimonialsRotator from '../components/TestimonialsRotator';
import ImpactDashboard from '../components/ImpactDashboard';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import SignatureMeshBackground from '../components/SignatureMeshBackground';
import { projects } from '../data/projects';
import { trackEvent, AnalyticsEvents } from '../services/analytics';
import { isEnabled, isPromoted } from '../config/featureUtils';
import { setGlobalPersona, getGlobalPersona } from '../utils/personaPersistence';
import { isCompetitionMode } from '../config/competition';
import { usePersonaCTAs } from '../utils/personaCTAs';
import i18n from '../i18n';

type PersonaType = 'hire' | 'consult' | 'toolkit';

const HomePageMultiDomain: React.FC = () => {
    const { t } = useTranslation();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [toolkitEmail, setToolkitEmail] = useState('');
    const [toolkitFormState, setToolkitFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    
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
    const { primary: primaryCTA, secondary: secondaryCTA } = usePersonaCTAs(selectedPersona);

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
                {/* SECTION 1: HERO - Phase 4 Wireframe: 2-Column Layout */}
                <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 md:py-32 lg:py-48 overflow-hidden min-h-[70vh]">
                    {/* Phase 4.1: Signature Mesh Background */}
                    <SignatureMeshBackground opacity={0.05} className="text-white" />
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                        >
                            {/* Left Column: Content */}
                            <div className="text-left">
                                {/* Phase 4 Wireframe: Persona Tabs - Small pills */}
                                {showPersonaTabs && (
                                    <div className="mb-6">
                                        <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                                            <button
                                                onClick={() => handlePersonaChange('hire')}
                                                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                                                    selectedPersona === 'hire'
                                                        ? 'bg-white text-slate-900'
                                                        : 'text-white/80 hover:bg-white/10'
                                                }`}
                                            >
                                                Hiring
                                            </button>
                                            <button
                                                onClick={() => handlePersonaChange('consult')}
                                                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                                                    selectedPersona === 'consult'
                                                        ? 'bg-white text-slate-900'
                                                        : 'text-white/80 hover:bg-white/10'
                                                }`}
                                            >
                                                Consulting
                                            </button>
                                            <button
                                                onClick={() => handlePersonaChange('toolkit')}
                                                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                                                    selectedPersona === 'toolkit'
                                                        ? 'bg-white text-slate-900'
                                                        : 'text-white/80 hover:bg-white/10'
                                                }`}
                                            >
                                                Toolkit
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Phase 4 Wireframe: H1 + Subhead + Proof Chips + Persona Tabs + CTAs */}
                                {/* H1: "Reduce risk before committing budget" */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                                    Reduce risk before committing budget.
                                </h1>

                                {/* Subheadline: 2 lines max - "Independent architecture consultant. Cloud + AI + compliance-heavy delivery." */}
                                <p className="text-lg md:text-xl text-slate-200 mb-6 leading-relaxed">
                                    Independent architecture consultant. Cloud + AI + compliance-heavy delivery.
                                </p>

                                {/* Phase 4.1: Clickable Proof Chips - scroll to sections */}
                                <div className="flex flex-wrap gap-3 mb-6">
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById('impact-dashboard');
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                trackEvent('proof_chip_clicked', { chip: 'savings', target: 'impact-dashboard' });
                                            }
                                        }}
                                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                                    >
                                        <span className="text-emerald-300 font-semibold text-sm">€415K</span>
                                        <span className="text-white/80 text-sm">saved</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById('testimonials');
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                trackEvent('proof_chip_clicked', { chip: 'engagements', target: 'testimonials' });
                                            }
                                        }}
                                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                                    >
                                        <span className="text-emerald-300 font-semibold text-sm">50+</span>
                                        <span className="text-white/80 text-sm">engagements</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            const element = document.getElementById('featured-case-studies');
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                trackEvent('proof_chip_clicked', { chip: 'compliance', target: 'featured-case-studies' });
                                            }
                                        }}
                                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
                                    >
                                        <span className="text-emerald-300 font-semibold text-sm">EU</span>
                                        <span className="text-white/80 text-sm">compliance-ready</span>
                                    </button>
                                </div>

                                {/* Phase 4.1: Persona-based CTAs using helper */}
                                {showPersonaTabs ? (
                                    <div className="flex flex-col sm:flex-row gap-4 items-start mb-6">
                                        {/* Primary CTA */}
                                        {primaryCTA.path.startsWith('http') ? (
                                            <a
                                                href={primaryCTA.path}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                                onClick={() => trackEvent(AnalyticsEvents.CTA_BOOK_CALL_CLICK, { source: 'hero', persona: selectedPersona, cta: 'primary' })}
                                            >
                                                {primaryCTA.label}
                                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                            </a>
                                        ) : (
                                            <Link
                                                to={primaryCTA.path}
                                                className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                                onClick={() => trackEvent(AnalyticsEvents.CTA_BOOK_CALL_CLICK, { source: 'hero', persona: selectedPersona, cta: 'primary' })}
                                            >
                                                {primaryCTA.label}
                                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                            </Link>
                                        )}
                                        {/* Secondary CTA */}
                                        <Link
                                            to={secondaryCTA.path}
                                            className="group text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 flex items-center gap-2 underline-offset-4 hover:underline border border-white/20 hover:border-white/40"
                                            onClick={() => trackEvent(AnalyticsEvents.CTA_BOOK_CALL_CLICK, { source: 'hero', persona: selectedPersona, cta: 'secondary' })}
                                        >
                                            {secondaryCTA.label}
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-4 items-start mb-6">
                                        <a
                                            href="https://calendly.com/prasad-sgsits/30min"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackEvent(AnalyticsEvents.CTA_BOOK_CALL_CLICK, { source: 'hero' })}
                                            className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl"
                                        >
                                            Book Discovery Call
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                        </a>
                                        <Link
                                            to="/projects"
                                            className="group text-white/80 hover:text-white px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 border border-white/20 hover:border-white/40"
                                        >
                                            View Case Studies
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Hero Evidence Card - Phase 4 Wireframe */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/20 shadow-lg"
                            >
                                <h3 className="text-xl font-bold text-white mb-4">What you get</h3>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-300 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-white/90 text-sm">Clear decision: build vs buy vs modernize</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-300 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-white/90 text-sm">Architecture blueprint + phased roadmap</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-300 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-white/90 text-sm">Stakeholder-ready executive narrative</span>
                                    </li>
                                </ul>
                                {/* Micro trust line */}
                                <p className="text-xs text-white/70 border-t border-white/10 pt-4">
                                    Ex-BRITA / Siemens / PACT/WBCSD
                                </p>
                            </motion.div>
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

                {/* SECTION 2: TRUST STRIP - Phase 4 Wireframe: Pattern break with one-line text */}
                <section className="w-full bg-slate-100 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center md:text-left whitespace-nowrap">
                                Enterprise delivery across e-commerce, healthcare, insurance, ESG.
                            </p>
                            <div className="flex-1 max-w-4xl">
                                <LogoCarousel compact={true} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: IMPACT DASHBOARD - Phase 4 Wireframe: 4 cards max + microcopy */}
                <section id="impact-dashboard" className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 scroll-mt-24">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-6"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                Impact at a glance
                            </h2>
                        </motion.div>
                        <ImpactDashboard
                            metrics={[
                                { value: '€415K+', label: 'Cost Saved', type: 'savings' },
                                { value: '50+', label: 'Engagements', type: 'scope' },
                                { value: '100%', label: 'Compliance Rate', type: 'risk' },
                                { value: 'Zero', label: 'Data Breaches', type: 'risk' },
                            ]}
                            compact={true}
                        />
                        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
                            Representative outcomes (anonymized).
                        </p>
                    </div>
                </section>

                {/* SECTION 5: TESTIMONIAL PATTERN BREAK - Phase 4 Wireframe: Two-column split */}
                <section id="testimonials" className="py-12 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 scroll-mt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-8 items-center"
                        >
                            {/* Left: Hero quote - One strong testimonial (large) */}
                            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
                                <Quote className="text-emerald-600 dark:text-emerald-400 mb-4" size={32} />
                                <blockquote className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
                                    "Best architecture review we've had. Saved us €400K+ by avoiding the wrong platform choice."
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                        <User className="text-emerald-600 dark:text-emerald-400" size={20} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-900 dark:text-white">Head of Technology</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">Pharma Company</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: TestimonialsRotator (compact) */}
                            <div>
                                <TestimonialsRotator />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Phase 4 C3: Hide "The Problem" section - too dense for scanning */}
                {/* SECTION 3: THE PROBLEM - HIDDEN FOR DENSITY REDUCTION */}
                {false && <section className="py-20 bg-white dark:bg-slate-900">
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
                </section>}

                {/* Phase 4 C3: Hide "How I Work" section - too dense for scanning */}
                {/* SECTION 4: HOW I WORK - HIDDEN FOR DENSITY REDUCTION */}
                {false && <section className="py-20 bg-slate-50 dark:bg-slate-800">
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
                </section>}

                {/* SECTION 4: FEATURED CASE STUDIES - Phase 4 Wireframe: 2 rows (2 large + 3 small) */}
                <section id="featured-case-studies" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 scroll-mt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                                Featured case studies
                            </h2>
                        </motion.div>

                        {/* Phase 4 Wireframe: Row 1 - 2 large cards (BRITA + Insurance) */}
                        {(() => {
                            const LARGE_SLUGS = ['brita-ecommerce', 'insurance-performance'];
                            const largeProjects = projects.filter(p => LARGE_SLUGS.includes(p.slug));
                            
                            const SMALL_SLUGS = ['delivery-hero-ads', 'photography-coach-ai', 'pact-pcf-data-exchange-network'];
                            const smallProjects = projects.filter(p => SMALL_SLUGS.includes(p.slug)).slice(0, 3);

                            return (
                                <>
                                    {/* Row 1: 2 large featured cards */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        {largeProjects.map((project, idx) => (
                                            <motion.div
                                                key={project.slug}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <ProjectCard project={project} />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Row 2: 3 smaller cards (Delivery Hero, Photography AI, SINE) */}
                                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                                        {smallProjects.map((project, idx) => (
                                            <motion.div
                                                key={project.slug}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + idx * 0.1 }}
                                            >
                                                <ProjectCard project={project} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            );
                        })()}

                        {/* Phase 4 Wireframe: "View all projects →" below section */}
                        <div className="text-center">
                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors"
                                onClick={() => trackEvent('homepage_view_all_projects_click', { source: 'featured_section' })}
                            >
                                View all projects
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: TOOLKIT LEAD MAGNET - Phase 4 Wireframe: Email form */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                                Free resource
                            </h2>
                            
                            <h3 className="text-xl md:text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-6">
                                Vendor Proposal Review Checklist
                            </h3>
                            
                            {/* Phase 4 Wireframe: 3 bullets */}
                            <ul className="flex flex-col items-center gap-3 mb-8 text-left max-w-md mx-auto">
                                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                    <span>Catch red flags</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                    <span>Prevent lock-in</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                    <span>Stakeholder-ready questions</span>
                                </li>
                            </ul>
                            
                            {/* Phase 4 Wireframe: Email form */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setToolkitFormState('submitting');
                                    // Redirect to checklist page (or handle submission)
                                    setTimeout(() => {
                                        setToolkitFormState('success');
                                        window.location.href = '/checklist';
                                    }, 500);
                                }}
                                className="max-w-md mx-auto mb-6"
                            >
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={toolkitEmail}
                                        onChange={(e) => setToolkitEmail(e.target.value)}
                                        placeholder="Your email"
                                        required
                                        className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={toolkitFormState === 'submitting' || toolkitFormState === 'success'}
                                        className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        {toolkitFormState === 'submitting' ? (
                                            <>Sending...</>
                                        ) : toolkitFormState === 'success' ? (
                                            <>Sent!</>
                                        ) : (
                                            <>
                                                Send me the checklist
                                                <Mail size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                            
                            {/* Phase 4.1: Social proof line */}
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                                {t('homepage.toolkit.socialProof', { defaultValue: 'Used by CTOs across EU mid-market.' })}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 7: FINAL CTA - Phase 4 Wireframe: Persona-based banner CTA */}
                <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {/* Phase 4 Wireframe: Persona-based message + CTA */}
                            {selectedPersona === 'hire' && (
                                <>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        Want the short version? Download resume
                                    </h2>
                                    <Link
                                        to="/hiring"
                                        className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                        onClick={() => trackEvent('homepage_final_cta_click', { persona: 'hire', cta: 'download_resume' })}
                                    >
                                        View Hiring Profile
                                        <ArrowRight size={20} />
                                    </Link>
                                </>
                            )}
                            {selectedPersona === 'consult' && (
                                <>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        Ready to de-risk your decision? Book a discovery call.
                                    </h2>
                                    <a
                                        href="https://calendly.com/prasad-sgsits/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                        onClick={() => trackEvent('homepage_final_cta_click', { persona: 'consult', cta: 'book_call' })}
                                    >
                                        Book Discovery Call
                                        <ArrowRight size={20} />
                                    </a>
                                </>
                            )}
                            {selectedPersona === 'toolkit' && (
                                <>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        Browse toolkits and frameworks.
                                    </h2>
                                    <Link
                                        to="/resources"
                                        className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                        onClick={() => trackEvent('homepage_final_cta_click', { persona: 'toolkit', cta: 'browse_resources' })}
                                    >
                                        Browse Resources
                                        <ArrowRight size={20} />
                                    </Link>
                                </>
                            )}
                            {!showPersonaTabs && (
                                <>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        Ready to de-risk your decision? Book a discovery call.
                                    </h2>
                                    <a
                                        href="https://calendly.com/prasad-sgsits/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                        onClick={() => trackEvent('homepage_final_cta_click', { persona: 'default', cta: 'book_call' })}
                                    >
                                        Book Discovery Call
                                        <ArrowRight size={20} />
                                    </a>
                                </>
                            )}
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
