import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import { CheckCircle2, ArrowRight, ShoppingBag, Leaf, Database, Zap, Shield, Factory, BarChart, Infinity, LayoutTemplate, Users } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
    'ShoppingBag': ShoppingBag,
    'Leaf': Leaf,
    'Database': Database,
    'Zap': Zap,
    'Shield': Shield,
    'Factory': Factory,
    'BarChart': BarChart,
    'Loop': Infinity,
    'Structure': LayoutTemplate,
    'Users': Users
};

const ProductsPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <SEO
                title="Enterprise Toolkits & Frameworks | Prasad Tilloo"
                description="Proven frameworks and architectural blueprints for Industry 4.0, HIPAA Compliance, and IT Effectiveness. Save months of effort."
            />
            <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                            {t('productsPage.title')}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            {t('productsPage.subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, idx) => {
                            const Icon = iconMap[product.icon] || BarChart;
                            const title = t(`products.${product.id}.title`);
                            const description = t(`products.${product.id}.desc`);
                            const features = t(`products.${product.id}.features`, { returnObjects: true }) as string[];

                            return (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden group hover:shadow-2xl transition-all duration-300`}
                                >
                                    {/* Gradient Background Effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${product.theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                    {/* Contextual Background Image */}
                                    {product.theme.backgroundImage && (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-10 transition-transform duration-700 group-hover:scale-110 pointer-events-none mix-blend-overlay"
                                            style={{ backgroundImage: `url(${product.theme.backgroundImage})` }}
                                        />
                                    )}

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${product.theme.iconBg} transition-transform group-hover:scale-110 duration-300`}>
                                            <Icon size={32} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                            {title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed">
                                            {description}
                                        </p>

                                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                                            €{product.price.toLocaleString()}
                                        </div>

                                        <ul className="space-y-3 mb-8 text-sm">
                                            {Array.isArray(features) && features.map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                                    <CheckCircle2 className={`flex-shrink-0 mt-0.5 text-${product.theme.color}-600 dark:text-${product.theme.color}-400`} size={18} />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            to={`/contact?interest=${product.slug}`}
                                            className={`w-full text-center bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1`}
                                        >
                                            {t('productsPage.inquire')}
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* CONSULTING FRAMEWORKS SECTION */}
                <div className="max-w-7xl mx-auto mt-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                            {t('productsPage.consultingTitle')}
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            {t('productsPage.consultingSubtitle')}
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Framework 1 */}
                        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">The PACT Protocol</h3>
                            <p className="text-sm text-emerald-600 font-bold uppercase mb-4">Sustainability & Supply Chain</p>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                The definitive standard for Scope 3 emissions data exchange. By standardizing the "handshake" between suppliers and OEMs, PACT eliminates data silos and enables real-time carbon transparency.
                            </p>
                            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>API Specifications</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Data Model</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Authentication</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Verification</li>
                            </ul>
                        </div>

                        {/* Framework 2 */}
                        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Architectural Governance</h3>
                            <p className="text-sm text-blue-600 font-bold uppercase mb-4">Enterprise Strategy</p>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                A lightweight, non-blocking governance model that enables autonomous teams while ensuring compliance and security. Moving from "Gatekeepers" to "Guardrails".
                            </p>
                            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Decision Logs (ADRs)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Tech Radar</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Golden Paths</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>Automated Compliance</li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold hover:text-emerald-600 transition-colors"
                        >
                            Engage me to use these frameworks <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
