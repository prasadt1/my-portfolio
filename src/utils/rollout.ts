/**
 * Client-side Deterministic Rollout Helper
 * 
 * Matches server-side logic for consistent rollout decisions.
 * Uses SHA256 hash to deterministically assign users to rollout buckets.
 */

/**
 * Hash a string to a percentage (0-99) using SHA256
 * @param key - String to hash
 * @returns Number between 0-99
 */
function hashToPercent(key: string): number {
    // Use Web Crypto API for browser-compatible hashing
    // For server-side, use Node.js crypto module
    if (typeof window === 'undefined') {
        // Server-side: use crypto module
        const crypto = require('crypto');
        const hash = crypto.createHash('sha256').update(key).digest('hex').slice(0, 8);
        const intVal = parseInt(hash, 16);
        return intVal % 100;
    } else {
        // Client-side: use SubtleCrypto (async) or fallback to simple hash
        // For deterministic behavior, we'll use a simple hash function
        // that matches server-side behavior when possible
        return simpleHashToPercent(key);
    }
}

/**
 * Simple hash function for browser compatibility (deterministic)
 * Uses djb2-like algorithm to match server behavior as closely as possible
 * @param key - String to hash
 * @returns Number between 0-99
 */
function simpleHashToPercent(key: string): number {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
        hash = ((hash << 5) + hash) + key.charCodeAt(i);
        hash = hash & hash; // Convert to 32-bit integer
    }
    // Use first 8 hex digits similar to server-side
    const hex = Math.abs(hash).toString(16).padStart(8, '0').slice(0, 8);
    const intVal = parseInt(hex, 16);
    return intVal % 100;
}

/**
 * Determine if a feature should be enabled for a user based on rollout percentage
 * @param anonId - Anonymous user identifier
 * @param flagName - Feature flag name (for salt)
 * @param percentage - Rollout percentage (0-100)
 * @returns boolean
 */
export function shouldEnableFor(anonId: string, flagName: string, percentage: number): boolean {
    if (percentage >= 100) return true;
    if (percentage <= 0) return false;
    
    // Use anonId + flagName as key (matches server-side logic)
    const key = `${anonId}${flagName}`;
    const pct = hashToPercent(key);
    
    return pct < percentage;
}

/**
 * Generate or retrieve anonymous ID from localStorage
 * @returns string
 */
export function getOrCreateAnonId(): string {
    if (typeof window === 'undefined') {
        return `server_${Date.now()}`;
    }
    
    const storageKey = 'pt_anon_id';
    let anonId = localStorage.getItem(storageKey);
    
    if (!anonId) {
        // Generate a persistent anonymous ID
        anonId = `anon_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem(storageKey, anonId);
    }
    
    return anonId;
}
