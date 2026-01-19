// src/utils/personaPersistence.ts
// Phase 3.3D: Global persona journey persistence

type PersonaType = 'hire' | 'consult' | 'toolkit';

const PERSONA_STORAGE_KEY = 'pt_persona_global';
const PERSONA_VERSION = 'v1';

/**
 * Get global persona from localStorage
 */
export function getGlobalPersona(): PersonaType | null {
    if (typeof window === 'undefined') return null;
    
    try {
        const stored = localStorage.getItem(PERSONA_STORAGE_KEY);
        if (stored === `${PERSONA_VERSION}_hire`) return 'hire';
        if (stored === `${PERSONA_VERSION}_consult`) return 'consult';
        if (stored === `${PERSONA_VERSION}_toolkit`) return 'toolkit';
    } catch (e) {
        // Ignore localStorage errors
    }
    
    return null;
}

/**
 * Set global persona in localStorage
 */
export function setGlobalPersona(persona: PersonaType): void {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.setItem(PERSONA_STORAGE_KEY, `${PERSONA_VERSION}_${persona}`);
    } catch (e) {
        // Ignore localStorage errors
    }
}

/**
 * Clear global persona
 */
export function clearGlobalPersona(): void {
    if (typeof window === 'undefined') return;
    
    try {
        localStorage.removeItem(PERSONA_STORAGE_KEY);
    } catch (e) {
        // Ignore localStorage errors
    }
}
