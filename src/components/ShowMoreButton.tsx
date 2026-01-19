// src/components/ShowMoreButton.tsx
// Phase 4: Reusable show more/less button with animation

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ShowMoreButtonProps {
    isExpanded: boolean;
    onClick: () => void;
    showMoreText?: string;
    showLessText?: string;
    count?: number; // Number of additional items
    className?: string;
    sectionId?: string; // For analytics
}

const ShowMoreButton: React.FC<ShowMoreButtonProps> = ({
    isExpanded,
    onClick,
    showMoreText = 'Show more',
    showLessText = 'Show less',
    count,
    className = '',
    sectionId
}) => {
    const handleClick = () => {
        onClick();
        
        // Analytics tracking
        if (typeof window !== 'undefined') {
            const eventData = {
                section_id: sectionId,
                expanded: !isExpanded,
                count: count
            };
            
            if ((window as any).__trackEvent) {
                (window as any).__trackEvent('show_more_clicked', eventData);
            }
        }
    };

    return (
        <motion.button
            onClick={handleClick}
            className={`inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors ${className}`}
            aria-expanded={isExpanded}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {isExpanded ? (
                <>
                    {showLessText}
                    <motion.div
                        animate={{ rotate: 180 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronUp size={16} />
                    </motion.div>
                </>
            ) : (
                <>
                    {showMoreText}
                    {count !== undefined && count > 0 && (
                        <span className="text-slate-500 dark:text-slate-400">
                            ({count})
                        </span>
                    )}
                    <ChevronDown size={16} />
                </>
            )}
        </motion.button>
    );
};

export default ShowMoreButton;
