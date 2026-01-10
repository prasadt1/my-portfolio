import React from 'react';
import { motion } from 'framer-motion';

interface DomainFilterProps {
    activeDomain: string;
    onSelectDomain: (domain: string) => void;
    domains: string[];
}

const DomainFilter: React.FC<DomainFilterProps> = ({ activeDomain, onSelectDomain, domains }) => {
    return (
        <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar w-full justify-start md:justify-center">
            {domains.map((domain) => (
                <motion.button
                    key={domain}
                    onClick={() => onSelectDomain(domain)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border
            ${activeDomain === domain
                            ? 'bg-slate-900 border-slate-900 text-white dark:bg-emerald-600 dark:border-emerald-600 shadow-lg shadow-emerald-900/10'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                        }
          `}
                >
                    {domain}
                </motion.button>
            ))}
        </div>
    );
};

export default DomainFilter;
