// src/pages/ProjectSimilarityPage.tsx
// Phase 5 Enhanced: Project Similarity Matcher

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Target, Zap, Shield, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';
import SectionHeader from '../components/ui/SectionHeader';
import EmailGateModal from '../components/EmailGateModal';
import SimilarityResultCard from '../components/SimilarityResultCard';
import i18n from '../i18n';
import { trackEvent } from '../services/analytics';
import { getAttributionSnapshot } from '../utils/attribution';
import { getGlobalPersona } from '../utils/personaPersistence';
import ArtifactRequestModal from '../components/ArtifactRequestModal';
import type { SimilarityResultItem } from '../components/SimilarityResultCard';
import { projects } from '../data/projects';

const INDUSTRY_CHIPS = [
  { id: 'ecommerce', labelKey: 'tools.projectSimilarity.chips.ecommerce' },
  { id: 'insurance', labelKey: 'tools.projectSimilarity.chips.insurance' },
  { id: 'adtech', labelKey: 'tools.projectSimilarity.chips.adtech' },
  { id: 'climate', labelKey: 'tools.projectSimilarity.chips.climate' },
  { id: 'ai', labelKey: 'tools.projectSimilarity.chips.ai' },
];

const CONSTRAINT_CHIPS = [
  { id: 'tight-timeline', labelKey: 'tools.projectSimilarity.chips.tightTimeline' },
  { id: 'zero-downtime', labelKey: 'tools.projectSimilarity.chips.zeroDowntime' },
  { id: 'budget-conscious', labelKey: 'tools.projectSimilarity.chips.budgetConscious' },
  { id: 'compliance', labelKey: 'tools.projectSimilarity.chips.compliance' },
];

const GOAL_CHIPS = [
  { id: 'cost-reduction', labelKey: 'tools.projectSimilarity.chips.costReduction' },
  { id: 'scalability', labelKey: 'tools.projectSimilarity.chips.scalability' },
  { id: 'migration', labelKey: 'tools.projectSimilarity.chips.migration' },
  { id: 'performance', labelKey: 'tools.projectSimilarity.chips.performance' },
];

const EXAMPLE_PROMPTS = [
  { key: 'ecommerceMigration', shortLabel: 'eCommerce + migration + AWS', text: 'Migrating monolithic Java app to microservices on AWS in e-commerce domain. Suggest architecture approach.' },
  { key: 'insurancePerformance', shortLabel: 'Insurance + performance', text: 'Insurance claims processing is slow. We need cost reduction without a full rewrite. Audit-safe changes only.' },
  { key: 'aiCostControl', shortLabel: 'AI + cost control', text: 'Building AI features with tight budget. Need to control inference costs and build user trust. Real-time analysis required.' },
  { key: 'climateData', shortLabel: 'Climate + data exchange', text: 'Multi-stakeholder carbon data exchange. Sovereignty-preserving, interoperable standards. 12–18 month timeline.' },
  { key: 'adScale', shortLabel: 'AdTech + scale', text: 'Scaling display ads to millions of daily transactions. Need exactly-once processing and sub-20ms latency.' },
];

