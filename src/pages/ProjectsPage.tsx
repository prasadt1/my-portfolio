import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { Search, ChevronDown, ChevronUp, FolderGit2, ArrowRight, Globe, Award, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import { isLocalizedPersonaChallenge, isLegacyChallenge, getLocalizedString, type CaseStudy, type LocalizedString } from '../types/CaseStudy';
import ProjectCard from '../components/ProjectCard';
import { trackEvent } from '../services/analytics';

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
    const [isFilterBarSticky, setIsFilterBarSticky] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    
    const filterBarRef = useRef<HTMLDivElement>(null);
    const searchDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const stickyTrackedRef = useRef(false);
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownItemsRef = useRef<(HTMLButtonElement | null)[]>([]);

    // Debounced search change tracking
    useEffect(() => {
        if (searchDebounceTimerRef.current) {
            clearTimeout(searchDebounceTimerRef.current);
        }
        
        if (searchQuery.trim().length > 0) {
            searchDebounceTimerRef.current = setTimeout(() => {
                trackEvent('projects_filter_search_changed', {
                    queryLength: searchQuery.length,
                    locale
                });
            }, 700);
        }
        
        return () => {
            if (searchDebounceTimerRef.current) {
                clearTimeout(searchDebounceTimerRef.current);
            }
        };
    }, [searchQuery, locale]);
    
    // Track sticky filter bar activation
    useEffect(() => {
        if (!filterBarRef.current) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isSticky = !entry.isIntersecting;
                if (isSticky && !stickyTrackedRef.current) {
                    setIsFilterBarSticky(true);
                    stickyTrackedRef.current = true;
                    trackEvent('projects_filter_bar_sticky_active', { locale });
                } else if (entry.isIntersecting) {
                    setIsFilterBarSticky(false);
                    stickyTrackedRef.current = false;
                }
            },
            { threshold: [0], rootMargin: '-80px 0px 0px 0px' }
        );
        
        observer.observe(filterBarRef.current);
        return () => observer.disconnect();
    }, [locale]);
    
    // Keyboard navigation for dropdown
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!isFilterOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsFilterOpen(true);
                setFocusedIndex(0);
            }
            return;
        }
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev => (prev < CATEGORIES.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => (prev > 0 ? prev - 1 : CATEGORIES.length - 1));
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (focusedIndex >= 0 && focusedIndex < CATEGORIES.length) {
                    const category = CATEGORIES[focusedIndex];
                    setSelectedCategory(category.id);
                    setIsFilterOpen(false);
                    setFocusedIndex(-1);
                    trackEvent('projects_filter_category_selected', {
                        category: category.id,
                        locale
                    });
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsFilterOpen(false);
                setFocusedIndex(-1);
                dropdownButtonRef.current?.focus();
                break;
            case 'Tab':
                if (!e.shiftKey && focusedIndex === CATEGORIES.length - 1) {
                    setIsFilterOpen(false);
                    setFocusedIndex(-1);
                }
                break;
        }
    }, [isFilterOpen, focusedIndex, locale]);
    
    // Focus management for dropdown items
    useEffect(() => {
        if (isFilterOpen && focusedIndex >= 0 && dropdownItemsRef.current[focusedIndex]) {
            dropdownItemsRef.current[focusedIndex]?.focus();
        }
    }, [isFilterOpen, focusedIndex]);
    
    // Track filter clear
    const handleClearFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedCategory('all');
        trackEvent('projects_filter_cleared', { locale });
    }, [locale]);
    
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

    // Phase 4 E1: Featured projects (5 hero case studies)
    const HERO_SLUGS = ['brita-ecommerce', 'delivery-hero-ads', 'insurance-performance', 'pact-pcf-data-exchange-network', 'photography-coach-ai'];
    const featuredProjects = projects.filter(p => HERO_SLUGS.includes(p.slug)).slice(0, 5);
    const showFeatured = !searchQuery && selectedCategory === 'all' && featuredProjects.length > 0;
    
    // Phase 4 E1: Collapsed all projects list (show first 9, expand for more)
    const [showAllProjects, setShowAllProjects] = useState(false);
    const otherProjects = projects.filter(p => !HERO_SLUGS.includes(p.slug));
    const displayedOtherProjects = showAllProjects ? otherProjects : otherProjects.slice(0, 9);
    const hasMoreProjects = otherProjects.length > 9;

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

                {/* Phase 4 E2: Quick Preset Filter Chips */}
                {!searchQuery && selectedCategory === 'all' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center justify-center gap-2 mb-6"
                    >
                        {[
                            { id: 'cost-savings', label: t('projectsPage.presets.costSavings', { defaultValue: 'Cost Savings' }), domains: ['Cost Optimization', 'Cloud Migration'] },
                            { id: 'compliance', label: t('projectsPage.presets.compliance', { defaultValue: 'Compliance Heavy' }), domains: ['Compliance', 'Healthcare IT', 'FinTech'] },
                            { id: 'ai-genai', label: t('projectsPage.presets.aiGenai', { defaultValue: 'AI/GenAI' }), domains: ['AI & GenAI', 'AI/ML'] },
                            { id: 'platform-engineering', label: t('projectsPage.presets.platformEngineering', { defaultValue: 'Platform Engineering' }), domains: ['Platform Engineering', 'Enterprise Integration'] },
                        ].map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => {
                                    // Find matching category or set search
                                    const matchingCategory = CATEGORIES.find(c => 
                                        c.domains?.some(d => preset.domains.includes(d))
                                    );
                                    if (matchingCategory) {
                                        setSelectedCategory(matchingCategory.id);
                                    }
                                    trackEvent('projects_preset_filter_clicked', {
                                        preset: preset.id,
                                        locale,
                                    });
                                }}
                                className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                            >
                                {preset.label}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Phase 4 E2: Simplified Filter Controls - Sticky */}
                <motion.div 
                    ref={filterBarRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`sticky top-0 z-30 flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto transition-all ${
                        isFilterBarSticky 
                            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 pt-4 pb-4 mb-6 shadow-sm' 
                            : ''
                    }`}
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

                    {/* Phase 4 E2: Simplified Category Filter Dropdown */}
                    <div className="relative">
                        <button
                            ref={dropdownButtonRef}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            onKeyDown={handleKeyDown}
                            aria-expanded={isFilterOpen}
                            aria-haspopup="listbox"
                            className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 rounded-lg 
                                       border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 
                                       text-slate-700 dark:text-slate-300 text-sm font-medium
                                       hover:border-slate-400 dark:hover:border-slate-500 transition-colors
                                       focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                        >
                            <span>{t('projectsPage.filterLabel', { defaultValue: 'Category' })}</span>
                            <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    role="listbox"
                                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg 
                                               border border-slate-300 dark:border-slate-600 shadow-lg z-40 py-1"
                                >
                                    {CATEGORIES.map((category, idx) => (
                                        <button
                                            key={category.id}
                                            ref={(el) => { dropdownItemsRef.current[idx] = el; }}
                                            onClick={() => {
                                                setSelectedCategory(category.id);
                                                setIsFilterOpen(false);
                                                setFocusedIndex(-1);
                                                trackEvent('projects_filter_category_selected', {
                                                    category: category.id,
                                                    locale
                                                });
                                            }}
                                            onKeyDown={handleKeyDown}
                                            role="option"
                                            aria-selected={selectedCategory === category.id}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors
                                                       ${selectedCategory === category.id 
                                                           ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                                                           : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                       }
                                                       ${focusedIndex === idx ? 'bg-slate-100 dark:bg-slate-700' : ''}
                                                       focus:outline-none focus:ring-2 focus:ring-emerald-500/50`}
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
                            onClick={handleClearFilters}
                            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                        >
                            Clear
                        </button>
                    </motion.div>
                )}

                {/* Phase 4 E1: Featured Projects Section - 5 Hero Projects */}
                {showFeatured && featuredProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                                {t('projectsPage.featured.title', { defaultValue: 'Featured Case Studies' })}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            {featuredProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Phase 4 E1: All Projects Section (when filters are active or showing all) */}
                {!showFeatured && filteredProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.05 }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Phase 4 E1: All Other Projects (when no filters and not showing featured) */}
                {showFeatured && otherProjects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                                {t('projectsPage.allProjects.title', { defaultValue: 'All Projects' })}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            {displayedOtherProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + idx * 0.05 }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </div>
                        {hasMoreProjects && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => {
                                        setShowAllProjects(!showAllProjects);
                                        trackEvent('projects_show_all_toggled', {
                                            showAll: !showAllProjects,
                                            locale
                                        });
                                    }}
                                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 
                                               bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 
                                               rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    {showAllProjects ? (
                                        <>
                                            {t('projectsPage.showLess', { defaultValue: 'Show Less' })}
                                            <ChevronUp size={16} />
                                        </>
                                    ) : (
                                        <>
                                            {t('projectsPage.showMore', { defaultValue: `Show ${otherProjects.length - 9} More` })}
                                            <ChevronDown size={16} />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}

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

                {/* Phase 4 E: SECTION 5 — CTA (Pattern break) */}
                {(filteredProjects.length > 0 || showFeatured) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 rounded-2xl p-8 md:p-12 text-white text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            {t('projectsPage.cta.title', { defaultValue: 'Need more examples relevant to your industry?' })}
                        </h2>
                        <p className="text-base text-emerald-100 mb-8 max-w-2xl mx-auto">
                            {t('projectsPage.cta.text', { defaultValue: 'I can provide a tailored case study shortlist based on your specific challenges and industry context.' })}
                        </p>
                        <Link
                            to="/contact?interest=case-studies"
                            onClick={() => {
                                trackEvent('projects_cta_clicked', {
                                    cta: 'tailored_shortlist',
                                    locale
                                });
                            }}
                            className="inline-flex items-center gap-2 bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-xl hover:shadow-2xl"
                        >
                            {t('projectsPage.cta.primary', { defaultValue: 'Request tailored case study shortlist' })}
                            <ArrowRight size={20} />
                        </Link>
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
