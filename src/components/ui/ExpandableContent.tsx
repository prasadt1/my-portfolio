// src/components/ui/ExpandableContent.tsx
// Phase 5: Reusable expandable content component for density reduction
// Supports text, lists, paragraphs, grids - collapses by line count

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ExpandableContentProps {
  children: React.ReactNode;
  initialLines?: number; // Default: 3 mobile, 5 desktop
  collapsedHeight?: string; // Optional explicit height override
  showMoreKey?: string; // Translation key for "Show more"
  showLessKey?: string; // Translation key for "Show less"
  className?: string;
  onExpand?: () => void; // Optional callback
}

const ExpandableContent: React.FC<ExpandableContentProps> = ({
  children,
  initialLines,
  collapsedHeight,
  showMoreKey = 'common.showMore',
  showLessKey = 'common.showLess',
  className = '',
  onExpand,
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Determine initial lines based on screen size
  const getInitialLines = () => {
    if (initialLines !== undefined) return initialLines;
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 3 : 5;
    }
    return 5;
  };

  // Check if content needs expansion
  useEffect(() => {
    if (!contentRef.current || !wrapperRef.current) return;

    const fullHeight = contentRef.current.scrollHeight;
    const lines = getInitialLines();
    const lineHeight = 24; // Approximate line height in pixels (1.5rem)
    const maxCollapsedHeight = collapsedHeight 
      ? parseFloat(collapsedHeight) 
      : lines * lineHeight;
    
    setMeasuredHeight(fullHeight);
    setNeedsExpansion(fullHeight > maxCollapsedHeight + 20); // 20px threshold
  }, [children, initialLines, collapsedHeight]);

  const handleToggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (newState && onExpand) {
      onExpand();
    }
  };

  const lines = getInitialLines();
  const lineHeight = '1.5rem';
  const height = collapsedHeight || `calc(${lines} * ${lineHeight})`;

  if (!needsExpansion || measuredHeight === null) {
    // Content fits or not measured yet, no need for expansion
    return <div ref={wrapperRef} className={className}><div ref={contentRef}>{children}</div></div>;
  }

  return (
    <div ref={wrapperRef} className={className}>
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: height }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: height }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>{children}</div>
            <button
              onClick={handleToggle}
              className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
              aria-expanded={true}
              aria-label={t(showLessKey, 'Show less')}
            >
              {t(showLessKey, 'Show less')}
              <ChevronUp size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden relative"
            style={{ maxHeight: height }}
          >
            <div ref={contentRef} className="relative">
              {children}
              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
            </div>
            <button
              onClick={handleToggle}
              className="mt-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
              aria-expanded={false}
              aria-label={t(showMoreKey, 'Show more')}
            >
              {t(showMoreKey, 'Show more')}
              <ChevronDown size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableContent;
