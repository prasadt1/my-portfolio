// src/utils/validateProjects.ts
// Phase 1.6: Validation for stable IDs and slugs

import type { CaseStudy } from '../types/CaseStudy';

/**
 * Validation result for a single project
 */
interface ValidationIssue {
    projectIndex: number;
    field: 'id' | 'slug';
    issue: string;
    value: string;
}

/**
 * Validates that a string is valid kebab-case (lowercase, hyphens, no spaces)
 */
function isValidKebabCase(str: string): boolean {
    if (!str || str.length === 0) return false;
    // Must be lowercase, only alphanumeric and hyphens, no leading/trailing hyphens
    const kebabCaseRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    return kebabCaseRegex.test(str);
}

/**
 * Validates all projects for stable IDs and slugs
 * - All IDs must be unique
 * - All slugs must be unique
 * - IDs and slugs must be lowercase kebab-case
 * - No empty strings
 * 
 * @param projects - Array of CaseStudy objects
 * @returns Array of validation issues (empty if all valid)
 */
export function validateProjects(projects: CaseStudy[]): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const seenIds = new Map<string, number>();
    const seenSlugs = new Map<string, number>();

    projects.forEach((project, index) => {
        // Validate ID
        if (!project.id) {
            issues.push({
                projectIndex: index,
                field: 'id',
                issue: 'ID is empty or undefined',
                value: project.id || ''
            });
        } else {
            // Check for duplicates
            const existingIdIndex = seenIds.get(project.id);
            if (existingIdIndex !== undefined) {
                issues.push({
                    projectIndex: index,
                    field: 'id',
                    issue: `Duplicate ID (first seen at index ${existingIdIndex})`,
                    value: project.id
                });
            } else {
                seenIds.set(project.id, index);
            }

            // Check kebab-case format
            if (!isValidKebabCase(project.id)) {
                issues.push({
                    projectIndex: index,
                    field: 'id',
                    issue: 'ID must be lowercase kebab-case (e.g., "my-project-id")',
                    value: project.id
                });
            }
        }

        // Validate Slug
        if (!project.slug) {
            issues.push({
                projectIndex: index,
                field: 'slug',
                issue: 'Slug is empty or undefined',
                value: project.slug || ''
            });
        } else {
            // Check for duplicates
            const existingSlugIndex = seenSlugs.get(project.slug);
            if (existingSlugIndex !== undefined) {
                issues.push({
                    projectIndex: index,
                    field: 'slug',
                    issue: `Duplicate slug (first seen at index ${existingSlugIndex})`,
                    value: project.slug
                });
            } else {
                seenSlugs.set(project.slug, index);
            }

            // Check kebab-case format
            if (!isValidKebabCase(project.slug)) {
                issues.push({
                    projectIndex: index,
                    field: 'slug',
                    issue: 'Slug must be lowercase kebab-case (e.g., "my-project-slug")',
                    value: project.slug
                });
            }
        }
    });

    return issues;
}

/**
 * Logs validation results to console
 * Does not crash the build, only warns
 */
export function logValidationResults(issues: ValidationIssue[], projects: CaseStudy[]): void {
    if (issues.length === 0) {
        if (typeof window !== 'undefined') {
            console.log(`✓ All ${projects.length} projects have valid IDs and slugs`);
        }
        return;
    }

    console.warn('=== PROJECT VALIDATION ISSUES ===');
    console.warn(`Found ${issues.length} issue(s) in project data:`);
    console.warn('');

    issues.forEach((issue, idx) => {
        const project = projects[issue.projectIndex];
        const projectName = project?.header?.title || `Project at index ${issue.projectIndex}`;
        console.warn(
            `${idx + 1}. [${issue.field.toUpperCase()}] ${issue.issue}`,
            `\n   Project: ${typeof projectName === 'string' ? projectName : projectName.en || 'Unknown'}`,
            `\n   Value: "${issue.value}"`,
            '\n'
        );
    });

    console.warn('=================================');
    console.warn('Please fix these issues in src/data/projects.ts');
    console.warn('IDs and slugs must be: stable, lowercase, kebab-case, unique');
}

/**
 * Main validation function - validates and logs results
 * Call this on app startup or import
 */
export function runProjectValidation(projects: CaseStudy[]): void {
    const issues = validateProjects(projects);
    logValidationResults(issues, projects);
}
