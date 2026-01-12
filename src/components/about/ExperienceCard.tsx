import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StatsBadges from './StatsBadges';

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

interface ExperienceCardProps {
  experience: Experience;
  challengeLabel: string;
  deliveredLabel: string;
  viewCaseStudyLabel: string;
  index?: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  challengeLabel,
  deliveredLabel,
  viewCaseStudyLabel,
  index = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_BULLETS = 4;
  const hasMoreBullets = experience.deliverables.length > INITIAL_BULLETS;
  const visibleDeliverables = isExpanded
    ? experience.deliverables
    : experience.deliverables.slice(0, INITIAL_BULLETS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header: Role + Company + Dates */}
      <div className="mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1 break-words">
              {experience.role}
            </h3>
            <div className="text-lg text-slate-600 dark:text-slate-400 font-medium break-words">
              {experience.company}
            </div>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <div className="font-semibold text-slate-900 dark:text-white text-sm md:text-base whitespace-nowrap">
              {experience.period}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 sm:justify-end">
              <MapPin size={14} className="flex-shrink-0" />
              <span className="break-words">{experience.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Business Challenge */}
      <div className="mb-6">
        <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2 text-sm uppercase tracking-wide">
          {challengeLabel}
        </div>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed max-w-prose">
          {experience.businessChallenge}
        </p>
      </div>

      {/* What I Delivered */}
      <div className="mb-6">
        <div className="font-semibold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wide">
          {deliveredLabel}
        </div>
        <ul className="space-y-2">
          <AnimatePresence>
            {visibleDeliverables.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2
                  className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                  size={18}
                />
                <span className="text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                  {item}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {hasMoreBullets && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold text-sm flex items-center gap-1 transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Show less' : 'Show more'}
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp size={16} />
              </>
            ) : (
              <>
                Show more ({experience.deliverables.length - INITIAL_BULLETS} more)
                <ChevronDown size={16} />
              </>
            )}
          </button>
        )}
      </div>

      {/* Outcomes - Using StatsBadges component */}
      <div className="mb-6">
        <StatsBadges outcomes={experience.outcomes} />
      </div>

      {/* Links */}
      {experience.links?.caseStudy && (
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            to={experience.links.caseStudy}
            className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2 hover:underline text-sm"
          >
            {viewCaseStudyLabel} <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceCard;
