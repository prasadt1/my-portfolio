// src/components/ProjectCard/ProjectCardTechStack.tsx
import React from 'react';

interface ProjectCardTechStackProps {
  stack: string[];
  maxDisplay?: number;
}

const ProjectCardTechStack: React.FC<ProjectCardTechStackProps> = ({
  stack,
  maxDisplay = 6
}) => {
  const displayStack = stack.slice(0, maxDisplay);
  const remainingCount = stack.length - maxDisplay;

  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Tech Stack
      </h4>
      <div className="flex flex-wrap gap-2">
        {displayStack.map((tech, index) => (
          <span
            key={index}
            className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {tech}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
            +{remainingCount} more
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProjectCardTechStack);
