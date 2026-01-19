// src/components/Card.tsx
// Phase 4 G2: Standardized card variants (CardStandard, CardElevated)

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export type CardVariant = 'standard' | 'elevated';

export interface CardProps {
    children: ReactNode;
    variant?: CardVariant;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
    padding?: 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
    children,
    variant = 'standard',
    className = '',
    hover = false,
    onClick,
    padding = 'md',
}) => {
    const baseClasses = 'rounded-xl border transition-all';
    
    const variantClasses = {
        standard: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm',
        elevated: 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 shadow-lg hover:shadow-xl',
    };

    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverClasses = hover ? 'hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600 cursor-pointer' : '';
    const clickClasses = onClick ? 'cursor-pointer' : '';

    const Component = onClick ? motion.button : motion.div;
    const props = onClick ? {
        onClick,
        whileHover: { scale: 1.01 },
        whileTap: { scale: 0.99 },
    } : {};

    return (
        <Component
            className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${clickClasses} ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Card;
