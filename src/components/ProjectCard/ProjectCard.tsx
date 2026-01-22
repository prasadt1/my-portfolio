import React, { useState, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, TrendingUp, Layers, ShieldAlert, Loader2 } from 'lucide-react';
import { CaseStudy, isLocalizedPersonaChallenge, isLegacyChallenge, getLocalizedString, getLocalizedStringArray, LocalizedString } from '../../types/CaseStudy';
import { trackEvent } from '../../services/analytics';
import { useFeatureFlag } from '../../context/FeatureFlagsProvider';
import { shouldShowFeaturedBadge } from '../../config/featureRouting';
import { isPromoted } from '../../config/featureUtils';
import OutcomeBadges from '../OutcomeBadges';

// Lazy-load ExecutiveSummaryModal for better initial bundle size (gated by feature flag)
const ExecutiveSummaryModal = lazy(() => import('../ExecutiveSummaryModal'));

// Helper to get situation text from any challenge structure
function getChallengeSituation(challenge: CaseStudy['challenge'], locale: string): string {
    if (isLocalizedPersonaChallenge(challenge)) {
        return getLocalizedString(challenge.standard.situation, locale);
    }
    if (isLegacyChallenge(challenge)) {
        return challenge.situation;
    }
    return '';
}

// Helper to get localized string value
function getStr(value: string | LocalizedString | undefined, locale: string): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return getLocalizedString(value, locale);
}

interface ProjectCardProps {
    project: CaseStudy;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    const [showExecutiveSummary, setShowExecutiveSummary] = useState(false);
    
    // Feature flag for Executive Modal
    const execModalFlag = useFeatureFlag('exec_modal');
    
