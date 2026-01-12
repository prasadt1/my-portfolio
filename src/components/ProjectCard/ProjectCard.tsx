import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { CaseStudy } from '../../types/CaseStudy';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardTechStack from './ProjectCardTechStack';

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
                <ProjectCardHeader project={project} color={theme.color} iconBg={theme.iconBg} />

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                    {t(`${project.id}.challenge.situation`, { defaultValue: project.challenge.situation, ns: 'projects' })}
                </p>

                {/* Approach Today Section */}
                {project.approachToday && (() => {
                    const bullets = i18n.language === 'de' ? project.approachToday.bulletsDe : project.approachToday.bullets;
                    const displayBullets = isExpanded ? bullets : bullets.slice(0, 2);
                    return (
                        <div className="mb-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                                {t('projects.approachToday.title')}
                            </h4>
                            <ul className="space-y-1.5 mb-2">
                                {displayBullets.map((bullet, idx) => (
                                    <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex items-start gap-1.5">
                                        <span className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0">•</span>
                                        <span>{bullet}</span>
                                    </li>
                                ))}
                            </ul>
                            {bullets.length > 2 && (
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

                {/* CTAs */}
                <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700 mt-4">
                    <Link
                        to={`/projects/${project.slug}`}
                        className={`flex-1 text-center py-2.5 px-4 rounded-lg bg-${theme.color}-600 hover:bg-${theme.color}-700 text-white font-medium text-sm transition-colors flex items-center justify-center gap-1.5`}
                    >
                        {t(`${project.id}.cta.primary`, { defaultValue: project.cta.primary?.text || 'View Case Study' })}
                        <ArrowRight size={14} />
                    </Link>
                    {project.cta.secondary && (
                        <a
                            href={project.cta.secondary.action}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 text-center py-2.5 px-4 rounded-lg border-2 border-${theme.color}-600 text-${theme.color}-600 dark:text-${theme.color}-400 hover:bg-${theme.color}-50 dark:hover:bg-${theme.color}-900/20 font-medium text-sm transition-colors`}
                        >
                            {t(`${project.id}.cta.secondary`, { defaultValue: project.cta.secondary.text })}
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default React.memo(ProjectCard);
