// src/components/OutcomeBadges.tsx
// Phase 4.5: Outcome badges component for visual proof indicators

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  CheckCircle2, 
  Zap, 
  Sparkles 
} from 'lucide-react';
import { OutcomeBadge, LocalizedString } from '../types/CaseStudy';
import { getLocalizedValue } from '../utils/localization';
import { trackEvent } from '../services/analytics';
import i18n from '../i18n';

interface OutcomeBadgesProps {
  badges: OutcomeBadge[];
  max?: number; // default 4
  size?: 'sm' | 'md';
  className?: string;
  caseStudySlug?: string; // For analytics
  page?: string; // For analytics (e.g., 'homepage', 'case-study', 'projects')
}

const OutcomeBadges: React.FC<OutcomeBadgesProps> = ({
  badges,
  max = 4,
  size = 'md',
  className = '',
  caseStudySlug,
  page = 'unknown',
}) => {
  const { t } = useTranslation();
  const locale = i18n.language;
  const hasTrackedRef = useRef(false);

  // Track impression once per component mount
  useEffect(() => {
    if (!hasTrackedRef.current && badges.length > 0) {
      hasTrackedRef.current = true;
      trackEvent('outcome_badge_impression', {
        page,
        caseStudySlug: caseStudySlug || undefined,
        locale,
        badgeCount: Math.min(badges.length, max),
      });
    }
  }, [badges.length, max, page, caseStudySlug, locale]);

  if (!badges || badges.length === 0) return null;

  const badgesToShow = badges.slice(0, max);

  const getIcon = (type: OutcomeBadge['type']) => {
    const iconClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
    switch (type) {
      case 'cost':
        return <DollarSign className={iconClass} />;
      case 'performance':
        return <TrendingUp className={iconClass} />;
      case 'compliance':
        return <Shield className={iconClass} />;
      case 'reliability':
        return <CheckCircle2 className={iconClass} />;
      case 'speed':
        return <Zap className={iconClass} />;
      case 'ai':
        return <Sparkles className={iconClass} />;
      default:
        return <CheckCircle2 className={iconClass} />;
    }
  };

  const getColorClasses = (type: OutcomeBadge['type']) => {
    switch (type) {
      case 'cost':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'performance':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'compliance':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'reliability':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'speed':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'ai':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getLabel = (badge: OutcomeBadge): string => {
    if (typeof badge.label === 'string') {
      return badge.label;
    }
    return getLocalizedValue(badge.label as LocalizedString, locale);
  };

  const sizeClasses = size === 'sm' 
    ? 'px-2 py-1 text-xs gap-1.5'
    : 'px-3 py-1.5 text-sm gap-2';

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badgesToShow.map((badge, idx) => {
        const label = getLabel(badge);
        return (
          <div
            key={idx}
            className={`
              inline-flex items-center gap-2 rounded-full border font-medium
              ${sizeClasses}
              ${getColorClasses(badge.type)}
              transition-all hover:scale-105
            `}
            onClick={() => {
              trackEvent('outcome_badge_click', {
                page,
                caseStudySlug: caseStudySlug || undefined,
                locale,
                badgeType: badge.type,
                badgeLabel: label,
              });
            }}
          >
            {getIcon(badge.type)}
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default OutcomeBadges;
