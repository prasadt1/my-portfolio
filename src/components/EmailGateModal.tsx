// src/components/EmailGateModal.tsx
// Phase 5 Enhanced: Email gate for Project Similarity Matcher

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Unlock, Loader2 } from 'lucide-react';

export interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlock: (email: string) => Promise<void>;
  /** Optional: pre-filled email (e.g. from localStorage) */
  defaultEmail?: string;
}

const EmailGateModal: React.FC<EmailGateModalProps> = ({
  isOpen,
  onClose,
  onUnlock,
  defaultEmail = '',
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState(defaultEmail);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setEmail(defaultEmail);
      setError('');
    }
  }, [isOpen, defaultEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const e2 = email.trim();
    if (!e2 || !e2.includes('@')) {
      setError(t('tools.projectSimilarity.gate.emailRequired', { defaultValue: 'Valid email is required' }));
      return;
    }
    if (!consent) {
      setError(t('tools.projectSimilarity.gate.consentRequired', { defaultValue: 'Please agree to receive insights' }));
      return;
    }
    setIsSubmitting(true);
    try {
      await onUnlock(e2);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {t('tools.projectSimilarity.gate.title', { defaultValue: "Unlock Prasad's Project Insights" })}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={t('common.close', 'Close')}
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {t('tools.projectSimilarity.gate.subtitle', { defaultValue: 'Get personalized analysis based on real project experience' })}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email-gate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('tools.projectSimilarity.gate.emailLabel', { defaultValue: 'Email address' })}
                </label>
                <input
                  id="email-gate"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 rounded border-slate-300 dark:border-slate-600 text-emerald-600 focus:ring-emerald-500"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {t('tools.projectSimilarity.gate.consentText', { defaultValue: 'I agree to receive project insights and occasional updates' })}
                </span>
              </label>

              <p className="text-xs text-slate-500 dark:text-slate-500">
                {t('tools.projectSimilarity.gate.confidentialityNote', { defaultValue: 'Your query and results are confidential. No spam, unsubscribe anytime.' })}
              </p>

              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-xl font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {t('common.close', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Unlock size={18} />
                      {t('tools.projectSimilarity.gate.unlockButton', { defaultValue: 'Unlock Results' })}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EmailGateModal;
