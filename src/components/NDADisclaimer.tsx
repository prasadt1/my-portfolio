// src/components/NDADisclaimer.tsx
// Phase 3.3C: NDA & Ownership Disclaimer for case studies

import React from 'react';
import { Shield, FileText, Users, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TrustLayer } from '../types/CaseStudy';
import { getLocalizedString, getLocalizedStringArray } from '../types/CaseStudy';

interface NDADisclaimerProps {
    trustLayer: TrustLayer;
    locale: string;
}

const NDADisclaimer: React.FC<NDADisclaimerProps> = ({ trustLayer, locale }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <Shield className="text-amber-600 dark:text-amber-400" size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        {t('caseStudy.ndaDisclaimer.title', { defaultValue: 'NDA & Ownership Disclaimer' })}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {getLocalizedString(trustLayer.confidentialityNote, locale)}
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                {/* What I can share publicly */}
                <div className="flex items-start gap-2">
                    <FileText className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                            {t('caseStudy.ndaDisclaimer.whatPublic', { defaultValue: 'What I can share publicly' })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                            {t('caseStudy.ndaDisclaimer.whatPublicDesc', { defaultValue: 'Generalized patterns, anonymized outcomes, and architectural approaches' })}
                        </div>
                    </div>
                </div>

                {/* What I share on request */}
                <div className="flex items-start gap-2">
                    <Users className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                            {t('caseStudy.ndaDisclaimer.whatRequest', { defaultValue: 'What I share on request' })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                            {t('caseStudy.ndaDisclaimer.whatRequestDesc', { defaultValue: 'Detailed artifacts, ADRs, and implementation patterns (NDA-safe)' })}
                        </div>
                    </div>
                </div>

                {/* Where team credit applies */}
                <div className="flex items-start gap-2 md:col-span-2">
                    <AlertCircle className="text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                            {t('caseStudy.ndaDisclaimer.teamCredit', { defaultValue: 'Where team credit applies' })}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                            {t('caseStudy.ndaDisclaimer.teamCreditDesc', { defaultValue: 'All outcomes were delivered collaboratively. The "Scope Owned" section clarifies my specific contributions.' })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NDADisclaimer;
