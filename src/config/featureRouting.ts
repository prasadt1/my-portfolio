// src/config/featureRouting.ts
// Centralized feature routing and promotion logic for Phase 3.1

import { isEnabled, isPromoted, type FeatureKey } from './featureUtils';
import { FEATURES } from './features';

export interface NavItem {
  path: string;
  labelKey: string;
  featureKey?: FeatureKey;
  external?: boolean;
}

export interface HomepageSection {
  id: string;
  featureKey?: FeatureKey;
  component?: string;
}

export interface PromoBadge {
  slug: string;
  label: string;
}

// Core navigation items (always visible)
const CORE_NAV_ITEMS: NavItem[] = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/services', labelKey: 'nav.services' },
  { path: '/projects', labelKey: 'nav.projects' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/contact', labelKey: 'nav.contact' },
];

// Feature-based navigation items (only shown if promoted)
const FEATURE_NAV_ITEMS: NavItem[] = [
  { path: '/architecture-engine', labelKey: 'nav.architectureEngine', featureKey: 'AI_ARCH_ENGINE' },
  { path: '/risk-radar', labelKey: 'nav.riskRadar', featureKey: 'AI_RISK_RADAR' },
  { path: '/checklist', labelKey: 'nav.checklist', featureKey: 'AI_CHECKLIST' },
  { path: '/hiring', labelKey: 'nav.hiring', featureKey: 'HOMEPAGE_PERSONA_TABS' },
  { path: '/consultation', labelKey: 'nav.consultation' },
];

// Competition mode routes (always accessible if enabled, but only promoted if competition mode is on)
// Note: /hire-me redirects to /hiring, so it's not included here
const COMPETITION_ROUTES: NavItem[] = [
  { path: '/consulting', labelKey: 'nav.consulting' },
  { path: '/resources', labelKey: 'nav.resources' },
];

/**
 * Get navigation items filtered by promotion flags
 */
export function getNavItems(): NavItem[] {
  const items: NavItem[] = [...CORE_NAV_ITEMS];
  
  // Add feature-based nav items only if promoted
  FEATURE_NAV_ITEMS.forEach(item => {
    if (!item.featureKey || isPromoted(item.featureKey)) {
      items.push(item);
    }
  });
  
  // Add competition routes if enabled (they're always accessible, but only in nav if promoted)
  // For now, we'll add them conditionally based on competition mode
  const competitionMode = typeof import.meta !== 'undefined' && 
    import.meta.env?.VITE_COMPETITION_MODE === 'true';
  
  if (competitionMode) {
    COMPETITION_ROUTES.forEach(item => items.push(item));
  }
  
  return items;
}

/**
 * Get homepage sections that should be shown based on promotion flags
 */
export function getHomepageSections(): HomepageSection[] {
  const sections: HomepageSection[] = [
    { id: 'hero' },
    { id: 'services' },
    { id: 'projects' },
  ];
  
  // Add persona tabs section if promoted
  if (isPromoted('HOMEPAGE_PERSONA_TABS')) {
    sections.push({ id: 'personaTabs', featureKey: 'HOMEPAGE_PERSONA_TABS' });
  }
  
  // Add AI tool sections if promoted
  if (isPromoted('AI_CHECKLIST')) {
    sections.push({ id: 'checklist', featureKey: 'AI_CHECKLIST' });
  }
  
  if (isPromoted('AI_ARCH_ENGINE')) {
    sections.push({ id: 'architectureEngine', featureKey: 'AI_ARCH_ENGINE' });
  }
  
  if (isPromoted('AI_RISK_RADAR')) {
    sections.push({ id: 'riskRadar', featureKey: 'AI_RISK_RADAR' });
  }
  
  if (isPromoted('TOOLKIT_LIBRARY')) {
    sections.push({ id: 'toolkit', featureKey: 'TOOLKIT_LIBRARY' });
  }
  
  return sections;
}

/**
 * Get promo badges for case studies
 * Featured badge should only show if:
 * 1. Project is in hero/featured list
 * 2. AND CASESTUDY_ARTIFACT_GATE is promoted OR specific case study promote flag exists
 */
export function getPromoBadges(): PromoBadge[] {
  // Hero/featured case studies (hardcoded list from ProjectCard logic)
  const heroCaseStudies = [
    'brita-ecommerce',
    'delivery-hero-ads',
    'insurance-performance',
  ];
  
  // Only return badges if case studies are promoted
  if (!isPromoted('CASESTUDY_ARTIFACT_GATE')) {
    return [];
  }
  
  return heroCaseStudies.map(slug => ({
    slug,
    label: 'Featured',
  }));
}

/**
 * Check if a route should be accessible (enabled) vs visible in nav (promoted)
 */
export function canAccessRoute(path: string): { enabled: boolean; promoted: boolean } {
  // Core routes are always enabled and promoted
  if (CORE_NAV_ITEMS.some(item => item.path === path)) {
    return { enabled: true, promoted: true };
  }
  
  // Check feature routes
  const featureItem = FEATURE_NAV_ITEMS.find(item => item.path === path);
  if (featureItem?.featureKey) {
    return {
      enabled: isEnabled(featureItem.featureKey),
      promoted: isPromoted(featureItem.featureKey),
    };
  }
  
  // Competition routes are always enabled if competition mode is on
  const competitionMode = typeof import.meta !== 'undefined' && 
    import.meta.env?.VITE_COMPETITION_MODE === 'true';
  if (competitionMode && COMPETITION_ROUTES.some(item => item.path === path)) {
    return { enabled: true, promoted: competitionMode };
  }
  
  // Default: enabled but not promoted (for direct URL access)
  return { enabled: true, promoted: false };
}

/**
 * Check if a case study should show Featured badge
 */
export function shouldShowFeaturedBadge(slug: string): boolean {
  const badges = getPromoBadges();
  return badges.some(badge => badge.slug === slug);
}
