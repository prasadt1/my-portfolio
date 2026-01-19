// src/config/featureUtils.ts
// Utility functions for feature flag checks

import { FEATURES, type FeatureKey, type FeatureFlag } from './features';

/**
 * Check if a feature is enabled (can be accessed, even if not promoted)
 */
export function isEnabled(key: FeatureKey): boolean {
  return FEATURES[key]?.enabled ?? false;
}

/**
 * Check if a feature is promoted (should appear in nav/home)
 */
export function isPromoted(key: FeatureKey): boolean {
  const flag = FEATURES[key];
  if (!flag) return false;
  return flag.enabled && flag.promoted;
}

/**
 * Get full feature flag object
 */
export function getFeatureFlag(key: FeatureKey): FeatureFlag | null {
  return FEATURES[key] || null;
}

/**
 * Require a feature to be enabled - renders fallback if disabled
 * Usage: {requireEnabled('AI_ARCH_ENGINE', <Component />, <Fallback />)}
 */
export function requireEnabled<T>(
  key: FeatureKey,
  component: T,
  fallback: T
): T {
  return isEnabled(key) ? component : fallback;
}

/**
 * Check if feature should be visible in navigation
 */
export function shouldShowInNav(key: FeatureKey): boolean {
  return isPromoted(key);
}
