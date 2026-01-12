import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User, Zap, Target, FileText } from 'lucide-react';

const IndependentAdvisorySection: React.FC = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: User,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      titleKey: 'independentAdvisory.cards.direct.title',
      textKey: 'independentAdvisory.cards.direct.text'
    },
    {
      icon: Zap,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      titleKey: 'independentAdvisory.cards.fast.title',
      textKey: 'independentAdvisory.cards.fast.text'
    },
    {
      icon: Target,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      titleKey: 'independentAdvisory.cards.vendorNeutral.title',
      textKey: 'independentAdvisory.cards.vendorNeutral.text'
    },
    {
      icon: FileText,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      titleKey: 'independentAdvisory.cards.executionReady.title',
      textKey: 'independentAdvisory.cards.executionReady.text'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('independentAdvisory.title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t('independentAdvisory.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${card.iconBg}`}>
                  <Icon className={card.iconColor} size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {t(card.titleKey)}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {t(card.textKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndependentAdvisorySection;
