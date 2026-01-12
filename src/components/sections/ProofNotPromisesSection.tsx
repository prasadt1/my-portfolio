import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Layers, AlertTriangle, Calendar, GitBranch, ArrowRight } from 'lucide-react';

const ProofNotPromisesSection: React.FC = () => {
  const { t } = useTranslation();

  const deliverables = [
    {
      icon: Layers,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      titleKey: 'proofSection.deliverables.blueprint.title',
      labelKey: 'proofSection.deliverables.blueprint.label'
    },
    {
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      titleKey: 'proofSection.deliverables.riskRegister.title',
      labelKey: 'proofSection.deliverables.riskRegister.label'
    },
    {
      icon: Calendar,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      titleKey: 'proofSection.deliverables.roadmap.title',
      labelKey: 'proofSection.deliverables.roadmap.label'
    },
    {
      icon: GitBranch,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      titleKey: 'proofSection.deliverables.decisionMatrix.title',
      labelKey: 'proofSection.deliverables.decisionMatrix.label'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('proofSection.title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('proofSection.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {deliverables.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.iconBg} group-hover:scale-110 transition-transform`}>
                  <Icon className={item.iconColor} size={24} />
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {t(item.labelKey)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {t(item.titleKey)}
                </h3>
                {/* Visual placeholder - SVG box illustration */}
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <svg
                    className="w-full h-20 text-slate-400"
                    fill="none"
                    viewBox="0 0 200 80"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="10" y="10" width="180" height="60" rx="4" stroke="currentColor" strokeWidth="2" />
                    <line x1="20" y1="30" x2="180" y2="30" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="20" y1="45" x2="140" y2="45" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="20" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            {t('proofSection.cta')}
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofNotPromisesSection;
