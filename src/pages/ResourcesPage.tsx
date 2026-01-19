// src/pages/ResourcesPage.tsx
// Resources/toolkit-focused landing route for Phase 3.2

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Download, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
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
            description: t('resourcesPage.resources.checklist.desc', { defaultValue: 'AI-powered checklist to evaluate vendor proposals' }),
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
    ];

    return (
        <>
            <SEO
                title={t('resourcesPage.seo.title', { defaultValue: 'Resources & Toolkits | Prasad Tilloo' })}
                description={t('resourcesPage.seo.description', { defaultValue: 'Free resources and toolkits for enterprise architects and engineering leaders.' })}
                canonical={`${import.meta.env.VITE_SITE_URL || 'https://prasadtilloo.com'}/resources`}
                ogImage="/og/resources.png"
            />
            <PageShell background="muted" containerMaxWidth="7xl" className="pt-24">
                <PageHeader
                    title={t('resourcesPage.hero.title', { defaultValue: 'Resources & Toolkits' })}
                    subtitle={t('resourcesPage.hero.subtitle', { defaultValue: 'Free tools and resources to help you make better architecture decisions.' })}
                />

                <Container maxWidth="7xl">
                    {/* Free Resources */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                            {t('resourcesPage.resources.title', { defaultValue: 'Free Resources' })}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {freeResources.map((resource, idx) => {
                                const Icon = resource.icon;
                                return (
                                    <Link
                                        key={idx}
                                        to={resource.link}
                                        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                                <Icon className="text-emerald-600 dark:text-emerald-400" size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {resource.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                                                    {resource.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                                                    {t('resourcesPage.resources.try', { defaultValue: 'Try it' })}
                                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Toolkits Section (if promoted) */}
                    {isPromoted('TOOLKIT_LIBRARY') && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                                {t('resourcesPage.toolkits.title', { defaultValue: 'Toolkit Library' })}
                            </h2>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    {t('resourcesPage.toolkits.description', { defaultValue: 'Comprehensive toolkits for enterprise architecture, cloud migration, and AI enablement.' })}
                                </p>
                                <Link
                                    to="/services"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                                >
                                    {t('resourcesPage.toolkits.cta', { defaultValue: 'Browse Toolkits' })}
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </motion.section>
                    )}

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
