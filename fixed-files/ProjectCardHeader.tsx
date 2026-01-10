// src/components/ProjectCard/ProjectCardHeader.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';

interface ProjectCardHeaderProps {
  projectType: string;
  industry: string;
  theme?: {
    color: string;
    iconBg: string;
  };
}

const ProjectCardHeader: React.FC<ProjectCardHeaderProps> = ({
  projectType,
  industry,
  theme
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <motion.div
        className={`${theme?.iconBg || 'bg-emerald-100 dark:bg-emerald-900/30'} p-3 rounded-xl`}
        whileHover={{ scale: 1.05 }}
      >
        <FolderGit2 className={`${theme?.color || 'text-emerald-600'} w-6 h-6`} />
      </motion.div>
      
      <div className="flex gap-2">
        <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
          {projectType}
        </span>
        <span className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
          {industry}
        </span>
      </div>
    </div>
  );
};

export default React.memo(ProjectCardHeader);
