
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const { i18n, t } = useTranslation();
    const normalizedLang = i18n.language?.startsWith('de') ? 'de' : 'en';

    const toggleLanguage = () => {
        const newLang = normalizedLang === 'en' ? 'de' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
            aria-label={t('nav.toggleLanguage')}
        >
            <Globe size={16} />
            {normalizedLang === 'en' ? 'DE' : 'EN'}
        </button>
    );
};

export default LanguageSwitcher;
