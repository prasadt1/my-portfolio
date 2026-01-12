import React, { useState } from 'react';
import { Linkedin, Mail, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { PageShell, PageHeader, Container } from '../components/layout';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Simulate submission for UX
    setTimeout(() => {
      const form = e.target as HTMLFormElement;
      const name = (form.elements.namedItem('name') as HTMLInputElement).value;
      const email = (form.elements.namedItem('email') as HTMLInputElement).value;
      const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
      const interest = (form.elements.namedItem('interest') as HTMLSelectElement).value;

      // Use mailto as fallback
      const subject = encodeURIComponent(`[Portfolio Lead] ${interest}: ${name}`);
      const body = encodeURIComponent(`${message}\n\nContact: ${email}\nInterest: ${interest}`);
      window.location.href = `mailto:prasad.sgsits@gmail.com?subject=${subject}&body=${body}`;

      setFormState('success');
    }, 1000);
  };

  return (
    <>
      <SEO
        title="Contact Prasad Tilloo | Enterprise Architect & Consultant"
        description="Partner with Prasad to solve complex business challenges through enterprise architecture and innovation. Book a consultation today."
      />

      <PageShell background="muted" containerMaxWidth="7xl" className="pt-24">
        <PageHeader
          title={t('contactPage.title')}
          subtitle={t('contactPage.subtitle')}
        />

        <Container maxWidth="6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

          {/* LEFT: Direct Options */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >

            {/* Option 1: Calendly */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Calendar size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">{t('contactPage.book.title')}</h3>
                </div>
                <p className="text-emerald-100 mb-6 leading-relaxed">
                  {t('contactPage.book.desc')}
                </p>
                <a
                  href="https://calendly.com/prasad-sgsits/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-emerald-800 px-6 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors"
                >
                  {t('contactPage.book.cta')} <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* What to Expect Section */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                {t('contactPage.whatToExpect.title')}
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {t('contactPage.whatToExpect.duration.label')}
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                    {t('contactPage.whatToExpect.duration.value')}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    {t('contactPage.whatToExpect.bring.label')}
                  </div>
                  <ul className="space-y-2">
                    {(t('contactPage.whatToExpect.bring.items', { returnObjects: true }) as string[]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                    {t('contactPage.whatToExpect.get.label')}
                  </div>
                  <ul className="space-y-2">
                    {(t('contactPage.whatToExpect.get.items', { returnObjects: true }) as string[]).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                        <span className="text-emerald-600 dark:text-emerald-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Option 2: Email */}
            {/* Option 3: LinkedIn */}
            <div className="grid sm:grid-cols-2 gap-6">
              <a
                href="mailto:prasad.sgsits@gmail.com"
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{t('contactPage.email.title')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('contactPage.email.subtitle')}</p>
              </a>

              <a
                href="https://linkedin.com/in/prasadtilloo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-500 dark:hover:border-emerald-500 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Linkedin size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{t('contactPage.linkedin.title')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('contactPage.linkedin.subtitle')}</p>
              </a>
            </div>

          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-emerald-500" size={24} />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('contactPage.form.title')}</h2>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('contactPage.form.interestedIn')}</label>
                <select
                  name="interest"
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Consulting Project">{t('contactPage.form.options.consulting')}</option>
                  <option value="Product/Toolkit">{t('contactPage.form.options.product')}</option>
                  <option value="Speaking/Training">{t('contactPage.form.options.speaking')}</option>
                  <option value="Other">{t('contactPage.form.options.other')}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('contactPage.form.name')}</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('contactPage.form.email')}</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('contactPage.form.message')}</label>
                <textarea
                  name="message"
                  placeholder={t('contactPage.form.placeholder')}
                  required
                  rows={4}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={formState !== 'idle'}
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
              >
                {formState === 'idle' && <>{t('contactPage.form.submit')} <ArrowRight size={18} /></>}
                {formState === 'submitting' && t('contactPage.form.sending')}
                {formState === 'success' && t('contactPage.form.sent')}
              </button>

              {formState === 'success' && (
                <p className="text-center text-sm text-emerald-600 dark:text-emerald-400 animate-fade-in">
                  {t('contactPage.form.redirect')}
                </p>
              )}
            </form>
          </motion.div>
        </div>
        </Container>
      </PageShell>
    </>
  );
};

export default ContactPage;
