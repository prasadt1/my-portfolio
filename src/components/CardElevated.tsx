// src/components/CardElevated.tsx
// Phase 4: Elevated card variant for featured sections

import React from 'react';
import { motion } from 'framer-motion';

interface CardElevatedProps {
    children: React.ReactNode;
    className?: string;
    gradient?: boolean;
    index?: number;
}

const CardElevated: React.FC<CardElevatedProps> = ({
    children,
    className = '',
    gradient = false,
    index = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
                ${gradient 
                    ? 'bg-gradient-to-br from-emerald-50 to-slate-50 dark:from-emerald-900/20 dark:to-slate-800' 
                    : 'bg-white dark:bg-slate-800'
                }
                rounded-xl border-2 border-emerald-200 dark:border-emerald-800
                p-6 md:p-8
                shadow-lg hover:shadow-xl
                transition-all duration-300
                ${className}
            `}
        >
            {children}
        </motion.div>
    );
};

export default CardElevated;

// Re-export for convenience
export { default as CardElevatedBase } from './Card';
