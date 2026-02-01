import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import {
  CheckCircle2,
  Shield,
  TrendingDown,
  Clock,
  ArrowRight,
  Award,
  DollarSign,
  AlertCircle,
  Briefcase,
  User,
  BookOpen
} from 'lucide-react';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';
import { trackEvent } from '../services/analytics';
import { isEnabled } from '../config/featureUtils';
import i18n from '../i18n';

type PersonaType = 'hire' | 'consult' | 'toolkit';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [showROICalculator, setShowROICalculator] = useState(false);
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
      // Update URL without triggering navigation
      const newParams = new URLSearchParams(searchParams);
      newParams.set('persona', selectedPersona);
      setSearchParams(newParams, { replace: true });
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('pt_home_persona', `v1_${selectedPersona}`);
      }
    }
  }, [selectedPersona, searchParams, setSearchParams]);

  // Track persona selection and scroll to content
  const handlePersonaChange = (persona: PersonaType, source: 'tabs' | 'url' = 'tabs') => {
    setSelectedPersona(persona);
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

  return (
    <>
      <SEO
        title="HIPAA-Compliant Cloud Migration Specialist"
        description="I've successfully migrated 12 healthcare systems to AWS without a single HIPAA violation, data breach, or downtime incident. €2M+ in cost savings delivered."
        keywords="HIPAA cloud migration, healthcare AWS, FHIR compliance, patient data security, healthcare cloud architect, GDPR healthcare, medical records migration"
        type="website"
      />

      <div className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 md:py-32 overflow-hidden">
          {/* Background Pattern */}
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
              className="text-center"
            >
              {/* Phase 3.1: Persona Tabs */}
              {showPersonaTabs && (
                <div className="mb-8 flex justify-center">
                  <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                    <button
                      onClick={() => handlePersonaChange('hire')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                        selectedPersona === 'hire'
                          ? 'bg-white text-slate-900'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <Briefcase size={16} />
                      {t('homepage.personaTabs.hiring')}
                    </button>
                    <button
                      onClick={() => handlePersonaChange('consult')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                        selectedPersona === 'consult'
                          ? 'bg-white text-slate-900'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <User size={16} />
                      {t('homepage.personaTabs.consulting')}
                    </button>
                    <button
                      onClick={() => handlePersonaChange('toolkit')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                        selectedPersona === 'toolkit'
                          ? 'bg-white text-slate-900'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <BookOpen size={16} />
                      {t('homepage.personaTabs.toolkit')}
                    </button>
                  </div>
                </div>
              )}

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <Trans i18nKey="homeHealthcare.hero.title">
                  Stuck in <span className="text-red-400">HIPAA Compliance Hell</span>
                  <br />
                  During Cloud Migration?
                </Trans>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                <Trans i18nKey="homeHealthcare.hero.subtitle">
                  I've successfully migrated <strong className="text-emerald-400">12 healthcare systems</strong> to AWS
                  without a single <strong>HIPAA violation</strong>, <strong>data breach</strong>, or <strong>downtime incident</strong>.
                </Trans>
              </p>

              {/* Social Proof - Client Logos */}
              <div className="mb-10">
                <p className="text-sm uppercase tracking-wider text-slate-400 mb-4">
                  {t('homeHealthcare.hero.trustedBy')}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  {['PwC', 'Boehringer Ingelheim', 'Delivery Hero', 'BRITA'].map((client) => (
                    <div
                      key={client}
                      className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20"
                    >
                      <span className="text-lg font-semibold text-white">{client}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase 3.1: Persona-Specific CTAs */}
              {showPersonaTabs ? (
                <>
                  {selectedPersona === 'hire' && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                      <Link
                        to="/hiring"
                        className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                      >
                        {t('homepage.personaTabs.hiringPrimary')}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </Link>
                      <Link
                        to="/projects"
                        className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                      >
                        {t('homepage.personaTabs.hiringSecondary')}
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  )}
                  {selectedPersona === 'consult' && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                      <Link
                        to="/contact"
                        className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                      >
                        {t('homepage.personaTabs.consultingPrimary')}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </Link>
                      <Link
                        to="/checklist"
                        className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                      >
                        {t('homepage.personaTabs.consultingSecondary')}
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  )}
                  {selectedPersona === 'toolkit' && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                      <Link
                        to="/services"
                        className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                      >
                        {t('homepage.personaTabs.toolkitPrimary')}
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                      </Link>
                      <Link
                        to="/checklist"
                        className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                      >
                        {t('homepage.personaTabs.toolkitSecondary')}
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Link
                    to="/hiring"
                    className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    View Hiring Snapshot
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                  <Link
                    to="/projects"
                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                  >
                    View Case Studies
                    <ArrowRight size={20} />
                  </Link>
                </div>
              )}

              {/* Trust Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { value: t('homeHealthcare.hero.stats.migrations.value'), label: t('homeHealthcare.hero.stats.migrations.label'), icon: Shield },
                  { value: t('homeHealthcare.hero.stats.compliance.value'), label: t('homeHealthcare.hero.stats.compliance.label'), icon: CheckCircle2 },
                  { value: t('homeHealthcare.hero.stats.savings.value'), label: t('homeHealthcare.hero.stats.savings.label'), icon: TrendingDown },
                  { value: t('homeHealthcare.hero.stats.breaches.value'), label: t('homeHealthcare.hero.stats.breaches.label'), icon: Award }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Phase 3.1: Persona-Specific Content Block - Enhanced visibility */}
        {showPersonaTabs && selectedPersona && (
          <section id="persona-content" className="py-20 bg-gradient-to-br from-emerald-50 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-b border-emerald-200 dark:border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {selectedPersona === 'hire' && (
                <motion.div
                  key="hire-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      <Briefcase size={16} />
                      For Hiring Managers & Recruiters
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      {t('homepage.personaTabs.hiringTitle')}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      Ready to hire? Here's what you need to know about my background and availability.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="font-bold text-slate-900 dark:text-white mb-3">{t('homepage.personaTabs.hiringYears')}</div>
                      <div className="text-slate-600 dark:text-slate-300 text-lg">15+ years in enterprise architecture</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="font-bold text-slate-900 dark:text-white mb-3">{t('homepage.personaTabs.hiringIndustries')}</div>
                      <div className="text-slate-600 dark:text-slate-300">Healthcare, Pharma, eCommerce, Financial Services, Climate Tech</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="font-bold text-slate-900 dark:text-white mb-3">{t('homepage.personaTabs.hiringStrengths')}</div>
                      <div className="text-slate-600 dark:text-slate-300">Architecture validation, Cloud migration, AI enablement, Risk mitigation</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                      <div className="font-bold text-slate-900 dark:text-white mb-3">{t('homepage.personaTabs.hiringAvailability')}</div>
                      <div className="text-slate-600 dark:text-slate-300">{t('homepage.personaTabs.hiringBilingual')}</div>
                    </div>
                  </div>
                </motion.div>
              )}
              {selectedPersona === 'consult' && (
                <motion.div
                  key="consult-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      <User size={16} />
                      For Project Leaders & CTOs
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      {t('homepage.personaTabs.consultingTitle')}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      Need independent architecture expertise? Here's how I can help your project succeed.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Shield className="text-emerald-600 dark:text-emerald-400" size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-3">Architecture Review</h3>
                      <p className="text-slate-600 dark:text-slate-300">Independent validation of architecture decisions before commitment</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <TrendingDown className="text-emerald-600 dark:text-emerald-400" size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-3">Cloud Migration</h3>
                      <p className="text-slate-600 dark:text-slate-300">Risk reduction and cost optimization for cloud transformation</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm text-center">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-3">AI Enablement</h3>
                      <p className="text-slate-600 dark:text-slate-300">Strategic guidance for AI/ML adoption and integration</p>
                    </div>
                  </div>
                </motion.div>
              )}
              {selectedPersona === 'toolkit' && (
                <motion.div
                  key="toolkit-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-5xl mx-auto"
                >
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      <BookOpen size={16} />
                      For Architects & Engineers
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      {t('homepage.personaTabs.toolkitTitle')}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      Looking for practical tools? Access frameworks and templates from real enterprise projects.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <Link to="/checklist" className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Vendor Proposal Checklist</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">7-area framework for evaluating vendor proposals</p>
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        Try it free <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                    <Link to="/architecture-engine" className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="text-emerald-600 dark:text-emerald-400" size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Architecture Patterns</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">Reusable patterns for common transformation scenarios</p>
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        Explore tools <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                    <Link to="/risk-radar" className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="text-emerald-600 dark:text-emerald-400" size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Risk Assessment Tools</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">Templates and frameworks for risk identification</p>
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        Try it free <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* PROBLEM SECTION - The Pain */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                {t('homeHealthcare.problems.title')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                {t('homeHealthcare.problems.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  emoji: '😰',
                  title: t('homeHealthcare.problems.item1.title'),
                  problem: t('homeHealthcare.problems.item1.desc'),
                  impact: t('homeHealthcare.problems.item1.impact'),
                  color: 'from-red-500 to-orange-500'
                },
                {
                  emoji: '💸',
                  title: t('homeHealthcare.problems.item2.title'),
                  problem: t('homeHealthcare.problems.item2.desc'),
                  impact: t('homeHealthcare.problems.item2.impact'),
                  color: 'from-orange-500 to-yellow-500'
                },
                {
                  emoji: '⏰',
                  title: t('homeHealthcare.problems.item3.title'),
                  problem: t('homeHealthcare.problems.item3.desc'),
                  impact: t('homeHealthcare.problems.item3.impact'),
                  color: 'from-yellow-500 to-red-500'
                }
              ].map((pain, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-6xl mb-4">{pain.emoji}</div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    {pain.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {pain.problem}
                  </p>
                  <div className={`bg-gradient-to-r ${pain.color} p-4 rounded-lg`}>
                    <p className="text-white font-semibold">
                      {pain.impact}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {t('homeHealthcare.problems.solution')}
              </p>
              <ArrowRight className="mx-auto animate-bounce text-emerald-600" size={48} />
            </motion.div>
          </div>
        </section>

        {/* SOLUTION SECTION - The Process */}
        <section className="py-20 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                {t('homeHealthcare.process.title')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                {t('homeHealthcare.process.subtitle')}
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  phase: 'PHASE 1',
                  key: 'phase1',
                  color: 'emerald'
                },
                {
                  phase: 'PHASE 2',
                  key: 'phase2',
                  color: 'blue'
                },
                {
                  phase: 'PHASE 3',
                  key: 'phase3',
                  color: 'violet'
                },
                {
                  phase: 'PHASE 4',
                  key: 'phase4',
                  color: 'amber'
                }
              ].map((phase, idx) => {
                const activities = t(`homeHealthcare.process.${phase.key}.activities`, { returnObjects: true }) as string[];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    {/* Connecting Line */}
                    {idx < 3 && (
                      <div className="hidden md:block absolute left-12 top-full w-0.5 h-8 bg-slate-300 dark:bg-slate-600 z-0" />
                    )}

                    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Phase Label */}
                        <div className="flex-shrink-0">
                          <div className={`bg-${phase.color}-100 dark:bg-${phase.color}-900/30 text-${phase.color}-800 dark:text-${phase.color}-400 px-4 py-2 rounded-lg font-bold text-sm mb-2 inline-block`}>
                            {phase.phase}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {t(`homeHealthcare.process.${phase.key}.title`)}
                          </h3>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Clock size={16} />
                            <span className="font-semibold">{t(`homeHealthcare.process.${phase.key}.duration`)}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-grow space-y-4">
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t('homeHealthcare.process.labels.activities')}</h4>
                            <ul className="space-y-2">
                              {activities.map((activity, actIdx) => (
                                <li key={actIdx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                                  <CheckCircle2 className="flex-shrink-0 text-emerald-600 mt-0.5" size={16} />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                              <h5 className="font-bold text-sm text-slate-600 dark:text-slate-400 mb-1">{t('homeHealthcare.process.labels.deliverable')}</h5>
                              <p className="text-slate-900 dark:text-white">{t(`homeHealthcare.process.${phase.key}.deliverable`)}</p>
                            </div>
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                              <h5 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-1">{t('homeHealthcare.process.labels.outcome')}</h5>
                              <p className="text-slate-900 dark:text-white">{t(`homeHealthcare.process.${phase.key}.outcome`)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Final Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white text-center"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: t('homeHealthcare.hero.stats.migrations.value'), label: t('homeHealthcare.process.stats.migrations') },
                  { value: t('homeHealthcare.hero.stats.breaches.value'), label: t('homeHealthcare.process.stats.breaches') },
                  { value: '100%', label: t('homeHealthcare.process.stats.auditRate') },
                  { value: t('homeHealthcare.hero.stats.savings.value'), label: t('homeHealthcare.process.stats.savings') }
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-emerald-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ROI CALCULATOR SECTION */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                {t('homeHealthcare.roi.title')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                {t('homeHealthcare.roi.subtitle')}
              </p>
            </motion.div>

            <ROICalculator />
          </div>
        </section>

        {/* PROOF SECTION - Case Studies Preview */}
        <section className="py-20 bg-white dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                {t('homeHealthcare.proof.title')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                {t('homeHealthcare.proof.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  client: 'PwC Healthcare',
                  challenge: 'Legacy e-commerce & healthcare systems modernization',
                  result: '$500K annual savings',
                  metric: '70% traffic increase',
                  compliance: 'HIPAA/FHIR/PCI',
                  link: '/projects#pwc-healthcare'
                },
                {
                  client: 'Boehringer Ingelheim',
                  challenge: 'Enterprise AI/ML Data Lake implementation',
                  result: '€500K cloud migration',
                  metric: '50% faster insights',
                  compliance: 'GDPR/Pharma',
                  link: '/projects#boehringer-aiml'
                },
                {
                  client: 'Delivery Hero',
                  challenge: 'High-scale display ads platform (5M+ daily)',
                  result: '20% revenue increase',
                  metric: '99.99% SLA',
                  compliance: 'GDPR',
                  link: '/projects#delivery-hero'
                }
              ].map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {project.client}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="text-emerald-600" size={20} />
                      <span className="font-bold text-slate-900 dark:text-white">{project.result}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="text-blue-600" size={20} />
                      <span className="font-bold text-slate-900 dark:text-white">{project.metric}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="text-violet-600" size={20} />
                      <span className="text-sm text-slate-600 dark:text-slate-400">{project.compliance}</span>
                    </div>
                  </div>

                  <Link
                    to={project.link}
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all"
                  >
                    {t('homeHealthcare.proof.cta')}
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                {t('homeHealthcare.proof.seeAll')}
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION - Objection Handling */}
        <section className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                {t('homeHealthcare.faq.title')}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                {t('homeHealthcare.faq.subtitle')}
              </p>
            </motion.div>

            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-start gap-3">
                    <AlertCircle className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
                    {t(`homeHealthcare.faq.q${idx}.q`)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                    {t(`homeHealthcare.faq.q${idx}.a`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-20 bg-gradient-to-br from-emerald-600 via-blue-600 to-violet-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('homeHealthcare.finalCta.title')}
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                {t('homeHealthcare.finalCta.subtitle')}
              </p>

              {/* Two Path Choice */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Path A: Urgent */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30 hover:border-white transition-all duration-300">
                  <div className="text-3xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold mb-4">{t('homeHealthcare.finalCta.urgent.title')}</h3>
                  <p className="text-white/80 mb-6">
                    {t('homeHealthcare.finalCta.urgent.desc')}
                  </p>
                  <a
                    href="https://calendly.com/prasad-sgsits/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-white text-emerald-600 px-6 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300"
                  >
                    {t('homeHealthcare.finalCta.urgent.cta')}
                  </a>
                  <p className="text-sm text-white/60 mt-3">
                    {t('homeHealthcare.finalCta.urgent.note')}
                  </p>
                </div>

                {/* Path B: Research */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30 hover:border-white transition-all duration-300">
                  <div className="text-3xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold mb-4">{t('homeHealthcare.finalCta.research.title')}</h3>
                  <p className="text-white/80 mb-6">
                    {t('homeHealthcare.finalCta.research.desc')}
                  </p>
                  <Link
                    to="/contact?resource=hipaa-checklist"
                    className="block w-full bg-white/20 text-white border-2 border-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300"
                  >
                    {t('homeHealthcare.finalCta.research.cta')}
                  </Link>
                  <p className="text-sm text-white/60 mt-3">
                    {t('homeHealthcare.finalCta.research.note')}
                  </p>
                </div>
              </div>

              {/* Risk Reversal */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h4 className="font-bold text-lg mb-2">Not sure if I'm the right fit?</h4>
                <p className="text-white/90">
                  <CheckCircle2 className="inline mr-2" size={20} />
                  {t('homeHealthcare.finalCta.riskReversal.free')}
                </p>
                <p className="text-white/90 mt-2">
                  <CheckCircle2 className="inline mr-2" size={20} />
                  {t('homeHealthcare.finalCta.riskReversal.referral')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* ROI Calculator Modal */}
      {showROICalculator && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t('roiCalculator.cta.calculate')}
              </h3>
              <button
                onClick={() => setShowROICalculator(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <span className="text-3xl">&times;</span>
              </button>
            </div>
            <div className="p-6">
              <ROICalculator />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
