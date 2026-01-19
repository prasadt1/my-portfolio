import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, Linkedin, Mail, Briefcase, Code, Target, Globe } from 'lucide-react';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';

const HiringPage: React.FC = () => {
    const { t } = useTranslation();

    const roles = t('hiringPage.roles.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;
    const whatIBring = t('hiringPage.whatIBring.items', { returnObjects: true }) as Array<{ title: string; desc: string }>;

    return (
        <>
            <SEO
                title="For Recruiters | Prasad Tilloo"
                description="Open to senior engineering leadership, architecture, and transformation roles. 15+ years experience with Fortune 100 clients."
            />
            <PageShell background="muted" containerMaxWidth="6xl" className="pt-24">
                <PageHeader
                    title={t('hiringPage.hero.title')}
                    subtitle={t('hiringPage.hero.subtitle')}
                />

                <Container maxWidth="6xl">
                    {/* Availability Note */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6 mb-12 text-center"
                    >
                        <p className="text-emerald-900 dark:text-emerald-300 font-medium">
                            {t('hiringPage.hero.note')}
                        </p>
                    </motion.div>

                    {/* Roles Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                            {t('hiringPage.roles.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {roles.map((role, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <Briefcase className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                                {role.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {role.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* What I Bring Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                            {t('hiringPage.whatIBring.title')}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {whatIBring.map((item, idx) => {
                                const icons = [Code, Target, Briefcase, Globe];
                                const Icon = icons[idx] || Code;
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                                <Icon className="text-emerald-600 dark:text-emerald-400" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-slate-600 dark:text-slate-400">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.section>

                    {/* Resume & Links Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                            {t('hiringPage.resume.title')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <a
                                href="/resume.pdf"
                                download
                                className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
                            >
                                <Download className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" size={24} />
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {t('hiringPage.resume.download')}
                                </span>
                            </a>
                            <a
                                href="https://linkedin.com/in/prasadtilloo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
                            >
                                <Linkedin className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" size={24} />
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {t('hiringPage.resume.linkedin')}
                                </span>
                            </a>
                            <a
                                href={`mailto:${t('hiringPage.resume.emailAddress')}`}
                                className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
                            >
                                <Mail className="text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" size={24} />
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    {t('hiringPage.resume.email')}
                                </span>
                            </a>
                        </div>
                    </motion.section>

                    {/* CTA Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-12 text-center"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {t('hiringPage.cta.title')}
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            {t('hiringPage.cta.subtitle')}
                        </p>
                        <a
                            href={`mailto:${t('hiringPage.resume.emailAddress')}?subject=Senior Role Opportunity`}
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-1"
                        >
                            <Mail size={20} />
                            {t('hiringPage.cta.button')}
                        </a>
                    </motion.section>
                </Container>
            </PageShell>
        </>
    );
};

export default HiringPage;
