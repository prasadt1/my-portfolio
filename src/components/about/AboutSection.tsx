import React from 'react';

interface AboutSectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'muted';
}

const AboutSection: React.FC<AboutSectionProps> = ({
  children,
  className = '',
  background = 'default'
}) => {
  const bgClass =
    background === 'muted'
      ? 'bg-slate-50 dark:bg-slate-800/50'
      : 'bg-white dark:bg-slate-900';

  return (
    <section className={`${bgClass} py-12 md:py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default AboutSection;
