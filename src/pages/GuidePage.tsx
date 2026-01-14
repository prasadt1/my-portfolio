import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';
import GuideContent from '../components/GuideContent';
import i18n from '../i18n';

const GuidePage: React.FC = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!consent) {
            setError(t('guide.form.consentRequired') || 'Please agree to receive the guide by email.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email,
                    language: i18n.language || 'en'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit email');
            }

            setIsSuccess(true);
            setEmail('');
            setConsent(false);
        } catch (err) {
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
                                                onChange={(e) => setConsent(e.target.checked)}
                                                required
                                                className="mt-1 w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2"
                                            />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                                {t('guide.form.consentLabel')}
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

                                    <div className="text-xs text-slate-500 dark:text-slate-400 text-center space-y-1">
                                        <p>{t('guide.form.privacyStatement')}</p>
                                        <p>
                                            <Link to="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                                                {t('guide.form.privacyLink')}
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 md:p-12 text-center mb-12"
                            >
                                <CheckCircle2 className="mx-auto mb-4 text-emerald-600 dark:text-emerald-400" size={48} />
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {t('guide.success.title')}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('guide.success.message')}
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
