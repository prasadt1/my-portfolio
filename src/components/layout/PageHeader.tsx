import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  cta?: {
    text: string;
    href: string;
    external?: boolean;
  };
  className?: string;
}

export function PageHeader({ 
  title, 
  subtitle, 
  cta,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
          {subtitle}
        </p>
      )}
      {cta && (
        <div className="mt-8">
          {cta.external ? (
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {cta.text}
              <ArrowRight size={20} />
            </a>
          ) : (
            <Link
              to={cta.href}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {cta.text}
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
