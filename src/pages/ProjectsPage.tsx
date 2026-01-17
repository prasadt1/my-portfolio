import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { Search, ChevronDown, FolderGit2, ArrowRight, Globe, Award, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import { isLocalizedPersonaChallenge, isLegacyChallenge, getLocalizedString, type CaseStudy, type LocalizedString } from '../types/CaseStudy';
import ProjectCard from '../components/ProjectCard';

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
function getLocalizedValue(value: string | LocalizedString | undefined, locale: string): string {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return getLocalizedString(value, locale);
}

// Category definitions for filtering
const CATEGORIES = [
    { id: 'all', labelKey: 'projectsPage.filterAll' },
    { id: 'cloud-modernization', labelKey: 'projectsPage.categories.cloud-modernization', domains: ['Cloud Modernization', 'Cloud Migration'] },
    { id: 'platform-engineering', labelKey: 'projectsPage.categories.platform-engineering', domains: ['Platform Engineering', 'Enterprise Integration'] },
    { id: 'ai-genai', labelKey: 'projectsPage.categories.ai-genai', domains: ['AI & GenAI', 'AI/ML'] },
    { id: 'compliance', labelKey: 'projectsPage.categories.compliance', domains: ['Compliance', 'Healthcare IT', 'FinTech'] },
    { id: 'ecommerce', labelKey: 'projectsPage.categories.ecommerce', domains: ['E-Commerce', 'Retail'] },
    { id: 'enterprise-integration', labelKey: 'projectsPage.categories.enterprise-integration', domains: ['Enterprise Integration', 'Enterprise Architecture'] },
];

const ProjectsPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter projects based on search and category
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            // Search filter
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const title = getLocalizedValue(project.header.title, locale).toLowerCase();
                const industry = getLocalizedValue(project.header.client.industry, locale).toLowerCase();
                const situation = getChallengeSituation(project.challenge, locale).toLowerCase();
                const tags = [...project.domains, ...project.seoTags, ...(project.tags || [])].join(' ').toLowerCase();
                
                if (!title.includes(query) && !industry.includes(query) && !situation.includes(query) && !tags.includes(query)) {
                    return false;
                }
            }
            
            // Category filter
            if (selectedCategory !== 'all') {
                const category = CATEGORIES.find(c => c.id === selectedCategory);
                if (category?.domains) {
                    const projectDomains = [...project.domains, ...(project.tags || [])].map(d => d.toLowerCase());
                    const hasMatch = category.domains.some(d => 
                        projectDomains.some(pd => pd.includes(d.toLowerCase()) || d.toLowerCase().includes(pd))
                    );
                    if (!hasMatch) return false;
                }
            }
            
            return true;
        });
    }, [searchQuery, selectedCategory, locale]);

    // Featured project
    const featuredProject = projects.find(p => p.slug === 'pact-pcf-data-exchange-network');
    const showFeatured = !searchQuery && selectedCategory === 'all' && featuredProject;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
            <SEO
                title={t('projectsPage.title') + ' | Prasad Tilloo'}
                description={t('projectsPage.subtitle')}
                keywords="enterprise architecture, case studies, legacy modernization, digital transformation portfolio"
            />
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight font-serif mb-3">
                            {t('projectsPage.title')}
                        </h1>
                        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            {t('projectsPage.subtitle')}
                        </p>
                    </motion.div>
                </div>

                {/* Search and Filter Controls */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto"
                >
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('projectsPage.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 
                                       bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm
                                       focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500
                                       placeholder:text-slate-400"
                        />
                    </div>

                    {/* Category Filter Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg 
                                       border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 
                                       text-slate-700 dark:text-slate-300 text-sm font-medium
                                       hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            <span>{t('projectsPage.filterLabel')}</span>
                            <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg 
                                               border border-slate-200 dark:border-slate-700 shadow-lg z-20 py-1"
                                >
                                    {CATEGORIES.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => {
                                                setSelectedCategory(category.id);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors
                                                       ${selectedCategory === category.id 
                                                           ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                                                           : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                       }`}
                                        >
                                            {t(category.labelKey)}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Active filter indicator */}
                {(searchQuery || selectedCategory !== 'all') && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-2 mb-6 text-sm text-slate-500 dark:text-slate-400"
                    >
                        <span>
                            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                            {searchQuery && ` matching "${searchQuery}"`}
                            {selectedCategory !== 'all' && ` in ${t(`projectsPage.categories.${selectedCategory}`)}`}
                        </span>
                        <button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                        >
                            Clear
                        </button>
                    </motion.div>
                )}

                {/* Featured Case Study */}
                {showFeatured && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-10"
                    >
                        <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 dark:from-emerald-900/20 dark:via-teal-900/15 dark:to-emerald-800/15 rounded-2xl p-6 md:p-8 border border-emerald-200 dark:border-emerald-800 relative overflow-hidden">
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-5 pointer-events-none">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full -translate-y-1/2 translate-x-1/2" />
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                                        {t('projectsPage.featured.badge')}
                                    </span>
                                    <span className="px-2.5 py-1 bg-white/80 dark:bg-slate-800/80 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded-full">
                                        {t('projectsPage.featured.globalStandard')}
                                    </span>
                                </div>
                                
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 font-serif">
                                    {getLocalizedValue(featuredProject.header?.title, locale)}
                                </h2>
                                
                                <p className="text-sm text-slate-700 dark:text-slate-300 mb-6 max-w-2xl leading-relaxed line-clamp-2">
                                    {getChallengeSituation(featuredProject.challenge, locale)}
                                </p>
                                
                                {/* Key metrics - compact */}
                                <div className="flex flex-wrap gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                                            <Globe className="text-emerald-600 dark:text-emerald-400" size={16} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900 dark:text-white">90+</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{t('projectsPage.featured.fortune100')}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                                            <TrendingUp className="text-emerald-600 dark:text-emerald-400" size={16} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900 dark:text-white">60%</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{t('projectsPage.featured.integrationReduction')}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                                            <Award className="text-emerald-600 dark:text-emerald-400" size={16} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-slate-900 dark:text-white">WBCSD</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{t('projectsPage.featured.globalBody')}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <Link
                                    to={`/projects/${featuredProject.slug}`}
                                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-md hover:shadow-lg"
                                >
                                    {t('projectsPage.featured.readCaseStudy')}
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Section Header for Other Projects */}
                {showFeatured && filteredProjects.filter(p => p.slug !== 'pact-pcf-data-exchange-network').length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6"
                    >
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {t('projectsPage.otherProjects.title')}
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {t('projectsPage.otherProjects.subtitle')}
                        </p>
                    </motion.div>
                )}

                {/* Projects Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects
                            .filter(p => !showFeatured || p.slug !== 'pact-pcf-data-exchange-network')
                            .map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                            <FolderGit2 size={28} className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <h3 className="text-base font-medium text-slate-900 dark:text-white">{t('caseStudies.noResults')}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('caseStudies.noResultsHint')}</p>
                    </motion.div>
                )}
            </div>

            {/* Click outside to close dropdown */}
            {isFilterOpen && (
                <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsFilterOpen(false)}
                />
            )}
        </div>
    );
};

export default ProjectsPage;
