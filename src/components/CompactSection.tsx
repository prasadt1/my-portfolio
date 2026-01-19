// src/components/CompactSection.tsx
// Phase 4 A1: Compact section wrapper for progressive disclosure

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CompactSectionProps {
    children: ReactNode;
    maxItems?: number;
    expandable?: boolean;
    className?: string;
    variant?: 'grid' | 'list' | 'cards';
}

interface CompactSectionInternalProps extends CompactSectionProps {
    items: ReactNode[];
}

const CompactSectionInternal: React.FC<CompactSectionInternalProps> = ({
    items,
    maxItems = 3,
    expandable = true,
    className = '',
    variant = 'list',
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const visibleItems = isExpanded ? items : items.slice(0, maxItems);
    const hasMore = items.length > maxItems;

    const containerClass = {
        grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        list: 'space-y-3',
        cards: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    }[variant];

    return (
        <div className={className}>
            <div className={containerClass}>
                {visibleItems.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                    >
                        {item}
                    </motion.div>
                ))}
            </div>
            {expandable && hasMore && !isExpanded && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors"
                    >
                        Show {items.length - maxItems} more
                    </button>
                </div>
            )}
        </div>
    );
};

const CompactSection: React.FC<CompactSectionProps & { items?: ReactNode[] }> = (props) => {
    if (props.items) {
        return <CompactSectionInternal {...props} items={props.items} />;
    }

    // If no items prop, just render children with wrapper
    return (
        <div className={props.className}>
            {props.children}
        </div>
    );
};

export default CompactSection;
