// src/components/ArtifactRequestModal.tsx
// Phase 3.3: Artifact request modal for gated/onRequest artifacts

import React, { useState } from 'react';
import { X, FileText, Mail, Building, User, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../services/analytics';
import { getAttributionSnapshot } from '../utils/attribution';
import i18n from '../i18n';

interface ArtifactRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    caseStudySlug: string;
    artifactIds: string[];
}

const ArtifactRequestModal: React.FC<ArtifactRequestModalProps> = ({
    isOpen,
    onClose,
    caseStudySlug,
    artifactIds,
}) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        role: '',
        reason: '',
        understandsNDA: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        // Track event
        trackEvent('artifact_request_opened', {
            caseStudySlug,
            artifactIds: artifactIds.join(','),
        });

        try {
            // Get attribution snapshot
            const attribution = getAttributionSnapshot(i18n.language || 'en');

            const response = await fetch('/api/artifact-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    company: formData.company.trim() || undefined,
                    role: formData.role.trim() || undefined,
                    reason: formData.reason,
                    understandsNDA: formData.understandsNDA,
                    caseStudySlug,
                    artifactIds,
                    // Attribution (no PII)
                    attribution: {
                        utm_source: attribution.utm_source,
                        utm_medium: attribution.utm_medium,
                        utm_campaign: attribution.utm_campaign,
                        referrer: attribution.referrer,
                        landingPath: attribution.landingPath,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit request');
            }

            // Track success
            trackEvent('artifact_request_submitted', {
                caseStudySlug,
                artifactIds: artifactIds.join(','),
            });

            setSubmitSuccess(true);
            setTimeout(() => {
                onClose();
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    role: '',
                    reason: '',
                    understandsNDA: false,
                });
                setSubmitSuccess(false);
            }, 2000);
        } catch (error) {
            console.error('Artifact request error:', error);
            setSubmitError(t('artifactRequest.error', { defaultValue: 'Failed to submit request. Please try again.' }));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <FileText className="text-emerald-600 dark:text-emerald-400" size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                {t('artifactRequest.title', { defaultValue: 'Request Artifact Access' })}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {submitSuccess ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                                    <Mail className="text-emerald-600 dark:text-emerald-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {t('artifactRequest.success.title', { defaultValue: 'Request Submitted' })}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {t('artifactRequest.success.message', { defaultValue: 'We\'ll review your request and get back to you within 48 hours.' })}
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    {t('artifactRequest.description', { defaultValue: 'To protect client confidentiality, detailed artifacts are shared selectively. Please provide your details and we\'ll review your request.' })}
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            {t('artifactRequest.name', { defaultValue: 'Name' })} *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder={t('artifactRequest.namePlaceholder', { defaultValue: 'Your full name' })}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            {t('artifactRequest.email', { defaultValue: 'Email' })} *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder={t('artifactRequest.emailPlaceholder', { defaultValue: 'your.email@example.com' })}
                                        />
                                    </div>

                                    {/* Company (optional) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            {t('artifactRequest.company', { defaultValue: 'Company' })} ({t('artifactRequest.optional', { defaultValue: 'Optional' })})
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder={t('artifactRequest.companyPlaceholder', { defaultValue: 'Your company name' })}
                                        />
                                    </div>

                                    {/* Role (optional) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            {t('artifactRequest.role', { defaultValue: 'Role' })} ({t('artifactRequest.optional', { defaultValue: 'Optional' })})
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            placeholder={t('artifactRequest.rolePlaceholder', { defaultValue: 'e.g. CTO, Engineering Lead' })}
                                        />
                                    </div>

                                    {/* Reason */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                            {t('artifactRequest.reason', { defaultValue: 'Reason for Request' })} *
                                        </label>
                                        <select
                                            required
                                            value={formData.reason}
                                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        >
                                            <option value="">{t('artifactRequest.reasonSelect', { defaultValue: 'Select a reason...' })}</option>
                                            <option value="evaluation">{t('artifactRequest.reasonEvaluation', { defaultValue: 'Evaluating similar architecture' })}</option>
                                            <option value="learning">{t('artifactRequest.reasonLearning', { defaultValue: 'Learning best practices' })}</option>
                                            <option value="reference">{t('artifactRequest.reasonReference', { defaultValue: 'Reference for project' })}</option>
                                            <option value="other">{t('artifactRequest.reasonOther', { defaultValue: 'Other' })}</option>
                                        </select>
                                    </div>

                                    {/* NDA Checkbox */}
                                    <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={formData.understandsNDA}
                                            onChange={(e) => setFormData({ ...formData, understandsNDA: e.target.checked })}
                                            className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                                        />
                                        <label className="text-sm text-amber-900 dark:text-amber-300">
                                            {t('artifactRequest.ndaCheckbox', { defaultValue: 'I understand that materials are shared selectively due to NDA and client confidentiality requirements.' })}
                                        </label>
                                    </div>

                                    {/* Error */}
                                    {submitError && (
                                        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                            <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
                                            <p className="text-sm text-red-800 dark:text-red-300">{submitError}</p>
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            {t('artifactRequest.cancel', { defaultValue: 'Cancel' })}
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.understandsNDA}
                                            className="flex-1 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isSubmitting
                                                ? t('artifactRequest.submitting', { defaultValue: 'Submitting...' })
                                                : t('artifactRequest.submit', { defaultValue: 'Submit Request' })
                                            }
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ArtifactRequestModal;