    // Debug: log flag status (remove in production)
    React.useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log('[ProjectCard] exec_modal flag:', execModalFlag);
        }
    }, [execModalFlag]);

    const theme = project.theme || {
        color: 'emerald',
        gradient: 'from-slate-800 to-emerald-600 dark:from-slate-700 dark:to-emerald-500',
        iconBg: 'text-emerald-600 dark:text-emerald-400'
    };

    // Get title
    const title = getStr(project.header.title, locale);
    
    // Get company/client info
    const clientType = getStr(project.header.client.type, locale);
    const industry = getStr(project.header.client.industry, locale);
    
    // Get one-liner subtitle
    const subtitle = project.listingSummary 
        ? getStr(project.listingSummary, locale)
        : getChallengeSituation(project.challenge, locale).slice(0, 120) + (getChallengeSituation(project.challenge, locale).length > 120 ? '...' : '');

    // Get executive snapshot metrics
    const getExecutiveSnapshot = () => {
        const snapshot: { icon: React.ReactNode; label: string; value: string; type: string }[] = [];
        
        // Outcome from hero_metric
        if (project.outcomes?.hero_metric) {
            snapshot.push({
                icon: <TrendingUp size={14} className="text-emerald-500" />,
                label: t('caseStudies.outcome'),
                value: `${project.outcomes.hero_metric.value} ${getStr(project.outcomes.hero_metric.label, locale)}`,
                type: 'outcome'
            });
        }
        
        // Scope from projectType or domains
        const scopeLabel = project.projectType === 'migration' ? 'Migration' :
                          project.projectType === 'standard' ? 'Standards' :
                          project.projectType === 'product' ? 'Product Build' :
                          project.domains[0] || 'Transformation';
        snapshot.push({
            icon: <Layers size={14} className="text-blue-500" />,
            label: t('caseStudies.scope'),
            value: scopeLabel,
            type: 'scope'
        });
        
        // Constraints from executiveSnapshot key tensions or compliance
        let constraint = '';
        if (project.executiveSnapshot?.keyTensions) {
            const tensions = getLocalizedStringArray(project.executiveSnapshot.keyTensions, locale);
            if (tensions[0]) {
                constraint = tensions[0].split(' ').slice(0, 4).join(' ') + '...';
            }
        } else if (project.outcomes?.compliance?.length) {
            constraint = project.outcomes.compliance[0].standard;
        } else if (isLocalizedPersonaChallenge(project.challenge)) {
            const tensions = getLocalizedStringArray(project.challenge.standard.keyTensions, locale);
            if (tensions[0]) {
                constraint = tensions[0].split(' ').slice(0, 4).join(' ') + '...';
            }
        }
        
        if (constraint) {
            snapshot.push({
                icon: <ShieldAlert size={14} className="text-amber-500" />,
                label: t('caseStudies.constraints'),
                value: constraint,
                type: 'constraint'
            });
        }
        
        return snapshot;
    };

    // Get tags (max 6)
    const getTags = (): string[] => {
        const tags: string[] = [];
        
        // Add from tags field if present
        if (project.tags) {
            tags.push(...project.tags);
        }
        
        // Add from domains
        if (project.domains) {
            tags.push(...project.domains);
        }
        
        // Add project type
        const typeLabel = t(`projectsPage.projectTypes.${project.projectType}`, { defaultValue: project.projectType });
        if (!tags.includes(typeLabel)) {
            tags.push(typeLabel);
        }
        
        // Remove duplicates and limit to 6
        return [...new Set(tags)].slice(0, 6);
    };

    const executiveSnapshot = getExecutiveSnapshot();
    const tags = getTags();

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 
                           shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
                {/* Top accent bar */}
                <div className={`h-1 bg-gradient-to-r ${theme.gradient}`} />

                <div className="p-5 flex flex-col flex-1">
                    {/* Header: Title + Subtitle */}
                    <div className="mb-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-1">
                                {title}
                            </h3>
                            {/* Phase 3.1: Featured Badge - only show if in hero list AND case studies are promoted */}
                            {shouldShowFeaturedBadge(project.slug) && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 uppercase tracking-wide shrink-0">
                                    {t('caseStudies.featured.badge', { defaultValue: 'Featured' })}
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {clientType && `${clientType} · `}{industry}
                        </p>
                    </div>

                    {/* One-liner subtitle */}
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                        {subtitle}
                    </p>

                    {/* Phase 4.5: Outcome Badges (max 2) */}
                    {isPromoted('OUTCOME_BADGES') && project.outcomeBadges && project.outcomeBadges.length > 0 && (
                        <div className="mb-4">
                            <OutcomeBadges
                                badges={project.outcomeBadges}
                                max={2}
                                size="sm"
                                caseStudySlug={project.slug}
                                page="projects"
                            />
                        </div>
                    )}

                    {/* Executive Snapshot: Outcome, Scope, Constraints */}
                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3 mb-4 space-y-2">
                        {executiveSnapshot.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                                {item.icon}
                                <span className="text-slate-500 dark:text-slate-400 font-medium min-w-[60px]">
                                    {item.label}:
                                </span>
                                <span className="text-slate-700 dark:text-slate-300 truncate">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.map((tag, idx) => (
                            <span 
                                key={idx} 
                                className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA Row - pushed to bottom */}
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                        <Link
                            to={`/projects/${project.slug}`}
                            onClick={() => trackEvent('projects_card_click_case_study', {
                                slug: project.slug,
                                locale
                            })}
                            className="flex-1 text-center py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                            {t('caseStudies.viewCaseStudy')}
                            <ArrowRight size={14} />
                        </Link>
                                {execModalFlag.enabled && (
                                    <button
                                        onClick={() => {
                                            setShowExecutiveSummary(true);
                                            trackEvent('projects_card_click_exec_summary', {
                                                slug: project.slug,
                                                locale
                                            });
                                        }}
                                        className="py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors flex items-center justify-center gap-1.5"
                                        title={t('caseStudies.executiveSummary')}
                                    >
                                        <FileText size={14} />
                                        <span className="hidden sm:inline">{t('caseStudies.executiveSummary')}</span>
                                    </button>
                                )}
                    </div>
                </div>
            </motion.div>

            {/* Executive Summary Modal - Lazy loaded (gated by feature flag) */}
            {showExecutiveSummary && execModalFlag.enabled && (
                <Suspense fallback={
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
                            <Loader2 className="animate-spin text-emerald-600" size={32} />
                        </div>
                    </div>
                }>
                    <ExecutiveSummaryModal
                        project={project}
                        isOpen={showExecutiveSummary}
                        onClose={() => setShowExecutiveSummary(false)}
                    />
                </Suspense>
            )}
        </>
    );
};

export default React.memo(ProjectCard);
