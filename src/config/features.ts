// src/config/features.ts
// Centralized feature flag configuration for Phase 3.1

import { shouldPromoteInCompetitionMode } from './competition';

export type FeatureKey =
  | 'AI_CHECKLIST'
  | 'AI_ARCH_ENGINE'
  | 'AI_RISK_RADAR'
  | 'TOOLKIT_LIBRARY'
  | 'EXEC_SUMMARY_MODAL'
  | 'CASESTUDY_ARTIFACT_GATE'
  | 'HOMEPAGE_PERSONA_TABS';

export type FeatureFlag = {
  enabled: boolean;   // Controls if feature works (competition judges can access if enabled=true)
  promoted: boolean;  // Controls visibility in nav/home but route still works if enabled=true
};

// Read promotion flags from environment variables
// enabled defaults to true for all features (competition wants depth)
// promoted depends on env var; if undefined, default promoted=false EXCEPT checklist which is always promoted
// Competition mode auto-promotes all major features
const getPromotionFlag = (envKey: string, featureKey: FeatureKey, defaultPromoted: boolean = false): boolean => {
  // Check competition mode first
  if (shouldPromoteInCompetitionMode(featureKey)) {
    return true;
  }
  
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const value = import.meta.env[envKey];
    if (value === 'true' || value === '1') return true;
    if (value === 'false' || value === '0') return false;
  }
  return defaultPromoted;
};

export const FEATURES: Record<FeatureKey, FeatureFlag> = {
  AI_CHECKLIST: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_AI_CHECKLIST', 'AI_CHECKLIST', true), // Always promoted (default exception)
  },
  AI_ARCH_ENGINE: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_AI_ARCH_ENGINE', 'AI_ARCH_ENGINE', false),
  },
  AI_RISK_RADAR: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_AI_RISK_RADAR', 'AI_RISK_RADAR', false),
  },
  TOOLKIT_LIBRARY: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_TOOLKIT_LIBRARY', 'TOOLKIT_LIBRARY', false),
  },
  EXEC_SUMMARY_MODAL: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_EXEC_SUMMARY', 'EXEC_SUMMARY_MODAL', false),
  },
  CASESTUDY_ARTIFACT_GATE: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_ARTIFACT_GATE', 'CASESTUDY_ARTIFACT_GATE', false),
  },
  HOMEPAGE_PERSONA_TABS: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_PERSONA_TABS', 'HOMEPAGE_PERSONA_TABS', false),
  },
};
