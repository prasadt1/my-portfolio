// src/types/CaseStudy.ts
// Single source of truth for case study types with bilingual support

// =============================================================================
// BILINGUAL CONTENT SUPPORT
// =============================================================================

// Localized string - supports EN and DE content in one object
// Also supports additional locales via Record type
export type LocalizedString = Record<string, string>;

// Localized string array
export type LocalizedStringArray = Record<string, string[]>;

// Localized context chip
export interface LocalizedContextChip {
    label: LocalizedString;
    value: LocalizedString;
}

// Helper to get string for current locale
export function getLocalizedString(content: LocalizedString | string, locale: string): string {
    if (typeof content === 'string') {
        return content; // Backward compatibility for non-localized strings
    }
    return locale === 'de' ? content.de : content.en;
}

// Helper to get string array for current locale
export function getLocalizedStringArray(content: LocalizedStringArray | string[], locale: string): string[] {
    if (Array.isArray(content) && typeof content[0] === 'string') {
        return content as string[]; // Backward compatibility
    }
    const localized = content as LocalizedStringArray;
    return locale === 'de' ? localized.de : localized.en;
}

// =============================================================================
// CHALLENGE STRUCTURES
// =============================================================================

// Pain point for legacy challenge structure
export interface PainPoint {
    icon: string;
    title: string;
    description: string;
    impact: string;
}

// Persona-specific challenge content (localized)
export interface LocalizedPersonaChallenge {
    situation: LocalizedString;
    keyTensions: LocalizedStringArray;
    urgency?: LocalizedString;
}

// New persona-based challenge structure (fully localized)
export interface LocalizedPersonaChallengeStructure {
    standard: LocalizedPersonaChallenge;
    executive: LocalizedPersonaChallenge;
    technical: LocalizedPersonaChallenge;
    contextChips?: LocalizedContextChip[];
    why_prasad: LocalizedString;
}

// Legacy challenge structure (for backward compatibility - non-localized)
export interface LegacyChallengeStructure {
    situation: string;
    pain_points: PainPoint[];
    urgency: string;
    why_prasad: string;
}

// Union type for challenge - supports both old and new structures
export type ChallengeStructure = LocalizedPersonaChallengeStructure | LegacyChallengeStructure;

// Type guard to check if challenge uses new localized persona structure
export function isLocalizedPersonaChallenge(challenge: ChallengeStructure): challenge is LocalizedPersonaChallengeStructure {
    return 'standard' in challenge && 
           'executive' in challenge && 
           'technical' in challenge &&
           typeof (challenge as LocalizedPersonaChallengeStructure).standard?.situation === 'object';
}

// Type guard for legacy structure
export function isLegacyChallenge(challenge: ChallengeStructure): challenge is LegacyChallengeStructure {
    return 'pain_points' in challenge;
}

// =============================================================================
// PHASE 2: EXECUTIVE SNAPSHOT & PERSONA CHALLENGES (NEW STRUCTURE)
// =============================================================================

/**
 * Executive Snapshot - compact panel shown above the fold
 * Contains: Why it mattered (3 bullets), Key tensions (3 bullets), Metric callout
 */
export interface CaseStudyExecutiveSnapshot {
    whyItMattered: LocalizedStringArray;   // exactly 3 bullets
    keyTensions: LocalizedStringArray;     // exactly 3 bullets
    metricCallout: {
        value: LocalizedString;
        label: LocalizedString;
    };
}

/**
 * Persona Challenge Block - content for a single persona tab
 * Used in expanded persona section
 */
export interface PersonaChallengeBlock {
    challenges: LocalizedStringArray;      // max 6 bullets
    riskIfIgnored: LocalizedStringArray;   // max 3 bullets
    decisionPoints: LocalizedStringArray;  // max 3 bullets
}

/**
 * Persona Challenges - container for all three persona views
 * Executive, Technical, and Delivery perspectives
 */
export interface PersonaChallenges {
    executive: PersonaChallengeBlock;
    technical: PersonaChallengeBlock;
    delivery: PersonaChallengeBlock;
}

// =============================================================================
// MAIN CASE STUDY INTERFACE
// =============================================================================

export interface CaseStudy {
    id: string;
    slug: string;

    // Multi-Domain Metadata
    domains: string[];
    projectType: 'product' | 'framework' | 'migration' | 'standard' | 'data-platform' | 'devops' | 'consulting';
    seoTags: string[];
    visualType?: 'performance' | 'modernization' | 'integration' | 'ai' | 'governance' | 'platform';

    // Header (attention) - localized
    header: {
        eyebrow: LocalizedString | string;
        title: LocalizedString | string;
        client: {
            type: LocalizedString | string;
            size: string;
            industry: LocalizedString | string;
        };
    };

