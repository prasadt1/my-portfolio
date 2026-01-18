/**
 * Attribution Tracking Utility
 * 
 * Captures and persists attribution data (UTM params, referrer, landing path, etc.)
 * for lead attribution and analytics.
 * 
 * GDPR-safe: No PII stored, only anonymous attribution context.
 */

export interface AttributionSnapshot {
    // UTM parameters
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    
    // Navigation context
    referrer?: string;
    landingPath: string;
    currentPath: string;
    locale: string;
    timestamp: string;
    
    // Optional context fields (set when user interacts)
    caseStudySlug?: string;
    projectsCategory?: string;
    projectsSearchQuery?: string;
    ctaSource?: string;
}

const STORAGE_KEY = 'pt_attribution_v1';

/**
 * Get UTM parameters from URL query string
 */
function getUtmParams(): Partial<Pick<AttributionSnapshot, 'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term'>> {
    if (typeof window === 'undefined') {
        return {};
    }
    
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_content: params.get('utm_content') || undefined,
        utm_term: params.get('utm_term') || undefined,
    };
}

/**
 * Get referrer (sanitized to avoid PII)
 */
function getReferrer(): string | undefined {
    if (typeof window === 'undefined' || !document.referrer) {
        return undefined;
    }
    
    try {
        const referrerUrl = new URL(document.referrer);
        // Only store domain, not full path to avoid PII
        return referrerUrl.origin;
    } catch {
        // If referrer is not a valid URL, return as-is (truncated)
        return document.referrer.substring(0, 200);
    }
}

/**
 * Get or create attribution snapshot
 * Creates snapshot on first visit, preserves landingPath throughout session
 */
export function getAttributionSnapshot(locale: string = 'en'): AttributionSnapshot {
    if (typeof window === 'undefined') {
        return {
            landingPath: '/',
            currentPath: '/',
            locale,
            timestamp: new Date().toISOString(),
        };
    }
    
    // Try to get existing attribution from localStorage
    let stored: Partial<AttributionSnapshot> | null = null;
    try {
        const storedStr = localStorage.getItem(STORAGE_KEY);
        if (storedStr) {
            stored = JSON.parse(storedStr);
        }
    } catch (err) {
        console.warn('[Attribution] Failed to parse stored attribution:', err);
    }
    
    // Get UTM params from current URL
    const utmParams = getUtmParams();
    
    // If UTM params exist, they override stored ones (fresh campaign visit)
    const hasUtmParams = Object.values(utmParams).some(v => v !== undefined);
    
    // Landing path: use stored if exists, otherwise current path
    const landingPath = stored?.landingPath || window.location.pathname;
    
    // Build snapshot
    const snapshot: AttributionSnapshot = {
        // Use fresh UTM params if present, otherwise fall back to stored
        ...(hasUtmParams ? utmParams : {
            utm_source: stored?.utm_source,
            utm_medium: stored?.utm_medium,
            utm_campaign: stored?.utm_campaign,
            utm_content: stored?.utm_content,
            utm_term: stored?.utm_term,
        }),
        
        // Referrer: use stored (from first visit) or get current
        referrer: stored?.referrer || getReferrer(),
        
        // Paths
        landingPath,
        currentPath: window.location.pathname,
        
        // Context
        locale,
        timestamp: stored?.timestamp || new Date().toISOString(),
        
        // Context fields (preserve if set)
        caseStudySlug: stored?.caseStudySlug,
        projectsCategory: stored?.projectsCategory,
        projectsSearchQuery: stored?.projectsSearchQuery,
        ctaSource: stored?.ctaSource,
    };
    
    // If this is a new session or has UTM params, save to localStorage
    if (!stored || hasUtmParams) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
            // Debug log in dev mode
            if (process.env.NODE_ENV === 'development') {
                console.log('[Attribution] Saved attribution snapshot:', snapshot);
            }
        } catch (err) {
            console.warn('[Attribution] Failed to save attribution to localStorage:', err);
        }
    }
    
    return snapshot;
}

/**
 * Update attribution context (merges into stored object)
 * Use this when user interacts (views case study, filters projects, clicks CTA)
 * 
 * @param partialContext - Partial context fields to merge
 */
export function setAttributionContext(partialContext: Partial<Pick<AttributionSnapshot, 'caseStudySlug' | 'projectsCategory' | 'projectsSearchQuery' | 'ctaSource'>>): void {
    if (typeof window === 'undefined') {
        return;
    }
    
    try {
        const storedStr = localStorage.getItem(STORAGE_KEY);
        const stored: Partial<AttributionSnapshot> = storedStr ? JSON.parse(storedStr) : {};
        
        // Merge new context into stored
        const updated = {
            ...stored,
            ...partialContext,
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
        console.warn('[Attribution] Failed to update attribution context:', err);
    }
}
