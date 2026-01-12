import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import profilepic from '../../assets/images/profilepic.png';

export function AboutHero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 bg-gradient-to-tr from-emerald-500 to-slate-800 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-white dark:border-slate-800">
                <img
                  src={profilepic}
                  alt="Prasad Tilloo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">
              {t('about.title')}
            </h1>
            <p className="text-xl md:text-2xl text-emerald-400 font-semibold mb-4">
              {t('about.role')}
            </p>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
              {t('about.description')}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="mailto:prasad.sgsits@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-all shadow-lg hover:shadow-emerald-900/20"
              >
                <Mail size={18} />
                {t('about.buttons.contact')}
              </a>
              <a
                href="https://linkedin.com/in/prasadtilloo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
              >
                <Linkedin size={18} />
                {t('about.buttons.linkedin')}
              </a>
              <a
                href="https://github.com/prasadt1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
              >
                <Github size={18} />
                {t('about.buttons.github')}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
