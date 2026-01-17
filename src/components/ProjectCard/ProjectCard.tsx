import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Cpu, Layers, FileCode, Database, Shield, Clock } from 'lucide-react';
import { CaseStudy, isLocalizedPersonaChallenge, isLegacyChallenge, getLocalizedString } from '../../types/CaseStudy';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardTechStack from './ProjectCardTechStack';
import ProjectVisual from '../ProjectVisual';

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

// Project type badge configuration
const projectTypeBadges: Record<string, { icon: typeof Cpu; label: string; className: string }> = {
  'product': { icon: Cpu, label: 'Product', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' },
  'standard': { icon: Shield, label: 'Standard', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
  'migration': { icon: Layers, label: 'Migration', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  'framework': { icon: FileCode, label: 'Framework', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  'data-platform': { icon: Database, label: 'Data Platform', className: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400' }
};

interface ProjectCardProps {
    project: CaseStudy;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { t, i18n } = useTranslation();
    const [imageError, setImageError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const theme = project.theme || {
        color: 'emerald',
        gradient: 'from-slate-800 to-emerald-600 dark:from-slate-700 dark:to-emerald-500',
        iconBg: 'text-emerald-600 dark:text-emerald-400'
    };

    // Determine if this project has a detailed case study
    // Projects with approachToday or detailed phases are considered to have case studies
    const hasDetailedPhases = project.approach?.phases && project.approach.phases.length > 0 && (() => {
        const activities = project.approach.phases[0].activities;
        if (Array.isArray(activities)) return activities.length > 0;
        if (activities && typeof activities === 'object' && 'en' in activities) return activities.en.length > 0;
        return false;
    })();
    const hasCaseStudy = project.approachToday || hasDetailedPhases;
    
    // Get project type badge config
    const typeBadge = projectTypeBadges[project.projectType] || projectTypeBadges['framework'];
    const TypeIcon = typeBadge.icon;

    const getBackgroundImage = () => {
        if (imageError || !theme.backgroundImage) {
            return '/assets/bg/card-default.jpg';
        }
        return theme.backgroundImage;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
        >
            {/* Backgrounds */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
            <div
                className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-15 transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${getBackgroundImage()})` }}
                onError={handleImageError}
            />
            <img src={theme.backgroundImage || '/assets/bg/card-default.jpg'} alt="" className="hidden" onError={handleImageError} />
            <div className={`h-2 bg-gradient-to-r ${theme.gradient}`}></div>

            <div className="p-6 flex flex-col flex-1 relative z-10">
                {/* Header with Visual */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                        <ProjectCardHeader project={project} color={theme.color} iconBg={theme.iconBg} />
                    </div>
                    {project.visualType && (
                        <div className="ml-3 flex-shrink-0 opacity-60">
                            <ProjectVisual visualType={project.visualType} size="sm" />
                        </div>
                    )}
                </div>

                {/* 2-line Summary */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2 flex-1 min-h-[2.5rem]">
                    {getChallengeSituation(project.challenge, i18n.language)}
                </p>

                {/* Project Type Badge + Domain Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {/* Project type badge */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${typeBadge.className}`}>
                        <TypeIcon size={12} />
                        {t(`projectsPage.projectTypes.${project.projectType}`, { defaultValue: typeBadge.label })}
                    </span>
                    {project.domains.slice(0, 1).map((domain, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                            {domain}
                        </span>
                    ))}
                    {project.outcomes?.hero_metric?.label && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            {typeof project.outcomes.hero_metric.label === 'string' 
                                ? project.outcomes.hero_metric.label 
                                : getLocalizedString(project.outcomes.hero_metric.label, i18n.language)}
                        </span>
                    )}
                </div>

                {/* Approach Today - First Bullet Only (Expandable) */}
                {project.approachToday && (() => {
                    const bullets = i18n.language === 'de' ? project.approachToday.bulletsDe : project.approachToday.bullets;
                    const firstBullet = bullets[0];
                    if (!firstBullet) return null;
                    return (
                        <div className="mb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                                {t('projects.approachToday.title')}
                            </h4>
                            <ul className="space-y-1.5 mb-2">
                                <li className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-1.5">
                                    <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0">•</span>
                                    <span>{firstBullet}</span>
                                </li>
                                {isExpanded && bullets.slice(1).map((bullet, idx) => (
                                    <li key={idx + 1} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-1.5">
                                        <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0">•</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            {bullets.length > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsExpanded(!isExpanded);
                                    }}
                                    className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors"
                                >
                                    {isExpanded ? t('projects.approachToday.less') : t('projects.approachToday.more')}
                                    <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </button>
                            )}
                        </div>
                    );
                })()}

                <ProjectCardTechStack project={project} />

                {/* CTA - Different for projects with/without detailed case studies */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 mt-auto">
                    {hasCaseStudy ? (
                        <Link
                            to={`/projects/${project.slug}`}
                            className="w-full text-center py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-1.5"
                        >
                            {t('projects.viewCaseStudy', { defaultValue: 'View Case Study' })}
                            <ArrowRight size={14} />
                        </Link>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="w-full text-center py-2 px-4 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center justify-center gap-1.5">
                                <Clock size={14} />
                                {t('projects.caseStudyComingSoon', { defaultValue: 'Case Study Coming Soon' })}
                            </div>
                            <Link
                                to={`/projects/${project.slug}`}
                                className="w-full text-center py-2 px-4 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium text-sm transition-colors flex items-center justify-center gap-1.5"
                            >
                                {t('projects.viewOverview', { defaultValue: 'View Overview' })}
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default React.memo(ProjectCard);
