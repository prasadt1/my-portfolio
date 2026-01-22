// src/components/PDFBriefModal.tsx
// Phase 4.5: PDF Brief export modal

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { trackEvent } from '../services/analytics';
import { getAttributionSnapshot } from '../utils/attribution';
import i18n from '../i18n';

interface PDFBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudySlug: string;
  disclaimer: string;
}

const PDFBriefModal: React.FC<PDFBriefModalProps> = ({
  isOpen,
  onClose,
  caseStudySlug,
  disclaimer,
}) => {
  const { t } = useTranslation();
  const locale = i18n.language;
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Check if user already provided email (from localStorage or cookie)
  React.useEffect(() => {
    if (isOpen) {
      // Check localStorage for existing lead
      const existingEmail = localStorage.getItem('pt_lead_email');
      if (existingEmail) {
        setEmail(existingEmail);
        // Auto-submit if email exists
        handleSubmit(existingEmail);
      }
    }
  }, [isOpen]);

  const handleSubmit = async (emailValue?: string) => {
    const emailToUse = emailValue || email;
    setError('');

    if (!emailToUse) {
      setError(t('caseStudy.pdfBrief.emailRequired', { defaultValue: 'Email is required' }));
      return;
    }

    if (!consent && !emailValue) {
      setError(t('caseStudy.pdfBrief.consentRequired', { defaultValue: 'Please agree to receive the PDF brief' }));
      return;
    }

    setIsSubmitting(true);

    try {
      const attribution = getAttributionSnapshot(locale);
      
      console.log('[PDFBriefModal] Submitting request:', {
        email: emailToUse.substring(0, 3) + '***',
        caseStudySlug,
        locale
      });
      
      const response = await fetch('/api/case-study-brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailToUse,
          caseStudySlug,
          locale,
          consent: true,
          consentTimestamp: new Date().toISOString(),
          attribution,
        }),
      });

      console.log('[PDFBriefModal] Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('[PDFBriefModal] Server error:', errorData);
        throw new Error(errorData.error || `Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log('[PDFBriefModal] Response received:', data);

      trackEvent('case_study_pdf_brief_requested', {
        caseStudySlug,
        locale,
        emailProvided: !!emailToUse, // No PII - just boolean
      });

      // Store email for future use
      if (emailToUse) {
        localStorage.setItem('pt_lead_email', emailToUse);
      }

      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl);
        trackEvent('case_study_pdf_brief_downloaded', {
          caseStudySlug,
          locale,
        });
        
        // Ensure absolute URL if relative
        const url = data.downloadUrl.startsWith('http') 
          ? data.downloadUrl 
          : `${window.location.origin}${data.downloadUrl}`;
        
        console.log('[PDFBriefModal] Opening brief URL:', url);
        
        // Open print-optimized brief in a new tab (user can Save as PDF)
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        
        if (!newWindow) {
          // Popup blocked - show error
          setError(t('caseStudy.pdfBrief.popupBlocked', { defaultValue: 'Popup blocked. Please allow popups and try again, or click the download button below.' }));
          setIsSubmitting(false);
          return;
        }
      } else {
        // PDF will be emailed (not implemented yet - just stores to Sheets)
        console.warn('[PDFBriefModal] No downloadUrl in response - email sending not implemented yet');
        trackEvent('case_study_pdf_brief_emailed', {
          caseStudySlug,
          locale,
        });
      }

      setIsSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('[PDFBriefModal] Error:', err);
      
      // More specific error messages
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        setError(t('caseStudy.pdfBrief.serverError', { 
          defaultValue: 'Cannot connect to server. Please make sure the server is running and try again.' 
        }));
      } else if (errorMessage.includes('Server error')) {
        setError(t('caseStudy.pdfBrief.error', { 
          defaultValue: 'Server error. Please try again or contact support.' 
        }));
      } else {
        setError(t('caseStudy.pdfBrief.error', { 
          defaultValue: 'Failed to generate PDF. Please try again.' 
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setEmail('');
      setConsent(false);
      setError('');
      setIsSuccess(false);
      setDownloadUrl(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdf-brief-modal-title"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {!isSuccess ? (
                <>
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                      <Download className="text-emerald-600 dark:text-emerald-400" size={24} />
                    </div>
                    <h2 id="pdf-brief-modal-title" className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {t('caseStudy.pdfBrief.modalTitle', { defaultValue: 'Download 1-page Executive Brief' })}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {t('caseStudy.pdfBrief.modalSubtitle', { defaultValue: 'Get a concise PDF summary of this case study' })}
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="pdf-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        id="pdf-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@company.com"
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          required
                          disabled={isSubmitting}
                          className="mt-1 w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2 disabled:opacity-50"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {t('caseStudy.pdfBrief.consent', { defaultValue: 'I agree to receive the PDF brief by email and understand it contains anonymized patterns only.' })}
                        </span>
                      </label>
                    </div>

                    {error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                        {error}
                      </div>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-xs text-amber-700 dark:text-amber-400 space-y-2">
                      <p>{disclaimer}</p>
                      <p className="font-semibold mt-2">
                        Note: The brief will open in a new tab. Use your browser's "Print" → "Save as PDF" to download.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !email || !consent}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          {t('caseStudy.pdfBrief.generating', { defaultValue: 'Generating...' })}
                        </>
                      ) : (
                        <>
                          <Download size={18} />
                          {t('caseStudy.pdfBrief.submit', { defaultValue: 'Download PDF Brief' })}
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {t('caseStudy.pdfBrief.success', { defaultValue: 'PDF Brief Generated!' })}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    {downloadUrl
                      ? t('caseStudy.pdfBrief.downloadStarted', { defaultValue: 'The brief page should open in a new tab. Use your browser\'s "Print" → "Save as PDF" to download.' })
                      : t('caseStudy.pdfBrief.emailSent', { defaultValue: 'The PDF brief has been sent to your email.' })}
                  </p>
                  {downloadUrl && (
                    <a
                      href={downloadUrl.startsWith('http') ? downloadUrl : `${window.location.origin}${downloadUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                      onClick={() => {
                        trackEvent('case_study_pdf_brief_manual_open', {
                          caseStudySlug,
                          locale,
                        });
                      }}
                    >
                      <Download size={18} />
                      {t('caseStudy.pdfBrief.openBrief', { defaultValue: 'Open Brief Page' })}
                    </a>
                  )}
                  <button
                    onClick={handleClose}
                    className="mt-4 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    {t('common.close', 'Close')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PDFBriefModal;
