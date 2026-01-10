import React from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoadingStateProps {
    variant?: 'spinner' | 'dots' | 'skeleton';
    text?: string;
    className?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ variant = 'spinner', text, className = '' }) => {
    const { t } = useTranslation();
    const defaultText = t('common.loading');

    if (variant === 'skeleton') {
        return (
            <div className={`animate-pulse space-y-4 ${className}`}>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                </div>
            </div>
        );
    }

    if (variant === 'dots') {
        return (
            <div className={`flex items-center gap-1 ${className}`}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
                {text && <span className="ml-2 text-sm text-slate-500">{text}</span>}
            </div>
        );
    }

    // Default Spinner
    return (
        <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
            <p className="text-slate-600 dark:text-slate-300 font-medium animate-pulse">
                {text || defaultText}
            </p>
        </div>
    );
};

export default LoadingState;
