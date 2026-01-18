import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';
import GuideContent from '../components/GuideContent';
import i18n from '../i18n';
import { trackEvent, AnalyticsEvents } from '../services/analytics';
import { getAttributionSnapshot } from '../utils/attribution';

const GuidePage: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Track page view
    useEffect(() => {
        trackEvent(AnalyticsEvents.LEADMAGNET_VIEW, {
            category: 'guide',
            label: 'page_view'
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!consent) {
            setError(t('guide.form.consentRequired') || 'Please agree to receive the guide by email.');
            return;
        }

        setIsSubmitting(true);

        // Track submit attempt
        trackEvent(AnalyticsEvents.LEADMAGNET_SUBMIT, {
            category: 'guide',
            label: 'submit_attempt'
        });

        try {
            // Get attribution snapshot for lead attribution
            const attribution = getAttributionSnapshot(i18n.language || 'en');
            
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email,
                    language: i18n.language || 'en',
                    sourcePath: '/guide',
                    leadMagnet: 'architecture-guide',
                    consent: true,
                    consentTimestamp: new Date().toISOString(),
                    // Attribution fields
                    utm_source: attribution.utm_source,
                    utm_medium: attribution.utm_medium,
                    utm_campaign: attribution.utm_campaign,
                    utm_content: attribution.utm_content,
                    utm_term: attribution.utm_term,
                    landingPath: attribution.landingPath,
                    currentPath: attribution.currentPath,
                    caseStudySlug: attribution.caseStudySlug,
                    projectsCategory: attribution.projectsCategory,
                    projectsSearchQuery: attribution.projectsSearchQuery,
                    ctaSource: attribution.ctaSource || 'guide-page',
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit email');
            }

            // Track success
            trackEvent(AnalyticsEvents.LEADMAGNET_SUBMIT_SUCCESS, {
                category: 'guide',
                label: 'submit_success'
            });

            setIsSuccess(true);
            setEmail('');
            setConsent(false);
        } catch (err) {
            // Track error
            trackEvent(AnalyticsEvents.LEADMAGNET_SUBMIT_ERROR, {
                category: 'guide',
                label: 'submit_error'
            });
            setError(t('guide.form.error'));
            console.error('Error submitting email:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title={t('guide.seo.title')}
                description={t('guide.seo.description')}
            />
            <PageShell background="muted" containerMaxWidth="4xl" className="pt-24">
                <PageHeader
                    title={t('guide.title')}
                    subtitle={t('guide.headline')}
                />

                <Container maxWidth="4xl">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 text-center">
                            {t('guide.subheadline')}
                        </p>

                        {/* Email Capture Form */}
                        {!isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-700 mb-12"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            {t('guide.form.emailLabel')}
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder={t('guide.form.emailPlaceholder')}
                                                required
                                                className="w-full pl-12 pr-4 py-4 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                                                        trackEvent(AnalyticsEvents.CONSENT_GIVEN, { form: 'guide' });
                                                    }
                                                }}
                                                required
                                                className="mt-1 w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2"
                                            />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                                {t('guide.form.consentLabelPrefix', { defaultValue: 'I agree to the' })}{' '}
                                                <Link to="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                                                    {t('guide.form.privacyPolicyLink', { defaultValue: 'Privacy Policy' })}
                                                </Link>
                                                {' '}{t('guide.form.consentLabelSuffix', { defaultValue: 'and consent to receive the guide by email.' })}
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
                                                {t('guide.form.submitting')}
                                            </>
                                        ) : (
                                            <>
                                                {t('guide.form.button')}
                                                <ArrowRight size={20} />
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                                        {t('guide.form.privacyStatement')}
                                    </p>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 md:p-12 mb-12"
                            >
                                {/* Success Header */}
                                <div className="text-center mb-8">
                                    <CheckCircle2 className="mx-auto mb-4 text-emerald-600 dark:text-emerald-400" size={56} />
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        {t('guide.success.title', { defaultValue: 'Guide sent to your email' })}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {t('guide.success.message')}
                                    </p>
                                </div>

                                {/* Guidance Tip */}
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-8 border border-emerald-200 dark:border-emerald-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Tip:</span>{' '}
                                        {t('guide.success.guidanceTip', { defaultValue: 'Review the 10 architecture decisions against your current project. Each can prevent weeks of rework.' })}
                                    </p>
                                </div>
                                
                                {/* CTAs */}
                                <div className="space-y-4">
                                    {/* Primary CTA - Architecture Review */}
                                    <Link
                                        to="/services"
                                        onClick={() => trackEvent(AnalyticsEvents.CTA_ARCH_REVIEW_CLICK, { source: 'guide_success' })}
                                        className="block w-full bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-center transition-all shadow-lg hover:shadow-xl"
                                    >
                                        <div className="flex items-center justify-center gap-2 mb-1">
                                            <Calendar size={20} />
                                            {t('guide.success.primaryCta', { defaultValue: 'Request Architecture Review (Fixed Scope)' })}
                                        </div>
                                        <span className="text-sm font-normal text-slate-300 dark:text-emerald-200">
                                            {t('guide.success.primaryCtaSubtext', { defaultValue: '€2,500 • 3 days • Vendor-neutral' })}
                                        </span>
                                    </Link>

                                    {/* Secondary CTA - Mailto */}
                                    <a
                                        href="mailto:prasad.sgsits@gmail.com?subject=Architecture%20Review%20Request&body=Hi%20Prasad%2C%0A%0AI%20just%20downloaded%20the%20Architecture%20Guide%20and%20would%20like%20your%20feedback%20on%20my%20architecture%20decisions.%0A%0AContext%3A%0A-%20Industry%3A%20%0A-%20Initiative%3A%20%0A-%20Key%20concern%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you."
                                        onClick={() => trackEvent(AnalyticsEvents.CTA_MAILTO_CLICK, { source: 'guide_success' })}
                                        className="block w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-600 px-6 py-4 rounded-xl font-semibold text-center transition-all"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <MessageSquare size={20} />
                                            {t('guide.success.secondaryCta', { defaultValue: 'Reply with your architecture question' })}
                                        </div>
                                    </a>
                                </div>

                                {/* Trust Note */}
                                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-6">
                                    {t('guide.success.trustNote', { defaultValue: 'Direct response • No sales pitch • Vendor-neutral advice' })}
                                </p>
                            </motion.div>
                        )}

                        {/* Guide Content Preview */}
                        <GuideContent />
                    </div>
                </Container>
            </PageShell>
        </>
    );
};

export default GuidePage;
