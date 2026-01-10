// src/components/ProjectCard/ProjectCardMetrics.tsx
import React from 'react';
import { TrendingUp, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
  icon: string;
}

interface ProjectCardMetricsProps {
  metrics: Metric[];
  theme?: {
    color: string;
  };
}

const ProjectCardMetrics: React.FC<ProjectCardMetricsProps> = ({
  metrics,
  theme
}) => {
  const getIcon = (iconName: string) => {
    const iconClass = theme?.color || 'text-emerald-600';
    
    switch (iconName) {
      case '💰':
      case '$ ':
        return <DollarSign size={16} className={iconClass} />;
      case '⏱️':
      case '🕐':
        return <Clock size={16} className={iconClass} />;
      case '📈':
      case '↗️':
        return <TrendingUp size={16} className={iconClass} />;
      case '✅':
      case '✓':
        return <CheckCircle2 size={16} className={iconClass} />;
      default:
        return <span className="text-base">{iconName}</span>;
    }
  };

  // Display max 3 metrics to avoid clutter
  const displayMetrics = metrics.slice(0, 3);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {displayMetrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="flex items-center justify-center mb-1">
            {getIcon(metric.icon)}
          </div>
          <div className={`text-2xl font-bold ${theme?.color || 'text-emerald-600'} mb-1`}>
            {metric.value}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProjectCardMetrics);
