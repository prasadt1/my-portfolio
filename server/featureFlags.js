/**
 * Server-side Feature Flags with Deterministic Rollout
 * 
 * Reads env vars FEATURE_* and ROLLOUT_*_PERCENT to determine
 * feature availability with optional percentage-based rollout.
 * 
 * Supports modes: 'on' | 'off' | 'rollout'
 */

import crypto from 'crypto';

/**
 * Parse feature flag from environment variable
 * @param {string} envValue - Raw env var value
 * @returns {{ mode: 'on' | 'off' | 'rollout' }}
 */
export function parseFlag(envValue) {
    if (!envValue) return { mode: 'off' };
    
    const normalized = envValue.toLowerCase().trim();
    
    if (normalized === 'on' || normalized === 'true') return { mode: 'on' };
    if (normalized === 'off' || normalized === 'false') return { mode: 'off' };
    if (normalized === 'rollout') return { mode: 'rollout' };
    
    // Default to 'off' for unknown values
    return { mode: 'off' };
}

/**
 * Deterministic rollout: SHA256 hash of key -> integer -> modulo 100 -> compare to percentage
 * @param {string} key - Unique identifier (anonId + flagName)
 * @param {number} percentage - Rollout percentage (0-100)
 * @returns {boolean}
 */
export function shouldEnableDeterministic(key, percentage) {
    if (percentage >= 100) return true;
    if (percentage <= 0) return false;
    
    // SHA256 hash, take first 8 hex chars, convert to integer
    const hash = crypto.createHash('sha256').update(key).digest('hex').slice(0, 8);
    const intVal = parseInt(hash, 16);
    const pct = intVal % 100;
    
    return pct < percentage;
}

/**
 * Get feature flags for a specific anonymous user ID
 * @param {string} anonId - Anonymous user identifier
 * @returns {Record<string, { enabled: boolean, reason: string, percentage?: number }>}
 */
export function getFeatureFlagsForAnon(anonId) {
    const flags = {};
    
    // List of all feature flags we support
    const featureFlags = [
        'PROPOSAL_REVIEW',
        'RISK_RADAR',
        'RISK_RADAR_EXPORT',
        'ARCH_GENERATOR',
        'EXEC_MODAL',
        'STICKY_CTA',
    ];
    
    for (const flagName of featureFlags) {
        const envKey = `FEATURE_${flagName}`;
        const rawValue = process.env[envKey];
        const parsed = parseFlag(rawValue);
        
        // Convert to lowercase with underscores: PROPOSAL_REVIEW -> proposal_review
        const shortName = flagName.toLowerCase();
        
        if (parsed.mode === 'on') {
            flags[shortName] = { enabled: true, reason: 'env' };
        } else if (parsed.mode === 'rollout') {
            // Get rollout percentage from env (default to 0 if not set)
            const rolloutKey = `ROLLOUT_${flagName}_PERCENT`;
            const percentage = parseInt(process.env[rolloutKey] || '0', 10);
            
            // Use anonId + flagName as the key for deterministic hashing
            const enabled = shouldEnableDeterministic(`${anonId}${flagName}`, percentage);
            
            flags[shortName] = {
                enabled,
                reason: 'rollout',
                percentage: enabled ? percentage : undefined, // Only include if enabled for privacy
            };
        } else {
            flags[shortName] = { enabled: false, reason: 'env' };
        }
    }
    
    return flags;
}

/**
 * Get feature flags for a request (extracts anonId from headers/cookies)
 * @param {express.Request} req - Express request object
 * @returns {Record<string, { enabled: boolean, reason: string, percentage?: number }>}
 */
export function getFeatureFlags(req) {
    // Try to get anon ID from header (Express normalizes headers to lowercase)
    // Note: cookie-parser not installed, so we use headers only
    const headerAnonId = req.headers['x-pt-anon-id'] || req.headers['X-PT-Anon-ID'];
    let anonId = headerAnonId || 
                 `anonymous_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    return getFeatureFlagsForAnon(anonId);
}

/**
 * Check if a specific feature is enabled for a request
 * @param {string} flagName - Feature flag name (e.g., 'proposal_review')
 * @param {express.Request} req - Express request object
 * @returns {boolean}
 */
export function isFeatureEnabled(flagName, req) {
    const flags = getFeatureFlags(req);
    const normalizedName = flagName.toLowerCase();
    return flags[normalizedName]?.enabled === true;
}

/**
 * Log feature flags configuration on server startup (masked, no secrets)
 */
export function logFeatureFlagsConfig() {
    const featureFlags = [
        'PROPOSAL_REVIEW',
        'RISK_RADAR',
        'RISK_RADAR_EXPORT',
        'ARCH_GENERATOR',
        'EXEC_MODAL',
        'STICKY_CTA',
    ];
    
    const summary = {};
    
    for (const flagName of featureFlags) {
        const envKey = `FEATURE_${flagName}`;
        const rawValue = process.env[envKey];
        const parsed = parseFlag(rawValue);
        
        const rolloutKey = `ROLLOUT_${flagName}_PERCENT`;
        const rolloutPercent = process.env[rolloutKey];
        
        summary[flagName] = {
            mode: parsed.mode,
            rolloutPercent: rolloutPercent || 'not set',
        };
    }
    
    console.log('[Feature Flags] Configuration summary:', JSON.stringify(summary, null, 2));
}
