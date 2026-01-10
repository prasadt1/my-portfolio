import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Zap, BarChart3, Leaf } from 'lucide-react';
import SEO from '../components/SEO';

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t } = useTranslation();
    const product = products.find(p => p.slug === slug);

    if (!product) {
        return <Navigate to="/products" replace />;
    }

    // Retrieve i18n content
    // Note: In translation.json, keys match the product slugs (e.g. "industry40-toolkit")
    // If IDs and Slugs differ, we must ensure translation.json uses the correct identifier.
    // Based on my previous Edit, I used the keys present in the file which matched slugs mostly.
    const title = t(`products.${slug}.title`);
    const description = t(`products.${slug}.desc`);
    const features = t(`products.${slug}.features`, { returnObjects: true }) as string[];

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Leaf': return <Leaf className="w-12 h-12 text-emerald-500" />;
            case '🏭': return <Zap className="w-12 h-12 text-blue-500" />;
            case '🏥': return <ShieldCheck className="w-12 h-12 text-red-500" />;
            case '📊': return <BarChart3 className="w-12 h-12 text-purple-500" />;
            default: return <span className="text-4xl">{iconName}</span>;
        }
    };

    return (
        <>
            <SEO
                title={`${title} | Prasad Tilloo`}
                description={description}
                type="article"
            />
            <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link to="/products" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 mb-8 transition-colors">
                        <ArrowLeft size={20} /> Back to Toolkit Catalog
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700"
                    >
                        <div className="p-8 md:p-12">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    {getIcon(product.icon)}
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">
                                        {product.category === 'industry40' ? 'Industry 4.0' :
                                            product.category === 'compliance' ? 'Compliance' :
                                                product.category === 'carbon' ? 'Sustainability' : 'Consulting'}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                        {title}
                                    </h1>
                                </div>
                            </div>

                            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                {description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-12 mb-12">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">What's Included</h3>
                                    <ul className="space-y-4">
                                        {Array.isArray(features) && features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                                <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-1" size={20} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 h-fit">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-500 dark:text-slate-400">Investment</span>
                                        {product.category === 'consulting' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Tax Deductible</span>}
                                    </div>
                                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                        €{product.price.toLocaleString()}
                                    </div>
                                    <Link
                                        to={`/contact?interest=${product.slug}`}
                                        className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Purchase Toolkit <ArrowRight size={20} />
                                    </Link>
                                    <p className="text-xs text-center text-slate-500 mt-4">
                                        Includes license for single enterprise use.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;
