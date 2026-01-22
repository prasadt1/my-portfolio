// src/components/BeforeAfterMiniDiagram.tsx
// Phase 4.5: Before/After mini diagram component

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { BeforeAfterDiagram, OutcomeBadge, LocalizedString } from '../types/CaseStudy';
import { getLocalizedValue, getLocalizedArray } from '../utils/localization';
import OutcomeBadges from './OutcomeBadges';
import { trackEvent } from '../services/analytics';
import i18n from '../i18n';

interface BeforeAfterMiniDiagramProps {
  diagram: BeforeAfterDiagram;
  caseStudySlug?: string; // For analytics
  className?: string;
}

const BeforeAfterMiniDiagram: React.FC<BeforeAfterMiniDiagramProps> = ({
  diagram,
  caseStudySlug,
  className = '',
}) => {
  const { t } = useTranslation();
  const locale = i18n.language;
  const hasTrackedRef = useRef(false);

  // Track impression once per component mount
  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackEvent('before_after_diagram_viewed', {
        caseStudySlug: caseStudySlug || undefined,
        locale,
      });
    }
  }, [caseStudySlug, locale]);

  const getTitle = (): string | null => {
    if (!diagram.title) return null;
    if (typeof diagram.title === 'string') return diagram.title;
    return getLocalizedValue(diagram.title as LocalizedString, locale);
  };

  const beforeTitle = typeof diagram.before.title === 'string'
    ? diagram.before.title
    : getLocalizedValue(diagram.before.title as LocalizedString, locale);
  
  const afterTitle = typeof diagram.after.title === 'string'
    ? diagram.after.title
    : getLocalizedValue(diagram.after.title as LocalizedString, locale);

  const beforeBullets = getLocalizedArray(diagram.before.bullets, locale).slice(0, 4);
  const afterBullets = getLocalizedArray(diagram.after.bullets, locale).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 ${className}`}
    >
      {getTitle() && (
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          {getTitle()}
        </h3>
      )}

      {/* Two columns on desktop, stacked on mobile */}
      <div className="relative grid md:grid-cols-2 gap-6 mb-4">
        {/* Before Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-slate-900 dark:text-white">
              {beforeTitle}
            </h4>
          </div>
          <ul className="space-y-2">
            {beforeBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="text-red-500 mt-0.5">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Center Arrow (hidden on mobile, visible on desktop) */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-white dark:bg-slate-800 p-2 rounded-full border-2 border-emerald-500">
            <ArrowRight className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        {/* After Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h4 className="font-semibold text-slate-900 dark:text-white">
              {afterTitle}
            </h4>
          </div>
          <ul className="space-y-2">
            {afterBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Delta Badges Row (max 3) */}
      {diagram.deltaBadges && diagram.deltaBadges.length > 0 && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <OutcomeBadges
            badges={diagram.deltaBadges}
            max={3}
            size="sm"
            caseStudySlug={caseStudySlug}
            page="case-study"
          />
        </div>
      )}
    </motion.div>
  );
};

export default BeforeAfterMiniDiagram;
