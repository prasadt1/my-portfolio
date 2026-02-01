// src/pages/ResourcesPage.tsx
// Resources/toolkit-focused landing route for Phase 3.2

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Download, BookOpen, ArrowRight, CheckCircle2, Search } from 'lucide-react';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';
import { trackEvent } from '../services/analytics';
import { isPromoted } from '../config/featureUtils';

const ResourcesPage: React.FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Track page view with attribution
        trackEvent('page_view', {
            page: '/resources',
            persona: 'toolkit',
            ctaSource: 'landing',
        });
    }, []);

    const freeResources = [
        {
            title: t('resourcesPage.resources.checklist.title', { defaultValue: 'Vendor Proposal Checklist' }),
            description: t('resourcesPage.resources.checklist.desc', { defaultValue: 'Experience-driven checklist to evaluate vendor proposals' }),
            link: '/checklist',
            icon: CheckCircle2,
            promoted: isPromoted('AI_CHECKLIST'),
        },
        {
            title: t('resourcesPage.resources.architecture.title', { defaultValue: 'Architecture Engine' }),
            description: t('resourcesPage.resources.architecture.desc', { defaultValue: 'Generate architecture diagrams and documentation' }),
            link: '/architecture-engine',
            icon: BookOpen,
            promoted: isPromoted('AI_ARCH_ENGINE'),
        },
        {
            title: t('resourcesPage.resources.riskRadar.title', { defaultValue: 'Risk Radar' }),
            description: t('resourcesPage.resources.riskRadar.desc', { defaultValue: 'Identify and mitigate project risks' }),
            link: '/risk-radar',
            icon: FileText,
            promoted: isPromoted('AI_RISK_RADAR'),
        },
        {
            title: t('tools.projectSimilarity.heroTitle', { defaultValue: 'Project Similarity Matcher' }),
            description: t('tools.projectSimilarity.heroSubhead', { defaultValue: 'Find similar projects from 15+ years of experience' }),
            link: '/tools/project-similarity',
            icon: Search,
            promoted: isPromoted('PROJECT_SIMILARITY_MATCHER'),
        },
    ].filter(r => r.promoted);

    return (
        <>
            <SEO
                title={t('resourcesPage.seo.title', { defaultValue: 'Resources & Toolkits | Prasad Tilloo' })}
                description={t('resourcesPage.seo.description', { defaultValue: 'Free resources and toolkits for enterprise architects and engineering leaders.' })}
                canonical={`${import.meta.env.VITE_SITE_URL || 'https://prasadtilloo.com'}/resources`}
                ogImage="/og/resources.png"
            />
            <PageShell background="muted" containerMaxWidth="7xl" className="pt-24">
                {/* Phase 4 Wireframe: HERO */}
                <PageHeader
                    title={t('resourcesPage.hero.title', { defaultValue: 'Toolkits & Resources' })}
                    subtitle={t('resourcesPage.hero.subtitle', { defaultValue: 'Reusable frameworks from real delivery.' })}
                />

                <Container maxWidth="7xl">
                    {/* Phase 4 Wireframe: GRID OF TOOLKITS - Organized by tiers: Free | Pro (email required) | Premium (call required) */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        {/* Phase 4 Wireframe: Free Tier */}
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {t('resourcesPage.tiers.free.title', { defaultValue: 'Free' })}
                                </h2>
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    {t('resourcesPage.tiers.free.subtitle', { defaultValue: 'No signup required' })}
                                </span>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {freeResources.map((resource, idx) => {
                                    const Icon = resource.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <Link
                                                to={resource.link}
                                                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm hover:shadow-md group block h-full"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="text-emerald-600 dark:text-emerald-400" size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                            {resource.title}
                                                        </h3>
                                                        {/* Phase 4 Wireframe: Outcome label */}
                                                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                                                            {t('resourcesPage.outcome.free', { defaultValue: 'Free Tool' })}
                                                        </p>
                                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                                                            {resource.description}
                                                        </p>
                                                        {/* Phase 4 Wireframe: CTA */}
                                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                                            {t('resourcesPage.resources.try', { defaultValue: 'Try it' })}
                                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* FINAL SUBMISSION: Experimental AI — Coming Soon */}
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Experimental AI — Coming Soon
                                </h2>
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Experience-driven
                                </span>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* Chat Assistant */}
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 opacity-60">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                            <BookOpen className="text-slate-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                                Chat Assistant
                                            </h3>
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                                Coming Soon
                                            </p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                                Based on real delivery patterns, not generic AI responses
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Risk Radar */}
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 opacity-60">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                            <FileText className="text-slate-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                                Risk Radar
                                            </h3>
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                                Coming Soon
                                            </p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                                Experience-driven risk assessment from 15+ years of delivery
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Architecture Assessment */}
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 opacity-60">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="text-slate-400" size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                                Architecture Assessment
                                            </h3>
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                                Coming Soon
                                            </p>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                                Based on real delivery patterns from enterprise transformations
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phase 4 Wireframe: Pro Tier (email required) */}
                        {isPromoted('TOOLKIT_LIBRARY') && (
                            <div className="mb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {t('resourcesPage.tiers.pro.title', { defaultValue: 'Pro' })}
                                    </h2>
                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t('resourcesPage.tiers.pro.subtitle', { defaultValue: 'Email required' })}
                                    </span>
                                </div>
                                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* Placeholder for Pro toolkits - can be populated from data later */}
                                        <div className="text-center p-8 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                                            <FileText className="text-slate-400 mx-auto mb-3" size={32} />
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {t('resourcesPage.tiers.pro.comingSoon', { defaultValue: 'Pro toolkits coming soon' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Phase 4 Wireframe: Premium Tier (call required) */}
                        {isPromoted('TOOLKIT_LIBRARY') && (
                            <div className="mb-12">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {t('resourcesPage.tiers.premium.title', { defaultValue: 'Premium' })}
                                    </h2>
                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t('resourcesPage.tiers.premium.subtitle', { defaultValue: 'Call required' })}
                                    </span>
                                </div>
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* Placeholder for Premium toolkits - can be populated from data later */}
                                        <div className="text-center p-8 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800">
                                            <BookOpen className="text-slate-400 mx-auto mb-3" size={32} />
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                                                {t('resourcesPage.tiers.premium.comingSoon', { defaultValue: 'Premium toolkits available on request' })}
                                            </p>
                                            <Link
                                                to="/contact"
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                                            >
                                                {t('resourcesPage.tiers.premium.cta', { defaultValue: 'Request Access' })}
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.section>

                    {/* CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-8 text-center"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            {t('resourcesPage.cta.title', { defaultValue: 'Need More Help?' })}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {t('resourcesPage.cta.subtitle', { defaultValue: 'Book a consultation to discuss your specific challenges.' })}
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                        >
                            {t('resourcesPage.cta.button', { defaultValue: 'Get in Touch' })}
                            <ArrowRight size={20} />
                        </Link>
                    </motion.section>
                </Container>
            </PageShell>
        </>
    );
};

export default ResourcesPage;
