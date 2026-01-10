// src/components/ProjectCard/ProjectCard.tsx - REFACTORED
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { CaseStudy } from '../../types/CaseStudy';
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardMetrics from './ProjectCardMetrics';
import ProjectCardTechStack from './ProjectCardTechStack';

interface ProjectCardProps {
  project: CaseStudy;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const {
    slug,
    title,
    subtitle,
    projectType,
    industry,
    outcomes,
    technical,
    header,
    theme
  } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
    >
      {/* Header */}
      <ProjectCardHeader
        projectType={projectType}
        industry={industry}
        theme={theme}
      />

      {/* Title & Subtitle */}
      <Link to={`/projects/${slug}`}>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>
      </Link>
      <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-2">
        {subtitle}
      </p>

      {/* Client Info (if exists) */}
      {header?.client && (
        <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
          <Building2 className="text-emerald-600" size={20} />
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              {header.client.type}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {header.client.size} • {header.client.industry}
            </div>
          </div>
        </div>
      )}

      {/* Metrics */}
      {outcomes.secondary_metrics && outcomes.secondary_metrics.length > 0 && (
        <ProjectCardMetrics
          metrics={outcomes.secondary_metrics}
          theme={theme}
        />
      )}

      {/* Tech Stack */}
      {technical.after.stack && technical.after.stack.length > 0 && (
        <ProjectCardTechStack
          stack={technical.after.stack}
          maxDisplay={6}
        />
      )}

      {/* CTA */}
      <Link
        to={`/projects/${slug}`}
        className={`inline-flex items-center gap-2 ${theme?.color || 'text-emerald-600'} font-semibold hover:gap-3 transition-all group`}
      >
        View Full Case Study
        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
      </Link>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
