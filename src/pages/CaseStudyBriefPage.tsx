// src/pages/CaseStudyBriefPage.tsx
// Phase 4.5: Print-optimized 1-page executive brief (Save as PDF)

import React, { useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';
import { getLocalizedValue, getLocalizedArray } from '../utils/localization';
import OutcomeBadges from '../components/OutcomeBadges';
import BeforeAfterMiniDiagram from '../components/BeforeAfterMiniDiagram';

const CaseStudyBriefPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const lang = searchParams.get('lang');
  const autoprint = searchParams.get('autoprint') === '1';

  useEffect(() => {
    if (lang && (lang === 'en' || lang === 'de') && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const study = useMemo(() => projects.find(p => p.slug === slug), [slug]);

  useEffect(() => {
    if (!autoprint) return;
    // slight delay so layout settles before print dialog
    const id = window.setTimeout(() => window.print(), 250);
    return () => window.clearTimeout(id);
  }, [autoprint]);

  if (!study) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-slate-600 dark:text-slate-300">Brief not found.</p>
          <Link to="/projects" className="text-emerald-600 dark:text-emerald-400 underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const locale = i18n.language || 'en';
  const title = typeof study.header.title === 'string' ? study.header.title : getLocalizedValue(study.header.title, locale);
  const clientType =
    typeof study.header.client.type === 'string' ? study.header.client.type : getLocalizedValue(study.header.client.type, locale);
  const industry =
    typeof study.header.client.industry === 'string'
      ? study.header.client.industry
      : getLocalizedValue(study.header.client.industry, locale);

  const heroMetricLabel =
    typeof study.outcomes.hero_metric.label === 'string'
      ? study.outcomes.hero_metric.label
      : getLocalizedValue(study.outcomes.hero_metric.label, locale);

  const phases = study.approach?.phases?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-white text-slate-900 print:bg-white print:text-black">
      {/* Print-only spacing rules */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .page { padding: 0 !important; }
        }
      `}</style>

      <div className="page max-w-4xl mx-auto px-6 pt-10 pb-10 print:px-0 print:pt-0 print:pb-0">
        {/* Top bar (screen only) */}
        <div className="no-print mb-6 flex items-center justify-between">
          <Link to={`/projects/${study.slug}`} className="text-sm text-emerald-700 hover:underline">
            ← Back to case study
          </Link>
          <button
            onClick={() => window.print()}
            className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
          >
            {t('caseStudy.pdfBrief.submit', { defaultValue: 'Download PDF Brief' })}
          </button>
        </div>

        {/* Header */}
        <div className="border-b border-slate-200 pb-4 mb-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {clientType} · {industry}
          </div>
          <h1 className="text-2xl font-extrabold leading-tight mt-1">{title}</h1>

          {study.outcomeBadges?.length ? (
            <div className="mt-3">
              <OutcomeBadges badges={study.outcomeBadges} max={4} size="sm" page="case-study-brief" caseStudySlug={study.slug} />
            </div>
          ) : null}
        </div>

        {/* 3 compact blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-slate-500 mb-2">Context</div>
            <div className="text-sm text-slate-700">
              {(() => {
                // use challenge situation first sentence
                const situation =
                  typeof (study as any).challenge?.standard?.situation === 'object'
                    ? getLocalizedValue((study as any).challenge.standard.situation, locale)
                    : typeof (study as any).challenge?.situation === 'string'
                      ? (study as any).challenge.situation
                      : '';
                return situation.split('.').slice(0, 2).join('.').trim() + (situation ? '.' : '');
              })()}
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-slate-500 mb-2">Delivered</div>
            <ul className="text-sm text-slate-700 space-y-1">
              {phases.map((p, idx) => (
                <li key={idx}>- {typeof p.deliverable === 'string' ? p.deliverable : getLocalizedValue(p.deliverable, locale)}</li>
              ))}
            </ul>
          </div>

          <div className="border border-slate-200 rounded-lg p-4">
            <div className="text-xs font-semibold uppercase text-slate-500 mb-2">Impact</div>
            <div className="text-xl font-bold">
              {study.outcomes.hero_metric.value} {heroMetricLabel}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {study.outcomes.secondary_metrics?.slice(0, 2).map((m, idx) => (
                <span key={idx} className="mr-2">
                  {m.value} {typeof m.label === 'string' ? m.label : getLocalizedValue(m.label, locale)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Before/After (optional) */}
        {study.beforeAfterDiagram ? (
          <div className="mb-4">
            <BeforeAfterMiniDiagram diagram={study.beforeAfterDiagram} caseStudySlug={study.slug} />
          </div>
        ) : null}

        {/* Disclaimer */}
        {study.pdfBrief?.disclaimer ? (
          <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-3">
            {typeof study.pdfBrief.disclaimer === 'string' ? study.pdfBrief.disclaimer : getLocalizedValue(study.pdfBrief.disclaimer, locale)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CaseStudyBriefPage;

