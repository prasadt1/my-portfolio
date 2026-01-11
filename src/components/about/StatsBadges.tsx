import React from 'react';

interface Outcome {
  value: string;
  label: string;
}

interface StatsBadgesProps {
  outcomes: Outcome[];
  className?: string;
}

const StatsBadges: React.FC<StatsBadgesProps> = ({ outcomes, className = '' }) => {
  // Use 2-column grid for better width utilization
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {outcomes.map((outcome, i) => (
        <div
          key={i}
          className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg px-4 py-3 flex flex-col items-center text-center"
        >
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            {outcome.value}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {outcome.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBadges;
