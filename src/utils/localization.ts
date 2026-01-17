// src/utils/localization.ts
// Phase 1.6: Localization utilities with fallback rules
// Ensures localized content NEVER returns undefined

import type { LocalizedString, LocalizedStringArray } from '../types/CaseStudy';

/**
 * Default fallback locale
 */
const DEFAULT_LOCALE = 'en';

/**
 * Gets a localized string with fallback rules
 * 
 * Fallback order:
 * 1. If requested language exists → return it
 * 2. Else fallback to 'en'
 * 3. Else fallback to first available key
 * 4. Never return undefined (returns empty string as last resort)
 * 
 * @param content - LocalizedString or plain string
 * @param locale - Target locale (e.g., 'en', 'de')
 * @returns Localized string, never undefined
 */
export function getLocalizedValue(
    content: LocalizedString | string | undefined | null,
    locale: string
): string {
    // Handle null/undefined
    if (content === null || content === undefined) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('[localization] Content is null/undefined, returning empty string');
        }
        return '';
    }

    // Handle plain strings (backward compatibility)
    if (typeof content === 'string') {
        return content;
    }

    // Handle LocalizedString object
    const localizedContent = content as LocalizedString;

    // Try requested locale
    if (localizedContent[locale] !== undefined && localizedContent[locale] !== '') {
        return localizedContent[locale];
    }

    // Fallback to English
    if (locale !== DEFAULT_LOCALE && localizedContent[DEFAULT_LOCALE] !== undefined && localizedContent[DEFAULT_LOCALE] !== '') {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[localization] Missing '${locale}' translation, falling back to '${DEFAULT_LOCALE}'`);
        }
        return localizedContent[DEFAULT_LOCALE];
    }

    // Fallback to first available key
    const availableKeys = Object.keys(localizedContent);
    for (const key of availableKeys) {
        if (localizedContent[key] !== undefined && localizedContent[key] !== '') {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`[localization] Missing '${locale}' and '${DEFAULT_LOCALE}', falling back to '${key}'`);
            }
            return localizedContent[key];
        }
    }

    // Last resort: return empty string
    if (process.env.NODE_ENV === 'development') {
        console.warn('[localization] No valid translation found, returning empty string');
    }
    return '';
}

/**
 * Gets a localized string array with fallback rules
 * 
 * Fallback order:
 * 1. If requested language exists → return it
 * 2. Else fallback to 'en'
 * 3. Else fallback to first available key
 * 4. Never return undefined (returns empty array as last resort)
 * 
 * @param content - LocalizedStringArray or plain string array
 * @param locale - Target locale (e.g., 'en', 'de')
 * @returns Localized string array, never undefined
 */
export function getLocalizedArray(
    content: LocalizedStringArray | string[] | undefined | null,
    locale: string
): string[] {
    // Handle null/undefined
    if (content === null || content === undefined) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('[localization] Array content is null/undefined, returning empty array');
        }
        return [];
    }

    // Handle plain string arrays (backward compatibility)
    if (Array.isArray(content) && (content.length === 0 || typeof content[0] === 'string')) {
        return content as string[];
    }

    // Handle LocalizedStringArray object
    const localizedContent = content as LocalizedStringArray;

    // Try requested locale
    if (localizedContent[locale] !== undefined && Array.isArray(localizedContent[locale]) && localizedContent[locale].length > 0) {
        return localizedContent[locale];
    }

    // Fallback to English
    if (locale !== DEFAULT_LOCALE && localizedContent[DEFAULT_LOCALE] !== undefined && Array.isArray(localizedContent[DEFAULT_LOCALE]) && localizedContent[DEFAULT_LOCALE].length > 0) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[localization] Missing '${locale}' array translation, falling back to '${DEFAULT_LOCALE}'`);
        }
        return localizedContent[DEFAULT_LOCALE];
    }

    // Fallback to first available key
    const availableKeys = Object.keys(localizedContent);
    for (const key of availableKeys) {
        if (Array.isArray(localizedContent[key]) && localizedContent[key].length > 0) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`[localization] Missing '${locale}' and '${DEFAULT_LOCALE}' arrays, falling back to '${key}'`);
            }
            return localizedContent[key];
        }
    }

    // Last resort: return empty array
    if (process.env.NODE_ENV === 'development') {
        console.warn('[localization] No valid array translation found, returning empty array');
    }
    return [];
}

/**
 * Validates a LocalizedString for required keys
 * Logs warnings for missing English translations
 */
export function validateLocalizedString(
    content: LocalizedString | string | undefined,
    context?: string
): boolean {
    if (content === undefined || content === null) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[localization] ${context || 'Content'} is undefined/null`);
        }
        return false;
    }

    if (typeof content === 'string') {
        return content.length > 0;
    }

    const localizedContent = content as LocalizedString;
    
    // Check for missing EN key
    if (!localizedContent.en || localizedContent.en === '') {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[localization] ${context || 'Content'} is missing English (en) translation`);
        }
        return false;
    }

    return true;
}

/**
 * Validates a LocalizedStringArray for required keys
 * Logs warnings for empty arrays or missing English translations
 */
export function validateLocalizedArray(
    content: LocalizedStringArray | string[] | undefined,
    context?: string
): boolean {
    if (content === undefined || content === null) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[localization] ${context || 'Array'} is undefined/null`);
        }
        return false;
    }

    if (Array.isArray(content)) {
        if (content.length === 0) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(`[localization] ${context || 'Array'} is empty`);
            }
            return false;
        }
        return true;
    }

    const localizedContent = content as LocalizedStringArray;
    
    // Check for missing EN key
    if (!localizedContent.en || !Array.isArray(localizedContent.en) || localizedContent.en.length === 0) {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`[localization] ${context || 'Array'} is missing or has empty English (en) array`);
        }
        return false;
    }

    return true;
}
