
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Building2,
    Shield,
    Leaf,
    Package,
    Award,
    TrendingUp,
    Zap
} from 'lucide-react';
import SEO from '../components/SEO';

const HomePageMultiDomain: React.FC = () => {
    return (
        <>
            <SEO
                title="Enterprise Transformation: Services + Products"
                description="15+ years architecting digital transformation. Consulting services + battle-tested toolkits for enterprise modernization, compliance, and sustainability tech."
                keywords="enterprise architecture, digital transformation, Industry 4.0, HIPAA compliance, PACT protocol, carbon transparency, IT consulting, PwC"
                type="website"
            />

            <div className="min-h-screen">
                {/* HERO SECTION - Multi-Domain */}
                <section className="relative bg-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900 transition-colors duration-300 py-20 md:py-32 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            {/* Main Headline */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
                                Enterprise Transformation:
                                <br />
                                <span className="text-emerald-600 dark:text-emerald-400">Services + Battle-Tested Products</span>
                            </h1>

                            {/* Subheadline */}
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                                15+ years architecting digital transformation for <strong>PwC</strong>, <strong>Boehringer Ingelheim</strong>,
                                <strong> Lonza</strong>, <strong>AstraZeneca</strong>, and Fortune 100 sustainability leaders.
                            </p>

                            {/* Client Logos */}
                            <div className="mb-10">
                                <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                                    Trusted By
                                </p>
                                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-x-16 md:gap-y-12 opacity-90 max-w-5xl mx-auto">
                                    {/* PwC */}
                                    <div className="group w-24 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/PricewaterhouseCoopers_Logo.svg" alt="PwC" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Boehringer Ingelheim - AUTHENTIC PATH */}
                                    <div className="group w-16 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                            <title>Boehringer Ingelheim</title>
                                            <path d="M5.41 22.03c-1.72-1.24-2.63-2.15-3.49-3.46A12.185 12.185 0 0 1 0 12.03C0 5.38 5.36 0 12 0s12 5.38 12 12c0 2.73-.93 5.46-2.58 7.48-.68.86-1.26 1.36-2.83 2.55v-7.02h1.19v4.8c.88-1.04 1.31-1.67 1.74-2.43.88-1.57 1.36-3.51 1.36-5.38 0-6.06-4.88-10.99-10.89-10.99S1.11 5.94 1.11 12.08c0 2.8.99 5.28 3.08 7.73v-4.8H5.4v7.02Zm2.37 1.21c-.23-.05-.76-.3-1.19-.53V15h1.19v8.24Zm7.23-16.92L12 4 8.99 6.32l-.66-.86 3.66-2.86 3.66 2.86-.66.86Zm-4.83 17.56c-.43-.08-.45-.08-.61-.13-.13-.02-.18-.02-.58-.13V7.2h1.19v16.67Zm2.4.1c-.18.02-.23.02-.48.02-.38 0-.51 0-.71-.02V7.2h1.19v16.78Zm2.4-.38c-.38.13-.71.2-1.19.3V7.2h1.19v16.4Zm2.43-.88c-.38.18-.61.28-1.21.56v-8.27h1.21v7.71Z" fill="#003366" className="dark:fill-white" />
                                        </svg>
                                    </div>

                                    {/* Microsoft - AUTHENTIC PATH */}
                                    <div className="group w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <svg viewBox="0 0 1000 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                            {/* 4 Squares Icon */}
                                            <rect x="0" y="0" width="100" height="100" fill="#F25022" />
                                            <rect x="110" y="0" width="100" height="100" fill="#7FBA00" />
                                            <rect x="0" y="110" width="100" height="100" fill="#00A4EF" />
                                            <rect x="110" y="110" width="100" height="100" fill="#FFB900" />
                                            {/* Text */}
                                            <text x="260" y="160" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="600" fontSize="150" fill="#737373" className="dark:fill-white">Microsoft</text>
                                        </svg>
                                    </div>

                                    {/* AstraZeneca */}
                                    <div className="group w-36 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/astrazeneca-1.svg" alt="AstraZeneca" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Lonza */}
                                    <div className="group w-32 h-14 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Lonza_Logo.svg" alt="Lonza" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* WBCSD */}
                                    <div className="group w-28 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/WBCSD.svg" alt="WBCSD" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* AT&T - AUTHENTIC PATH */}
                                    <div className="group w-28 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                            <title>AT&amp;T</title>
                                            <path d="M4.584 21.438a12.077 12.077 0 0 0 7.349 2.495 12 12 0 0 0 7.887-2.967c-.944.607-3.64 2.023-7.887 2.023-3.708 0-6.068-.81-7.349-1.55m8.158.606c2.966 0 6.202-.809 8.09-2.427.539-.405 1.01-1.011 1.483-1.753.27-.472.539-1.011.741-1.483-1.82 2.63-7.011 4.315-12.404 4.315-3.776 0-7.888-1.214-9.506-3.573 1.483 3.236 6 4.92 11.596 4.92m-3.236-5.257C3.37 16.787.472 13.955 0 12c0 .674.067 1.483.202 2.09.068.27.27.674.607 1.079 1.483 1.55 5.191 3.707 11.595 3.707 8.697 0 10.72-2.898 11.124-3.842.27-.674.472-1.888.472-2.967v-.674c-.607 2.292-8.022 5.394-14.494 5.394m-8.427-9.91C.742 7.55.337 8.763.202 9.37c-.067.27 0 .404.068.607.741 1.55 4.45 4.044 13.078 4.044 5.259 0 9.371-1.28 10.045-3.64.135-.404.135-.876 0-1.483-.202-.674-.472-1.483-.809-2.09.068 3.101-8.562 5.124-12.944 5.124-4.719 0-8.696-1.888-8.696-4.248.067-.337.135-.606.135-.809M19.82 3.034c.068.067.068.135.068.27 0 1.348-4.045 3.64-10.517 3.64-4.787 0-5.663-1.753-5.663-2.9 0-.404.135-.808.472-1.213-.607.607-1.146 1.147-1.686 1.82-.202.27-.337.54-.337.675 0 2.36 5.865 3.977 11.259 3.977 5.797 0 8.427-1.887 8.427-3.573 0-.606-.203-.943-.81-1.618a17.301 17.301 0 0 0-1.213-1.078m-1.753-1.281A11.794 11.794 0 0 0 11.933.067C9.64.067 7.55.674 5.73 1.82c-.539.27-.876.54-.876.877 0 1.01 2.36 2.09 6.54 2.09 4.112 0 7.348-1.214 7.348-2.36.067-.202-.203-.405-.675-.674" fill="#009FDB" className="dark:fill-white" />
                                        </svg>
                                    </div>

                                    {/* Bank of America - AUTHENTIC PATH */}
                                    <div className="group w-44 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                            <title>Bank of America</title>
                                            <path d="M15.194 7.57c.487-.163 1.047-.307 1.534-.451-1.408-.596-3.176-1.227-4.764-1.625-.253.073-1.01.271-1.534.434.541.162 2.328.577 4.764 1.642zm-8.896 6.785c.577.343 1.19.812 1.786 1.209 3.952-3.068 7.85-5.432 12.127-6.767-.596-.307-1.119-.578-1.787-.902-2.562.65-6.947 2.4-12.126 6.46zm-.758-6.46c-2.112.974-4.331 2.31-5.54 3.085.433.199.866.361 1.461.65 2.671-1.805 4.764-2.905 5.594-3.266-.595-.217-1.154-.361-1.515-.47zm8.066.234c-.686-.379-3.068-1.263-4.71-1.642-.487.18-1.173.451-1.642.65.595.162 2.815.758 4.71 1.714.487-.235 1.173-.523 1.642-.722zm-3.374 1.552c-.56-.27-1.173-.523-1.643-.74-1.425.704-3.284 1.769-5.63 3.447.505.27 1.047.595 1.624.92 1.805-1.335 3.627-2.598 5.649-3.627zm1.732 8.825c3.79-3.249 9.113-6.407 12.036-7.544a48.018 48.018 0 00-1.949-1.155c-3.771 1.246-8.174 4.007-12.108 7.129.667.505 1.371 1.028 2.02 1.57zm2.851-.235h-.108l-.18-.27h-.109v.27h-.072v-.596h.27c.055 0 .109 0 .145.036.054.019.072.073.072.127 0 .108-.09.162-.198.162zm-.289-.343c.09 0 .199.018.199-.09 0-.072-.072-.09-.144-.09h-.163v.18zm-.523.036c0-.289.235-.523.541-.523.307 0 .542.234.542.523a.543.543 0 01-.542.542.532.532 0 01-.54-.542m.107 0c0 .235.199.433.451.433a.424.424 0 100-.848c-.27 0-.45.199-.45.415" fill="#012169" className="dark:fill-white" />
                                        </svg>
                                    </div>

                                    {/* Kaiser Permanente */}
                                    <div className="group w-40 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/KP_logo.svg" alt="Kaiser Permanente" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* AmeriHealth */}
                                    <div className="group w-40 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/AmeriHealth Administrators_idIkdC-Xw2_1.svg" alt="AmeriHealth Administrators" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* PMI */}
                                    <div className="group w-24 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/cdnlogo.com_pmi.svg" alt="PMI" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Comcast */}
                                    <div className="group w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Comcast.svg" alt="Comcast" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Pfizer */}
                                    <div className="group w-28 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Pfizer_(2021).svg" alt="Pfizer" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* DaVita */}
                                    <div className="group w-28 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/DaVita_logo.svg" alt="DaVita" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Ameritas */}
                                    <div className="group w-44 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Ameritas-01.svg" alt="Ameritas" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Anthem */}
                                    <div className="group w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Anthem,_Inc._Logo.svg" alt="Anthem" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* BCBS */}
                                    <div className="group w-40 h-14 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/blue-cross-blue-shield-1.svg" alt="Blue Cross Blue Shield" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Delivery Hero */}
                                    <div className="group w-36 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Delivery-Hero-Logo-Red.png" alt="Delivery Hero" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Brita */}
                                    <div className="group w-24 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Brita_(Unternehmen)_logo.svg" alt="BRITA" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* SAP */}
                                    <div className="group w-24 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/SAP_2011_logo.svg" alt="SAP" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Siemens */}
                                    <div className="group w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Siemens-logo.svg" alt="Siemens" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Mercedes-Benz */}
                                    <div className="group w-20 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Mercedes-Logo.svg" alt="Mercedes-Benz" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* BMW */}
                                    <div className="group w-20 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/BMW.svg" alt="BMW" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Novartis */}
                                    <div className="group w-36 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Novartis-Logo.svg" alt="Novartis" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Procter & Gamble */}
                                    <div className="group w-20 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Procter_&_Gamble_logo.svg" alt="Procter & Gamble" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* Unilever */}
                                    <div className="group w-20 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/Unilever.svg" alt="Unilever" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>

                                    {/* EcoVadis */}
                                    <div className="group w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                        <img src="/assets/logos/ecovadis-vector-logo.svg" alt="EcoVadis" className="h-full w-auto object-contain dark:brightness-0 dark:invert" />
                                    </div>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10">
                                {[
                                    { value: '15+', label: 'Years Experience' },
                                    { value: '€2M+', label: 'Projects Delivered' },
                                    { value: '100+', label: 'Companies Impacted' },
                                    { value: '20+', label: 'Products & Toolkits' }
                                ].map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{stat.value}</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Dual CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="https://calendly.com/prasadtilloo/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                >
                                    Book Consultation
                                    <span className="text-sm opacity-80">(€300/hr)</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </a>

                                <Link
                                    to="/products"
                                    className="group bg-white dark:bg-white/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/20 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3"
                                >
                                    <Package size={20} />
                                    Browse Products
                                    <span className="text-sm opacity-60 dark:opacity-80 font-normal">(€1K-15K)</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* THREE PILLARS - Services */}
                <section className="py-20 bg-white dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                                Consulting Services
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                Three core pillars of enterprise transformation expertise
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Pillar 1: Enterprise Modernization */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl"
                            >
                                <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Building2 className="text-white" size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Enterprise Modernization
                                </h3>

                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                        <span>Legacy to Cloud (7.8M LOC migrated)</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                        <span>eCommerce Platforms (Shopware → Shopify)</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                        <span>Industry 4.0 (Lonza, AstraZeneca RFPs)</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                                        <span>Microservices Architecture</span>
                                    </li>
                                </ul>

                                <div className="flex gap-3">
                                    <Link
                                        to="/projects?category=modernization"
                                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                                    >
                                        View Projects
                                    </Link>
                                    <Link
                                        to="/products?category=industry40"
                                        className="flex-1 text-center bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 dark:hover:bg-slate-600 transition-all"
                                    >
                                        Buy Toolkit
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Pillar 2: Compliance Engineering */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 rounded-2xl p-8 border-2 border-violet-200 dark:border-violet-700 hover:border-violet-500 transition-all duration-300 hover:shadow-2xl"
                            >
                                <div className="bg-violet-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Shield className="text-white" size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Compliance Engineering
                                </h3>

                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-1" size={20} />
                                        <span>HIPAA/FHIR (12 migrations, zero breaches)</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-1" size={20} />
                                        <span>GDPR Frameworks</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-1" size={20} />
                                        <span>IT Effectiveness Assessments</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-1" size={20} />
                                        <span>DevOps Maturity</span>
                                    </li>
                                </ul>

                                <div className="flex gap-3">
                                    <Link
                                        to="/projects?category=compliance"
                                        className="flex-1 text-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                                    >
                                        View Projects
                                    </Link>
                                    <Link
                                        to="/products?category=compliance"
                                        className="flex-1 text-center bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 px-4 py-2 rounded-lg font-semibold border-2 border-violet-600 hover:bg-violet-50 dark:hover:bg-slate-600 transition-all"
                                    >
                                        Buy Package
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Pillar 3: Sustainability Tech */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-8 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-2xl relative"
                            >
                                {/* "UNIQUE" Badge */}
                                <div className="absolute -top-3 -right-3 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    ⭐ UNIQUE
                                </div>

                                <div className="bg-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Leaf className="text-white" size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Sustainability Tech
                                </h3>

                                <ul className="space-y-3 mb-6">
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                                        <span>PACT Protocol (Author & PM)</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                                        <span>Carbon Transparency Network</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                                        <span>ESG Reporting Infrastructure</span>
                                    </li>
                                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                                        <span>Fortune 100 Adoption (MS, SAP, Siemens)</span>
                                    </li>
                                </ul>

                                <div className="flex gap-3">
                                    <Link
                                        to="/projects/pact-carbon-transparency"
                                        className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all"
                                    >
                                        View Projects
                                    </Link>
                                    <Link
                                        to="/products?category=carbon"
                                        className="flex-1 text-center bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg font-semibold border-2 border-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-600 transition-all"
                                    >
                                        Buy Starter Kit
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* PRODUCTS SHOWCASE */}
                <section className="py-20 bg-slate-50 dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-bold mb-4">
                                ACCELERATE YOUR TRANSFORMATION
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                                Battle-Tested Toolkits & Frameworks
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                Save 6-12 months of development time with proven frameworks from 15+ years architecting Fortune 500 transformations
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {/* Product 1: Industry 4.0 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">🏭</div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    Industry 4.0 Digital Transformation Toolkit
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    Based on Lonza & AstraZeneca RFPs
                                </p>

                                <div className="text-3xl font-bold text-emerald-600 mb-4">
                                    €12,000
                                </div>

                                <ul className="space-y-2 mb-6 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Assessment Framework & Maturity Model</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Implementation Roadmap Template</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>ROI Calculator (Manufacturing-Specific)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Includes 2hr consultation + 30-day support</span>
                                    </li>
                                </ul>

                                <div className="flex gap-3">
                                    <Link
                                        to="/products/industry40-toolkit"
                                        className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Product 2: HIPAA Compliance */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">🏥</div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    HIPAA Cloud Migration Compliance Package
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    Used in 12 successful migrations
                                </p>

                                <div className="text-3xl font-bold text-violet-600 mb-4">
                                    €8,000
                                </div>

                                <ul className="space-y-2 mb-6 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Gap Analysis Template</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>AWS Architecture Blueprints (HIPAA-Ready)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Security Controls Checklist</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Includes 2hr implementation consultation</span>
                                    </li>
                                </ul>

                                <div className="flex gap-3">
                                    <Link
                                        to="/products/hipaa-compliance-package"
                                        className="flex-1 text-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Product 3: IT Effectiveness */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                            >
                                <div className="text-4xl mb-4">📊</div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                    IT Effectiveness Assessment Framework
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    Benchmark against 100+ companies
                                </p>

                                <div className="text-3xl font-bold text-blue-600 mb-4">
                                    €5,000
                                </div>

                                <ul className="space-y-2 mb-6 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>50-Point Assessment Questionnaire</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Automated Scoring & Benchmarking</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Executive Summary Template</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                                        <span>Includes 1hr consultation</span>
                                    </li>
                                </ul>

                                <div className="flex gap-3">
                                    <Link
                                        to="/products/it-effectiveness-assessment"
                                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                            >
                                View All 20+ Products
                                <ArrowRight size={20} />
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* PwC EXPERIENCE SECTION */}
                <section className="py-20 bg-white dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-12 border-2 border-orange-200 dark:border-orange-700"
                        >
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="inline-block bg-orange-600 text-white px-4 py-2 rounded-lg font-bold mb-4">
                                        CONSULTING EXPERIENCE
                                    </div>
                                    <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                        PwC Management & Technology Consultant
                                    </h2>
                                    <p className="text-xl text-slate-700 dark:text-slate-300 mb-8">
                                        Led enterprise transformation initiatives for Fortune 500 pharmaceutical and manufacturing companies
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-start gap-3">
                                            <Award className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">RFP Development & Delivery</div>
                                                <div className="text-slate-600 dark:text-slate-400">Lonza, AstraZeneca, Novartis</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Zap className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">Industry 4.0 Strategy & Implementation</div>
                                                <div className="text-slate-600 dark:text-slate-400">Digital transformation roadmaps</div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <TrendingUp className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">Technology Vendor Evaluations</div>
                                                <div className="text-slate-600 dark:text-slate-400">R&D and manufacturing systems</div>
                                            </div>
                                        </li>
                                    </ul>

                                    <Link
                                        to="/about#pwc-experience"
                                        className="inline-flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all"
                                    >
                                        View Full Experience
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-2xl">
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                        Key Achievements
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-4xl font-bold text-orange-600 mb-2">€50M+</div>
                                            <div className="text-slate-600 dark:text-slate-400">Initiative Values (RFPs Won)</div>
                                        </div>
                                        <div>
                                            <div className="text-4xl font-bold text-orange-600 mb-2">5+</div>
                                            <div className="text-slate-600 dark:text-slate-400">Fortune 500 Pharma Clients</div>
                                        </div>
                                        <div>
                                            <div className="text-4xl font-bold text-orange-600 mb-2">15+</div>
                                            <div className="text-slate-600 dark:text-slate-400">Accelerators & Frameworks Created</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section className="py-20 bg-gradient-to-br from-emerald-600 via-blue-600 to-violet-600 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Ready to Transform Your Enterprise?
                            </h2>
                            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                                Whether you need hands-on consulting or ready-to-use toolkits, I can help accelerate your transformation
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mb-12">
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30">
                                    <div className="text-3xl mb-4">🤝</div>
                                    <h3 className="text-2xl font-bold mb-4">Need Custom Consulting?</h3>
                                    <p className="text-white/80 mb-6">
                                        For complex transformations requiring hands-on expertise
                                    </p>
                                    <a
                                        href="https://calendly.com/prasadtilloo/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-white text-emerald-600 px-6 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all"
                                    >
                                        Book Strategy Call
                                    </a>
                                </div>

                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/30">
                                    <div className="text-3xl mb-4">📦</div>
                                    <h3 className="text-2xl font-bold mb-4">Want Ready-Made Solutions?</h3>
                                    <p className="text-white/80 mb-6">
                                        Browse battle-tested toolkits and frameworks
                                    </p>
                                    <Link
                                        to="/products"
                                        className="block w-full bg-white/20 text-white border-2 border-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                                <p className="text-white/90 text-sm">
                                    <CheckCircle2 className="inline mr-2" size={20} />
                                    Not sure which option? Book a free 30-min consultation to discuss your needs
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomePageMultiDomain;
