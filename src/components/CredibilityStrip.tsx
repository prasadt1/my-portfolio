// src/components/CredibilityStrip.tsx
// Phase 3.4C: Credibility signals strip for hero case studies

import React from 'react';
import { Clock, Users, MapPin, Briefcase, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CredibilitySignals } from '../types/CaseStudy';
import { getLocalizedString } from '../types/CaseStudy';

interface CredibilityStripProps {
    signals: CredibilitySignals;
    locale: string;
}

const CredibilityStrip: React.FC<CredibilityStripProps> = ({ signals, locale }) => {
    const { t } = useTranslation();

    const items = [
        {
            icon: Clock,
            label: t('credibilityStrip.duration', { defaultValue: 'Duration' }),
            value: getLocalizedString(signals.duration, locale),
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            icon: Users,
            label: t('credibilityStrip.teamSize', { defaultValue: 'Team Size' }),
            value: getLocalizedString(signals.teamSize, locale),
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        },
        {
            icon: MapPin,
            label: t('credibilityStrip.region', { defaultValue: 'Region' }),
            value: getLocalizedString(signals.region, locale),
            color: 'text-purple-600 dark:text-purple-400',
            bg: 'bg-purple-100 dark:bg-purple-900/30',
        },
        {
            icon: Briefcase,
            label: t('credibilityStrip.engagementType', { defaultValue: 'Engagement' }),
            value: getLocalizedString(signals.engagementType, locale),
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-100 dark:bg-amber-900/30',
        },
        {
            icon: Shield,
            label: t('credibilityStrip.decisionAuthority', { defaultValue: 'Decision Authority' }),
            value: getLocalizedString(signals.decisionAuthority, locale),
            color: 'text-rose-600 dark:text-rose-400',
            bg: 'bg-rose-100 dark:bg-rose-900/30',
        },
    ];

    return (
        <div className="flex flex-wrap gap-3 mb-6">
            {items.map((item, idx) => {
                const Icon = item.icon;
                return (
                    <div
                        key={idx}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${item.bg} border border-slate-200 dark:border-slate-700`}
                    >
                        <Icon className={`${item.color} flex-shrink-0`} size={14} />
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {item.label}
                            </span>
                            <span className="text-xs font-semibold text-slate-900 dark:text-white">
                                {item.value}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CredibilityStrip;
