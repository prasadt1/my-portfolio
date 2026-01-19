import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Clock, CheckCircle2, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { trackEvent } from '../services/analytics';

const ConsultationPage: React.FC = () => {
    const { t } = useTranslation();

    const handleCalendlyClick = () => {
        trackEvent('cta_book_call_click', { source: 'consultation_page' });
        window.open('https://calendly.com/prasad-sgsits/30min', '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <SEO
                title="Book Consultation | Prasad Tilloo"
                description="Schedule a strategy call to discuss your enterprise transformation needs."
            />

            <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Home</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block bg-white/20 backdrop-blur-sm p-4 rounded-full mb-6">
                            <Calendar className="text-white" size={48} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {t('consultationPage.title', { defaultValue: 'Book a Discovery Call' })}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            {t('consultationPage.subtitle', { defaultValue: 'Schedule a 30-minute strategy call to discuss your enterprise transformation needs and explore how I can help.' })}
                        </p>
                    </motion.div>

                    {/* Benefits */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                        >
                            <Clock className="text-white mb-4" size={32} />
                            <h3 className="font-bold mb-2">30 Minutes</h3>
                            <p className="text-sm text-white/80">
                                {t('consultationPage.benefit1', { defaultValue: 'Quick, focused discussion of your specific challenge' })}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                        >
                            <Target className="text-white mb-4" size={32} />
                            <h3 className="font-bold mb-2">No Commitment</h3>
                            <p className="text-sm text-white/80">
                                {t('consultationPage.benefit2', { defaultValue: 'Explore options without any obligation' })}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                        >
                            <CheckCircle2 className="text-white mb-4" size={32} />
                            <h3 className="font-bold mb-2">Actionable Next Steps</h3>
                            <p className="text-sm text-white/80">
                                {t('consultationPage.benefit3', { defaultValue: 'Get concrete recommendations within 48 hours' })}
                            </p>
                        </motion.div>
                    </div>

                    {/* Primary CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                    >
                        <button
                            onClick={handleCalendlyClick}
                            className="inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-5 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                        >
                            <Calendar size={24} />
                            {t('consultationPage.cta', { defaultValue: 'Open Calendar to Schedule' })}
                        </button>
                        <p className="text-white/70 text-sm mt-4">
                            {t('consultationPage.note', { defaultValue: 'Opens in a new window' })}
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ConsultationPage;