    // Challenge (empathy) - supports both legacy and localized persona-based structures
    challenge: ChallengeStructure;

    // Phase 2: Executive Snapshot (compact, always visible)
    executiveSnapshot?: CaseStudyExecutiveSnapshot;

    // Phase 2: Persona Challenges (expandable, collapsed by default)
    personaChallenges?: PersonaChallenges;

    // Approach (credibility)
    approach: {
        methodology: LocalizedString | string;
        phases: Array<{
            number: number;
            title: LocalizedString | string;
            duration: string;
            activities: LocalizedStringArray | string[];
            deliverable: LocalizedString | string;
            outcome: LocalizedString | string;
        }>;
        unique_differentiator: LocalizedString | string;
        phases_compact?: Array<{
            title: LocalizedString | string;
            detail: LocalizedString | string;
        }>;
    };

    // Optional compact deliverables
    deliverables_compact?: Array<{
        title: LocalizedString | string;
        detail: LocalizedString | string;
        metric?: string;
    }>;

    // Results (proof)
    outcomes: {
        hero_metric: { 
            value: string; 
            label: LocalizedString | string; 
            icon: string 
        };
        secondary_metrics: Array<{ 
            value: string; 
            label: LocalizedString | string; 
            icon: string 
        }>;
        compliance: Array<{ 
            standard: string; 
            result: LocalizedString | string; 
            details: LocalizedString | string 
        }>;
        timeline: { 
            planned: string; 
            actual: string; 
            variance: LocalizedString | string 
        };
        business_impact?: {
            revenue?: LocalizedString | string;
            savings?: LocalizedString | string;
            efficiency?: LocalizedString | string;
            risk_reduction?: LocalizedString | string;
            innovation?: LocalizedString | string;
        };
    };

    // Social proof
    testimonial?: {
        quote: LocalizedString | string;
        author: { 
            name: string; 
            role: LocalizedString | string; 
            company: string; 
            photo?: string; 
            linkedin?: string 
        };
        video_url?: string;
    };

    // Technical details
    technical: {
        before: { 
            stack: string[]; 
            infrastructure: LocalizedString | string; 
            issues: LocalizedStringArray | string[] 
        };
        after: { 
            stack: string[]; 
            infrastructure: LocalizedString | string; 
            improvements: LocalizedStringArray | string[] 
        };
        migration_strategy: LocalizedString | string;
        architecture_diagram?: string;
    };

    // CTA
    cta: {
        primary: { 
            text: LocalizedString | string; 
            action: string; 
            context: LocalizedString | string 
        };
        secondary: { 
            text: LocalizedString | string; 
            action: string 
        };
    };

    // Consulting insights - already supports bilingual via bulletsDe
    approachToday?: {
        titleKey?: string;
        bullets: string[];
        bulletsDe: string[];
        focusAreas?: string[];
    };

    // UI Theme
    theme?: {
        color: string;
        gradient: string;
        iconBg: string;
        backgroundImage?: string;
    };

    // Phase 2.5: Listing card fields (optional, for executive-first cards)
    tags?: string[];  // For filtering: 'cloud-modernization', 'ai-genai', 'compliance', etc.
    listingSummary?: LocalizedString;  // One-liner for card subtitle
    listingMetrics?: Array<{
        label: LocalizedString;
        value: LocalizedString;
        type?: 'outcome' | 'scope' | 'constraint';
    }>;

    // Phase 3.1: Trust Layer (credibility & IP safety)
    trustLayer?: TrustLayer;

    // Phase 3.1: Artifact Previews (gated content)
    artifactPreviews?: ArtifactPreviewItem[];
}

// =============================================================================
// PHASE 3.1: TRUST LAYER & ARTIFACT PREVIEWS
// =============================================================================

/**
 * Trust Layer - clarifies ownership and scope, IP-safe disclaimer
 */
export interface TrustLayer {
    myRole: LocalizedString;              // e.g. Lead Architect / Program Manager
    scopeOwned: LocalizedStringArray;     // bullets: what I personally owned
    deliveredWithTeam: LocalizedStringArray; // bullets: team-delivered items
    confidentialityNote: LocalizedString; // explicit IP-safe disclaimer
}

/**
 * Artifact Preview Item - shows preview but requires access request
 */
export interface ArtifactPreviewItem {
    title: LocalizedString;
    description: LocalizedString;
    type: 'ADR' | 'Diagram' | 'Checklist' | 'Roadmap' | 'TCO' | 'Risk';
    gated: boolean; // always true for deep artifacts
}
