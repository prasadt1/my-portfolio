// src/types/CaseStudy.ts

// Pain point for legacy challenge structure
export interface PainPoint {
    icon: string;
    title: string;
    description: string;
    impact: string;
}

// Persona-specific challenge content
export interface PersonaChallenge {
    situation: string;
    keyTensions: string[];
    urgency?: string;
}

// Context chip for challenge section header
export interface ContextChip {
    label: string;
    value: string;
}

// New persona-based challenge structure
export interface PersonaChallengeStructure {
    standard: PersonaChallenge;
    executive: PersonaChallenge;
    technical: PersonaChallenge;
    contextChips?: ContextChip[];
    why_prasad: string;
}

// Legacy challenge structure (for backward compatibility)
export interface LegacyChallengeStructure {
    situation: string;
    pain_points: PainPoint[];
    urgency: string;
    why_prasad: string;
}

// Union type for challenge - supports both old and new structures
export type ChallengeStructure = PersonaChallengeStructure | LegacyChallengeStructure;

// Type guard to check if challenge uses new persona structure
export function isPersonaChallenge(challenge: ChallengeStructure): challenge is PersonaChallengeStructure {
    return 'standard' in challenge && 'executive' in challenge && 'technical' in challenge;
}

export interface CaseStudy {
    id: string;
    slug: string;

    // Multi-Domain Metadata
    domains: string[]; // e.g., ['eCommerce', 'Healthcare', 'Climate Tech']
    projectType: 'product' | 'framework' | 'migration' | 'standard' | 'data-platform' | 'devops' | 'consulting';
    seoTags: string[];
    visualType?: 'performance' | 'modernization' | 'integration' | 'ai' | 'governance' | 'platform';

    // Header (attention)
    header: {
        eyebrow: string; // "€500K SAVED IN 6 MONTHS"
        title: string; // "How We Migrated 2M Patient Records..."
        client: {
            type: string; // "Mid-Size German Pharma"
            size: string; // "€2B revenue, 500 employees"
            industry: string; // "Pharmaceutical"
        };
    };

    // Challenge (empathy) - supports both legacy and persona-based structures
    challenge: ChallengeStructure;

    // Approach (credibility)
    approach: {
        methodology: string;
        phases: Array<{
            number: number;
            title: string;
            duration: string;
            activities: string[];
            deliverable: string;
            outcome: string;
        }>;
        unique_differentiator: string;
        // Optional compact version for less-dense rendering
        phases_compact?: Array<{
            title: string;
            detail: string;
        }>;
    };

    // Optional compact deliverables for executive summary view
    deliverables_compact?: Array<{
        title: string;
        detail: string;
        metric?: string;
    }>;

    // Results (proof)
    outcomes: {
        hero_metric: { value: string; label: string; icon: string };
        secondary_metrics: Array<{ value: string; label: string; icon: string }>;
        compliance: Array<{ standard: string; result: string; details: string }>;
        timeline: { planned: string; actual: string; variance: string };
        business_impact?: {
            revenue?: string;
            savings?: string;
            efficiency?: string;
            risk_reduction?: string;
            innovation?: string;
        };
    };

    // Social proof
    testimonial?: {
        quote: string;
        author: { name: string; role: string; company: string; photo?: string; linkedin?: string };
        video_url?: string;
    };

    // Technical details
    technical: {
        before: { stack: string[]; infrastructure: string; issues: string[] };
        after: { stack: string[]; infrastructure: string; improvements: string[] };
        migration_strategy: string;
        architecture_diagram?: string; // SVG or React Flow
    };

    // CTA
    cta: {
        primary: { text: string; action: string; context: string };
        secondary: { text: string; action: string };
    };

    // Consulting insights
    approachToday?: {
        titleKey?: string;     // i18n title key
        bullets: string[];     // EN bullets
        bulletsDe: string[];   // DE bullets
        focusAreas?: string[]; // optional chips
    };

    // UI Theme
    theme?: {
        color: string;
        gradient: string;
        iconBg: string;
        backgroundImage?: string;
    };
}
