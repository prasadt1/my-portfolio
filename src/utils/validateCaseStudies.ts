// src/utils/validateCaseStudies.ts
// Validation utilities for case studies - Phase 3.1
// Extends existing validateProjects.ts with Phase 3.1-specific checks

import { CaseStudy } from '../types/CaseStudy';
import { getLocalizedString } from '../types/CaseStudy';
import { validateProjects, logValidationResults } from './validateProjects';

// Hero case studies that must have full content
const HERO_CASE_STUDIES = [
    'brita-ecommerce',
    'delivery-hero-ads',
    'insurance-performance',
    'pact-pcf-data-exchange-network', // SINE climate tech project
    'photography-coach-ai'
];

interface ValidationResult {
    isValid: boolean;
    warnings: string[];
    errors: string[];
}

/**
 * Validate a single case study
 */
export function validateCaseStudy(study: CaseStudy, allStudies: CaseStudy[]): ValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Check slug uniqueness
    const duplicateSlugs = allStudies.filter(s => s.slug === study.slug);
    if (duplicateSlugs.length > 1) {
        errors.push(`Duplicate slug: ${study.slug}`);
    }

    // Check title presence
    const title = typeof study.header.title === 'string' 
        ? study.header.title 
        : getLocalizedString(study.header.title, 'en');
    if (!title || title.trim().length === 0) {
        errors.push(`Missing title for ${study.slug}`);
    }

    // Check hero case studies have required fields
    const isHero = HERO_CASE_STUDIES.includes(study.slug);
    
    if (isHero) {
        // Executive snapshot required
        if (!study.executiveSnapshot) {
            errors.push(`Hero case study ${study.slug} missing executiveSnapshot`);
        } else {
            // Validate executive snapshot structure
            if (!study.executiveSnapshot.whyItMattered || 
                !Array.isArray(study.executiveSnapshot.whyItMattered.en) ||
                study.executiveSnapshot.whyItMattered.en.length !== 3) {
                warnings.push(`Hero case study ${study.slug} executiveSnapshot.whyItMattered should have exactly 3 bullets`);
            }
            if (!study.executiveSnapshot.keyTensions ||
                !Array.isArray(study.executiveSnapshot.keyTensions.en) ||
                study.executiveSnapshot.keyTensions.en.length !== 3) {
                warnings.push(`Hero case study ${study.slug} executiveSnapshot.keyTensions should have exactly 3 bullets`);
            }
        }

        // Persona challenges required
        if (!study.personaChallenges) {
            errors.push(`Hero case study ${study.slug} missing personaChallenges`);
        } else {
            // Validate persona challenges structure
            const requiredPersonas = ['executive', 'technical', 'delivery'];
            for (const persona of requiredPersonas) {
                if (!study.personaChallenges[persona as keyof typeof study.personaChallenges]) {
                    errors.push(`Hero case study ${study.slug} missing personaChallenges.${persona}`);
                }
            }
        }

        // Trust layer required
        if (!study.trustLayer) {
            errors.push(`Hero case study ${study.slug} missing trustLayer`);
        } else {
            // Validate trust layer completeness
            if (!study.trustLayer.myRole || 
                (!study.trustLayer.myRole.en && typeof study.trustLayer.myRole !== 'string')) {
                warnings.push(`Hero case study ${study.slug} trustLayer.myRole missing or incomplete`);
            }
            if (!study.trustLayer.scopeOwned || 
                !Array.isArray(study.trustLayer.scopeOwned.en) ||
                study.trustLayer.scopeOwned.en.length === 0) {
                warnings.push(`Hero case study ${study.slug} trustLayer.scopeOwned missing or empty`);
            }
            if (!study.trustLayer.confidentialityNote) {
                warnings.push(`Hero case study ${study.slug} trustLayer.confidentialityNote missing`);
            }
        }

        // Artifact previews required (at least 6)
        if (!study.artifactPreviews || study.artifactPreviews.length === 0) {
            errors.push(`Hero case study ${study.slug} missing artifactPreviews`);
        } else if (study.artifactPreviews.length < 6) {
            warnings.push(`Hero case study ${study.slug} has only ${study.artifactPreviews.length} artifacts, should have at least 6`);
        }
    }

    return {
        isValid: errors.length === 0,
        warnings,
        errors
    };
}

/**
 * Validate all case studies
 * Logs warnings/errors to console (dev only)
 */
export function validateAllCaseStudies(studies: CaseStudy[]): void {
    if (process.env.NODE_ENV !== 'development') {
        return; // Only run in dev
    }

    const allResults: Array<{ study: CaseStudy; result: ValidationResult }> = [];
    
    for (const study of studies) {
        const result = validateCaseStudy(study, studies);
        allResults.push({ study, result });
    }

    // Log results
    const totalErrors = allResults.reduce((sum, r) => sum + r.result.errors.length, 0);
    const totalWarnings = allResults.reduce((sum, r) => sum + r.result.warnings.length, 0);

    if (totalErrors > 0 || totalWarnings > 0) {
        console.group('🔍 Case Study Validation');
        console.log(`Total: ${studies.length} case studies`);
        console.log(`Errors: ${totalErrors}, Warnings: ${totalWarnings}`);
        
        for (const { study, result } of allResults) {
            if (result.errors.length > 0 || result.warnings.length > 0) {
                console.group(`📋 ${study.slug}`);
                if (result.errors.length > 0) {
                    console.error('Errors:', result.errors);
                }
                if (result.warnings.length > 0) {
                    console.warn('Warnings:', result.warnings);
                }
                console.groupEnd();
            }
        }
        console.groupEnd();
    }
}

/**
 * Run validation on projects import
 * Combines existing validation with Phase 3.1 checks
 */
export function runProjectValidation(projects: CaseStudy[]): void {
    // Run existing validation (IDs, slugs, kebab-case)
    const issues = validateProjects(projects);
    logValidationResults(issues, projects);
    
    // Run Phase 3.1 validation (hero case studies, trust layer, artifacts)
    validateAllCaseStudies(projects);
}
