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
  | 'HOMEPAGE_PERSONA_TABS'
  // Phase 3.2: Extended feature flags
  | 'AI_TOOLS_SECTION'
  | 'TOOLKIT_LIBRARY_SECTION'
  | 'RISK_RADAR_TOOL'
  | 'ARCH_ENGINE_TOOL'
  | 'FIT_CHECK_TOOL'
  | 'FULL_CASE_STUDIES_CATALOG'
  | 'CASE_STUDY_ARTIFACTS_DOWNLOAD'
  | 'CASE_STUDY_ARTIFACTS_REQUEST'
  | 'TESTIMONIALS_ROTATOR'
  | 'IMPACT_DASHBOARDS'
  // Phase 4.5: Engagement Layer
  | 'NAVIGATION_DRAWER'
  | 'OUTCOME_BADGES'
  | 'BEFORE_AFTER_DIAGRAM'
  | 'CASE_STUDY_PDF_EXPORT'
  // Phase 5 Enhanced: Project Similarity Matcher
  | 'PROJECT_SIMILARITY_MATCHER'
  | 'TOOLS_SECTION';

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
    enabled: false, // DISABLED for final submission
    promoted: false,
  },
  AI_RISK_RADAR: {
    enabled: false, // DISABLED for final submission
    promoted: false,
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
  // Phase 3.2: Extended feature flags
  AI_TOOLS_SECTION: {
    enabled: false, // DISABLED for final submission - hide chat assistant
    promoted: false,
  },
  TOOLKIT_LIBRARY_SECTION: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_TOOLKITS', 'TOOLKIT_LIBRARY_SECTION', false),
  },
  RISK_RADAR_TOOL: {
    enabled: false, // DISABLED for final submission
    promoted: false,
  },
  ARCH_ENGINE_TOOL: {
    enabled: false, // DISABLED for final submission
    promoted: false,
  },
  FIT_CHECK_TOOL: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_FIT_CHECK_TOOL', 'FIT_CHECK_TOOL', false),
  },
  FULL_CASE_STUDIES_CATALOG: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_FULL_CATALOG', 'FULL_CASE_STUDIES_CATALOG', false),
  },
  CASE_STUDY_ARTIFACTS_DOWNLOAD: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_ARTIFACTS_DOWNLOAD', 'CASE_STUDY_ARTIFACTS_DOWNLOAD', false),
  },
  CASE_STUDY_ARTIFACTS_REQUEST: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_ARTIFACTS_REQUEST', 'CASE_STUDY_ARTIFACTS_REQUEST', false),
  },
  TESTIMONIALS_ROTATOR: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_TESTIMONIALS', 'TESTIMONIALS_ROTATOR', false),
  },
  IMPACT_DASHBOARDS: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_IMPACT_DASHBOARDS', 'IMPACT_DASHBOARDS', false),
  },
  // Phase 4.5: Engagement Layer
  NAVIGATION_DRAWER: {
    enabled: false, // DISABLED for final submission - remove StartHereDrawer
    promoted: false,
  },
  OUTCOME_BADGES: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_OUTCOME_BADGES', 'OUTCOME_BADGES', true),
  },
  BEFORE_AFTER_DIAGRAM: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_BEFORE_AFTER_DIAGRAM', 'BEFORE_AFTER_DIAGRAM', true),
  },
  CASE_STUDY_PDF_EXPORT: {
    enabled: true,
    promoted: getPromotionFlag('VITE_PROMOTE_CASE_STUDY_PDF_EXPORT', 'CASE_STUDY_PDF_EXPORT', true),
  },
  // Phase 5 Enhanced: Project Similarity Matcher
  PROJECT_SIMILARITY_MATCHER: {
    enabled: true, // KEEP ACTIVE for final submission
    promoted: true, // PROMOTE for final submission
  },
  TOOLS_SECTION: {
    enabled: true, // KEEP ACTIVE for final submission
    promoted: true, // PROMOTE for final submission
  },
};
