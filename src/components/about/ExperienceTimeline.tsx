import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import ExperienceCard from './ExperienceCard';

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  businessChallenge: string;
  deliverables: string[];
  outcomes: Array<{ value: string; label: string }>;
  links?: {
    caseStudy?: string;
    product?: string;
  };
}

interface ExperienceTimelineProps {
  experiences: Experience[];
  title: string;
  challengeLabel: string;
  deliveredLabel: string;
  viewCaseStudyLabel: string;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  title,
  challengeLabel,
  deliveredLabel,
  viewCaseStudyLabel
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section>
      <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-8 md:mb-10 flex items-center gap-3">
        <Briefcase className="text-emerald-600 dark:text-emerald-500" size={28} />
        {title}
      </h2>

      {/* Desktop: 2-column layout */}
      <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
        {/* Left: Timeline Navigation */}
        <div className="space-y-2 min-w-0">
          {experiences.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedIndex === idx
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                {exp.company}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                {exp.role}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-500 font-mono">
                {exp.period}
              </div>
            </button>
          ))}
        </div>

        {/* Right: Selected Experience Detail */}
        <div className="min-w-0">
              <ExperienceCard
                experience={experiences[selectedIndex]}
                challengeLabel={challengeLabel}
                deliveredLabel={deliveredLabel}
                viewCaseStudyLabel={viewCaseStudyLabel}
                index={selectedIndex}
              />
        </div>
      </div>

      {/* Mobile: Single column stack */}
      <div className="lg:hidden space-y-6 md:space-y-8">
        {experiences.map((exp, idx) => (
              <ExperienceCard
                key={idx}
                experience={exp}
                challengeLabel={challengeLabel}
                deliveredLabel={deliveredLabel}
                viewCaseStudyLabel={viewCaseStudyLabel}
                index={idx}
              />
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
