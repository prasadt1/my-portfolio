import React from 'react';
import { Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  id?: string;
}

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6 md:mb-8 flex items-center gap-3">
        <Award className="text-emerald-600 dark:text-emerald-500" size={28} />
        {t('about.certifications.title')}
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700 overflow-hidden">
        {certifications.map((cert, idx) => (
          <div key={idx} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <Award size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1 leading-tight break-words">{cert.title}</h4>
                  <div className="text-sm text-slate-500 dark:text-slate-400 break-words">{cert.issuer}</div>
                </div>
              </div>
              <div className="text-xs font-mono text-slate-400 dark:text-slate-500 flex-shrink-0 break-words">
                {cert.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
