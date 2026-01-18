/**
 * Reusable Case Study CTA Component
 * 
 * Phase 3.0 Part B: Conversion UX improvements
 * 
 * Supports 3 variants:
 * - primary: Main CTA (Book Discovery Call)
 * - secondary: Secondary CTA (Try Risk Radar)
 * - tertiary: Email CTA (Request Proposal Review)
 * 
 * Includes analytics tracking and attribution context updates.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Mail } from 'lucide-react';
import { trackEvent } from '../services/analytics';
import { setAttributionContext } from '../utils/attribution';
import { useFeatureFlag } from '../context/FeatureFlagsProvider';

export interface CaseStudyCTAProps {
    variant: 'primary' | 'secondary' | 'tertiary';
    caseStudySlug?: string;
    className?: string;
    onClick?: () => void;
    // Optional override for button text
    primaryText?: string;
    secondaryText?: string;
    tertiaryText?: string;
}

const CaseStudyCTA: React.FC<CaseStudyCTAProps> = ({
    variant,
    caseStudySlug,
    className = '',
    onClick,
    primaryText,
    secondaryText,
    tertiaryText,
}) => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    
    // Feature flag for Risk Radar (secondary CTA)
    const riskRadarFlag = useFeatureFlag('risk_radar');

    const handleClick = (ctaType: string, href?: string) => {
        // Update attribution context with CTA source
        if (caseStudySlug) {
            setAttributionContext({
                caseStudySlug,
                ctaSource: `case-study-${variant}-${ctaType}`,
            });
        }

        // Track analytics event
        trackEvent(`case_study_cta_${variant}_click`, {
            variant,
            ctaType,
            caseStudySlug: caseStudySlug || undefined,
            locale,
            href: href || undefined,
        });

        // Call optional onClick handler
        if (onClick) {
            onClick();
        }
    };

    // Primary CTA: Book Discovery Call (Calendly)
    if (variant === 'primary') {
        return (
            <a
                href="https://calendly.com/prasad-sgsits/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleClick('calendly', 'https://calendly.com/prasad-sgsits/30min')}
                className={`
                    inline-flex items-center justify-center gap-2
                    bg-emerald-600 hover:bg-emerald-700 text-white
                    px-6 py-3 rounded-lg font-semibold
                    transition-all shadow-lg hover:shadow-xl
                    ${className}
                `}
            >
                {primaryText || t('caseStudy.cta.primary', 'Book Discovery Call')}
                <ArrowRight size={18} />
            </a>
        );
    }

    // Secondary CTA: Try Risk Radar (gated by feature flag)
    if (variant === 'secondary') {
        // Don't render if Risk Radar feature is disabled
        if (!riskRadarFlag.enabled) {
            return null;
        }
        
        return (
            <Link
                to="/risk-radar"
                onClick={() => handleClick('risk-radar', '/risk-radar')}
                className={`
                    inline-flex items-center justify-center gap-2
                    bg-white dark:bg-slate-800 border-2 border-emerald-600 text-emerald-600
                    dark:text-emerald-400 dark:border-emerald-400
                    hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                    px-6 py-3 rounded-lg font-semibold
                    transition-all
                    ${className}
                `}
            >
                {secondaryText || t('caseStudy.cta.secondary', 'Try Risk Radar')}
                <ArrowRight size={18} />
            </Link>
        );
    }

    // Tertiary CTA: Request Proposal Review (Email)
    if (variant === 'tertiary') {
        return (
            <a
                href="mailto:prasad.sgsits@gmail.com?subject=Proposal Review Request&body=Hi Prasad,%0D%0A%0D%0AI'd like to request a vendor proposal review for my project.%0D%0A%0D%0A[Brief description of your initiative]"
                onClick={() => handleClick('email', 'mailto:prasad.sgsits@gmail.com')}
                className={`
                    inline-flex items-center justify-center gap-2
                    bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600
                    text-slate-700 dark:text-slate-300
                    px-6 py-3 rounded-lg font-semibold
                    transition-all
                    ${className}
                `}
            >
                <Mail size={18} />
                {tertiaryText || t('caseStudy.cta.tertiary', 'Request Proposal Review')}
            </a>
        );
    }

    return null;
};

export default CaseStudyCTA;
