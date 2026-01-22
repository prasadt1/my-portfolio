// src/components/ui/SectionHeader.tsx
// Phase 5: Standardized section header component for consistent visual hierarchy

import React from 'react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  rightSlot,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}) => {
  return (
    <div className={`flex items-start justify-between gap-4 mb-6 ${className}`}>
      <div className="flex-1 min-w-0">
        <h2 className={`text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 ${titleClassName}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`text-base md:text-lg text-slate-600 dark:text-slate-400 line-clamp-2 ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}
      </div>
      {rightSlot && (
        <div className="flex-shrink-0">
          {rightSlot}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
