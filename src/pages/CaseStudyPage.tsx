import { rewriteContent } from '../services/contentRewriter';
import { User, Code, Briefcase } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    ArrowRight,
    AlertCircle,
    Target,
    Layers,
    Calendar
} from 'lucide-react';
import { projects } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';

const CaseStudyPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t, i18n } = useTranslation();
    const [persona, setPersona] = useState<'executive' | 'technical' | 'standard'>('standard');
    const [rewrittenSummary, setRewrittenSummary] = useState<string>('');
    const [rewriting, setRewriting] = useState(false);
    const study = projects.find(s => s.slug === slug || s.id === slug);

    // Auto-rewrite when persona changes
    useEffect(() => {
        if (!study || persona === 'standard') {
            setRewrittenSummary('');
            return;
        }

        const fetchRewrite = async () => {
            setRewriting(true);
            const newText = await rewriteContent({
                currentText: study.challenge.situation,
                sectionType: 'executive_summary', // Simplification for demo
                persona: persona
            });
            setRewrittenSummary(newText);
            setRewriting(false);
        };
        fetchRewrite();
    }, [persona, study]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!study) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            Case Study Coming Soon
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                            The full case study for this project is currently being prepared.
                        </p>
                        <Link 
                            to="/projects" 
                            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                        >
                            <ArrowLeft size={18} />
                            Return to Projects
                        </Link>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Need Similar Architecture Validation?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            If you're evaluating a similar project or architecture decision, I offer independent reviews 
                            to help identify risks, gaps, and optimization opportunities before committing budget.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                            >
                                Request Architecture Review
                                <ArrowRight size={18} />
                            </Link>
                            <a
                                href="https://calendly.com/prasad-sgsits/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white px-6 py-3 rounded-lg font-semibold transition-all hover:border-emerald-500"
                            >
                                Book 30-Min Consultation
                            </a>
                        </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            <strong className="text-slate-900 dark:text-white">Full case study available upon request.</strong>
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Contact: <a href="mailto:prasad@prasadtilloo.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">prasad@prasadtilloo.com</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
            {/* Header */}
            <section className="bg-slate-50 dark:bg-slate-800 pb-16 pt-12 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Row: Back Link */}
                    <div className="flex items-center mb-8">
                        <Link to="/projects" className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">
                            <div className="p-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 group-hover:border-emerald-500/50 transition-colors">
                                <ArrowLeft size={18} />
                            </div>
                            Back to Projects
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column: Title & Metadata */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest text-sm uppercase flex items-center gap-2">
                                    <span className="w-8 h-0.5 bg-emerald-600 dark:text-emerald-400 inline-block"></span>
                                    {study.header.eyebrow}
                                </div>
                                {study.visualType && (
                                    <div className="ml-4 opacity-60">
                                        <ProjectVisual visualType={study.visualType} size="md" />
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                                {study.header.title}
                            </h1>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed max-w-2xl">
                                {study.challenge.situation.split('.').slice(0, 2).join('.') + '.'}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8 text-sm">
                                <span className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 font-medium text-slate-700 dark:text-slate-300">
                                    {study.header.client.type}
                                </span>
                                <span className="px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 font-medium text-slate-700 dark:text-slate-300">
                                    {study.header.client.industry}
                                </span>
                                {study.domains.slice(0, 2).map((domain, idx) => (
                                    <span key={idx} className="px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 font-medium text-emerald-700 dark:text-emerald-400">
                                        {domain}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Column: Hero Metric Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative mt-8 lg:mt-0"
                        >
                            <div className="absolute inset-0 bg-emerald-500 blur-[80px] opacity-20 dark:opacity-10 rounded-full"></div>
                            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/20">
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                                            {/* Dynamic Icon based on Metric */}
                                            <span className="text-3xl">{study.outcomes.hero_metric.icon || '🚀'}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-emerald-100 text-sm font-medium uppercase tracking-wider mb-1">Impact</div>
                                            <div className="text-5xl lg:text-6xl font-bold tracking-tight">{study.outcomes.hero_metric.value}</div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-medium leading-snug mb-8 text-white/90">
                                        {study.outcomes.hero_metric.label}
                                    </h3>

                                    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                                        {study.outcomes.secondary_metrics.slice(0, 2).map((metric, idx) => (
                                            <div key={idx}>
                                                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                                                <div className="text-sm text-emerald-100/80 font-medium">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Background texture */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Executive Summary Card */}
            <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <Target className="text-emerald-600 dark:text-emerald-400" size={20} />
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t('caseStudy.executiveSummary.impact')}
                                    </h3>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                    {study.outcomes.hero_metric.value}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {study.outcomes.hero_metric.label}
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <Layers className="text-blue-600 dark:text-blue-400" size={20} />
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t('caseStudy.executiveSummary.scope')}
                                    </h3>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                    {study.approach.phases.length > 0 ? study.approach.phases.length + ' Phases' : 'Full Engagement'}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {study.approach.methodology}
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                    <Briefcase className="text-purple-600 dark:text-purple-400" size={20} />
                                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                        {t('caseStudy.executiveSummary.role')}
                                    </h3>
                                </div>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                    {study.projectType === 'framework' || study.projectType === 'standard' ? 'Lead Architect' : 'Solution Architect'}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {study.challenge.why_prasad}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Challenge Section */}

            {/* Challenge Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section 1: Challenge Narrative (Wide for readability) */}
                    <div className="max-w-4xl mb-16">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">The Challenge</h2>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">Beta Feature</span>
                        </div>

                        {/* Persona Tabs */}
                        <div className="mb-0">
                            <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-t-xl w-fit border-t border-x border-slate-200 dark:border-slate-700">
                                {(['standard', 'executive', 'technical'] as const).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPersona(p)}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                            ${persona === p
                                                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-sm ring-1 ring-black/5'
                                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}
                                        `}
                                    >
                                        {p === 'standard' && <Briefcase size={14} />}
                                        {p === 'executive' && <User size={14} />}
                                        {p === 'technical' && <Code size={14} />}
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </button>
                                ))}
                            </div>
                            {/* Content Box */}
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-b-xl rounded-r-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                                {/* Active Tab Indicator Line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 to-transparent"></div>

                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                    {rewriting ? (
                                        <span className="flex items-center gap-3 text-slate-400 animate-pulse">
                                            <span className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></span>
                                            Adapting content for {persona} context...
                                        </span>
                                    ) : (
                                        <motion.span
                                            key={persona}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {persona === 'standard' ? study.challenge.situation : rewrittenSummary}
                                        </motion.span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-700/50 flex gap-4 items-start">
                                <AlertCircle className="text-amber-600 dark:text-amber-500 shrink-0 mt-1" size={20} />
                                <div>
                                    <div className="text-sm font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wide mb-1">Urgency</div>
                                    <p className="text-slate-900 dark:text-white italic">"{study.challenge.urgency}"</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Pain Points Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {study.challenge.pain_points.map((pain, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                                <div className="text-4xl mb-4">{pain.icon}</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{pain.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{pain.description}</p>
                                <p className="text-xs font-bold text-red-500 dark:text-red-400 uppercase">Impact: {pain.impact}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What I Delivered Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                        {t('caseStudy.whatIDelivered.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {study.approach.phases.map((phase, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                                        {phase.number}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{phase.title}</h3>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                    {phase.deliverable}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    <Clock size={14} />
                                    <span>{phase.duration}</span>
                                </div>
                            </motion.div>
                        ))}
                        {study.approach.unique_differentiator && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-900/10 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                                        ⭐
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('caseStudy.whatIDelivered.differentiator')}</h3>
                                </div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    {study.approach.unique_differentiator}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            The Approach: {study.approach.methodology}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Why me: {study.challenge.why_prasad}
                        </p>
                    </div>

                    <div className="space-y-8 relative">
                        {/* Thread line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 -z-10 hidden md:block"></div>

                        {study.approach.phases.map((phase, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-1 w-full">
                                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 hover:border-emerald-500 transition-colors">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">
                                                Phase {phase.number}
                                            </span>
                                            <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                                                <Clock size={16} /> {phase.duration}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{phase.title}</h3>
                                        <ul className="space-y-2 mb-6">
                                            {phase.activities.map((activity, aIdx) => (
                                                <li key={aIdx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                    {activity}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-lg">
                                            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-1">Outcome</div>
                                            <div className="text-sm text-slate-900 dark:text-white font-medium">{phase.outcome}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Number Bubble */}
                                <div className="w-8 h-8 rounded-full bg-emerald-600 border-4 border-white dark:border-slate-800 flex items-center justify-center text-white font-bold z-10 hidden md:flex">
                                    {phase.number}
                                </div>

                                <div className="flex-1 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <div className="inline-block bg-white dark:bg-slate-900 px-8 py-4 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="font-bold text-slate-900 dark:text-white mr-2">Secret Weapon:</span>
                            <span className="text-slate-600 dark:text-slate-400">{study.approach.unique_differentiator}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technical Deep Dive */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Technical Transformation</h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Before */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <AlertCircle size={24} /> Before State
                            </h3>
                            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-500 uppercase mb-2">Legacy Stack</div>
                                        <div className="flex flex-wrap gap-2">
                                            {study.technical.before.stack.map((t, i) => (
                                                <span key={i} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-500 uppercase mb-2">Issues</div>
                                        <ul className="space-y-2">
                                            {study.technical.before.issues.map((issue, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> {issue}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* After */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                <CheckCircle2 size={24} /> After State
                            </h3>
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border-2 border-emerald-500/20 shadow-xl">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm font-semibold text-emerald-600/80 uppercase mb-2">Modern Stack</div>
                                        <div className="flex flex-wrap gap-2">
                                            {study.technical.after.stack.map((t, i) => (
                                                <span key={i} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-medium rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-emerald-600/80 uppercase mb-2">Improvements</div>
                                        <ul className="space-y-2">
                                            {study.technical.after.improvements.map((imp, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-slate-900 dark:text-white font-medium">
                                                    <CheckCircle2 size={14} className="text-emerald-500" /> {imp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            {
                study.testimonial && (
                    <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                            <div className="text-6xl text-emerald-500 mb-8 opacity-50 font-serif">"</div>
                            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                                {study.testimonial.quote}
                            </blockquote>
                            <cite className="not-italic">
                                <div className="font-bold text-lg">{study.testimonial.author.name}</div>
                                <div className="text-emerald-300">{study.testimonial.author.role}, {study.testimonial.author.company}</div>
                            </cite>
                        </div>
                    </section>
                )
            }

            {/* How I would approach this today */}
            {study.approachToday && (
                <section className="py-20 bg-slate-50 dark:bg-slate-800 border-y border-slate-200 dark:border-slate-700">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-lg">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
                                {t('projects.approachToday.title')}
                            </h2>
                            <ul className="space-y-4">
                                {(i18n.language === 'de' ? study.approachToday.bulletsDe : study.approachToday.bullets).map((bullet, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                                        <CheckCircle2 className="text-emerald-500 mt-1 shrink-0" size={20} />
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* Deliverables Preview */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                        {t('caseStudy.deliverables.title')}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Layers,
                                title: t('caseStudy.deliverables.blueprint.title'),
                                description: t('caseStudy.deliverables.blueprint.description'),
                                color: 'blue'
                            },
                            {
                                icon: AlertCircle,
                                title: t('caseStudy.deliverables.riskRegister.title'),
                                description: t('caseStudy.deliverables.riskRegister.description'),
                                color: 'red'
                            },
                            {
                                icon: Calendar,
                                title: t('caseStudy.deliverables.roadmap.title'),
                                description: t('caseStudy.deliverables.roadmap.description'),
                                color: 'emerald'
                            },
                            {
                                icon: Target,
                                title: t('caseStudy.deliverables.decisionMatrix.title'),
                                description: t('caseStudy.deliverables.decisionMatrix.description'),
                                color: 'purple'
                            }
                        ].map((deliverable, idx) => {
                            const Icon = deliverable.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
                                >
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${deliverable.color}-100 dark:bg-${deliverable.color}-900/30`}>
                                        <Icon className={`text-${deliverable.color}-600 dark:text-${deliverable.color}-400`} size={24} />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                                        {deliverable.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {deliverable.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Block */}
            <section className="py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        {t('caseStudy.cta.title')}
                    </h2>
                    <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {t('caseStudy.cta.text')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://calendly.com/prasad-sgsits/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                        >
                            {t('caseStudy.cta.primary')}
                            <ArrowRight size={20} />
                        </a>
                        <Link
                            to="/risk-radar"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                        >
                            {t('caseStudy.cta.secondary')}
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudyPage;
