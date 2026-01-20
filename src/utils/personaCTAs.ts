// src/utils/personaCTAs.ts
// Phase 4.1: Persona-based CTA hierarchy consistency

import { getGlobalPersona } from './personaPersistence';
import { useTranslation } from 'react-i18next';

export type PersonaType = 'hire' | 'consult' | 'toolkit';

export interface PersonaCTA {
  label: string;
  labelKey: string;
  path: string;
  variant: 'primary' | 'secondary';
}

/**
 * Get primary CTA for a persona
 */
export function getPersonaPrimaryCTA(persona: PersonaType | null): PersonaCTA {
  switch (persona) {
    case 'hire':
      return {
        label: 'View Hiring Snapshot',
        labelKey: 'cta.hiring.primary',
        path: '/hiring',
        variant: 'primary',
      };
    case 'toolkit':
      return {
        label: 'Browse Resources',
        labelKey: 'cta.toolkit.primary',
        path: '/resources',
        variant: 'primary',
      };
    case 'consult':
    default:
      return {
        label: 'Book Discovery Call',
        labelKey: 'cta.consulting.primary',
        path: 'https://calendly.com/prasad-sgsits/30min',
        variant: 'primary',
      };
  }
}

/**
 * Get secondary CTA for a persona
 */
export function getPersonaSecondaryCTA(persona: PersonaType | null): PersonaCTA {
  switch (persona) {
    case 'hire':
      return {
        label: 'View Case Studies',
        labelKey: 'cta.hiring.secondary',
        path: '/projects',
        variant: 'secondary',
      };
    case 'toolkit':
      return {
        label: 'Get Checklist (PDF)',
        labelKey: 'cta.toolkit.secondary',
        path: '/checklist',
        variant: 'secondary',
      };
    case 'consult':
    default:
      return {
        label: 'Request Artifacts Pack',
        labelKey: 'cta.consulting.secondary',
        path: '/projects',
        variant: 'secondary',
      };
  }
}

/**
 * Get current persona's primary CTA (uses global persona from localStorage)
 */
export function getCurrentPersonaPrimaryCTA(): PersonaCTA {
  const persona = getGlobalPersona();
  return getPersonaPrimaryCTA(persona);
}

/**
 * Get current persona's secondary CTA (uses global persona from localStorage)
 */
export function getCurrentPersonaSecondaryCTA(): PersonaCTA {
  const persona = getGlobalPersona();
  return getPersonaSecondaryCTA(persona);
}

/**
 * Hook to get persona CTAs with translations
 */
export function usePersonaCTAs(persona?: PersonaType | null) {
  const { t } = useTranslation();
  const currentPersona = persona ?? getGlobalPersona();
  
  const primary = getPersonaPrimaryCTA(currentPersona);
  const secondary = getPersonaSecondaryCTA(currentPersona);
  
  return {
    primary: {
      ...primary,
      label: t(primary.labelKey, { defaultValue: primary.label }),
    },
    secondary: {
      ...secondary,
      label: t(secondary.labelKey, { defaultValue: secondary.label }),
    },
  };
}
