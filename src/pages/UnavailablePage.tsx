// src/pages/UnavailablePage.tsx
// Soft gate UX for disabled features

import { Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

const UnavailablePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('features.unavailable.title')}
        description={t('features.unavailable.message')}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-6">
              <AlertCircle className="text-amber-600 dark:text-amber-400" size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {t('features.unavailable.title')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              {t('features.unavailable.message')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
            >
              <Home size={20} />
              {t('features.unavailable.goHome', { defaultValue: 'Go Back Home' })}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-lg font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <ArrowLeft size={20} />
              {t('features.unavailable.contact', { defaultValue: 'Contact Support' })}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnavailablePage;
