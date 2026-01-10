import React, { useState } from 'react';
import { Activity, CreditCard, ShoppingCart, Cpu, Loader2, ArrowLeft, AlertTriangle, CheckCircle2, Server, Globe, Shield, Database, Layout } from 'lucide-react';
import { generateArchitecture } from '../services/architectureGenerator';
import type { ArchitectureRequest, ArchitectureResult } from '../types';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

type IndustryType = 'healthcare' | 'financial' | 'ecommerce' | 'aiml';

interface Industry {
  id: IndustryType;
  title: string;
  icon: React.ReactNode;
  compliance: string[];
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

const INDUSTRIES: Industry[] = [
  {
    id: 'healthcare',
    title: 'Healthcare & Pharma',
    icon: <Activity size={32} />,
    compliance: ['HIPAA', 'FHIR', 'HL7', 'GDPR'],
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    borderClass: 'border-blue-200 dark:border-blue-800 hover:border-blue-500'
  },
  {
    id: 'financial',
    title: 'Financial Services',
    icon: <CreditCard size={32} />,
    compliance: ['PCI-DSS', 'SOC2', 'KYC', 'AML'],
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderClass: 'border-emerald-200 dark:border-emerald-800 hover:border-emerald-500'
  },
  {
    id: 'ecommerce',
    title: 'eCommerce & Retail',
    icon: <ShoppingCart size={32} />,
    compliance: ['PCI-DSS', 'GDPR', 'Multi-tenant'],
    colorClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    borderClass: 'border-orange-200 dark:border-orange-800 hover:border-orange-500'
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    icon: <Cpu size={32} />,
    compliance: ['Ethical AI', 'Data Privacy', 'MLOps'],
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-50 dark:bg-purple-900/20',
    borderClass: 'border-purple-200 dark:border-purple-800 hover:border-purple-500'
  }
];

const EXAMPLE_PROMPTS: Record<IndustryType, string> = {
  healthcare: 'Modernize a 20-year-old patient records system while maintaining HIPAA compliance. Budget: $500K, Timeline: 12 months.',
  financial: 'Build real-time payment processing for 1M+ transactions/day. Need PCI-DSS Level 1 compliance.',
  ecommerce: 'Multi-tenant SaaS platform for 50K+ merchants. Need 99.99% uptime and global scalability.',
  aiml: 'Build RAG pipeline for legal document analysis. Process 10TB+ PDFs, serve answers in real-time.'
};

const ArchitectureEngine: React.FC = () => {
  const [step, setStep] = useState<'industry' | 'input' | 'generating' | 'result'>('industry');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(null);
  const [challenge, setChallenge] = useState('');
  const [result, setResult] = useState<ArchitectureResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIndustrySelect = (industry: IndustryType) => {
    setSelectedIndustry(industry);
    setChallenge(EXAMPLE_PROMPTS[industry]);
    setStep('input');
    setError(null);
  };

  const handleGenerate = async () => {
    if (!selectedIndustry || !challenge) return;

    setStep('generating');
    setError(null);

    try {
      const request: ArchitectureRequest = {
        industry: selectedIndustry,
        challenge,
        context: {}
      };

      const generated = await generateArchitecture(request);

      const architectureResult: ArchitectureResult = {
        ...generated,
        id: Date.now().toString(),
        timestamp: new Date(),
        inputs: {
          industry: selectedIndustry,
          challenge,
          context: {}
        }
      };

      setResult(architectureResult);
      setStep('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate architecture');
      setStep('input');
    }
  };

  const handleReset = () => {
    setStep('industry');
    setSelectedIndustry(null);
    setChallenge('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <SEO
        title="AI Architecture Engine"
        description="AI-powered architecture decision engine. Get expert recommendations for cloud, healthcare, financial, and e-commerce systems."
        keywords="architecture engine, AI architecture, system design, cloud architecture"
      />

      {/* Header */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
          AI-Powered Architecture Decision Engine
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Get expert architecture recommendations based on 15+ years of enterprise experience
          across Healthcare, Financial Services, eCommerce, and AI/ML.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Step 1: Industry Selection */}
        {step === 'industry' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Select Your Industry Domain
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {INDUSTRIES.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleIndustrySelect(industry.id)}
                  className={`
                    p-8 rounded-2xl border-2 transition-all duration-300 text-left group
                    bg-white dark:bg-slate-800
                    ${industry.borderClass}
                    hover:shadow-xl hover:-translate-y-1
                `}
                >
                  <div className={`${industry.colorClass} mb-6 transform group-hover:scale-110 transition-transform`}>
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {industry.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {industry.compliance.map((comp) => (
                      <span
                        key={comp}
                        className={`text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400`}
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Challenge Input */}
        {step === 'input' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Industries
            </button>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Describe Your Challenge
              </h2>

              <textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="Describe your technical challenge or system requirements..."
                className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y mb-6 transition-shadow"
              />

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6">
                  <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                  <div>{error}</div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={!challenge}
                className={`
                    w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
                    ${challenge
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-900/20'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}
                `}
              >
                Generate Architecture Blueprint
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Generating */}
        {step === 'generating' && (
          <div className="text-center py-20">
            <Loader2
              size={64}
              className="animate-spin text-emerald-600 dark:text-emerald-400 mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Architecting Solution...
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Analyzing requirements against enterprise patterns and compliance standards.
            </p>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 'result' && result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Start New Analysis
            </button>

            <div className="grid gap-8">
              {/* Executive Summary */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Executive Summary</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{result.summary}</p>
              </div>

              {/* Recommendations */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Recommendations</h2>
                <ul className="space-y-4">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="text-emerald-500 mt-1 shrink-0" size={20} />
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline & Budget */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Estimated Timeline</h3>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{result.timeline}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Estimated Budget</h3>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{result.budget}</p>
                </div>
              </div>

              {/* Interactive Architecture Diagram */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Architecture Blueprint</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Interactive diagram showing {result.diagram.nodes.length} components. Click nodes to see details.
                </p>
                <div className="h-[600px] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 mb-6">
                  <ArchitectureDiagram
                    nodes={result.diagram.nodes}
                    edges={result.diagram.edges}
                  />
                </div>

                {/* Component Details Table (Simplified vs Details Element) */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 dark:text-white">Component Breakdown</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {result.diagram.nodes.map((node) => (
                      <div key={node.id} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-xs font-bold rounded uppercase text-slate-600 dark:text-slate-300">{node.type}</span>
                          <span className="font-bold text-slate-900 dark:text-white">{node.label}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{node.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {node.technologies.map(t => (
                            <span key={t} className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recommended Tech Stack</h2>
                <div className="grid gap-4">
                  {result.stack.map((item, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-l-4 border-emerald-500">
                      <div className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                        {item.category}: <span className="text-emerald-600 dark:text-emerald-400">{item.tech}</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm">{item.reason}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance & Risk */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Compliance */}
                {result.compliance.length > 0 && (
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Compliance Standards</h2>
                    <div className="flex flex-wrap gap-3">
                      {result.compliance.map((comp, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg font-semibold"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risks */}
                {result.risks.length > 0 && (
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Risk Assessment</h2>
                    <div className="space-y-3">
                      {result.risks.map((risk, idx) => (
                        <div
                          key={idx}
                          className={`
                            p-4 rounded-xl border-l-4 bg-slate-50 dark:bg-slate-900
                            ${risk.level === 'high' ? 'border-red-500' : risk.level === 'medium' ? 'border-amber-500' : 'border-emerald-500'}
                        `}
                        >
                          <span className={`
                            text-xs font-bold uppercase tracking-wider mb-1 block
                            ${risk.level === 'high' ? 'text-red-600' : risk.level === 'medium' ? 'text-amber-600' : 'text-emerald-600'}
                        `}>
                            {risk.level} RISK
                          </span>
                          <span className="text-sm text-slate-700 dark:text-slate-300">{risk.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ArchitectureEngine;