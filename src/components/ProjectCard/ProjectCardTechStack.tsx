import React from 'react';
import { Layers } from 'lucide-react';
import { CaseStudy } from '../../types/CaseStudy';

interface ProjectCardTechStackProps {
    project: CaseStudy;
}

const ProjectCardTechStack: React.FC<ProjectCardTechStackProps> = ({ project }) => {
    if (!project.technical.after?.stack) return null;

    return (
        <div className="border-t border-slate-100 dark:border-slate-700 pt-4 mt-auto">
            <div className="flex items-center gap-2 mb-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                <Layers size={14} /> Technology Stack
            </div>
            <div className="flex flex-wrap gap-2">
                {project.technical.after.stack.slice(0, 5).map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200/50 dark:border-slate-600/50">
                        {tech}
                    </span>
                ))}
                {project.technical.after.stack.length > 5 && (
                    <span className="px-2 py-1 text-[10px] text-slate-400 dark:text-slate-500">+ {project.technical.after.stack.length - 5} more</span>
                )}
            </div>
        </div>
    );
};

export default React.memo(ProjectCardTechStack);
