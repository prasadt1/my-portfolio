import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ArrowRight, FileSearch, Cloud, Layout } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { PageShell, PageHeader, Container } from '../components/layout';

const services = [
  {
    id: 'due-diligence',
    icon: FileSearch,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    gradient: 'from-blue-500 to-blue-600',
    titleKey: 'services.dueDiligence.title',
    subtitleKey: 'services.dueDiligence.subtitle',
    timelineKey: 'services.dueDiligence.timeline',
    priceKey: 'services.dueDiligence.price',
    forKey: 'services.dueDiligence.for',
    deliverablesKey: 'services.dueDiligence.deliverables'
  },
  {
    id: 'cloud-migration',
    icon: Cloud,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    gradient: 'from-emerald-500 to-emerald-600',
    titleKey: 'services.cloudMigration.title',
    subtitleKey: 'services.cloudMigration.subtitle',
    timelineKey: 'services.cloudMigration.timeline',
    priceKey: 'services.cloudMigration.price',
    forKey: 'services.cloudMigration.for',
    deliverablesKey: 'services.cloudMigration.deliverables'
  },
  {
    id: 'platform-evaluation',
    icon: Layout,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    gradient: 'from-purple-500 to-purple-600',
    titleKey: 'services.platformEvaluation.title',
    subtitleKey: 'services.platformEvaluation.subtitle',
    timelineKey: 'services.platformEvaluation.timeline',
    priceKey: 'services.platformEvaluation.price',
    forKey: 'services.platformEvaluation.for',
    deliverablesKey: 'services.platformEvaluation.deliverables'
  }
];

const ServicesPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title="Architecture Assessment Services | Prasad Tilloo"
                description="Independent architecture assessments for EU mid-market companies. Technical due diligence, cloud migration readiness, and platform evaluation."
            />
            <PageShell background="muted" containerMaxWidth="7xl" className="pt-24">
                <PageHeader
                    title={t('services.title')}
                    subtitle={t('services.subtitle')}
                />

                <Container maxWidth="7xl">
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {services.map((service, idx) => {
                            const Icon = service.icon;
                            const deliverables = t(service.deliverablesKey, { returnObjects: true }) as string[];

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden group hover:shadow-2xl transition-all duration-300"
                                >
                                    {/* Gradient Background Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${service.iconBg} transition-transform group-hover:scale-110 duration-300`}>
                                            <Icon className={service.iconColor} size={32} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                            {t(service.titleKey)}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                                            {t(service.subtitleKey)}
                                        </p>

                                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mb-6 space-y-4">
                                            <div>
                                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                                                    Timeline
                                                </div>
                                                <div className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {t(service.timelineKey)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                                                    Price
                                                </div>
                                                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                                    {t(service.priceKey)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                                    For
                                                </div>
                                                <div className="text-sm text-slate-700 dark:text-slate-300">
                                                    {t(service.forKey)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                                Deliverables
                                            </div>
                                            <ul className="space-y-2">
                                                {Array.isArray(deliverables) && deliverables.map((deliverable, dIdx) => (
                                                    <li key={dIdx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                        <CheckCircle2 className={`flex-shrink-0 mt-0.5 ${service.iconColor}`} size={16} />
                                                        <span>{deliverable}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link
                                            to="/contact"
                                            className={`w-full text-center bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1`}
                                        >
                                            {t('services.bookCall')}
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-12 text-center"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            Book a discovery call to discuss your architecture challenges.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-1"
                        >
                            {t('services.bookCall')}
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </Container>
            </PageShell>
        </>
    );
};

export default ServicesPage;
