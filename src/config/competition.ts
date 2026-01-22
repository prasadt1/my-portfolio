// src/config/competition.ts
// Competition mode configuration for Phase 3.2

/**
 * Check if competition mode is enabled
 */
export function isCompetitionMode(): boolean {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_COMPETITION_MODE === 'true' || import.meta.env.VITE_COMPETITION_MODE === '1';
  }
  return false;
}

/**
 * Get competition mode presets
 * When competition mode is ON:
 * - Automatically promote ALL major AI features in UI
 * - Show "Built for Google AI Challenge" badge (subtle)
 * - Add "Deployed on Google Cloud Run, powered by Gemini" section
 */
export const COMPETITION_CONFIG = {
  enabled: isCompetitionMode(),
  
  // Features to auto-promote in competition mode
  autoPromoteFeatures: [
    'AI_CHECKLIST',
    'AI_ARCH_ENGINE',
    'AI_RISK_RADAR',
    'TOOLKIT_LIBRARY',
    'CASESTUDY_ARTIFACT_GATE',
    'HOMEPAGE_PERSONA_TABS',
    // Phase 3.2: Extended features
    'AI_TOOLS_SECTION',
    'TOOLKIT_LIBRARY_SECTION',
    'RISK_RADAR_TOOL',
    'ARCH_ENGINE_TOOL',
    'FIT_CHECK_TOOL',
    'FULL_CASE_STUDIES_CATALOG',
    'CASE_STUDY_ARTIFACTS_DOWNLOAD',
    'CASE_STUDY_ARTIFACTS_REQUEST',
    'TESTIMONIALS_ROTATOR',
    'IMPACT_DASHBOARDS',
    // Phase 4.5: Engagement Layer
    'NAVIGATION_DRAWER',
    'OUTCOME_BADGES',
    'BEFORE_AFTER_DIAGRAM',
    'CASE_STUDY_PDF_EXPORT',
  ] as const,
  
  // Badge text
  badgeText: {
    en: 'Built for Google AI Challenge',
    de: 'Erstellt für Google AI Challenge',
  },
  
  // Footer section text
  footerText: {
    en: 'Deployed on Google Cloud Run, powered by Gemini',
    de: 'Bereitgestellt auf Google Cloud Run, angetrieben von Gemini',
  },
};

/**
 * Check if a feature should be promoted in competition mode
 */
export function shouldPromoteInCompetitionMode(featureKey: string): boolean {
  if (!COMPETITION_CONFIG.enabled) return false;
  return COMPETITION_CONFIG.autoPromoteFeatures.includes(featureKey as any);
}
