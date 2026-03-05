import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
import RecommendationsCarousel, { RECOMMENDATIONS } from '../components/RecommendationsCarousel';
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
    const [featuredRecommendationIndex, setFeaturedRecommendationIndex] = useState(0);
    const featuredRecommendation = RECOMMENDATIONS[featuredRecommendationIndex] || RECOMMENDATIONS[0];
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [toolkitEmail, setToolkitEmail] = useState('');
    const [toolkitFormState, setToolkitFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    
    // Get persona from URL param or localStorage, default to 'consult'
    const getInitialPersona = (): PersonaType => {
        const urlPersona = searchParams.get('persona') as PersonaType;
        if (urlPersona && ['hire', 'consult', 'toolkit'].includes(urlPersona)) {
            return urlPersona;
        }
        if (typeof window !== 'undefined') {
            try {
                const stored = localStorage.getItem('pt_home_persona');
                if (stored === 'v1_hire') return 'hire';
                if (stored === 'v1_toolkit') return 'toolkit';
            } catch (e) {
                // Ignore storage errors (privacy mode, blocked storage)
            }
        }
        return 'consult'; // default
    };

    const [selectedPersona, setSelectedPersona] = useState<PersonaType>(getInitialPersona);
    const showPersonaTabs = isEnabled('HOMEPAGE_PERSONA_TABS');
    const { primary: primaryCTA, secondary: secondaryCTA } = usePersonaCTAs(selectedPersona);

    // Redirect legacy hire persona query to canonical /hire
    useEffect(() => {
        const urlPersona = searchParams.get('persona') as PersonaType | null;
        if (urlPersona === 'hire') {
            navigate('/hire', { replace: true });
        }
    }, [navigate, searchParams]);

    // Update URL (only if persona param already exists) and localStorage when persona changes
    useEffect(() => {
        if (selectedPersona) {
            const currentParam = searchParams.get('persona');
            if (searchParams.has('persona') && currentParam !== selectedPersona) {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('persona', selectedPersona);
                setSearchParams(newParams, { replace: true });
            }
            
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('pt_home_persona', `v1_${selectedPersona}`);
                } catch (e) {
                    // Ignore storage errors
                }
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
            
            // Smooth scroll to persona content section with improved reliability
            setTimeout(() => {
                const personaSection = document.getElementById('persona-content');
                if (personaSection) {
                    // Calculate offset to account for fixed navigation
                    const navHeight = 96; // 80px nav + 16px competition banner
                    const elementPosition = personaSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback: scroll to approximate position if element not found
                    const heroHeight = window.innerHeight * 0.8; // Approximate hero section height
                    window.scrollTo({
                        top: heroHeight,
                        behavior: 'smooth'
                    });
                }
            }, 150); // Increased delay to ensure content is rendered
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
                title="Prasad Tilloo | Principal Architect"
                description="Principal architect and digital transformation leader, acting fractional CTO (hands-on) helping teams scale modernization, AI, and compliance programs with clear executive outcomes."
                keywords="principal architect, digital transformation, acting fractional CTO, enterprise architecture, healthtech, telemedicine, technical due diligence, cloud migration readiness, platform evaluation, AI modernization, AWS, Azure, GCP"
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
                                                {t('homepage.personaTabs.hiring')}
                                            </button>
                                            <button
                                                onClick={() => handlePersonaChange('consult')}
                                                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                                                    selectedPersona === 'consult'
                                                        ? 'bg-white text-slate-900'
                                                        : 'text-white/80 hover:bg-white/10'
                                                }`}
                                            >
                                                {t('homepage.personaTabs.consulting')}
                                            </button>
                                            <button
                                                onClick={() => handlePersonaChange('toolkit')}
                                                className={`px-4 py-1.5 rounded text-sm font-medium transition-all ${
                                                    selectedPersona === 'toolkit'
                                                        ? 'bg-white text-slate-900'
                                                        : 'text-white/80 hover:bg-white/10'
                                                }`}
                                            >
                                                {t('homepage.personaTabs.toolkit')}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Phase 4 Wireframe: H1 + Subhead + Proof Chips + Persona Tabs + CTAs */}
                                {/* H1: "Reduce risk before committing budget" */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white">
                                    {t('homepage.hero.title')}
                                </h1>

                                {/* Subheadline: 2 lines max */}
                                <p className="text-lg md:text-xl text-slate-200 mb-6 leading-relaxed">
                                    {t('homepage.hero.subtitle')}
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
                                        <span className="text-emerald-300 font-semibold text-sm">{t('homepage.hero.proof.savings.value')}</span>
                                        <span className="text-white/80 text-sm">{t('homepage.hero.proof.savings.label')}</span>
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
                                        <span className="text-emerald-300 font-semibold text-sm">{t('homepage.hero.proof.speed.value')}</span>
                                        <span className="text-white/80 text-sm">{t('homepage.hero.proof.speed.label')}</span>
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
                                        <span className="text-emerald-300 font-semibold text-sm">{t('homepage.hero.proof.sla.value')}</span>
                                        <span className="text-white/80 text-sm">{t('homepage.hero.proof.sla.label')}</span>
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
                                            {t('homepage.hero.cta.primary')}
                                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                        </a>
                                        <Link
                                            to="/projects"
                                            className="group text-white/80 hover:text-white px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 border border-white/20 hover:border-white/40"
                                        >
                                            {t('homepage.hero.cta.secondary')}
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
                                <h3 className="text-xl font-bold text-white mb-4">{t('homepage.hero.whatYouGet.title')}</h3>
                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-300 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-white/90 text-sm">{t('homepage.hero.whatYouGet.items.0')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-300 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-white/90 text-sm">{t('homepage.hero.whatYouGet.items.1')}</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-300 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-white/90 text-sm">{t('homepage.hero.whatYouGet.items.2')}</span>
                                    </li>
                                </ul>
                                {/* Micro trust line */}
                                <p className="text-xs text-white/70 border-t border-white/10 pt-4">
                                    {t('homepage.hero.whatYouGet.trustLine')}
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Phase 3.1: Persona-Specific Content Block - More prominent and useful */}
                {showPersonaTabs && selectedPersona && (
                    <section id="persona-content" className="py-20 bg-slate-50 dark:bg-white/10 dark:backdrop-blur-sm border-b border-slate-200 dark:border-white/20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {selectedPersona === 'hire' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-slate-900 dark:text-white"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                                        {t('homepage.personaTabs.hiringTitle')}
                                    </h2>
                                    <p className="text-center text-slate-600 dark:text-white/80 mb-10 max-w-2xl mx-auto">
                                        {t('homepage.personaTabs.hiringSubtitle', { defaultValue: 'Senior Engineering Leader open to new opportunities' })}
                                    </p>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                        <div className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20">
                                            <div className="text-3xl font-bold text-emerald-300 mb-2">15+</div>
                                            <div className="text-sm font-semibold mb-1">{t('homepage.personaTabs.hiringYears')}</div>
                                            <div className="text-xs text-slate-600 dark:text-white/70">Principal architecture & digital transformation delivery</div>
                                        </div>
                                        <div className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20">
                                            <div className="text-3xl font-bold text-emerald-300 mb-2">5M+</div>
                                            <div className="text-sm font-semibold mb-1">{t('homepage.personaTabs.hiringStats.dailyTransactions.label')}</div>
                                            <div className="text-xs text-slate-600 dark:text-white/70">{t('homepage.personaTabs.hiringStats.dailyTransactions.desc')}</div>
                                        </div>
                                        <div className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20">
                                            <div className="text-3xl font-bold text-emerald-300 mb-2">$1M+</div>
                                            <div className="text-sm font-semibold mb-1">{t('homepage.personaTabs.hiringStats.costSaved.label')}</div>
                                            <div className="text-xs text-slate-600 dark:text-white/70">{t('homepage.personaTabs.hiringStats.costSaved.desc')}</div>
                                        </div>
                                        <div className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20">
                                            <div className="text-3xl font-bold text-emerald-300 mb-2">99.99%</div>
                                            <div className="text-sm font-semibold mb-1">{t('homepage.personaTabs.hiringStats.slaUptime.label')}</div>
                                            <div className="text-xs text-slate-600 dark:text-white/70">{t('homepage.personaTabs.hiringStats.slaUptime.desc')}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <Link
                                                to="/hire"
                                                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors border border-slate-200 dark:border-white/20"
                                            >
                                            {t('cta.hiring.primary')}
                                                <ArrowRight size={18} />
                                            </Link>
                                        <Link
                                            to="/projects"
                                            className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 border border-slate-200 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-colors dark:bg-white/10 dark:text-white dark:border-white/20 dark:hover:bg-white/20"
                                        >
                                            {t('cta.hiring.secondary')}
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                            {selectedPersona === 'consult' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-slate-900 dark:text-white"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                                        {t('homepage.personaTabs.consultingTitle')}
                                    </h2>
                                    <p className="text-center text-slate-600 dark:text-white/80 mb-10 max-w-2xl mx-auto">
                                        {t('homepage.personaTabs.consultingSubtitle', { defaultValue: 'Independent validation of architecture, modernization, and AI enablement decisions' })}
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                                        <Link
                                            to="/services"
                                            className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors group"
                                        >
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                                                {t('homepage.consulting.cards.archReview.title', { defaultValue: 'Architecture Review' })}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-white/80 mb-4">
                                                {t('homepage.consulting.cards.archReview.desc', { defaultValue: 'Independent validation of architecture decisions before commitment' })}
                                            </p>
                                            <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">
                                                {t('homepage.consulting.cards.learnMore', { defaultValue: 'Learn more →' })}
                                            </div>
                                        </Link>
                                        <Link
                                            to="/services"
                                            className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors group"
                                        >
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                                                {t('homepage.consulting.cards.cloudMigration.title', { defaultValue: 'Cloud Migration' })}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-white/80 mb-4">
                                                {t('homepage.consulting.cards.cloudMigration.desc', { defaultValue: 'Risk reduction and cost optimization for cloud transformation' })}
                                            </p>
                                            <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">
                                                {t('homepage.consulting.cards.learnMore', { defaultValue: 'Learn more →' })}
                                            </div>
                                        </Link>
                                        <Link
                                            to="/services"
                                            className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors group"
                                        >
                                            <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                                                {t('homepage.consulting.cards.aiEnablement.title', { defaultValue: 'AI Enablement' })}
                                            </h3>
                                            <p className="text-sm text-slate-600 dark:text-white/80 mb-4">
                                                {t('homepage.consulting.cards.aiEnablement.desc', { defaultValue: 'Strategic guidance for AI/ML adoption and integration' })}
                                            </p>
                                            <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">
                                                {t('homepage.consulting.cards.learnMore', { defaultValue: 'Learn more →' })}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center">
                                        <Link
                                            to="/consulting"
                                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-white/90 transition-colors text-lg border border-slate-200 dark:border-white/20"
                                        >
                                            {t('homepage.consulting.cta', { defaultValue: 'Explore Consulting Services' })}
                                            <ArrowRight size={20} />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                            {selectedPersona === 'toolkit' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-slate-900 dark:text-white"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                                        {t('homepage.personaTabs.toolkitTitle')}
                                    </h2>
                                    <p className="text-center text-slate-600 dark:text-white/80 mb-10 max-w-2xl mx-auto">
                                        {t('homepage.personaTabs.toolkitSubtitle', { defaultValue: 'Free tools and resources to help you make better architecture decisions' })}
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                                        {isPromoted('AI_CHECKLIST') && (
                                            <Link
                                                to="/checklist"
                                                className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors group"
                                            >
                                                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                                                    {t('resourcesPage.resources.checklist.title', { defaultValue: 'Vendor Proposal Checklist' })}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-white/80 mb-4">
                                                    {t('homepage.toolkit.cards.checklist.desc', { defaultValue: '7-area framework for evaluating vendor proposals' })}
                                                </p>
                                                <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">
                                                    {t('homepage.toolkit.cards.try', { defaultValue: 'Try it free →' })}
                                                </div>
                                            </Link>
                                        )}
                                        {isPromoted('AI_ARCH_ENGINE') && (
                                            <Link
                                                to="/architecture-engine"
                                                className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors group"
                                            >
                                                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                                                    {t('resourcesPage.resources.architecture.title', { defaultValue: 'Architecture Engine' })}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-white/80 mb-4">
                                                    {t('resourcesPage.resources.architecture.desc', { defaultValue: 'Generate architecture diagrams and documentation' })}
                                                </p>
                                                <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">
                                                    {t('homepage.toolkit.cards.try', { defaultValue: 'Try it free →' })}
                                                </div>
                                            </Link>
                                        )}
                                        {isPromoted('AI_RISK_RADAR') && (
                                            <Link
                                                to="/risk-radar"
                                                className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors group"
                                            >
                                                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                                                    {t('resourcesPage.resources.riskRadar.title', { defaultValue: 'Risk Radar' })}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-white/80 mb-4">
                                                    {t('resourcesPage.resources.riskRadar.desc', { defaultValue: 'Identify and mitigate project risks' })}
                                                </p>
                                                <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">
                                                    {t('homepage.toolkit.cards.try', { defaultValue: 'Try it free →' })}
                                                </div>
                                            </Link>
                                        )}
                                        {/* Phase 5 Enhanced: Project Similarity Matcher */}
                                        {isPromoted('PROJECT_SIMILARITY_MATCHER') && (
                                            <Link
                                                to="/tools/project-similarity"
                                                className="bg-white dark:bg-white/10 rounded-xl p-6 border border-slate-200 dark:border-white/20 hover:bg-slate-50 dark:hover:bg-white/20 transition-colors group"
                                            >
                                                <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-300 transition-colors">
                                                    {t('tools.projectSimilarity.heroTitle', { defaultValue: 'Project Similarity Matcher' })}
                                                </h3>
                                                <p className="text-sm text-slate-600 dark:text-white/80 mb-4">
                                                    {t('tools.projectSimilarity.heroSubhead', { defaultValue: 'Find similar projects from 15+ years of experience' })}
                                                </p>
                                                <div className="text-xs text-emerald-600 dark:text-emerald-300 font-medium">
                                                    {t('homepage.toolkit.cards.try', { defaultValue: 'Try it free →' })}
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                    {/* FINAL SUBMISSION: Removed large Browse Resources button - Resources in top nav only */}
                                </motion.div>
                            )}
                        </div>
                    </section>
                )}

                {/* FINAL SUBMISSION: Removed Start Here section - keeping only Competition Mode banner */}

                {/* Executive Summary - Principal Architect Focus */}
                <section id="executive-summary" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                                Executive Summary
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                Principal architect leadership for organizations that need senior direction without full-time overhead.
                                I lead strategy, architecture, and delivery to align teams around measurable outcomes, including acting fractional CTO support when needed.
                            </p>
                        </motion.div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                                    <Briefcase className="text-emerald-600 dark:text-emerald-400" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Strategy & Stakeholders</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Translate board goals into a clear technical roadmap and executive narrative.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                    <Target className="text-blue-600 dark:text-blue-400" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Architecture & Risk</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Make build-buy-modernize decisions with compliance, cost, and scale tradeoffs mapped.
                                </p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                    <TrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {t('homepage.impact.cards.delivery.title', { defaultValue: 'Delivery & Outcomes' })}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {t('homepage.impact.cards.delivery.desc', { defaultValue: 'De-risk execution with a 90-day plan, critical hires, and measurable KPIs.' })}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: TRUST STRIP - Phase 4 Wireframe: Pattern break with one-line text */}
                <section className="w-full bg-slate-100 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 text-center md:text-left whitespace-nowrap">
                                {t('homepage.trustStrip', { defaultValue: 'Enterprise delivery across e-commerce, healthcare, insurance, ESG.' })}
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
                                {t('homepage.impact.title', { defaultValue: 'Impact highlights' })}
                            </h2>
                        </motion.div>
                        <ImpactDashboard
                            metrics={[
                                { value: t('homepage.impact.metrics.cost.value', { defaultValue: '$1M+' }), label: t('homepage.impact.metrics.cost.label', { defaultValue: 'Cost Saved' }), type: 'savings' },
                                { value: t('homepage.impact.metrics.speed.value', { defaultValue: '30%' }), label: t('homepage.impact.metrics.speed.label', { defaultValue: 'Faster Deployments' }), type: 'scope' },
                                { value: t('homepage.impact.metrics.transactions.value', { defaultValue: '5M+' }), label: t('homepage.impact.metrics.transactions.label', { defaultValue: 'Daily Transactions' }), type: 'scope' },
                                { value: t('homepage.impact.metrics.sla.value', { defaultValue: '99.99%' }), label: t('homepage.impact.metrics.sla.label', { defaultValue: 'SLA Uptime' }), type: 'risk' },
                            ]}
                            compact={true}
                        />
                        {/* Phase 5: Ensure "Representative outcomes — anonymized" remains visible but subtle */}
                        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4 opacity-75">
                            {t('homepage.impact.representative', { defaultValue: 'Representative outcomes — anonymized' })}
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
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={featuredRecommendationIndex}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <Quote className="text-emerald-600 dark:text-emerald-400 mb-4" size={32} />
                                        <blockquote className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white mb-6 leading-relaxed">
                                            “{featuredRecommendation.text}”
                                        </blockquote>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                <User className="text-emerald-600 dark:text-emerald-400" size={20} />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900 dark:text-white">
                                                    {featuredRecommendation.title}
                                                </div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                                    {featuredRecommendation.name}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Right: Recommendations Carousel (from About page) */}
                            <div>
                                <RecommendationsCarousel onVisibleStartChange={setFeaturedRecommendationIndex} />
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

                {/* SECTION: HOW I OPERATE */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                How I operate
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                                A focused 3-phase engagement that aligns executives, architects, and delivery teams.
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
                                    PHASE 1
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Diagnose & align
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Clarify business goals, constraints, and risks. Produce a decision memo and success metrics.
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
                                    PHASE 2
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Architect the plan
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Define target architecture, hiring plan, and 90-day roadmap with measurable checkpoints.
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
                                    PHASE 3
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Execute & de-risk
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Run delivery, remove blockers, and build momentum with weekly executive updates.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

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
                                Executive case studies
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
                                {t('homepage.leadMagnetCta.title')}
                            </h2>
                            
                            <h3 className="text-xl md:text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-6">
                                {t('homepage.leadMagnetCta.subtitle')}
                            </h3>
                            
                            {/* Phase 4 Wireframe: 3 bullets */}
                            <ul className="flex flex-col items-center gap-3 mb-8 text-left max-w-md mx-auto">
                                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                    <span>{t('homepage.leadMagnetCta.features.2', { defaultValue: 'Red flag patterns' })}</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                    <span>{t('homepage.leadMagnetCta.features.3', { defaultValue: 'Vendor-neutral' })}</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                    <span>{t('homepage.leadMagnetCta.features.1', { defaultValue: '7 assessment categories' })}</span>
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
                                        placeholder={t('guide.form.emailPlaceholder', { defaultValue: 'work@company.com' })}
                                        required
                                        className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={toolkitFormState === 'submitting' || toolkitFormState === 'success'}
                                        className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        {toolkitFormState === 'submitting' ? (
                                            <>{t('guide.form.submitting', { defaultValue: 'Sending...' })}</>
                                        ) : toolkitFormState === 'success' ? (
                                            <>{t('guide.success.title', { defaultValue: 'Guide sent to your email' })}</>
                                        ) : (
                                            <>
                                                {t('homepage.leadMagnetCta.button')}
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
                                        Prefer the short version? View the hiring snapshot.
                                    </h2>
                                    <Link
                                        to="/hire"
                                        className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                        onClick={() => trackEvent('homepage_final_cta_click', { persona: 'hire', cta: 'download_resume' })}
                                    >
                                        View Hiring Snapshot
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
