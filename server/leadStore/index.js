/**
 * LeadStore Provider Factory
 * 
 * Creates the appropriate lead store based on environment configuration.
 * Includes automatic fallback to JSON storage if Google Sheets fails.
 * 
 * Environment variables:
 * - LEAD_STORE_PROVIDER: 'json' (default) or 'gsheets'
 * 
 * For Google Sheets, also configure:
 * - GSHEETS_SPREADSHEET_ID: The actual spreadsheet ID from the URL (NOT a friendly name)
 * - GSHEETS_SHEET_NAME: Sheet tab name (default: "Leads")
 * - GSHEETS_CLIENT_EMAIL: Service account email
 * - GSHEETS_PRIVATE_KEY: Service account private key (with \n, wrapped in quotes)
 */

import { JsonLeadStore } from './JsonLeadStore.js';
import { GoogleSheetLeadStore } from './GoogleSheetLeadStore.js';

/**
 * Log startup configuration for diagnostics
 */
export function logLeadStoreConfig() {
    const provider = process.env.LEAD_STORE_PROVIDER || 'json';
    
    console.log('----------------------------------------');
    console.log('[LeadStore] Configuration:');
    console.log(`  - Provider: ${provider}`);
    
    if (provider.toLowerCase() === 'gsheets' || provider.toLowerCase() === 'googlesheets' || provider.toLowerCase() === 'google_sheets') {
        const spreadsheetId = process.env.GSHEETS_SPREADSHEET_ID;
        const sheetName = process.env.GSHEETS_SHEET_NAME || 'Leads';
        const clientEmail = process.env.GSHEETS_CLIENT_EMAIL;
        const privateKey = process.env.GSHEETS_PRIVATE_KEY;
        
        console.log(`  - Spreadsheet ID: ${spreadsheetId ? spreadsheetId.substring(0, 15) + '...' : 'NOT SET'}`);
        console.log(`  - Sheet Name: ${sheetName}`);
        console.log(`  - Client Email: ${clientEmail ? 'SET' : 'NOT SET'}`);
        console.log(`  - Private Key: ${privateKey ? 'SET' : 'NOT SET'}`);
        
        // Warn about common misconfiguration
        if (spreadsheetId && spreadsheetId.includes('-') && !spreadsheetId.match(/^[a-zA-Z0-9_-]{20,}$/)) {
            console.warn('  - WARNING: Spreadsheet ID looks like a friendly name, not an actual ID!');
            console.warn('    Use the ID from the URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit');
        }
    }
    console.log('----------------------------------------');
}

/**
 * Create a lead store instance based on environment configuration
 * @returns {import('./LeadStore.js').LeadStore}
 */
export function createLeadStore() {
    const provider = process.env.LEAD_STORE_PROVIDER || 'json';
    
    switch (provider.toLowerCase()) {
        case 'gsheets':
        case 'googlesheets':
        case 'google_sheets':
            console.log('[LeadStore] Initializing Google Sheets provider');
            const gsheets = new GoogleSheetLeadStore();
            gsheets.logConfig();
            
            if (!gsheets.isConfigured) {
                console.warn('[LeadStore] Google Sheets not fully configured, will use JSON fallback');
            }
            
            return new FallbackLeadStore(gsheets, new JsonLeadStore());
            
        case 'json':
        default:
            console.log('[LeadStore] Initializing JSON file provider');
            return new JsonLeadStore();
    }
}

/**
 * FallbackLeadStore - Wraps a primary store with automatic fallback
 * 
 * If the primary store fails, automatically falls back to the secondary store.
 * Useful for Google Sheets with JSON file fallback.
 */
export class FallbackLeadStore {
    constructor(primary, fallback) {
        this.primary = primary;
        this.fallback = fallback;
        this.primaryFailed = false;
    }

    async saveLead(lead) {
        // Always try primary first (unless it's permanently failed due to config issues)
        if (!this.primaryFailed) {
            try {
                await this.primary.saveLead(lead);
                return;
            } catch (err) {
                if (err.code === 'NOT_CONFIGURED') {
                    // Permanent failure - don't retry
                    this.primaryFailed = true;
                    console.warn('[FallbackLeadStore] Primary store not configured, using fallback permanently');
                } else {
                    // Transient failure - log and use fallback this time
                    console.warn('[FallbackLeadStore] Primary store failed, using fallback:', err.message);
                }
            }
        }
        
        // Use fallback
        try {
            await this.fallback.saveLead(lead);
            console.log('[FallbackLeadStore] Lead saved via fallback store');
        } catch (fallbackErr) {
            console.error('[FallbackLeadStore] Both primary and fallback failed:', fallbackErr.message);
            throw fallbackErr;
        }
    }

    async emailExists(email) {
        if (!this.primaryFailed) {
            try {
                return await this.primary.emailExists(email);
            } catch (err) {
                if (err.code === 'NOT_CONFIGURED') {
                    this.primaryFailed = true;
                }
                console.warn('[FallbackLeadStore] Primary emailExists failed, using fallback:', err.message);
            }
        }
        
        try {
            return await this.fallback.emailExists(email);
        } catch (err) {
            console.error('[FallbackLeadStore] Both emailExists failed:', err.message);
            return false; // Graceful - allow lead even if dedupe check fails
        }
    }

    async getAllLeads() {
        if (!this.primaryFailed) {
            try {
                return await this.primary.getAllLeads();
            } catch (err) {
                if (err.code === 'NOT_CONFIGURED') {
                    this.primaryFailed = true;
                }
                console.warn('[FallbackLeadStore] Primary getAllLeads failed, using fallback:', err.message);
            }
        }
        
        try {
            return await this.fallback.getAllLeads();
        } catch (err) {
            console.error('[FallbackLeadStore] Both getAllLeads failed:', err.message);
            return [];
        }
    }
    
    /**
     * Verify access to the primary store
     * @returns {Promise<boolean>}
     */
    async verifyPrimaryAccess() {
        if (this.primary.verifyAccess) {
            return await this.primary.verifyAccess();
        }
        return true;
    }
}

/**
 * Composite lead store that saves to multiple backends
 * Useful for migration or redundancy
 */
export class CompositeLeadStore {
    constructor(stores) {
        this.stores = stores;
    }

    async saveLead(lead) {
        await Promise.all(
            this.stores.map(store => 
                store.saveLead(lead).catch(err => {
                    console.error(`[CompositeLeadStore] Error in store:`, err.message);
                })
            )
        );
    }

    async emailExists(email) {
        // Check first store that has the email
        for (const store of this.stores) {
            try {
                if (await store.emailExists(email)) {
                    return true;
                }
            } catch (err) {
                console.error(`[CompositeLeadStore] Error checking email:`, err.message);
            }
        }
        return false;
    }

    async getAllLeads() {
        // Return from first store
        try {
            return await this.stores[0].getAllLeads();
        } catch (err) {
            console.error(`[CompositeLeadStore] Error getting leads:`, err.message);
            return [];
        }
    }
}

// Re-export classes
export { JsonLeadStore } from './JsonLeadStore.js';
export { GoogleSheetLeadStore } from './GoogleSheetLeadStore.js';
export { LeadStore } from './LeadStore.js';

// Default export
export default createLeadStore;
