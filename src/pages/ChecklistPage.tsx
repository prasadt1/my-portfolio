import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight, Download, Check, User, Award, Globe, Link as LinkIcon, MessageSquare, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';
import i18n from '../i18n';
import { trackEvent, AnalyticsEvents } from '../services/analytics';

const ChecklistPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Track page view
    useEffect(() => {
        trackEvent(AnalyticsEvents.LEADMAGNET_VIEW, {
            category: 'checklist',
            label: 'page_view'
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!consent) {
            setError(t('checklist.form.consentRequired') || 'Please agree to receive the checklist by email.');
            return;
        }

        setIsSubmitting(true);

        // Track submit attempt
        trackEvent(AnalyticsEvents.LEADMAGNET_SUBMIT, {
            category: 'checklist',
            label: 'submit_attempt'
        });

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email,
                    language: i18n.language || 'en',
                    sourcePath: '/checklist',
                    leadMagnet: 'vendor-proposal-checklist',
                    consent: true,
                    consentTimestamp: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit email');
            }

            // Track success
            trackEvent(AnalyticsEvents.LEADMAGNET_SUBMIT_SUCCESS, {
                category: 'checklist',
                label: 'submit_success'
            });

            setIsSuccess(true);
            setEmail('');
            setConsent(false);
        } catch (err) {
            // Track error
            trackEvent(AnalyticsEvents.LEADMAGNET_SUBMIT_ERROR, {
                category: 'checklist',
                label: 'submit_error'
            });
            setError(t('checklist.form.error'));
            console.error('Error submitting email:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const valueProps = t('checklist.hero.valueProps', { returnObjects: true }) as string[];
    const whatsInside = t('checklist.whatsInside.items', { returnObjects: true }) as Array<{icon: string, title: string, description: string}>;
    const whoIsThisFor = t('checklist.whoIsThisFor.items', { returnObjects: true }) as string[];
    const credentials = t('checklist.author.credentials', { returnObjects: true }) as string[];

    return (
        <>
            <SEO
                title={t('checklist.seo.title')}
                description={t('checklist.seo.description')}
            />
            <PageShell background="muted" containerMaxWidth="4xl" className="pt-24">
                {/* Hero Section */}
                <Container maxWidth="4xl">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <span className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium mb-6">
                                {t('checklist.hero.badge')}
                            </span>
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
                        >
                            {t('checklist.hero.headline')}
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
                        >
                            {t('checklist.hero.subheadline')}
                        </motion.p>

                        {/* Value Props */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto"
                        >
                            {valueProps.map((prop, index) => (
                                <div key={index} className="flex items-start gap-3 text-left">
                                    <Check className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
                                    <span className="text-slate-700 dark:text-slate-300">{prop}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Email Capture Form */}
                        {!isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700 max-w-2xl mx-auto"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="checklist-email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                            {t('checklist.hero.emailLabel')}
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="email"
                                                id="checklist-email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t('checklist.hero.emailPlaceholder')}
                                                required
                                                className="w-full pl-12 pr-4 py-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={consent}
                                                onChange={(e) => {
                                                    setConsent(e.target.checked);
                                                    if (e.target.checked) {
                                                        trackEvent(AnalyticsEvents.CONSENT_GIVEN, { form: 'checklist_main' });
                                                    }
                                                }}
                                                required
                                                className="mt-1 w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2"
                                            />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                                {t('checklist.form.consentLabelPrefix', { defaultValue: 'I agree to the' })}{' '}
                                                <Link to="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                                                    {t('checklist.form.privacyPolicyLink', { defaultValue: 'Privacy Policy' })}
                                                </Link>
                                                {' '}{t('checklist.form.consentLabelSuffix', { defaultValue: 'and consent to receive the checklist by email.' })}
                                            </span>
                                        </label>
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-600 dark:text-red-400">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !consent}
                                        className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                {t('checklist.form.submitting')}
                                            </>
                                        ) : (
                                            <>
                                                <Download size={20} />
                                                {t('checklist.hero.submitButton')}
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                                        {t('checklist.hero.privacy')}
                                    </p>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto"
                            >
                                {/* Success Header */}
                                <div className="text-center mb-8">
                                    <CheckCircle2 className="mx-auto mb-4 text-emerald-600 dark:text-emerald-400" size={56} />
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        {t('checklist.success.title', { defaultValue: 'Checklist sent to your email' })}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {t('checklist.success.message')}
                                    </p>
                                </div>

                                {/* Guidance Tip */}
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-8 border border-emerald-200 dark:border-emerald-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Tip:</span>{' '}
                                        {t('checklist.success.guidanceTip', { defaultValue: 'Run the checklist against your vendor proposal in 20 minutes. Score <25 indicates areas worth validating.' })}
                                    </p>
                                </div>
                                
                                {/* CTAs */}
                                <div className="space-y-4">
                                    {/* Primary CTA - Architecture Review */}
                                    <Link
                                        to="/services"
                                        onClick={() => trackEvent(AnalyticsEvents.CTA_ARCH_REVIEW_CLICK, { source: 'checklist_success' })}
                                        className="block w-full bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <Calendar size={20} />
                                            {t('checklist.success.primaryCta', { defaultValue: 'Request Architecture Review (Fixed Scope)' })}
                                        </div>
                                        <span className="text-sm font-normal text-slate-300 dark:text-emerald-200">
                                            {t('checklist.success.primaryCtaSubtext', { defaultValue: '€2,500 • 3 days • Vendor-neutral' })}
                                        </span>
                                    </Link>

                                    {/* Secondary CTA - Mailto */}
                                    <a
                                        href="mailto:prasad.sgsits@gmail.com?subject=Proposal%20Review%20Request&body=Hi%20Prasad%2C%0A%0AI%20just%20downloaded%20the%20Vendor%20Proposal%20Checklist%20and%20would%20like%20your%20quick%20feedback%20on%20our%20proposal.%0A%0AContext%3A%0A-%20Industry%3A%20%0A-%20Initiative%3A%20%0A-%20Budget%20range%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you."
                                        onClick={() => trackEvent(AnalyticsEvents.CTA_MAILTO_CLICK, { source: 'checklist_success' })}
                                        className="block w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 px-6 py-4 rounded-xl font-semibold text-center transition-all"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <MessageSquare size={20} />
                                            {t('checklist.success.secondaryCta', { defaultValue: 'Reply with your proposal for quick feedback' })}
                                        </div>
                                    </a>
                                </div>

                                {/* Trust Note */}
                                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-6">
                                    {t('checklist.success.trustNote', { defaultValue: 'Direct response • No sales pitch • Vendor-neutral advice' })}
                                </p>
                            </motion.div>
                        )}

                    </div>
                </Container>

                {/* Trust Note Section */}
                <Container maxWidth="4xl" className="py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl text-center"
                    >
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                            {t('checklist.trust.usedBy', { defaultValue: 'Used by CTOs at mid-market companies across EU.' })}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-4">
                            <span>✓ {t('checklist.trust.independent', { defaultValue: 'Independent consultant' })}</span>
                            <span>✓ {t('checklist.trust.noVendor', { defaultValue: 'No vendor partnerships' })}</span>
                            <span>✓ {t('checklist.trust.global', { defaultValue: 'Global delivery experience' })}</span>
                        </div>
                        
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t('checklist.trust.experience', { defaultValue: 'Delivery experience across: North America • Europe • Asia • South America' })}
                        </p>
                    </motion.div>
                </Container>

                {/* What's Inside Section */}
                <Container maxWidth="4xl" className="py-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-4">
                        {t('checklist.whatsInside.title')}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
                        {t('checklist.whatsInside.subtitle', { defaultValue: 'Everything you need to validate your proposal' })}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {whatsInside.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Container>

                {/* Who Is This For Section */}
                <Container maxWidth="4xl" className="py-16 bg-white dark:bg-slate-800 rounded-2xl">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
                        {t('checklist.whoIsThisFor.title')}
                    </h2>
                    <div className="max-w-2xl mx-auto space-y-4">
                        {whoIsThisFor.map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <Check className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
                                <span className="text-slate-700 dark:text-slate-300 text-lg">{item}</span>
                            </div>
                        ))}
                    </div>
                </Container>

                {/* About Author Section */}
                <Container maxWidth="4xl" className="py-16">
                    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                                    <User className="text-white" size={40} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {t('checklist.author.name')}
                                </h2>
                                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">
                                    {t('checklist.author.title')}
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                                    {t('checklist.author.bio')}
                                </p>
                                <div className="space-y-2">
                                    {credentials.map((cred, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <Award className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
                                            <span className="text-sm text-slate-600 dark:text-slate-400">{cred}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                {/* Final CTA Section */}
                <Container maxWidth="4xl" className="py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                            {t('checklist.finalCta.title')}
                        </h2>
                        {!isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 mb-8"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="checklist-email-2" className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                                            {t('checklist.hero.emailLabel')}
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="email"
                                                id="checklist-email-2"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t('checklist.hero.emailPlaceholder')}
                                                required
                                                className="w-full pl-12 pr-4 py-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={consent}
                                                onChange={(e) => {
                                                    setConsent(e.target.checked);
                                                    if (e.target.checked) {
                                                        trackEvent(AnalyticsEvents.CONSENT_GIVEN, { form: 'checklist_footer' });
                                                    }
                                                }}
                                                required
                                                className="mt-1 w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2"
                                            />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                                {t('checklist.form.consentLabelPrefix', { defaultValue: 'I agree to the' })}{' '}
                                                <Link to="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                                                    {t('checklist.form.privacyPolicyLink', { defaultValue: 'Privacy Policy' })}
                                                </Link>
                                                {' '}{t('checklist.form.consentLabelSuffix', { defaultValue: 'and consent to receive the checklist by email.' })}
                                            </span>
                                        </label>
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-600 dark:text-red-400">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !consent}
                                        className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                {t('checklist.form.submitting')}
                                            </>
                                        ) : (
                                            <>
                                                <Download size={20} />
                                                {t('checklist.hero.submitButton')}
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {t('checklist.finalCta.afterNote')}
                        </p>
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold"
                        >
                            {t('checklist.finalCta.learnMore')}
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </Container>

                {/* Secondary CTA */}
                <Container maxWidth="4xl" className="py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            {t('checklist.secondaryCta.text', { defaultValue: 'Want to discuss your specific situation first?' })}
                        </p>
                        <Link 
                            to="/services" 
                            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                        >
                            {t('checklist.secondaryCta.link', { defaultValue: 'Explore architecture review services' })}
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </Container>
            </PageShell>
        </>
    );
};

export default ChecklistPage;
