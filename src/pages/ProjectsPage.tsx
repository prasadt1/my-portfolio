import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { DOMAINS } from '../data/domains';
import { FolderGit2, ArrowRight, Globe, Award, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';

import SmartProjectFilter from '../components/SmartProjectFilter';
import DomainFilter from '../components/DomainFilter';

import ProjectCard from '../components/ProjectCard';

const ProjectsPage: React.FC = () => {
  const { t } = useTranslation();
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

        {/* Featured Case Study */}
        {!isSmartFilterActive && activeDomain === 'All' && (() => {
          const featuredProject = projects.find(p => p.slug === 'pact-pcf-data-exchange-network');
          if (!featuredProject) return null;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-emerald-800/20 rounded-2xl p-8 md:p-12 border-2 border-emerald-200 dark:border-emerald-700 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                      {t('projectsPage.featured.badge', { defaultValue: 'Featured' })}
                    </span>
                    <span className="px-3 py-1 bg-white/80 dark:bg-slate-800/80 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-700">
                      {t('projectsPage.featured.globalStandard', { defaultValue: 'Global Standard' })}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-serif">
                    {featuredProject.header?.title || featuredProject.title}
                  </h2>
                  
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 max-w-3xl leading-relaxed">
                    {featuredProject.challenge?.situation}
                  </p>
                  
                  {/* Key metrics */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                        <Globe className="text-emerald-600 dark:text-emerald-400" size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">90+</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">{t('projectsPage.featured.fortune100', { defaultValue: 'Fortune 100 Adopters' })}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-emerald-600 dark:text-emerald-400" size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">60%</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">{t('projectsPage.featured.integrationReduction', { defaultValue: 'Integration Time Reduction' })}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                        <Award className="text-emerald-600 dark:text-emerald-400" size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">WBCSD</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">{t('projectsPage.featured.globalBody', { defaultValue: 'Global Standards Body' })}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/projects/${featuredProject.slug}`}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    {t('projectsPage.featured.readCaseStudy', { defaultValue: 'Read Full Case Study' })}
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Other Projects Section Header */}
        {!isSmartFilterActive && activeDomain === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('projectsPage.otherProjects.title', { defaultValue: 'Other Projects' })}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {t('projectsPage.otherProjects.subtitle', { defaultValue: 'Architecture reviews, frameworks, and transformation work across industries' })}
            </p>
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProjects
              .filter(p => isSmartFilterActive || activeDomain !== 'All' || p.slug !== 'pact-pcf-data-exchange-network')
              .map((project) => (
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
