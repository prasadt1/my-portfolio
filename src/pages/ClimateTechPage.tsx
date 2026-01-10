import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import SEO from '../components/SEO';

const ClimateTechPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title="Climate Tech & Scope 3 Architecture | Prasad Tilloo"
                description="Architecting global ESG standards (PACT Protocol). Decarbonize supply chains via secure data exchange and interoperable platforms."
                keywords="Climate Tech, ESG, PACT Protocol, Scope 3, Carbon Footprint, Sustainability Technology, WBCSD, Supply Chain Decarbonization"
                type="website"
            />

            <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
                {/* HERO SECTION */}
                <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white py-24 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(52, 211, 153, 0.5) 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }} />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-4 py-2 rounded-full text-emerald-300 font-bold text-sm mb-6 backdrop-blur-sm">
                                <Leaf size={16} />
                                {t('climateTech.hero.badge')}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                                <Trans i18nKey="climateTech.hero.title" components={[<span className="text-emerald-400" />]} />
                            </h1>
                            <p className="text-xl text-slate-200 mb-8 max-w-2xl leading-relaxed">
                                {t('climateTech.hero.subtitle')}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#pact-standard"
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center gap-2"
                                >
                                    {t('climateTech.hero.cta.explore')} <ArrowRight size={18} />
                                </a>
                                <Link
                                    to="/contact?interest=Climate%20Tech"
                                    className="bg-white/10 backdrop-blur-sm border border-emerald-400/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all"
                                >
                                    {t('climateTech.hero.cta.discuss')}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* KEY STATS */}
                <div className="bg-emerald-950 border-b border-emerald-900/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-emerald-900/50">
                            {[
                                { value: '2.5GT', label: t('climateTech.stats.scope') },
                                { value: '20+', label: t('climateTech.stats.partners') },
                                { value: 'WBCSD', label: t('climateTech.stats.body') },
                                { value: 'Open Source', label: t('climateTech.stats.arch') }
                            ].map((stat, idx) => (
                                <div key={idx} className="py-8 text-center px-4">
                                    <div className="text-3xl font-bold text-emerald-400 font-serif mb-1">{stat.value}</div>
                                    <div className="text-xs uppercase tracking-wider text-emerald-200/60 font-semibold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* THE CHALLENGE SECTION */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6">
                                    {t('climateTech.challenge.title')}
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                    <Trans i18nKey="climateTech.challenge.desc" components={[<strong />]} />
                                </p>
                                <ul className="space-y-4">
                                    {(t('climateTech.challenge.points', { returnObjects: true }) as string[]).map((point, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full mt-1">
                                                <Leaf size={16} className="text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <span className="text-slate-700 dark:text-slate-300">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Visual Placeholder for Challenge */}
                            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 h-80 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700">
                                <div className="text-center">
                                    <div className="text-5xl mb-4">⛓️</div>
                                    <div className="text-slate-500 font-semibold">Supply Chain Complexity Visual</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ClimateTechPage;
