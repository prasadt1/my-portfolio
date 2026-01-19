// src/components/ImpactDashboard.tsx
// Phase 3.3E: Mini impact dashboard component

import React from 'react';
import { TrendingUp, DollarSign, Clock, Shield, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImpactMetric {
    value: string;
    label: string;
    icon: React.ReactNode;
    type?: 'savings' | 'time' | 'risk' | 'scope';
}

interface ImpactDashboardProps {
    metrics: ImpactMetric[];
    compact?: boolean;
}

const ImpactDashboard: React.FC<ImpactDashboardProps> = ({ metrics, compact = false }) => {
    const iconMap: Record<string, React.ReactNode> = {
        savings: <DollarSign size={20} className="text-emerald-600 dark:text-emerald-400" />,
        time: <Clock size={20} className="text-blue-600 dark:text-blue-400" />,
        risk: <Shield size={20} className="text-amber-600 dark:text-amber-400" />,
        scope: <Target size={20} className="text-purple-600 dark:text-purple-400" />,
    };

    return (
        <div className={`grid ${compact ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
            {metrics.map((metric, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-center"
                >
                    <div className="flex items-center justify-center mb-2">
                        {metric.icon || iconMap[metric.type || 'savings']}
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        {metric.value}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                        {metric.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ImpactDashboard;
