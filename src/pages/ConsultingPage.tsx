// src/pages/ConsultingPage.tsx
// Consulting-focused landing route for Phase 3.2

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';
import { trackEvent } from '../services/analytics';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

const ConsultingPage: React.FC = () => {
    const { t } = useTranslation();

    useEffect(() => {
        // Track page view with attribution
        trackEvent('page_view', {
            page: '/consulting',
            persona: 'consult',
            ctaSource: 'landing',
        });
    }, []);

    // Get top 3 case studies with credibility layer
    const topCaseStudies = projects
        .filter(p => p.outcomes?.hero_metric)
        .slice(0, 3);

    return (
        <>
            <SEO
                title={t('consultingPage.seo.title', { defaultValue: 'Consulting Services | Prasad Tilloo' })}
                description={t('consultingPage.seo.description', { defaultValue: 'Independent architecture & transformation advisory. Validate decisions before committing budget.' })}
                canonical={`${import.meta.env.VITE_SITE_URL || 'https://prasadtilloo.com'}/consulting`}
                ogImage="/og/consulting.png"
            />
            <PageShell background="muted" containerMaxWidth="7xl" className="pt-24">
                <PageHeader
                    title={t('consultingPage.hero.title', { defaultValue: 'Consulting Services' })}
                    subtitle={t('consultingPage.hero.subtitle', { defaultValue: 'Independent validation of architecture, modernization, cloud migration, and AI enablement decisions.' })}
                />

                <Container maxWidth="7xl">
                    {/* Outcomes Metrics */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
                                <TrendingUp className="text-emerald-600 dark:text-emerald-400 mx-auto mb-4" size={32} />
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {t('consultingPage.metrics.savings', { defaultValue: '€2M+' })}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {t('consultingPage.metrics.savingsDesc', { defaultValue: 'Cost Savings Delivered' })}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
                                <Shield className="text-emerald-600 dark:text-emerald-400 mx-auto mb-4" size={32} />
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {t('consultingPage.metrics.compliance', { defaultValue: '100%' })}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {t('consultingPage.metrics.complianceDesc', { defaultValue: 'Compliance Rate' })}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center">
                                <Calendar className="text-emerald-600 dark:text-emerald-400 mx-auto mb-4" size={32} />
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {t('consultingPage.metrics.projects', { defaultValue: '50+' })}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {t('consultingPage.metrics.projectsDesc', { defaultValue: 'Projects Delivered' })}
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Top Case Studies */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                            {t('consultingPage.caseStudies.title', { defaultValue: 'Proven Outcomes' })}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {topCaseStudies.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </motion.section>

                    {/* Consultation CTA */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-8 text-center"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            {t('consultingPage.cta.title', { defaultValue: 'Ready to Validate Your Architecture?' })}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {t('consultingPage.cta.subtitle', { defaultValue: 'Book a free discovery call to discuss your specific challenge.' })}
                        </p>
                        <a
                            href="https://calendly.com/prasad-sgsits/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('cta_click', { source: 'consulting_page', type: 'book_call' })}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                        >
                            <Calendar size={20} />
                            {t('consultingPage.cta.button', { defaultValue: 'Book Discovery Call' })}
                            <ArrowRight size={20} />
                        </a>
                    </motion.section>
                </Container>
            </PageShell>
        </>
    );
};

export default ConsultingPage;
