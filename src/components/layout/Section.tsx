import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'muted' | 'dark';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({ 
  children, 
  className = '',
  background = 'default',
  spacing = 'md'
}: SectionProps) {
  const backgroundClasses = {
    default: 'bg-white dark:bg-slate-900',
    muted: 'bg-slate-50 dark:bg-slate-800/50',
    dark: 'bg-slate-900 dark:bg-slate-950 text-white'
  };

  const spacingClasses = {
    none: '',
    sm: 'py-8 md:py-10',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20',
    xl: 'py-20 md:py-24'
  };

  return (
    <section className={`${backgroundClasses[background]} ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
