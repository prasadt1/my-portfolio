import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
    return (
        <>
            <SEO
                title="Enterprise Toolkits & Frameworks | Prasad Tilloo"
                description="Proven frameworks and architectural blueprints for Industry 4.0, HIPAA Compliance, and IT Effectiveness. Save months of effort."
                keywords="Industry 4.0 Toolkit, HIPAA Compliance Package, IT Assessment Framework, Enterprise Blueprints, Architecture Templates"
                type="website"
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
                            Battle-Tested Toolkits
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            Proven intellectual property and frameworks developed over 15+ years of enterprise consulting.
                            Save months of effort and reduce risk.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col"
                            >
                                <div className="text-4xl mb-4">{product.icon === 'Leaf' ? '🌱' : product.icon}</div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    {product.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                                    {product.description}
                                </p>

                                <div className="text-3xl font-bold text-emerald-600 mb-6">
                                    €{product.price.toLocaleString()}
                                </div>

                                <ul className="space-y-3 mb-8 text-sm">
                                    {product.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={`/contact?interest=${product.slug}`}
                                    className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    Inquire to Purchase
                                    <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        ))}
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
                            Proprietary Consulting Methodologies
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                            Exclusive intellectual property available through my consulting engagements. These are not sold separately but are the foundation of my delivery excellence.
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
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Open Standard</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> API-First Design</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> WBCSD Endorsed</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Cross-Industry</li>
                            </ul>
                        </div>
                        {/* Framework 2 */}
                        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">3-Stage Cloud Migration</h3>
                            <p className="text-sm text-blue-600 font-bold uppercase mb-4">Enterprise Architecture</p>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                A risk-averse methodology for moving regulated workloads to the cloud. Focuses on "Validation by Design" ensuring GxP/HIPAA compliance is baked in from Day 0, not audited in at Day 100.
                            </p>
                            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Assessment Phase</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Landing Zone Setup</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Migration Factory</li>
                                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Validation Automation</li>
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
