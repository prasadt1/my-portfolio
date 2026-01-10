import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    CheckCircle2,
    Building2,
    Shield,
    Leaf,
    Lightbulb,
    Target,
    Users,
    Zap,
    ChevronDown,
    FileText,
    Download
} from 'lucide-react';
import SEO from '../components/SEO';
import LogoCarousel from '../components/LogoCarousel';
import { caseStudies } from '../data/caseStudies';

const HomePageMultiDomain: React.FC = () => {
    return (
        <>
            <SEO
                title="Prasad Tilloo | Business-Focused Enterprise Architect & Problem Solver"
                description="15+ years driving business outcomes through innovative technical solutions. $1M+ savings, 20% revenue increases. React, Java, AWS, Azure, Kubernetes. Healthcare, Pharma, E-commerce, Climate Tech."
                keywords="enterprise architect, business problem solver, full-stack architect, cloud migration, HIPAA compliance, GDPR, React, Next.js, Java Spring Boot, AWS, Azure, Kubernetes, digital transformation, servant leadership, innovation"
                type="website"
            />

            <div className="min-h-screen font-sans">
                {/* HERO SECTION - Simplified & Larger Typography */}
                <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-32 md:py-48 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center"
                        >
                            {/* Pre-headline */}
                            <div className="inline-block bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 px-6 py-3 rounded-full mb-8">
                                <span className="text-emerald-300 font-semibold">
                                    Business-Focused Problem Solver & Enterprise Architect
                                </span>
                            </div>

                            {/* Main Headline */}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                                I Don't Just Build Systems—
                                <br />
                                <span className="text-emerald-400">I Solve Business Problems</span>
                            </h1>

                            {/* Subheadline */}
                            <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                                15+ years driving business outcomes through innovative technical solutions.
                                <br />
                                From hands-on architecture to Fortune 100 ecosystem leadership.
                            </p>

                            {/* Business Outcomes Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                                >
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">$1M+</div>
                                    <div className="text-sm text-slate-300">Cost Savings Delivered</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                                >
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">20%</div>
                                    <div className="text-sm text-slate-300">Revenue Increases</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                                >
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">30%</div>
                                    <div className="text-sm text-slate-300">Efficiency Gains</div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                                >
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">100+</div>
                                    <div className="text-sm text-slate-300">Companies Impacted</div>
                                </motion.div>
                            </div>

                            {/* Value Proposition Bullets */}
                            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12 text-left">
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <div className="font-bold text-white mb-1">Innovation-Driven</div>
                                        <div className="text-sm text-slate-300">Out-of-box thinking for complex challenges</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Target className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <div className="font-bold text-white mb-1">Business-First</div>
                                        <div className="text-sm text-slate-300">Revenue, cost, and impact focused</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <div className="font-bold text-white mb-1">Servant Leader</div>
                                        <div className="text-sm text-slate-300">Empathetic, collaborative approach</div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Zap className="text-emerald-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <div className="font-bold text-white mb-1">Full-Stack</div>
                                        <div className="text-sm text-slate-300">Design to deployment to leadership</div>
                                    </div>
                                </div>
                            </div>

                            {/* Recruiter / Executive CTA Bar */}
                            <div className="mb-12 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 max-w-4xl mx-auto">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="text-left flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                                For Recruiters
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">
                                            Hiring an Enterprise Architect?
                                        </h3>
                                        <p className="text-sm text-slate-300">
                                            Get the executive summary of my 15+ years experience.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <a
                                            href="/resume.pdf"
                                            download
                                            className="flex items-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors text-sm"
                                        >
                                            <Download size={18} />
                                            Download Resume
                                        </a>
                                        <Link
                                            to="/projects"
                                            className="flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-5 py-3 rounded-lg font-bold transition-all text-sm"
                                        >
                                            <FileText size={18} />
                                            View Portfolio
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Dual CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="https://calendly.com/prasadtilloo/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
                                >
                                    Let's Solve Your Challenge
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                                </a>

                                <a
                                    href="#how-i-work"
                                    className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 flex items-center gap-3"
                                >
                                    See How I Work
                                    <ChevronDown className="group-hover:translate-y-1 transition-transform" size={24} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* LOGO CAROUSEL */}
                <LogoCarousel />

                {/* HOW I WORK SECTION */}
                <section id="how-i-work" className="py-32 bg-white dark:bg-slate-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
                                How I Approach Problems
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                                Not through technology for technology's sake—but through
                                business-first, human-centered innovation
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Principle 1: Business First */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-8 border-2 border-emerald-200 dark:border-emerald-700"
                            >
                                <div className="absolute -top-4 -left-4 bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                    1
                                </div>

                                <Target className="w-12 h-12 text-emerald-600 mb-4 mt-4" />

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Business Outcomes First
                                </h3>

                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    I start with: "What business problem are we solving?" Not: "What
                                    technology should we use?"
                                </p>

                                <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 text-sm">
                                    <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                                        Example:
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        Delivery Hero needed revenue growth → Display Ads platform
                                        → 20% revenue increase
                                    </div>
                                </div>
                            </motion.div>

                            {/* Principle 2: Creative Innovation */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-700"
                            >
                                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                    2
                                </div>

                                <Lightbulb className="w-12 h-12 text-blue-600 mb-4 mt-4" />

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Out-of-Box Thinking
                                </h3>

                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    I challenge assumptions and find creative solutions others miss.
                                    Innovation over convention.
                                </p>

                                <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 text-sm">
                                    <div className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                                        Example:
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        BRITA: Prototyped AI-driven search optimization to future-proof
                                        for Google AI results
                                    </div>
                                </div>
                            </motion.div>

                            {/* Principle 3: Servant Leadership */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 rounded-2xl p-8 border-2 border-violet-200 dark:border-violet-700"
                            >
                                <div className="absolute -top-4 -left-4 bg-violet-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                    3
                                </div>

                                <Users className="w-12 h-12 text-violet-600 mb-4 mt-4" />

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Empathetic Leadership
                                </h3>

                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    I lead by enabling others, not commanding. Collaboration and
                                    empathy over hierarchy.
                                </p>

                                <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 text-sm">
                                    <div className="font-semibold text-violet-700 dark:text-violet-400 mb-2">
                                        Example:
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        PACT: Aligned 100+ competing companies through facilitation,
                                        not force
                                    </div>
                                </div>
                            </motion.div>

                            {/* Principle 4: Hands-On Excellence */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="relative bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-8 border-2 border-orange-200 dark:border-orange-700"
                            >
                                <div className="absolute -top-4 -left-4 bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                                    4
                                </div>

                                <Zap className="w-12 h-12 text-orange-600 mb-4 mt-4" />

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    Hands-On Execution
                                </h3>

                                <p className="text-slate-700 dark:text-slate-300 mb-4">
                                    I don't just advise—I architect, code, and deploy. From design to
                                    production.
                                </p>

                                <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4 text-sm">
                                    <div className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                                        Example:
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400">
                                        SINE: Designed AND implemented PACT Catalog (Next.js, React,
                                        Java Spring Boot)
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Bottom tagline */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mt-16"
                        >
                            <div className="inline-block bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-4 rounded-xl shadow-lg">
                                <p className="text-xl font-bold">
                                    Result: Solutions that work for business, teams, and users
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* PATH SELECTOR - NEW SECTION */}
                <section id="path-selector" className="py-32 bg-white dark:bg-slate-800 scroll-mt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                                What Do You Need?
                            </h2>
                            <p className="text-2xl text-slate-600 dark:text-slate-300">
                                Choose your path to get started
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Option 1: Custom Consulting */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-10 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                            >
                                <div className="text-7xl mb-6">🤝</div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                    Custom Consulting
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 flex-grow">
                                    Complex transformation requiring hands-on architecture expertise
                                </p>
                                <ul className="space-y-3 mb-8 text-base">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Enterprise modernization</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Compliance implementation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Sustainability tech</span>
                                    </li>
                                </ul>
                                <a
                                    href="https://calendly.com/prasadtilloo/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/30"
                                >
                                    Book Strategy Call
                                </a>
                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium">
                                    €300/hour
                                </p>
                            </motion.div>

                            {/* Option 2: Ready-Made Products */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="group bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-3xl p-10 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
                                <div className="text-7xl mb-6">📦</div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                    Ready-Made Solutions
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 flex-grow">
                                    Battle-tested toolkits to accelerate your transformation
                                </p>
                                <ul className="space-y-3 mb-8 text-base">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Industry 4.0 frameworks</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Compliance packages</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Assessment tools</span>
                                    </li>
                                </ul>
                                <Link
                                    to="/products"
                                    className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-emerald-500/30"
                                >
                                    Browse Products
                                </Link>
                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium">
                                    €1,000 - €15,000
                                </p>
                            </motion.div>

                            {/* Option 3: View Proof */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="group bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 rounded-3xl p-10 border-2 border-violet-200 dark:border-violet-700 hover:border-violet-500 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
                            >
                                <div className="text-7xl mb-6">🔍</div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                    See the Proof
                                </h3>
                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 flex-grow">
                                    Explore case studies and real project outcomes
                                </p>
                                <ul className="space-y-3 mb-8 text-base">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">Fortune 500 projects</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">€2M+ delivered</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <span className="text-slate-700 dark:text-slate-200">12 compliance migrations</span>
                                    </li>
                                </ul>
                                <Link
                                    to="/projects"
                                    className="block w-full text-center bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-violet-500/30"
                                >
                                    View Case Studies
                                </Link>
                                <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium">
                                    Free to explore
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-slate-50 dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                                What I Can Help You With
                            </h2>
                            <p className="text-xl text-slate-600 dark:text-slate-300">
                                Three core areas where I drive business outcomes
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Pillar 1: Enterprise Transformation */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500"
                            >
                                <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Building2 className="text-blue-600" size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Enterprise Architecture & Implementation
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    Full-stack solutions from architecture to deployment.
                                    I don't just design—I build, lead teams, and deliver.
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                E-Commerce Modernization
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                BRITA: 6 EMEA markets migrated
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                Cloud-Native Platforms
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Boehringer: €500K AI/ML Data Lake
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                High-Scale APIs
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Delivery Hero: 5M+ daily transactions
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                                    <div className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                                        Business Impact:
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        20% revenue increase
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        to="/projects?category=architecture"
                                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                                    >
                                        View Projects
                                    </Link>
                                    <Link
                                        to="/products?category=blueprints"
                                        className="flex-1 text-center bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
                                    >
                                        Buy Blueprints
                                    </Link>
                                </div>

                                <div className="mt-4 text-center text-sm text-slate-500">
                                    Tech: React, Next.js, Java, AWS, Azure, Kubernetes
                                </div>
                            </motion.div>


                            {/* Pillar 2: Compliance-First Migration */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-violet-500"
                            >
                                <div className="bg-violet-100 dark:bg-violet-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Shield className="text-violet-600" size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Compliance-First Cloud Migration
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    Specialized in regulated industries. Zero breaches, 100% audit
                                    pass rate, significant cost savings.
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                Healthcare (HIPAA/FHIR)
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                PwC: $650K migration, $500K savings
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                Pharma (GDPR/GxP)
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Boehringer: Marketing & Sales compliance
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                E-Commerce (PCI-DSS)
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                BRITA: Multi-tenant GDPR compliance
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4 mb-6">
                                    <div className="text-sm font-semibold text-violet-900 dark:text-violet-300 mb-2">
                                        Track Record:
                                    </div>
                                    <div className="text-2xl font-bold text-violet-600">
                                        12+ migrations, zero breaches
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        to="/projects?category=compliance"
                                        className="flex-1 text-center bg-violet-600 hover:bg-violet-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                                    >
                                        View Projects
                                    </Link>
                                    <Link
                                        to="/products/hipaa-migration-kit"
                                        className="flex-1 text-center bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-4 py-3 rounded-lg font-semibold border-2 border-violet-600 hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-all"
                                    >
                                        Buy Kit
                                    </Link>
                                </div>

                                <div className="mt-4 text-center text-sm text-slate-500">
                                    Industries: Healthcare, Pharma, Finance, Retail
                                </div>
                            </motion.div >

                            {/* Pillar 3: Sustainability & Ecosystem */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-500 relative"
                            >
                                <div className="absolute -top-3 -right-3 bg-amber-400 text-slate-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                    ⭐ UNIQUE
                                </div>

                                <div className="bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                    <Leaf className="text-emerald-600" size={32} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                    Sustainability Tech & Ecosystem Building
                                </h3>

                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    Led PACT Protocol standardization. Designed, built, and aligned
                                    a global ecosystem—technical + organizational.
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                Global Standard Author
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                PACT Tech Spec & API definition
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                Platform Implementation
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Designed & built PACT Online Catalog
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="text-emerald-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <div className="font-semibold text-slate-900 dark:text-white">
                                                Ecosystem Facilitation
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                Aligned Microsoft, SAP, Siemens, 100+ cos
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 mb-6">
                                    <div className="text-sm font-semibold text-emerald-900 dark:text-emerald-300 mb-2">
                                        Impact:
                                    </div>
                                    <div className="text-2xl font-bold text-emerald-600">
                                        100+ companies adopted
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        to="/projects/pact-protocol"
                                        className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                                    >
                                        View Project
                                    </Link>
                                    <Link
                                        to="/consultation"
                                        className="flex-1 text-center bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-lg font-semibold border-2 border-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all"
                                    >
                                        Get Consulting
                                    </Link>
                                </div>

                                <div className="mt-4 text-center text-sm text-slate-500">
                                    Tech: Next.js, Java Spring Boot, Azure, Kubernetes
                                </div>
                            </motion.div>
                        </div>

                        {/* NEW: Featured Projects Section (Dynamic) */}
                        <div className="mt-20">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">
                                Featured Case Studies
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                {caseStudies.slice(0, 4).map((study, index) => (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 group relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            {index === 0 ? <Zap size={100} /> : <Target size={100} />}
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                                    {study.header.client.industry}
                                                </span>
                                                {index === 0 && (
                                                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full font-bold">
                                                        New
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors">
                                                {study.header.title}
                                            </h4>

                                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 line-clamp-3">
                                                {study.challenge.situation}
                                            </p>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3">
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase">Impact</div>
                                                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                                                        {study.outcomes.hero_metric.value} {study.outcomes.hero_metric.label}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <Link
                                                    to={`/projects/${study.slug}`}
                                                    className="flex-1 inline-flex justify-center items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors"
                                                >
                                                    View Case Study <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <Link
                                    to="/projects"
                                    className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                                >
                                    View All Projects <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div >
                </section >

                {/* LEADERSHIP VALUES BANNER */}
                < section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-emerald-900 text-white" >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Why Work With Me</h2>
                            <p className="text-xl text-slate-200">
                                More than technical skills—it's about how I work
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <h3 className="font-bold text-lg mb-2">Business-First</h3>
                                <p className="text-sm text-slate-200">
                                    Every decision measured by business impact, not technical ego
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                <div className="text-4xl mb-4">💡</div>
                                <h3 className="font-bold text-lg mb-2">Innovation-Driven</h3>
                                <p className="text-sm text-slate-200">
                                    Creative problem-solving when conventional approaches fail
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                <div className="text-4xl mb-4">🤝</div>
                                <h3 className="font-bold text-lg mb-2">Servant Leader</h3>
                                <p className="text-sm text-slate-200">
                                    Empathetic, collaborative approach that empowers teams
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="font-bold text-lg mb-2">Hands-On</h3>
                                <p className="text-sm text-slate-200">
                                    From strategy to code to deployment—I execute, not just advise
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-12">
                            <blockquote className="text-2xl font-serif italic text-white/90">
                                "I solve business problems through people, process, and technology—in that order."
                            </blockquote>
                        </div>
                    </div>
                </section >

                {/* FINAL CTA - Simplified */}
                < section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center" >
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            Ready to Transform?
                        </h2>
                        <a
                            href="#path-selector"
                            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all"
                        >
                            Choose Your Path
                        </a>
                    </div>
                </section >
            </div>
        </>
    );
};

export default HomePageMultiDomain;
