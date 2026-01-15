import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ArrowRight,
    AlertTriangle,
    Target,
    FileText,
    Search,
    TrendingUp,
    Package,
    Play
} from 'lucide-react';
import SEO from '../components/SEO';
import LogoCarousel from '../components/LogoCarousel';
import VideoModal from '../components/VideoModal';
import { trackEvent, AnalyticsEvents } from '../services/analytics';

const HomePageMultiDomain: React.FC = () => {
    const { t } = useTranslation();
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    return (
        <>
            <SEO
                title="Prasad Tilloo | Independent Architecture Consultant"
                description="Independent architecture assessments for EU mid-market companies. Validate cloud migration, platform modernization, and architecture decisions before committing to the wrong path."
                keywords="architecture consultant, architecture assessment, technical due diligence, cloud migration readiness, platform evaluation, enterprise architect, AWS, Azure, GCP"
                type="website"
            />

            <div className="min-h-screen font-sans">
                {/* SECTION 1: HERO */}
                <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 md:py-32 lg:py-48 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            {/* Badge */}
                            <div className="inline-block bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-6 py-3 rounded-full mb-8">
                                <span className="text-emerald-300 font-semibold text-sm">
                                    {t('hero.badge')}
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
                                {t('hero.headline')}
                            </h1>

                            {/* Tagline */}
                            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                                {t('hero.tagline')}
                            </p>

                            {/* Subtitle */}
                            <p className="text-base md:text-lg text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                                {t('hero.subtitle')}
                            </p>

                            {/* Differentiator Sentence */}
                            <p className="text-sm md:text-base text-emerald-300 font-medium mb-3 max-w-2xl mx-auto">
                                {t('hero.differentiator')}
                            </p>

                            {/* Proof Line */}
                            <p className="text-xs md:text-sm text-slate-400 mb-12 max-w-2xl mx-auto italic">
                                {t('hero.proofLine')}
                            </p>

                            {/* CTAs - Primary CTA prominent, secondary subdued */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                <a
                                    href="https://calendly.com/prasad-sgsits/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent(AnalyticsEvents.CTA_BOOK_CALL_CLICK, { source: 'hero' })}
                                    className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                >
                                    {t('hero.cta')}
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </a>

                                <Link
                                    to="/services"
                                    className="group text-white/80 hover:text-white px-6 py-3 rounded-xl font-medium text-base transition-all duration-300 flex items-center gap-2 underline-offset-4 hover:underline"
                                >
                                    {t('hero.ctaSecondary')}
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                                </Link>
                            </div>

                            {/* Video CTA */}
                            <div className="mb-8">
                                <button
                                    onClick={() => {
                                        setIsVideoModalOpen(true);
                                        trackEvent(AnalyticsEvents.CTA_VIDEO_CLICK, { source: 'hero' });
                                    }}
                                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
                                >
                                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <Play size={14} className="ml-0.5" />
                                    </span>
                                    {t('hero.watchVideo', { defaultValue: 'Watch 75-sec overview' })}
                                </button>
                            </div>

                            {/* Trust Note */}
                            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
                                {t('hero.trustNote')}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 2: TRUST BAR */}
                <LogoCarousel />

                {/* SECTION 3: THE PROBLEM */}
                <section className="py-20 bg-white dark:bg-slate-900">
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
                </section>

                {/* SECTION 4: HOW I WORK */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                {t('homepage.howIWork.title')}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                                {t('homepage.howIWork.subtitle')}
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
                                    STEP 1
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('homepage.howIWork.step1.title')}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('homepage.howIWork.step1.desc')}
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
                                    STEP 2
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('homepage.howIWork.step2.title')}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('homepage.howIWork.step2.desc')}
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
                                    STEP 3
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {t('homepage.howIWork.step3.title')}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('homepage.howIWork.step3.desc')}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: MINI CASE STUDIES */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                                {t('homepage.miniCases.title', { defaultValue: 'Proof in Outcomes' })}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                                {t('homepage.miniCases.subtitle', { defaultValue: 'Real architecture decisions from recent engagements' })}
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Case 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">🏭</div>
                                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case1.client', { defaultValue: 'Pharma Company (Germany)' })}
                                </div>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.situation', { defaultValue: 'Situation:' })}</strong>{' '}
                                    {t('homepage.miniCases.case1.situation', { defaultValue: 'AWS proposed €450K Kubernetes setup for 50-person team' })}
                                </p>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.decision', { defaultValue: 'Decision:' })}</strong>{' '}
                                    {t('homepage.miniCases.case1.decision', { defaultValue: 'Serverless alternative recommended' })}
                                </p>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case1.outcome', { defaultValue: '€415K saved' })}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    {t('homepage.miniCases.case1.detail', { defaultValue: 'Upfront + €65K/year ongoing' })}
                                </p>
                            </motion.div>

                            {/* Case 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">🏥</div>
                                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case2.client', { defaultValue: 'Healthcare Provider (Switzerland)' })}
                                </div>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.situation', { defaultValue: 'Situation:' })}</strong>{' '}
                                    {t('homepage.miniCases.case2.situation', { defaultValue: '8-month migration timeline from consultant' })}
                                </p>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.decision', { defaultValue: 'Decision:' })}</strong>{' '}
                                    {t('homepage.miniCases.case2.decision', { defaultValue: 'Phased approach with early value delivery' })}
                                </p>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case2.outcome', { defaultValue: '6 months faster' })}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    {t('homepage.miniCases.case2.detail', { defaultValue: 'First value in 6 weeks vs 8 months' })}
                                </p>
                            </motion.div>

                            {/* Case 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">🏢</div>
                                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case3.client', { defaultValue: 'Scale-up (Netherlands)' })}
                                </div>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.situation', { defaultValue: 'Situation:' })}</strong>{' '}
                                    {t('homepage.miniCases.case3.situation', { defaultValue: 'Multi-cloud proposal with vendor lock-in risk' })}
                                </p>
                                <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                    <strong>{t('homepage.miniCases.decision', { defaultValue: 'Decision:' })}</strong>{' '}
                                    {t('homepage.miniCases.case3.decision', { defaultValue: 'Portable architecture with 3 viable vendor options' })}
                                </p>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                                    {t('homepage.miniCases.case3.outcome', { defaultValue: 'Zero lock-in' })}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                    {t('homepage.miniCases.case3.detail', { defaultValue: 'Freedom to negotiate or switch' })}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: LEAD MAGNET CTA */}
                <section className="py-20 bg-slate-50 dark:bg-slate-800">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full mb-6">
                                <FileText className="text-emerald-600 dark:text-emerald-400" size={48} />
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                {t('homepage.leadMagnetCta.title', { defaultValue: 'Free Download' })}
                            </h2>
                            
                            <h3 className="text-xl md:text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
                                {t('homepage.leadMagnetCta.subtitle', { defaultValue: 'Vendor Proposal Review Checklist' })}
                            </h3>
                            
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                                {t('homepage.leadMagnetCta.description', { defaultValue: 'Professional checklist to identify gaps, risks, and over-engineering in cloud, platform, and AI proposals before signing.' })}
                            </p>
                            
                            <div className="mb-4">
                                <Link
                                    to="/checklist"
                                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                                >
                                    <FileText size={20} />
                                    {t('homepage.leadMagnetCta.button', { defaultValue: 'Download PDF' })}
                                </Link>
                            </div>
                            
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                                {t('homepage.leadMagnetCta.privacy', { defaultValue: 'One-time send. No newsletter. Unsubscribe option included.' })}
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
                                <span>✓ {t('homepage.leadMagnetCta.features.1', { defaultValue: '7 assessment categories' })}</span>
                                <span>✓ {t('homepage.leadMagnetCta.features.2', { defaultValue: 'Red flag patterns' })}</span>
                                <span>✓ {t('homepage.leadMagnetCta.features.3', { defaultValue: 'Vendor-neutral' })}</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 7: FINAL CTA */}
                <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                {t('homepage.finalCta.title')}
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                <a
                                    href="https://calendly.com/prasad-sgsits/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                                >
                                    {t('homepage.finalCta.cta')}
                                    <ArrowRight size={20} />
                                </a>
                                <Link
                                    to="/checklist"
                                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-10 py-5 rounded-xl font-semibold text-lg transition-all"
                                >
                                    {t('guide.homepageCta.button')}
                                </Link>
                            </div>
                            <p className="text-slate-300 text-sm">
                                {t('homepage.finalCta.trustNote')}
                            </p>
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