const ProjectSimilarityPage: React.FC = () => {
  const { t } = useTranslation();
  const locale = i18n.language || 'en';
  const [query, setQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [gated, setGated] = useState(false);
  const [gateModalOpen, setGateModalOpen] = useState(false);
  const [results, setResults] = useState<SimilarityResultItem[]>([]);
  const [resultsSource, setResultsSource] = useState<'ai' | 'keyword'>('keyword');
  const [error, setError] = useState('');
  const [unlockError, setUnlockError] = useState('');
  const [artifactModalSlug, setArtifactModalSlug] = useState<string | null>(null);

  React.useEffect(() => {
    trackEvent('project_similarity_opened', { locale });
  }, [locale]);

  const buildQuery = () => {
    let q = query.trim();
    if (selectedIndustry) q += ` ${selectedIndustry}`;
    selectedConstraints.forEach((c) => { q += ` ${c}`; });
    selectedGoals.forEach((g) => { q += ` ${g}`; });
    return q.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const q = buildQuery();
    if (q.length < 20) {
      setError(t('tools.projectSimilarity.form.queryMinLength', { defaultValue: 'Please describe your challenge in at least 20 characters.' }));
      return;
    }
    if (q.length > 2000) {
      setError(t('tools.projectSimilarity.form.queryMaxLength', { defaultValue: 'Query must be under 2000 characters.' }));
      return;
    }

    setIsSubmitting(true);
    trackEvent('project_similarity_query_submitted', {
      queryLength: q.length,
      hasIndustry: !!selectedIndustry,
      hasBudget: selectedConstraints.includes('budget-conscious') || selectedGoals.includes('cost-reduction'),
      hasTimeline: selectedConstraints.includes('tight-timeline'),
      locale,
    });

    try {
      const attribution = getAttributionSnapshot(locale);
      const persona = getGlobalPersona();

      const res = await fetch('/api/project-similarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          attribution: {
            utm_source: attribution.utm_source,
            utm_medium: attribution.utm_medium,
            utm_campaign: attribution.utm_campaign,
            utm_content: attribution.utm_content,
            utm_term: attribution.utm_term,
            landingPath: attribution.landingPath,
            currentPath: attribution.currentPath,
          },
          persona,
          locale,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }

      if (data.gated === true) {
        trackEvent('project_similarity_gate_shown', { locale });
        setGated(true);
        setGateModalOpen(true);
        setIsSubmitting(false);
        return;
      }

      setResults(data.results || []);
      const topResult = data.results?.[0];
      trackEvent('project_similarity_results_viewed', {
        resultCount: (data.results || []).length,
        topScore: topResult?.score,
        confidence: topResult?.confidence,
        locale,
      });
      if (topResult) {
        trackEvent('project_similarity_match_quality', {
          topScore: topResult.score,
          confidenceLevel: topResult.confidence,
          matchedPatterns: topResult.matchedPatterns?.join(',') || '',
          locale,
        });
      }
    } catch (err) {
      let errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      
      // FINAL SUBMISSION: Friendly error messages
      if (errorMessage.includes('rate limit') || errorMessage.includes('Rate limit') || errorMessage.includes('429')) {
        errorMessage = t('tools.projectSimilarity.errors.rateLimit', { defaultValue: 'Too many requests. Please wait a moment and try again.' });
      } else if (errorMessage.includes('Failed to analyze') || errorMessage.includes('try again')) {
        errorMessage = t('tools.projectSimilarity.errors.retry', { defaultValue: 'Something went wrong. Please try again—if it persists, try a different or longer description of your challenge.' });
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnlock = async (email: string) => {
    setUnlockError('');
    setIsUnlocking(true);
    
    try {
      const q = buildQuery();
      const attribution = getAttributionSnapshot(locale);
      const persona = getGlobalPersona();

      if (process.env.NODE_ENV === 'development') {
        console.log('[ProjectSimilarityPage] Unlocking with email:', email.substring(0, 3) + '***');
      }

      const res = await fetch('/api/project-similarity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          email: email.trim().toLowerCase(),
          attribution: {
            utm_source: attribution.utm_source,
            utm_medium: attribution.utm_medium,
            utm_campaign: attribution.utm_campaign,
            utm_content: attribution.utm_content,
            utm_term: attribution.utm_term,
            landingPath: attribution.landingPath,
            currentPath: attribution.currentPath,
          },
          persona,
          locale,
        }),
      });

      const data = await res.json().catch((err) => {
        console.error('[ProjectSimilarityPage] JSON parse error:', err);
        return { error: 'Failed to parse server response' };
      });

      if (!res.ok) {
        let errorMsg = data.error || `Server error: ${res.status}`;
        if (errorMsg.includes('rate limit') || errorMsg.includes('429')) {
          errorMsg = t('tools.projectSimilarity.errors.rateLimit', { defaultValue: 'Too many requests. Please wait a moment and try again.' });
        } else if (errorMsg.includes('Failed to') || errorMsg.includes('try again')) {
          errorMsg = t('tools.projectSimilarity.errors.retry', { defaultValue: 'Something went wrong. Please try again—if it persists, try a different or longer description of your challenge.' });
        }
        console.error('[ProjectSimilarityPage] API error:', errorMsg);
        throw new Error(errorMsg);
      }

      if (data.gated === true) {
        throw new Error('Still gated - please try again');
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('[ProjectSimilarityPage] Results received:', {
          count: data.results?.length || 0,
          topSlug: data.results?.[0]?.slug,
        });
      }

      if (!data.results || data.results.length === 0) {
        const noMatchMsg = data.message || t('tools.projectSimilarity.results.noMatches', { defaultValue: 'No matches found. Try refining your query with more details about your industry, constraints, or specific challenges.' });
        setIsUnlocking(false);
        // Throw error so modal stays open and shows message
        throw new Error(noMatchMsg);
      }

      setResults(data.results);
      setResultsSource(data.source === 'ai' ? 'ai' : 'keyword');
      setGateModalOpen(false);
      setGated(false);
      setUnlockError('');
      
      trackEvent('project_similarity_gate_completed', { locale });
      trackEvent('project_similarity_results_viewed', {
        resultCount: data.results.length,
        topScore: data.results[0]?.score,
        confidence: data.results[0]?.confidence,
        locale,
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to unlock results. Please try again.';
      console.error('[ProjectSimilarityPage] Unlock error:', errorMsg);
      setUnlockError(errorMsg);
      throw err; // Re-throw so EmailGateModal can show it
    } finally {
      setIsUnlocking(false);
    }
  };

  const toggleChip = (id: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(id)) {
      setList(list.filter((x) => x !== id));
    } else {
      setList([...list, id]);
    }
  };

  const proofChips = [
    { icon: Target, labelKey: 'tools.projectSimilarity.proof.realProjects' },
    { icon: Zap, labelKey: 'tools.projectSimilarity.proof.fastMatch' },
    { icon: Shield, labelKey: 'tools.projectSimilarity.proof.confidential' },
  ];

  return (
    <>
      <SEO
        title={t('tools.projectSimilarity.seo.title', { defaultValue: 'Project Similarity Matcher | Prasad Tilloo' })}
        description={t('tools.projectSimilarity.seo.description', { defaultValue: 'Find similar projects from 15+ years of enterprise architecture experience. Get tailored insights and key decisions.' })}
      />
      <PageShell background="muted" containerMaxWidth="4xl" className="pt-24 pb-20">
        <Container maxWidth="4xl">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              {t('tools.projectSimilarity.heroTitle', { defaultValue: "Find Similar Projects from Prasad's Experience" })}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 dark:text-slate-400 mb-6"
            >
              {t('tools.projectSimilarity.heroSubhead', {
                defaultValue: "Get insights from 15+ years of enterprise architecture projects. See what worked, what didn't, and what Prasad would do differently today.",
              })}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {proofChips.map(({ icon: Icon, labelKey }) => (
                <span
                  key={labelKey}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300"
                >
                  <Icon size={16} className="text-emerald-500" />
                  {t(labelKey, { defaultValue: labelKey })}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Form */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-16"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="similarity-query" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {t('tools.projectSimilarity.form.queryLabel', { defaultValue: 'Describe your challenge or project' })}
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">
                  {t('tools.projectSimilarity.form.examplePrompts', { defaultValue: 'Try an example:' })}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {EXAMPLE_PROMPTS.map((ex) => (
                    <button
                      key={ex.key}
                      type="button"
                      onClick={() => setQuery(ex.text)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition-colors"
                      title={ex.text}
                    >
                      {t(`tools.projectSimilarity.examples.${ex.key}`, { defaultValue: ex.shortLabel })}
                    </button>
                  ))}
                </div>
                <textarea
                  id="similarity-query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('tools.projectSimilarity.form.queryPlaceholder', {
                    defaultValue: 'e.g. Migrating legacy e-commerce platform to cloud with GDPR compliance...',
                  })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-y min-h-[100px]"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  {t('tools.projectSimilarity.form.industryLabel', { defaultValue: 'Industry (optional)' })}
                </span>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRY_CHIPS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedIndustry(selectedIndustry === c.id ? null : c.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedIndustry === c.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {t(c.labelKey, { defaultValue: c.id })}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  {t('tools.projectSimilarity.form.constraintsLabel', { defaultValue: 'Constraints / Goals (optional)' })}
                </span>
                <div className="flex flex-wrap gap-2">
                  {CONSTRAINT_CHIPS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleChip(c.id, selectedConstraints, setSelectedConstraints)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedConstraints.includes(c.id)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {t(c.labelKey, { defaultValue: c.id })}
                    </button>
                  ))}
                  {GOAL_CHIPS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleChip(c.id, selectedGoals, setSelectedGoals)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedGoals.includes(c.id)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {t(c.labelKey, { defaultValue: c.id })}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-4 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <Search size={20} />
                    {t('tools.projectSimilarity.form.submitButton', { defaultValue: 'Find Similar Projects' })}
                  </>
                )}
              </button>
            </form>
          </motion.section>

          {/* Results (hidden until unlocked) */}
          {results.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {resultsSource === 'keyword' && (
                <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {t('tools.projectSimilarity.results.portfolioBased', {
                      defaultValue: "Based on my portfolio experience and knowledge base—here are the most relevant case studies and tips for your situation.",
                    })}
                  </p>
                </div>
              )}
              <SectionHeader
                title={t('tools.projectSimilarity.results.title', { defaultValue: 'Your matches' })}
                subtitle={t('tools.projectSimilarity.results.subtitle', { defaultValue: 'Based on your description and Prasad’s project experience.' })}
              />
              <div className="space-y-6">
                {results.slice(0, 3).map((item, idx) => (
                  <SimilarityResultCard
                    key={item.slug}
                    item={item}
                    index={idx}
                    onRequestArtifacts={(slug) => setArtifactModalSlug(slug)}
                  />
                ))}
              </div>

              {/* CTA strip */}
              <div className="mt-12 p-6 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {t('tools.projectSimilarity.cta.text', {
                    defaultValue: 'Want to discuss your situation in depth? Book a discovery call.',
                  })}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  {t('tools.projectSimilarity.cta.bookCall', { defaultValue: 'Book Discovery Call' })}
                </Link>
              </div>
            </motion.section>
          )}
        </Container>
      </PageShell>

      <EmailGateModal
        isOpen={gateModalOpen}
        onClose={() => {
          setGateModalOpen(false);
          setUnlockError('');
        }}
        onUnlock={handleUnlock}
        defaultEmail={typeof localStorage !== 'undefined' ? localStorage.getItem('pt_lead_email') || '' : ''}
      />

      {artifactModalSlug && (() => {
        const study = projects.find((p) => p.slug === artifactModalSlug);
        const artifactIds = study?.artifactPreviews?.map((_, i) => `artifact-${i}`) ?? [];
        return (
          <ArtifactRequestModal
            isOpen
            onClose={() => setArtifactModalSlug(null)}
            caseStudySlug={artifactModalSlug}
            artifactIds={artifactIds}
          />
        );
      })()}
    </>
  );
};

export default ProjectSimilarityPage;
