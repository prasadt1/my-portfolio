// src/pages/CompetitionPage.tsx
// Phase 3.4A: Competition walkthrough page

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
    ArrowRight, 
    FileText, 
    Sparkles, 
    Shield, 
    BarChart3, 
    Mail,
    CheckCircle2,
    ExternalLink
} from 'lucide-react';
import SEO from '../components/SEO';
import { trackEvent } from '../services/analytics';
import { isCompetitionMode } from '../config/competition';
import { isPromoted } from '../config/featureUtils';

const CompetitionPage: React.FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        trackEvent('competition_page_viewed');
    }, []);

    // Redirect if competition mode is off
    if (!isCompetitionMode()) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
                    <p className="text-slate-600 dark:text-slate-400">Page not found</p>
                </div>
            </div>
        );
    }

    const heroCaseStudies = [
        { slug: 'brita-ecommerce', name: 'BRITA eCommerce' },
        { slug: 'delivery-hero-ads', name: 'Delivery Hero Ads Platform' },
        { slug: 'insurance-performance', name: 'Insurance Performance' },
        { slug: 'pact-pcf-data-exchange-network', name: 'SINE Climate Tech' },
        { slug: 'photography-coach-ai', name: 'AI Photography Coach' },
    ];

    return (
        <>
            <SEO
                title={t('competition.page.title', { defaultValue: 'Competition Submission | Prasad Tilloo' })}
                description={t('competition.page.description', { defaultValue: 'Google AI Portfolio Challenge submission walkthrough' })}
            />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1 rounded-full mb-4">
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                                {t('competition.page.badge', { defaultValue: 'Google AI Portfolio Challenge' })}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            {t('competition.page.title', { defaultValue: 'Competition Submission' })}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            {t('competition.page.subtitle', { defaultValue: 'A production-ready portfolio demonstrating enterprise architecture expertise, AI integration with Gemini, and Cloud Run deployment.' })}
                        </p>
                    </motion.div>

                    {/* Phase 4 F2: Start Here Panel - Checklist for Judges */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="bg-gradient-to-br from-emerald-50 to-slate-50 dark:from-emerald-900/20 dark:to-slate-800 rounded-xl p-6 md:p-8 border-2 border-emerald-200 dark:border-emerald-800 mb-8"
                    >
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={20} />
                            {t('competition.page.startHere.title', { defaultValue: 'Start Here - Quick Checklist' })}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-3 mb-4">
                            <Link
                                to="/checklist"
                                onClick={() => trackEvent('competition_cta_clicked', { cta: 'try_checklist' })}
                                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span>{t('competition.page.startHere.item1', { defaultValue: 'Try AI Checklist' })}</span>
                            </Link>
                            <Link
                                to="/architecture-engine"
                                onClick={() => trackEvent('competition_cta_clicked', { cta: 'try_arch_engine' })}
                                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span>{t('competition.page.startHere.item2', { defaultValue: 'Try Architecture Assistant' })}</span>
                            </Link>
                            <Link
                                to="/projects"
                                onClick={() => trackEvent('competition_cta_clicked', { cta: 'view_case_studies' })}
                                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span>{t('competition.page.startHere.item3', { defaultValue: 'View Hero Case Studies' })}</span>
                            </Link>
                            <Link
                                to="/projects/brita-ecommerce#artifacts"
                                onClick={() => trackEvent('competition_cta_clicked', { cta: 'see_artifacts' })}
                                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                            >
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span>{t('competition.page.startHere.item4', { defaultValue: 'See Artifacts Gating + Request' })}</span>
                            </Link>
                        </div>
                    </motion.section>

                    {/* Phase 4 F1: 2-Column Grid Layout on Desktop */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* What This Site Is */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                <FileText className="text-emerald-600 dark:text-emerald-400" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {t('competition.page.whatIs.title', { defaultValue: 'What This Site Is' })}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {t('competition.page.whatIs.description', { defaultValue: 'An independent architecture consultant portfolio built with React + TypeScript, featuring AI-powered tools (Gemini 3 Pro), feature flags for phased rollout, GDPR-safe analytics, and production deployment on Google Cloud Run. The site demonstrates real-world enterprise architecture expertise through detailed case studies.' })}
                                </p>
                            </div>
                        </div>
                    </motion.section>

                        {/* AI Features */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                        >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {t('competition.page.aiFeatures.title', { defaultValue: 'AI Features' })}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                                    {t('competition.page.aiFeatures.description', { defaultValue: 'This portfolio integrates Google Gemini 3 Pro for:' })}
                                </p>
                                <ul className="space-y-2 mb-4">
                                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                        <span>{t('competition.page.aiFeatures.feature1', { defaultValue: 'Vendor Proposal Review Checklist generation' })}</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                        <span>{t('competition.page.aiFeatures.feature2', { defaultValue: 'Architecture decision recommendations' })}</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                        <span>{t('competition.page.aiFeatures.feature3', { defaultValue: 'Risk assessment and mitigation planning' })}</span>
                                    </li>
                                </ul>
                                <div className="flex flex-wrap gap-3">
                                    {isPromoted('AI_CHECKLIST') && (
                                        <Link
                                            to="/checklist"
                                            onClick={() => trackEvent('competition_cta_clicked', { cta: 'checklist' })}
                                            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                        >
                                            {t('competition.page.aiFeatures.tryChecklist', { defaultValue: 'Try Checklist' })}
                                            <ArrowRight size={14} />
                                        </Link>
                                    )}
                                    {isPromoted('AI_ARCH_ENGINE') && (
                                        <Link
                                            to="/architecture-engine"
                                            onClick={() => trackEvent('competition_cta_clicked', { cta: 'arch_engine' })}
                                            className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                                        >
                                            {t('competition.page.aiFeatures.tryArchEngine', { defaultValue: 'Try Architecture Engine' })}
                                            <ArrowRight size={14} />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Evidence System */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                <Shield className="text-amber-600 dark:text-amber-400" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {t('competition.page.evidence.title', { defaultValue: 'Evidence System' })}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                                    {t('competition.page.evidence.description', { defaultValue: 'Each hero case study includes:' })}
                                </p>
                                <ul className="space-y-2 mb-3">
                                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                        <span>{t('competition.page.evidence.item1', { defaultValue: 'Trust Layer: My role, scope owned, team collaboration, NDA disclaimers' })}</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                        <span>{t('competition.page.evidence.item2', { defaultValue: 'Artifact Previews: 6+ artifacts per case study (ADRs, diagrams, roadmaps)' })}</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                                        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={18} />
                                        <span>{t('competition.page.evidence.item3', { defaultValue: 'Credibility Signals: Duration, team size, region, engagement type' })}</span>
                                    </li>
                                </ul>
                                <Link
                                    to="/projects"
                                    onClick={() => trackEvent('competition_cta_clicked', { cta: 'case_studies' })}
                                    className="inline-flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium"
                                >
                                    {t('competition.page.evidence.viewCaseStudies', { defaultValue: 'View Hero Case Studies' })}
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* Metrics Dashboard */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                <BarChart3 className="text-purple-600 dark:text-purple-400" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {t('competition.page.metrics.title', { defaultValue: 'Metrics Dashboard' })}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                                    {t('competition.page.metrics.description', { defaultValue: 'Impact metrics displayed on homepage: cost saved, projects delivered, compliance rate, data breaches prevented.' })}
                                </p>
                                <Link
                                    to="/#impact-dashboard"
                                    onClick={() => {
                                        trackEvent('competition_cta_clicked', { cta: 'metrics' });
                                        // Smooth scroll to dashboard section after navigation
                                        setTimeout(() => {
                                            const element = document.getElementById('impact-dashboard');
                                            if (element) {
                                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }
                                        }, 100);
                                    }}
                                    className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                                >
                                    {t('competition.page.metrics.viewDashboard', { defaultValue: 'View Dashboard' })}
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </motion.section>

                    {/* Lead Capture Demo */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                                <Mail className="text-teal-600 dark:text-teal-400" size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {t('competition.page.leadCapture.title', { defaultValue: 'Lead Capture Demo' })}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                                    {t('competition.page.leadCapture.description', { defaultValue: 'GDPR-safe lead capture with email delivery and Google Sheets storage. Includes attribution tracking (UTM params, referrer, landing path) without PII in analytics.' })}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        to="/checklist"
                                        onClick={() => trackEvent('competition_cta_clicked', { cta: 'lead_capture' })}
                                        className="inline-flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium"
                                    >
                                        {t('competition.page.leadCapture.tryChecklist', { defaultValue: 'Try Checklist Download' })}
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                    </div>

                    {/* Quick Links */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-br from-emerald-50 to-slate-50 dark:from-emerald-900/20 dark:to-slate-800 rounded-xl p-8 border border-emerald-200 dark:border-emerald-800"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            {t('competition.page.quickLinks.title', { defaultValue: 'Quick Links' })}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
                            >
                                <FileText className="text-emerald-600 dark:text-emerald-400" size={20} />
                                <div>
                                    <div className="font-semibold text-slate-900 dark:text-white">
                                        {t('competition.page.quickLinks.homepage', { defaultValue: 'Homepage' })}
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">
                                        {t('competition.page.quickLinks.homepageDesc', { defaultValue: 'Start here' })}
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to="/projects"
                                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
                            >
                                <FileText className="text-emerald-600 dark:text-emerald-400" size={20} />
                                <div>
                                    <div className="font-semibold text-slate-900 dark:text-white">
                                        {t('competition.page.quickLinks.caseStudies', { defaultValue: 'Case Studies' })}
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">
                                        {t('competition.page.quickLinks.caseStudiesDesc', { defaultValue: '5 hero case studies' })}
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to="/checklist"
                                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
                            >
                                <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
                                <div>
                                    <div className="font-semibold text-slate-900 dark:text-white">
                                        {t('competition.page.quickLinks.checklist', { defaultValue: 'AI Checklist' })}
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">
                                        {t('competition.page.quickLinks.checklistDesc', { defaultValue: 'Try AI tool' })}
                                    </div>
                                </div>
                            </Link>
                            <a
                                href="https://github.com/prasadt1/my-portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
                            >
                                <ExternalLink className="text-slate-600 dark:text-slate-400" size={20} />
                                <div>
                                    <div className="font-semibold text-slate-900 dark:text-white">
                                        {t('competition.page.quickLinks.github', { defaultValue: 'GitHub Repo' })}
                                    </div>
                                    <div className="text-xs text-slate-600 dark:text-slate-400">
                                        {t('competition.page.quickLinks.githubDesc', { defaultValue: 'View source code' })}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </motion.section>
                </div>
            </div>
        </>
    );
};

export default CompetitionPage;
