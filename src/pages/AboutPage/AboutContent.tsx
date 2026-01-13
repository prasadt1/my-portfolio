import React from 'react';
import { Building2, CheckCircle2, Users, Award, GraduationCap, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container } from '../../components/layout';
import TechChips from '../../components/TechChips';
import QuickStats from '../../components/QuickStats';
import RecommendationsCarousel from '../../components/RecommendationsCarousel';
import ExperienceTimeline from '../../components/about/ExperienceTimeline';
import { Certifications } from './Certifications';

interface AboutContentProps {
  experiences: Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    businessChallenge: string;
    deliverables: string[];
    outcomes: Array<{ value: string; label: string }>;
    links?: {
      caseStudy?: string;
    };
    logo: string;
  }>;
  certifications: Array<{
    title: string;
    issuer: string;
    date: string;
    id?: string;
  }>;
  techCategories: Record<string, string[]>;
}

export function AboutContent({ experiences, certifications, techCategories }: AboutContentProps) {
  const { t } = useTranslation();

  return (
    <Container maxWidth="6xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 md:gap-10 lg:gap-12">
        {/* LEFT COLUMN: Main Content */}
        <div className="space-y-10 md:space-y-12 min-w-0">
          {/* Professional Summary */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
              {t('about.proof.title')}
            </h2>
            <div className="prose prose-lg text-slate-600 dark:text-slate-300 max-w-prose leading-relaxed break-words">
              <p className="mb-6">
                {t('about.proof.p1')}
              </p>
              <p className="mb-6">
                {t('about.proof.p2')}
              </p>
              <div className="bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 p-6 italic text-slate-700 dark:text-slate-300 rounded-r-lg">
                "{t('about.proof.quote')}"
              </div>
            </div>
          </section>

          {/* Consulting Highlights */}
          <section className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <Building2 className="text-emerald-600 dark:text-emerald-500" size={24} />
              {t('about.consulting.title')}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{t('about.consulting.role')}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed break-words">
                  {t('about.consulting.desc')}
                </p>
                <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-700 dark:text-slate-300">
                  {(t('about.consulting.highlights', { returnObjects: true }) as string[]).map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="break-words">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Differentiators Section */}
          <section className="space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                {t('about.differentiators.globalDelivery.title')}
              </h2>
              <p className="prose prose-lg text-slate-600 dark:text-slate-300 max-w-prose leading-relaxed">
                {t('about.differentiators.globalDelivery.paragraph')}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                {t('about.differentiators.executionMindset.title')}
              </h2>
              <p className="prose prose-lg text-slate-600 dark:text-slate-300 max-w-prose leading-relaxed">
                {t('about.differentiators.executionMindset.paragraph')}
              </p>
            </div>
          </section>

          {/* Experience Timeline */}
          <ExperienceTimeline
            title={t('about.journey.title')}
            experiences={experiences}
            challengeLabel={t('about.journey.challenge')}
            deliveredLabel={t('about.journey.delivered')}
            viewCaseStudyLabel={t('about.journey.viewCaseStudy')}
          />

          {/* Recommendations Carousel */}
          <section>
            <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-3">
              <Users className="text-emerald-600 dark:text-emerald-500" size={28} />
              Recommendations
            </h2>
            <RecommendationsCarousel />
          </section>

          {/* Certifications */}
          <Certifications certifications={certifications} />
        </div>

        {/* RIGHT COLUMN: Sidebar (Sticky) */}
        <aside className="lg:sticky lg:top-24 lg:h-fit space-y-8 min-w-0">
          {/* Quick Stats Widget */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <QuickStats />
          </div>

          {/* Tech Stack Widget */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-6 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2">
              <Zap className="text-emerald-500" size={20} />
              {t('about.techStack.title')}
            </h3>
            <TechChips categories={techCategories} />
          </div>

          {/* Education Widget */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <GraduationCap className="text-purple-500" size={20} />
              {t('about.education.title')}
            </h3>
            <div>
              <div className="font-bold text-slate-900 dark:text-white break-words">{t('about.education.degree')}</div>
              <div className="text-purple-600 dark:text-purple-400 font-medium text-sm break-words">{t('about.education.major')}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 break-words">{t('about.education.school')}</div>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
