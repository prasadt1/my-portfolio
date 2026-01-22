// src/components/StartHereDrawer.tsx
// Phase 4.5: Navigation drawer - "Where should I start?"

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  Sparkles, 
  FileText, 
  Download, 
  User, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { isPromoted } from '../config/featureUtils';
import { getGlobalPersona } from '../utils/personaPersistence';
import { trackEvent } from '../services/analytics';
import { getAttributionSnapshot } from '../utils/attribution';
import i18n from '../i18n';

const StartHereDrawer: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const persona = getGlobalPersona();
  const locale = i18n.language;
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Only show if feature is promoted
  if (!isPromoted('NAVIGATION_DRAWER')) {
    return null;
  }

  // Don't show on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const handleOpen = () => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
    trackEvent('start_here_drawer_opened', {
      locale,
      currentPath: location.pathname,
      persona: persona || 'consult',
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    // restore focus to the trigger (or last active element)
    previouslyFocusedRef.current?.focus?.();
  };

  const handleLinkClick = (linkId: string, path: string) => {
    trackEvent('start_here_drawer_link_clicked', {
      linkId,
      path,
      locale,
      persona: persona || 'consult',
    });
    setIsOpen(false);
  };

  // Quick links with persona-based highlighting
  const quickLinks = [
    {
      id: 'competition',
      path: '/competition',
      icon: Sparkles,
      labelKey: 'startHere.links.competition',
      highlight: false, // Competition mode specific
    },
    {
      id: 'caseStudies',
      path: '/projects',
      icon: FileText,
      labelKey: 'startHere.links.caseStudies',
      highlight: false,
    },
    {
      id: 'checklist',
      path: '/checklist',
      icon: Download,
      labelKey: 'startHere.links.checklist',
      highlight: persona === 'toolkit',
    },
    {
      id: 'hiring',
      path: '/hiring',
      icon: User,
      labelKey: 'startHere.links.hiring',
      highlight: persona === 'hire',
    },
    {
      id: 'bookCall',
      path: 'https://calendly.com/prasad-sgsits/30min',
      icon: Calendar,
      labelKey: 'startHere.links.bookCall',
      highlight: persona === 'consult',
      external: true,
    },
  ];

  // Keyboard navigation: ESC to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus trap when drawer is open (Tab cycles inside)
  useEffect(() => {
    if (isOpen) {
      const drawer = document.getElementById('start-here-drawer');
      const focusable = drawer?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = focusable ? Array.from(focusable).filter(el => !el.hasAttribute('disabled')) : [];
      const first = list[0];
      const last = list[list.length - 1];

      first?.focus();

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        if (list.length === 0) return;

        // shift+tab on first -> last
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }

        // tab on last -> first
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => document.removeEventListener('keydown', handleTab);
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Button - Bottom right, above chat widget */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className="fixed bottom-24 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group"
        aria-label={t('startHere.button', 'Start Here')}
      >
        <Sparkles className="w-5 h-5" />
        <span className="hidden sm:inline-block font-semibold text-sm whitespace-nowrap">
          {t('startHere.button', 'Start Here')}
        </span>
      </motion.button>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 z-50"
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              id="start-here-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <h2 id="drawer-title" className="text-2xl font-bold text-slate-900 dark:text-white">
                    {t('startHere.title', 'Where should I start?')}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {t('startHere.subtitle', 'Quick links to get the most value')}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close drawer"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Links List */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-3">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    const isHighlighted = link.highlight;
                    
                    const linkContent = (
                      <div
                        className={`
                          flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                          ${isHighlighted
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 dark:border-emerald-500 shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                          }
                        `}
                      >
                        <div className={`
                          w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                          ${isHighlighted
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                          }
                        `}>
                          <Icon size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`
                            font-semibold
                            ${isHighlighted
                              ? 'text-emerald-900 dark:text-emerald-100'
                              : 'text-slate-900 dark:text-white'
                            }
                          `}>
                            {t(link.labelKey)}
                          </div>
                          {isHighlighted && (
                            <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                              {t('startHere.recommended', 'Recommended for you')}
                            </div>
                          )}
                        </div>
                        <ChevronRight className={`
                          flex-shrink-0
                          ${isHighlighted
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-400 dark:text-slate-500'
                          }
                        `} size={20} />
                      </div>
                    );

                    if (link.external) {
                      return (
                        <a
                          key={link.id}
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleLinkClick(link.id, link.path)}
                          className="block"
                        >
                          {linkContent}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={link.id}
                        to={link.path}
                        onClick={() => handleLinkClick(link.id, link.path)}
                        className="block"
                      >
                        {linkContent}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default StartHereDrawer;
