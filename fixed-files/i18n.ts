// src/i18n.ts - FIXED VERSION
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';
import projectsEN from './locales/en/projects.json';
import projectsDE from './locales/de/projects.json';

// the translations
const resources = {
    en: {
        translation: translationEN,
        projects: projectsEN
    },
    de: {
        translation: translationDE,
        projects: projectsDE
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        lng: 'en', // default language
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage', 'cookie']
        },
        react: {
            useSuspense: true // Enable Suspense
        }
    });

export default i18n;
