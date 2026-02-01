import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, ChevronRight, Sparkles, ChevronDown, Wrench, Briefcase, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';
import { isCompetitionMode } from '../config/competition';
import { trackEvent } from '../services/analytics';
import { isPromoted, type FeatureKey } from '../config/featureUtils';
import { usePersonaCTAs } from '../utils/personaCTAs';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const competitionMode = isCompetitionMode();
  const { primary: primaryCTA } = usePersonaCTAs();

  // Phase 4.1: Simplified navigation - max 6 top-level items
  const coreNavItems = [
    { path: '/', labelKey: 'nav.home' },
    { path: '/services', labelKey: 'nav.services' },
    { path: '/projects', labelKey: 'nav.projects' },
    { path: '/about', labelKey: 'nav.about' },
    { path: '/resources', labelKey: 'nav.resources' },
    { path: '/contact', labelKey: 'nav.contact' },
  ];

  // Dropdown items - Merged Work With Me dropdown
  const workWithMeItems: Array<{ path: string; labelKey: string; featureKey?: FeatureKey; description?: string }> = [
    { 
      path: '/consultation', 
      labelKey: 'nav.consultation',
      description: 'Short-term projects & freelance work'
    },
    { 
      path: '/hiring', 
      labelKey: 'nav.hiring', 
      featureKey: 'HOMEPAGE_PERSONA_TABS' as FeatureKey,
      description: 'Full-time opportunities & recruiting'
    },
  ].filter(item => !item.featureKey || isPromoted(item.featureKey));

  // Dropdown state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = {
    workWithMe: useRef<HTMLDivElement>(null),
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      Object.values(dropdownRefs).forEach(ref => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      });
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

  return (
    <>
      {/* Phase 3.4A: Competition Mode Ribbon - Enhanced visibility and size */}
      {competitionMode && (
        <div className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 dark:from-emerald-700 dark:to-emerald-600 z-50 flex items-center justify-center shadow-xl border-b-4 border-emerald-400 dark:border-emerald-500">
          <Link
            to="/competition"
            className="text-white hover:text-emerald-100 dark:hover:text-emerald-200 transition-colors flex items-center gap-3 px-6 py-3 rounded-lg hover:bg-emerald-500/20 dark:hover:bg-emerald-600/20"
            onClick={() => trackEvent('competition_ribbon_clicked')}
          >
            <span className="inline-flex items-center gap-3">
              <Sparkles size={20} className="animate-pulse" />
              <div className="text-center">
                <div className="text-lg font-bold">🎉 New Year, New Portfolio Challenge</div>
                <div className="text-sm font-normal opacity-90">Google AI Portfolio Challenge Submission • Click to explore</div>
              </div>
            </span>
            <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      )}
      <nav
        className={`fixed ${competitionMode ? 'top-16' : 'top-0'} left-0 right-0 h-20 z-50 transition-all duration-300 ease-in-out border-b ${isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-sm'
          : 'bg-transparent border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-3 text-slate-900 dark:text-slate-100 hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-emerald-500 flex items-center justify-center text-white font-serif font-bold text-lg shadow-md">
              PT
            </div>
            <span className="text-xl font-serif font-semibold tracking-tight">
              Prasad Tilloo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-8 ml-12">
            <div className="flex gap-4 2xl:gap-6">
              {/* Core nav items */}
              {coreNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors relative py-1 whitespace-nowrap ${isActive(item.path)
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {t(item.labelKey)}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                    />
                  )}
                </Link>
              ))}

              {/* Work With Me Dropdown - Merged Hiring & Consultation */}
              {workWithMeItems.length > 0 && (
                <div ref={dropdownRefs.workWithMe} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'workWithMe' ? null : 'workWithMe')}
                    className={`text-sm font-medium transition-colors relative py-1 whitespace-nowrap flex items-center gap-1 ${
                      workWithMeItems.some(item => isActive(item.path))
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Work With Me
                    <ChevronDown size={14} className={`transition-transform ${openDropdown === 'workWithMe' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'workWithMe' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
                      >
                        {workWithMeItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setOpenDropdown(null)}
                            className={`block px-4 py-3 text-sm transition-colors ${
                              isActive(item.path)
                                ? 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                          >
                            <div className="font-medium">{t(item.labelKey)}</div>
                            {item.description && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {item.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Search Trigger */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors tooltip"
              title="Search (Cmd+K)"
            >
              <Search size={20} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Primary CTA - Persona-based */}
            <Link
              to={primaryCTA.path}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
            >
              {primaryCTA.label}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 xl:hidden">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`fixed ${competitionMode ? 'top-36' : 'top-20'} left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-40 xl:hidden overflow-hidden`}
            style={{ backgroundColor: 'white !important' }}
          >
            <div className="p-4 flex flex-col gap-2" style={{ backgroundColor: 'white !important' }}>
              {/* Core nav items */}
              {coreNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-3 rounded-lg text-base font-medium transition-colors ${isActive(item.path)
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  style={{ color: isActive(item.path) ? '#0f172a !important' : '#334155 !important' }}
                >
                  {t(item.labelKey)}
                </Link>
              ))}

              {/* Tools section */}
              {toolsItems.length > 0 && (
                <>
                  <div className="h-px bg-slate-100 my-2" />
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t('nav.tools')}
                  </div>
                  {toolsItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`p-3 rounded-lg text-base font-medium transition-colors pl-6 ${isActive(item.path)
                        ? 'bg-slate-50 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      style={{ color: isActive(item.path) ? '#0f172a !important' : '#475569 !important' }}
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </>
              )}

              {/* Consulting section */}
              {consultingItems.length > 0 && (
                <>
                  <div className="h-px bg-slate-100 my-2" />
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t('nav.consulting')}
                  </div>
                  {consultingItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`p-3 rounded-lg text-base font-medium transition-colors pl-6 ${isActive(item.path)
                        ? 'bg-slate-50 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      style={{ color: isActive(item.path) ? '#0f172a !important' : '#475569 !important' }}
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </>
              )}

              {/* Hiring section */}
              {hiringItems.length > 0 && (
                <>
                  <div className="h-px bg-slate-100 my-2" />
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {t('nav.hiring')}
                  </div>
                  {hiringItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`p-3 rounded-lg text-base font-medium transition-colors pl-6 ${isActive(item.path)
                        ? 'bg-slate-50 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      style={{ color: isActive(item.path) ? '#0f172a !important' : '#475569 !important' }}
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </>
              )}

              <div className="h-px bg-slate-100 my-2" />
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent('open-command-palette'));
                }}
                className="w-full text-left p-3 rounded-lg text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2"
                style={{ color: '#475569 !important' }}
              >
                <Search size={20} />
                <span>Search...</span>
              </button>
              <Link
                to={primaryCTA.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-emerald-600 text-white rounded-lg text-center font-semibold text-base shadow-sm active:scale-95 transition-transform"
              >
                {primaryCTA.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navigation;
