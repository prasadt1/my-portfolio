// src/components/CardStandard.tsx
// Phase 4: Standard card variant

import React from 'react';
import { motion } from 'framer-motion';

interface CardStandardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    index?: number;
}

const CardStandard: React.FC<CardStandardProps> = ({
    children,
    className = '',
    hover = true,
    index = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`
                bg-white dark:bg-slate-800 
                rounded-lg border border-slate-200 dark:border-slate-700 
                p-4 md:p-6
                ${hover ? 'hover:shadow-md transition-shadow' : ''}
                ${className}
            `}
        >
            {children}
        </motion.div>
    );
};

export default CardStandard;
