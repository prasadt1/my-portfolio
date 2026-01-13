import React from 'react';

type VisualType = 'performance' | 'modernization' | 'integration' | 'ai' | 'governance' | 'platform';

interface ProjectVisualProps {
    visualType: VisualType;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const ProjectVisual: React.FC<ProjectVisualProps> = ({ visualType, className = '', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-24 h-24'
    };

    const baseSize = sizeClasses[size];

    // Subtle SVG graphics with consistent styling
    const visuals: Record<VisualType, JSX.Element> = {
        performance: (
            <svg viewBox="0 0 100 100" className={`${baseSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="50" r="8" fill="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-60" />
                <circle cx="40" cy="40" r="10" fill="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-70" />
                <circle cx="60" cy="30" r="12" fill="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-80" />
                <circle cx="80" cy="25" r="14" fill="currentColor" className="text-emerald-600 dark:text-emerald-400" />
                <line x1="20" y1="50" x2="40" y2="40" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-40" strokeWidth="2" />
                <line x1="40" y1="40" x2="60" y2="30" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-50" strokeWidth="2" />
                <line x1="60" y1="30" x2="80" y2="25" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-60" strokeWidth="2" />
            </svg>
        ),
        modernization: (
            <svg viewBox="0 0 100 100" className={`${baseSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="60" width="25" height="25" rx="3" fill="currentColor" className="text-slate-400 dark:text-slate-500 opacity-50" />
                <rect x="45" y="45" width="25" height="25" rx="3" fill="currentColor" className="text-blue-600 dark:text-blue-400 opacity-70" />
                <rect x="60" y="30" width="25" height="25" rx="3" fill="currentColor" className="text-emerald-600 dark:text-emerald-400" />
                <path d="M27.5 72.5 L45 57.5 M52.5 57.5 L60 42.5" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-50" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        integration: (
            <svg viewBox="0 0 100 100" className={`${baseSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="12" fill="currentColor" className="text-blue-600 dark:text-blue-400 opacity-70" />
                <circle cx="75" cy="25" r="12" fill="currentColor" className="text-purple-600 dark:text-purple-400 opacity-70" />
                <circle cx="50" cy="75" r="12" fill="currentColor" className="text-emerald-600 dark:text-emerald-400" />
                <path d="M35 30 L65 30 M37 37.5 L63 62.5 M65 37.5 L37 62.5" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-50" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        ),
        ai: (
            <svg viewBox="0 0 100 100" className={`${baseSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="20" fill="currentColor" className="text-purple-600 dark:text-purple-400 opacity-20" />
                <circle cx="35" cy="35" r="8" fill="currentColor" className="text-purple-600 dark:text-purple-400 opacity-60" />
                <circle cx="65" cy="35" r="8" fill="currentColor" className="text-purple-600 dark:text-purple-400 opacity-60" />
                <circle cx="50" cy="65" r="10" fill="currentColor" className="text-purple-600 dark:text-purple-400" />
                <path d="M35 35 L50 50 L65 35 M50 50 L50 65" stroke="currentColor" className="text-purple-600 dark:text-purple-400 opacity-50" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        governance: (
            <svg viewBox="0 0 100 100" className={`${baseSize} ${className} text-emerald-600 dark:text-emerald-400`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="30" width="40" height="50" rx="2" fill="currentColor" className="opacity-20" stroke="currentColor" strokeWidth="2" />
                <line x1="35" y1="45" x2="65" y2="45" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth="2" />
                <line x1="35" y1="55" x2="65" y2="55" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-70" strokeWidth="2" />
                <line x1="35" y1="65" x2="65" y2="65" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-50" strokeWidth="2" />
                <circle cx="50" cy="38" r="3" fill="currentColor" className="text-emerald-600 dark:text-emerald-400" />
            </svg>
        ),
        platform: (
            <svg viewBox="0 0 100 100" className={`${baseSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="70" width="60" height="8" rx="2" fill="currentColor" className="text-slate-600 dark:text-slate-400 opacity-50" />
                <rect x="25" y="55" width="50" height="8" rx="2" fill="currentColor" className="text-blue-600 dark:text-blue-400 opacity-60" />
                <rect x="30" y="40" width="40" height="8" rx="2" fill="currentColor" className="text-emerald-600 dark:text-emerald-400 opacity-70" />
                <rect x="35" y="25" width="30" height="8" rx="2" fill="currentColor" className="text-emerald-600 dark:text-emerald-400" />
                <circle cx="50" cy="20" r="4" fill="currentColor" className="text-emerald-600 dark:text-emerald-400" />
            </svg>
        )
    };

    return (
        <div className={`inline-flex items-center justify-center ${className}`}>
            {visuals[visualType] || visuals.platform}
        </div>
    );
};

export default ProjectVisual;
export type { VisualType };
