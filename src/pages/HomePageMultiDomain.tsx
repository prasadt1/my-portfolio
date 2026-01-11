import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ArrowRight,
    CheckCircle2,
    Building2,
    Shield,
    Leaf,
    Lightbulb,
    Target,
    Users,
    Zap,
    FileSearch,
    Cloud,
    Layout
} from 'lucide-react';
import SEO from '../components/SEO';
import LogoCarousel from '../components/LogoCarousel';
import { caseStudies } from '../data/caseStudies';

const services = [
  {
    id: 'due-diligence',
    icon: FileSearch,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
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
    titleKey: 'services.platformEvaluation.title',
    subtitleKey: 'services.platformEvaluation.subtitle',
    timelineKey: 'services.platformEvaluation.timeline',
    priceKey: 'services.platformEvaluation.price',
    forKey: 'services.platformEvaluation.for',
    deliverablesKey: 'services.platformEvaluation.deliverables'
  }
];

const HomePageMultiDomain: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title="Prasad Tilloo | Independent Architecture Consultant"
                description="Independent architecture assessments for EU mid-market companies. Validate cloud migration, platform modernization, and architecture decisions before committing to the wrong path."
                keywords="architecture consultant, architecture assessment, technical due diligence, cloud migration readiness, platform evaluation, enterprise architect, AWS, Azure, GCP"
                type="website"
            />

            <div className="min-h-screen font-sans">
                {/* HERO SECTION - Simplified & Larger Typography */}
                <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-32 md:py-48 overflow-hidden">
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
                            {/* Pre-headline */}
                            <div className="inline-block bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-6 py-3 rounded-full mb-8">
                                <span className="text-emerald-300 font-semibold">
                                    Independent Architecture Consultant
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                                {t('hero.title')}
                            </h1>

                            {/* Subheadline */}
                            <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                                {t('hero.subtitle')}
                            </p>

                            {/* Business Outcomes Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20"
                                >
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">{t('hero.stats.savings.value')}</div>
                                    <div className="text-sm text-slate-300">{t('hero.stats.savings.label')}</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20"
                                >
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">{t('hero.stats.revenue.value')}</div>
                                    <div className="text-sm text-slate-300">{t('hero.stats.revenue.label')}</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20"
                                >
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">{t('hero.stats.efficiency.value')}</div>
                                    <div className="text-sm text-slate-300">{t('hero.stats.efficiency.label')}</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20"
                                >
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">{t('hero.stats.impact.value')}</div>
                                    <div className="text-sm text-slate-300">{t('hero.stats.impact.label')}</div>
                                </motion.div>
                            </div>

                            {/* Value Proposition Bullets */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12 text-left">
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <div className="font-bold text-white mb-1">{t('hero.values.innovation.title')}</div>
                                        <div className="text-sm text-slate-300">{t('hero.values.innovation.desc')}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Target className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <div className="font-bold text-white mb-1">{t('hero.values.business.title')}</div>
                                        <div className="text-sm text-slate-300">{t('hero.values.business.desc')}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <div className="font-bold text-white mb-1">{t('hero.values.leadership.title')}</div>
                                        <div className="text-sm text-slate-300">{t('hero.values.leadership.desc')}</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Zap className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <div className="font-bold text-white mb-1">{t('hero.values.fullstack.title')}</div>
                                        <div className="text-sm text-slate-300">{t('hero.values.fullstack.desc')}</div>
                                    </div>
                                </div>
                            </div>


                            {/* Primary CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="https://calendly.com/prasadtilloo/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                >
                                    {t('hero.cta')}
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                                </a>

                                <Link
                                    to="/services"
                                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center gap-3"
                                >
                                    View Services
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* LOGO CAROUSEL */}
                <LogoCarousel />

                {/* HOW I WORK SECTION */}
                <section id="how-i-work" className="py-32 bg-white dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                                {t('howItWork.title')}
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                {t('howItWork.subtitle')}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Principle 1: Business First */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-8 border-2 border-emerald-200 dark:border-emerald-700"
                            >
                                <div className="absolute -top-4 -left-4 bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                    1
                                </div>

                                <Target className="w-12 h-12 text-emerald-600 mb-4 mt-4" />

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('howItWork.steps.1.title')}
                                </h3>

                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    {t('howItWork.steps.1.desc')}
                                </p>

                                <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 text-sm">
                                    <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                                        Example:
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        {t('howItWork.steps.1.example')}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Principle 2: Creative Innovation */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-700"
                            >
                                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                    2
                                </div>

                                <Lightbulb className="w-12 h-12 text-blue-600 mb-4 mt-4" />

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('howItWork.steps.2.title')}
                                </h3>

                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    {t('howItWork.steps.2.desc')}
                                </p>

                                <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 text-sm">
                                    <div className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                                        Example:
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        {t('howItWork.steps.2.example')}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Principle 3: Servant Leadership */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 rounded-2xl p-8 border-2 border-violet-200 dark:border-violet-700"
                            >
                                <div className="absolute -top-4 -left-4 bg-violet-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                    3
                                </div>

                                <Users className="w-12 h-12 text-violet-600 mb-4 mt-4" />

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('howItWork.steps.3.title')}
                                </h3>

                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    {t('howItWork.steps.3.desc')}
                                </p>

                                <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 text-sm">
                                    <div className="font-semibold text-violet-700 dark:text-violet-400 mb-2">
                                        Example:
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        {t('howItWork.steps.3.example')}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Principle 4: Hands-On Excellence */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-700"
                            >
                                <div className="absolute -top-4 -left-4 bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                    4
                                </div>

                                <Zap className="w-12 h-12 text-orange-600 mb-4 mt-4" />

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('howItWork.steps.4.title')}
                                </h3>

                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    {t('howItWork.steps.4.desc')}
                                </p>

                                <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 text-sm">
                                    <div className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                                        Example:
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        {t('howItWork.steps.4.example')}
                                    </div>
                                </div>
                            </motion.div>
                        </div>


                        {/* Bottom tagline */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-16"
                        >
                            <div className="inline-block bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-4 rounded-xl shadow-lg">
                                <p className="text-xl font-bold">
                                    {t('howItWork.resultTagline')}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </section>

                {/* PATH SELECTOR - NEW SECTION */}
                <section id="path-selector" className="py-32 bg-white dark:bg-slate-800 scroll-mt-20" >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                                {t('pathSelector.title')}
                            </h2>
                            <p className="text-2xl text-slate-600 dark:text-slate-300">
                                {t('pathSelector.subtitle')}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Option 1: Custom Consulting */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-10 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                            >
                                <div className="text-7xl mb-6">🤝</div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('pathSelector.consulting.title')}
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 flex-grow">
                                    {t('pathSelector.consulting.desc')}
                                </p>
                                <ul className="space-y-3 mb-8 text-base">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Enterprise modernization</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Compliance implementation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Sustainability tech</span>
                                    </li>
                                </ul>
                                <a
                                    href="https://calendly.com/prasadtilloo/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/30"
                                >
                                    {t('pathSelector.consulting.cta')}
                                </a>
                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium">
                                    €300/hour
                                </p>
                            </motion.div>

                            {/* Option 2: Ready-Made Products */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="group bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-3xl p-10 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">{t('pathSelector.products.badge')}</div>
                                <div className="text-7xl mb-6">📦</div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('pathSelector.products.title')}
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 flex-grow">
                                    {t('pathSelector.products.desc')}
                                </p>
                                <ul className="space-y-3 mb-8 text-base">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Industry 4.0 frameworks</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Compliance packages</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Assessment tools</span>
                                    </li>
                                </ul>
                                <Link
                                    to="/products"
                                    className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-emerald-500/30"
                                >
                                    {t('pathSelector.products.cta')}
                                </Link>
                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium">
                                    €1,000 - €15,000
                                </p>
                            </motion.div>

                            {/* Option 3: View Proof */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="group bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 rounded-3xl p-10 border-2 border-violet-200 dark:border-violet-700 hover:border-violet-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                            >
                                <div className="text-7xl mb-6">🔍</div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                    {t('pathSelector.proof.title')}
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 flex-grow">
                                    {t('pathSelector.proof.desc')}
                                </p>
                                <ul className="space-y-3 mb-8 text-base">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Fortune 500 projects</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">€2M+ delivered</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">12 compliance migrations</span>
                                    </li>
                                </ul>
                                <Link
                                    to="/projects"
                                    className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-violet-500/30"
                                >
                                    {t('pathSelector.proof.cta')}
                                </Link>
                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium">
                                    Free to explore
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SERVICES SECTION */}
                <section className="py-32 bg-slate-50 dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                                Architecture Assessment Services
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                Independent architecture assessments for EU mid-market companies. Validate decisions before committing to the wrong path.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {services.map((service, idx) => {
                            const Icon = service.icon;
                            const deliverables = t(service.deliverablesKey, { returnObjects: true }) as string[];

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden group hover:shadow-2xl transition-all duration-300"
                                >
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

                                        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mb-6 space-y-3">
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
                                        </div>

                                        <div className="mb-6">
                                            <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                                {t('servicesPage.deliverables')}
                                            </div>
                                            <ul className="space-y-2">
                                                {Array.isArray(deliverables) && deliverables.slice(0, 3).map((deliverable, dIdx) => (
                                                    <li key={dIdx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                        <CheckCircle2 className={`flex-shrink-0 mt-0.5 ${service.iconColor}`} size={16} />
                                                        <span>{deliverable}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link
                                            to="/services"
                                            className={`w-full text-center bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1`}
                                        >
                                            Learn More
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                        </div>

                        {/* NEW: Featured Projects Section (Dynamic) */}
                        <div className="mt-20">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
                                {t('home.featuredCaseStudies.title')}
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                {caseStudies.slice(0, 4).map((study, index) => (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            {index === 0 ? <Zap size={100} /> : <Target size={100} />}
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                                    {study.header.client.industry}
                                                </span>
                                                {index === 0 && (
                                                    <div className="text-xs font-bold text-amber-500 flex items-center gap-1">
                                                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                                                        {t('home.featuredCaseStudies.new')}
                                                    </div>
                                                )}
                                            </div>

                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors">
                                                {study.header.title}
                                            </h4>

                                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-3">
                                                {study.challenge.situation}
                                            </p>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">{t('home.featuredCaseStudies.impact')}</div>
                                                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                                                        {study.outcomes.hero_metric.value} {study.outcomes.hero_metric.label}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <Link
                                                    to={`/projects/${study.slug}`}
                                                    className="flex-1 inline-flex justify-center items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors"
                                                >
                                                    {t('home.featuredCaseStudies.viewCaseStudy')} <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link
                                    to="/projects"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:opacity-90 transition-opacity"
                                >
                                    {t('home.featuredCaseStudies.viewAll')} <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FINAL CTA - Simplified */}
                <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center" >
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            {t('home.readyToTransform.title')}
                        </h2>
                        <a
                            href="#path-selector"
                            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105"
                        >
                            {t('home.readyToTransform.cta')}
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomePageMultiDomain;
