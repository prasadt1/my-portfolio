// src/components/SimilarityResultCard.tsx
// Phase 5 Enhanced: Project Similarity Matcher result card

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2, Lightbulb, AlertCircle } from 'lucide-react';
import ExpandableContent from './ui/ExpandableContent';
import { trackEvent } from '../services/analytics';

export interface SimilarityResultItem {
  slug: string;
  title: string;
  score: number;
  reasons: string[];
  confidence: 'High' | 'Medium' | 'Low';
  prasadInsight: string;
  applicableFramework?: string;
  estimatedEffort: string;
  riskMitigation: string[];
  recommendedNextSteps?: string[];
  keyDecisions?: string[];
  whatWentWrong?: string[];
  whatWorked?: string[];
  whatIdDoToday?: string[];
  matchedPatterns?: string[];
  // AI-driven insights
  redFlags?: string[];
  budgetRange?: string;
  diagnosticQuestions?: string[];
}

interface SimilarityResultCardProps {
  item: SimilarityResultItem;
  index: number;
  onRequestArtifacts?: (slug: string) => void;
}

const SimilarityResultCard: React.FC<SimilarityResultCardProps> = ({
  item,
  index,
  onRequestArtifacts,
}) => {
  const { t } = useTranslation();
  const [retroExpanded, setRetroExpanded] = useState(false);
  const [riskExpanded, setRiskExpanded] = useState(false);

  const confidenceLabel = {
    High: t('tools.projectSimilarity.results.confidence.high', { defaultValue: 'High Confidence Match' }),
    Medium: t('tools.projectSimilarity.results.confidence.medium', { defaultValue: 'Medium Confidence Match' }),
    Low: t('tools.projectSimilarity.results.confidence.low', { defaultValue: 'Low Confidence Match' }),
  }[item.confidence];

  const whyBullets = item.reasons.slice(0, 3);
  const keyDecisions = (item.keyDecisions || []).slice(0, 2);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            {confidenceLabel}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            {item.title}
          </h3>
        </div>
        <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
          {item.score}
          <span className="text-sm font-normal text-slate-500">/100</span>
        </span>
      </div>

      {whyBullets.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t('tools.projectSimilarity.results.whyMatches', { defaultValue: 'Why this matches your situation:' })}
          </h4>
          <ul className="space-y-1.5">
            {whyBullets.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {keyDecisions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t('tools.projectSimilarity.results.keyDecisions', { defaultValue: 'Key decisions that mattered:' })}
          </h4>
          <ul className="space-y-1.5">
            {keyDecisions.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.redFlags && item.redFlags.length > 0 && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200/50 dark:border-red-800/50">
          <h4 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
            <AlertCircle size={14} />
            {t('tools.projectSimilarity.results.redFlags', { defaultValue: '🚨 Red Flags I\'m seeing:' })}
          </h4>
          <ul className="space-y-1.5">
            {item.redFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <AlertCircle size={12} className="text-red-500 mt-0.5 shrink-0" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.prasadInsight && (
        <div className="mb-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50">
          <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-2">
            <Lightbulb size={14} />
            {t('tools.projectSimilarity.results.prasadInsight', { defaultValue: "Prasad's key insight:" })}
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300">{item.prasadInsight}</p>
        </div>
      )}

      {item.applicableFramework && (
        <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">
          <span className="font-medium">{t('tools.projectSimilarity.results.applicableFramework', { defaultValue: 'Applicable framework:' })}</span>{' '}
          {item.applicableFramework}
        </p>
      )}

      {item.estimatedEffort && item.estimatedEffort !== '—' && (
        <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">
          <span className="font-medium">{t('tools.projectSimilarity.results.estimatedEffort', { defaultValue: 'Estimated effort:' })}</span>{' '}
          {item.estimatedEffort}
        </p>
      )}

      {item.budgetRange && (
        <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
          <span className="font-medium">{t('tools.projectSimilarity.results.budgetRange', { defaultValue: 'Budget range:' })}</span>{' '}
          {item.budgetRange}
        </p>
      )}

      {item.diagnosticQuestions && item.diagnosticQuestions.length > 0 && (
        <div className="mb-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-800/50">
          <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            {t('tools.projectSimilarity.results.diagnosticQuestions', { defaultValue: 'Questions Prasad would ask:' })}
          </h4>
          <ul className="space-y-1.5">
            {item.diagnosticQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="text-blue-500 font-medium">•</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(item.whatWentWrong?.length || item.whatWorked?.length || item.whatIdDoToday?.length) ? (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setRetroExpanded(!retroExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {retroExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {t('tools.projectSimilarity.results.retrospectiveExpand', { defaultValue: "What went wrong / What I'd do today" })}
          </button>
          {retroExpanded && (
            <div className="mt-2 pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-2">
              {item.whatWentWrong && item.whatWentWrong.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">{t('tools.projectSimilarity.results.whatWentWrong', { defaultValue: 'What went wrong' })}</span>
                  <ul className="mt-1 space-y-1">
                    {item.whatWentWrong.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <AlertCircle size={12} className="text-amber-500 mt-0.5 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.whatWorked && item.whatWorked.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">{t('tools.projectSimilarity.results.whatWorked', { defaultValue: 'What worked well' })}</span>
                  <ul className="mt-1 space-y-1">
                    {item.whatWorked.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item.whatIdDoToday && item.whatIdDoToday.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase">{t('tools.projectSimilarity.results.whatIdDoToday', { defaultValue: "What I'd do differently today" })}</span>
                  <ul className="mt-1 space-y-1">
                    {item.whatIdDoToday.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 size={12} className="text-blue-500 mt-0.5 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}

      {item.riskMitigation && item.riskMitigation.length > 0 && (
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setRiskExpanded(!riskExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {riskExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {t('tools.projectSimilarity.results.riskMitigation', { defaultValue: 'Risk mitigation strategies' })}
          </button>
          {riskExpanded && (
            <ul className="mt-2 pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-1">
              {item.riskMitigation.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <Link
          to={`/projects/${item.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white text-sm transition-colors"
          onClick={() => trackEvent('project_similarity_case_study_clicked', { slug: item.slug })}
        >
          {t('tools.projectSimilarity.results.viewCaseStudy', { defaultValue: 'View Full Case Study' })}
          <ArrowRight size={16} />
        </Link>
        {onRequestArtifacts && (
          <button
            type="button"
            onClick={() => {
              onRequestArtifacts(item.slug);
              trackEvent('project_similarity_artifact_request_clicked', { slug: item.slug });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-colors text-sm"
          >
            {t('tools.projectSimilarity.results.requestArtifacts', { defaultValue: 'Request Artifacts Pack' })}
          </button>
        )}
      </div>
    </motion.article>
  );
};

export default SimilarityResultCard;
