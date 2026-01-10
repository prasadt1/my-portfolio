import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { CaseStudy } from '../types/CaseStudy';
import { DOMAINS } from '../data/domains';
import { FolderGit2, Building2, Tag, Layers, ArrowRight } from 'lucide-react';

import SmartProjectFilter from '../components/SmartProjectFilter';
import DomainFilter from '../components/DomainFilter';

const ProjectsPage: React.FC = () => {
  const location = useLocation();
  const [activeDomain, setActiveDomain] = useState<string>('All');
  const [smartTags, setSmartTags] = useState<string[]>([]);
  const [isSmartFilterActive, setIsSmartFilterActive] = useState(false);

  // Handle navigation from other pages (e.g. Home Page styling)
  useEffect(() => {
    if (location.state && location.state.filter) {
      setActiveDomain(location.state.filter);
    } else if (location.search) {
      const params = new URLSearchParams(location.search);
      const category = params.get('category');
      if (category) {
        // Map category slug to proper label if needed, complexity elided for now
        // For now, simple matching
        const matched = ['All', ...DOMAINS.map(d => d.label)].find(d => d.toLowerCase().includes(category.toLowerCase()));
        if (matched) setActiveDomain(matched);
      }
    }
  }, [location]);

  const allDomains = ['All', ...DOMAINS.map(d => d.label)];

  // Collect all searchable tags for Smart Filter
  const allProjectTags = Array.from(new Set(projects.flatMap(p => [
    ...p.domains,
    ...p.seoTags,
    ...(p.technical.after.stack || []),
    p.projectType
  ])));

  const handleSmartFilter = (tags: string[]) => {
    setSmartTags(tags);
    setIsSmartFilterActive(true);
    setActiveDomain('All');
  };

  const clearSmartFilter = () => {
    setIsSmartFilterActive(false);
    setSmartTags([]);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Smart Filter Logic
      if (isSmartFilterActive) {
        const projectTags = [
          ...project.domains.map(d => d.toLowerCase()),
          ...project.seoTags.map(t => t.toLowerCase()),
          ...project.technical.after.stack.map(s => s.toLowerCase()),
          project.projectType.toLowerCase()
        ];
        // Match ANY tag
        return smartTags.some(tag =>
          projectTags.some(pt => pt.includes(tag.toLowerCase()) || tag.toLowerCase().includes(pt))
        );
      }

      // Domain Logic
      if (activeDomain === 'All') return true;
      return project.domains.includes(activeDomain);
    });
  }, [activeDomain, isSmartFilterActive, smartTags]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight font-serif">
              Selected Works
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Multi-domain expertise delivering transformational outcomes across Healthcare, Climate Tech, and Enterprise Architecture.
            </p>
          </motion.div>

          {/* AI Filter */}
          <SmartProjectFilter onFilter={handleSmartFilter} availableTags={allProjectTags} />

          {isSmartFilterActive && (
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">Showing results for AI search:</span>
              <div className="flex gap-1 flex-wrap justify-center">
                {smartTags.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium">{t}</span>
                ))}
              </div>
              <button onClick={clearSmartFilter} className="text-xs text-red-500 hover:underline ml-2">Clear</button>
            </div>
          )}

          {/* Domain Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={isSmartFilterActive ? 'opacity-50 pointer-events-none grayscale transition-opacity' : ''}
          >
            <DomainFilter activeDomain={activeDomain} onSelectDomain={setActiveDomain} domains={allDomains} />
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <FolderGit2 size={32} className="text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white">No projects found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Internal Project Card
const ProjectCard: React.FC<{ project: CaseStudy }> = ({ project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 dark:hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Top Decoration */}
      <div className="h-2 bg-gradient-to-r from-slate-800 to-emerald-600 dark:from-slate-700 dark:to-emerald-500"></div>

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
              <Building2 size={12} />
              {project.header.client.industry}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {project.header.title}
            </h3>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Project Type Badge */}
          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-xs font-medium uppercase border border-slate-200 dark:border-slate-600">
            {project.projectType.replace('-', ' ')}
          </span>
          {/* Primary Domain Badge */}
          <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-xs font-medium border border-slate-200 dark:border-slate-600">
            {project.domains[0]}
          </span>
        </div>

        {/* Challenge/Summary */}
        <div className="space-y-3 mb-6 flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
            {project.challenge.situation}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="border-t border-slate-100 dark:border-slate-700 pt-4 mt-auto">
          <div className="flex items-center gap-2 mb-3 text-xs font-medium text-slate-400 dark:text-slate-500">
            <Layers size={14} /> Technology Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technical.after?.stack.slice(0, 5).map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200/50 dark:border-slate-600/50">
                {tech}
              </span>
            ))}
            {(project.technical.after?.stack.length || 0) > 5 && (
              <span className="px-2 py-1 text-[10px] text-slate-400 dark:text-slate-500">+ {(project.technical.after?.stack.length || 0) - 5} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Link */}
      <div className="px-6 pb-6 pt-0 mt-2">
        <Link to={`/projects/${project.slug}`} className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          View Case Study <ArrowRight size={16} />
        </Link>
      </div>

      {/* Hover Layer */}
      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/[0.02] dark:group-hover:bg-white/[0.02] transition-colors pointer-events-none" />
    </motion.div>
  );
};

export default ProjectsPage;
