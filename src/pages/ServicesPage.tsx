import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ArrowRight, Layers, Users, Cpu, FileSearch, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { PageShell, PageHeader, Container } from '../components/layout';
import IndependentAdvisorySection from '../components/sections/IndependentAdvisorySection';

const services = [
  {
    id: 'architecture-review',
    icon: FileSearch,
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-100 dark:bg-slate-800',
    gradient: 'from-slate-500 to-slate-600',
    titleKey: 'services.architectureReview.title',
    subtitleKey: 'services.architectureReview.subtitle',
    timelineKey: 'services.architectureReview.timeline',
    priceKey: 'services.architectureReview.price',
    forKey: 'services.architectureReview.for',
    deliverablesKey: 'services.architectureReview.deliverables',
    notIncludedKey: 'services.architectureReview.notIncluded'
  },
  {
    id: 'blueprint-sprint',
    icon: Layers,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    gradient: 'from-blue-500 to-blue-600',
    titleKey: 'services.blueprintSprint.title',
    subtitleKey: 'services.blueprintSprint.subtitle',
    timelineKey: 'services.blueprintSprint.timeline',
    priceKey: 'services.blueprintSprint.price',
    forKey: 'services.blueprintSprint.for',
    deliverablesKey: 'services.blueprintSprint.deliverables',
    notIncludedKey: 'services.blueprintSprint.notIncluded'
  },
  {
    id: 'fractional-lead',
    icon: Users,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    gradient: 'from-emerald-500 to-emerald-600',
    titleKey: 'services.fractionalLead.title',
    subtitleKey: 'services.fractionalLead.subtitle',
    timelineKey: 'services.fractionalLead.timeline',
    priceKey: 'services.fractionalLead.price',
    forKey: 'services.fractionalLead.for',
    deliverablesKey: 'services.fractionalLead.deliverables',
    notIncludedKey: 'services.fractionalLead.notIncluded'
  },
  {
    id: 'ai-discovery',
    icon: Cpu,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    gradient: 'from-purple-500 to-purple-600',
    titleKey: 'services.aiDiscovery.title',
    subtitleKey: 'services.aiDiscovery.subtitle',
    timelineKey: 'services.aiDiscovery.timeline',
    priceKey: 'services.aiDiscovery.price',
    forKey: 'services.aiDiscovery.for',
    deliverablesKey: 'services.aiDiscovery.deliverables',
    notIncludedKey: 'services.aiDiscovery.notIncluded'
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
                    title={t('servicesPage.title')}
                    subtitle={t('servicesPage.subtitle')}
                />

                <Container maxWidth="7xl">
                    {/* Differentiator Sentence */}
                    <div className="text-center mb-12">
                        <p className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 font-medium max-w-2xl mx-auto">
                            {t('servicesPage.differentiator')}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {services.map((service, idx) => {
                            const Icon = service.icon;
                            const deliverables = t(service.deliverablesKey, { returnObjects: true }) as string[];
                            const isBlueprintSprint = service.id === 'blueprint-sprint';

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl flex flex-col overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                                        isBlueprintSprint 
                                            ? 'border-4 border-emerald-500 dark:border-emerald-400 scale-105' 
                                            : 'border border-slate-200 dark:border-slate-700'
                                    }`}
                                >
                                    {/* Gradient Background Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />

                                    {/* Most Popular Badge - Floating Above */}
                                    {isBlueprintSprint && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg z-20">
                                            ⭐ {t('services.mostPopular', { defaultValue: 'MOST POPULAR' })}
                                        </div>
                                    )}

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
                                                    {t('servicesPage.timeline')}
                                                </div>
                                                <div className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {t(service.timelineKey)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                                                    {t('servicesPage.price')}
                                                </div>
                                                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                                    {t(service.priceKey)}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                                    {t('servicesPage.for')}
                                                </div>
                                                <div className="text-sm text-slate-700 dark:text-slate-300">
                                                    {t(service.forKey)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                                {t('servicesPage.deliverables')}
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

                                        {/* Money-Back Guarantee for Architecture Review */}
                                        {service.id === 'architecture-review' && (
                                            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <Shield className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" size={24} />
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                                                            {t('services.guarantee.title', { defaultValue: 'Money-Back Guarantee' })}
                                                        </h4>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                                            {t('services.guarantee.description', { defaultValue: 'If my review doesn\'t identify at least one significant improvement opportunity, I refund the full fee.' })}
                                                            <br />
                                                            <span className="font-semibold">
                                                                {t('services.guarantee.noQuestions', { defaultValue: 'No questions asked.' })}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                            <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                                                {t(service.notIncludedKey)}
                                            </p>
                                        </div>

                                        <Link
                                            to="/contact"
                                            className={`w-full text-center bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1`}
                                        >
                                            {t('servicesPage.bookCall')}
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Proof Cards Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                {t('proof.title', { defaultValue: 'Real Results' })}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                {t('proof.subtitle', { defaultValue: 'Qualitative outcomes from real engagements' })}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((cardNum) => {
                                const contextKey = `proof.card${cardNum}.context`;
                                const situationKey = `proof.card${cardNum}.situation`;
                                const deliveredKey = `proof.card${cardNum}.delivered`;
                                const outcomeKey = `proof.card${cardNum}.outcome`;
                                
                                return (
                                    <motion.div
                                        key={cardNum}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: cardNum * 0.1 }}
                                        className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                                    >
                                        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">
                                            {t(contextKey, { defaultValue: '' })}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                                            {t(situationKey, { defaultValue: '' })}
                                        </h3>
                                        <div className="mb-4">
                                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                                                What I Delivered:
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                                {t(deliveredKey, { defaultValue: '' })}
                                            </p>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                                                Outcome:
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                                                {t(outcomeKey, { defaultValue: '' })}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Independent Advisory Section */}
                    <IndependentAdvisorySection />

                    {/* What Happens Next Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12 mb-8 border border-slate-200 dark:border-slate-700"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                            {t('services.whatHappensNext.title')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {(t('services.whatHappensNext.steps', { returnObjects: true }) as string[]).map((step, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                                        {idx + 1}
                                    </div>
                                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-12 text-center"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {t('servicesPage.ctaTitle')}
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            {t('servicesPage.ctaSubtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-1"
                            >
                                {t('servicesPage.bookDiscoveryCall')}
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                to="/risk-radar"
                                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all"
                            >
                                Try Risk Radar
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </PageShell>
        </>
    );
};

export default ServicesPage;
