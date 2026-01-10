import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { DOMAINS } from '../data/domains';
import { FolderGit2 } from 'lucide-react';
import SEO from '../components/SEO';

import SmartProjectFilter from '../components/SmartProjectFilter';
import DomainFilter from '../components/DomainFilter';

import ProjectCard from '../components/ProjectCard';

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
      <SEO
        title="Selected Works | Prasad Tilloo"
        description="A showcase of enterprise architecture, legacy modernization, and climate tech projects driving real business value."
        keywords="enterprise architecture, case studies, legacy modernization, digital transformation portfolio"
      />
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

export default ProjectsPage;
