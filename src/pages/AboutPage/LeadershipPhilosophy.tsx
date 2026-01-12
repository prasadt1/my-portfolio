import React from 'react';
import { Target, Users, Lightbulb, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section, Container } from '../../components/layout';

export function LeadershipPhilosophy() {
  const { t } = useTranslation();

  return (
    <Section background="muted">
      <Container maxWidth="6xl">
        <h2 className="text-3xl font-serif font-bold text-center mb-8 md:mb-10 text-slate-900 dark:text-white">
          {t('about.philosophy.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="text-emerald-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t('about.philosophy.outcomes.title')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t('about.philosophy.outcomes.desc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t('about.philosophy.innovation.title')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t('about.philosophy.innovation.desc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="bg-violet-100 dark:bg-violet-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="text-violet-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t('about.philosophy.leadership.title')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t('about.philosophy.leadership.desc')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="bg-orange-100 dark:bg-orange-900/30 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="text-orange-600" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t('about.philosophy.execution.title')}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t('about.philosophy.execution.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <blockquote className="text-lg font-serif italic text-slate-700 dark:text-slate-300 max-w-prose mx-auto">
            "{t('about.philosophy.quote')}"
          </blockquote>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {t('about.philosophy.attribution')}
          </p>
        </div>
      </Container>
    </Section>
  );
}
