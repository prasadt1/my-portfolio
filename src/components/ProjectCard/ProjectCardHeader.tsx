import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Layers } from 'lucide-react';
import { CaseStudy } from '../../types/CaseStudy';

interface ProjectCardHeaderProps {
    project: CaseStudy;
    color: string;
    iconBg: string;
}

const ProjectCardHeader: React.FC<ProjectCardHeaderProps> = ({ project, color, iconBg }) => {
    const { t } = useTranslation('projects');

    return (
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2 text-${color}-600 dark:text-${color}-400`}>
                    <Building2 size={12} />
                    {t(`${project.id}.header.eyebrow`, { defaultValue: project.header.eyebrow })}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {t(`${project.id}.header.title`, { defaultValue: project.header.title })}
                </h3>
            </div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-${color}-100 dark:bg-${color}-900/30 ${iconBg} flex-shrink-0`}>
                <Layers size={18} />
            </div>
        </div>
    );
};

export default React.memo(ProjectCardHeader);
