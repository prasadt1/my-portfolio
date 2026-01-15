/**
 * LeadStore Provider Factory
 * 
 * Creates the appropriate lead store based on environment configuration.
 * 
 * Environment variables:
 * - LEAD_STORE_PROVIDER: 'json' (default) or 'gsheets'
 * 
 * For Google Sheets, also configure:
 * - GSHEETS_SPREADSHEET_ID
 * - GSHEETS_CLIENT_EMAIL
 * - GSHEETS_PRIVATE_KEY
 */

import { JsonLeadStore } from './JsonLeadStore.js';
import { GoogleSheetLeadStore } from './GoogleSheetLeadStore.js';

/**
 * Create a lead store instance based on environment configuration
 * @returns {import('./LeadStore.js').LeadStore}
 */
export function createLeadStore() {
    const provider = process.env.LEAD_STORE_PROVIDER || 'json';
    
    console.log(`[LeadStore] Using provider: ${provider}`);
    
    switch (provider.toLowerCase()) {
        case 'gsheets':
        case 'googlesheets':
        case 'google_sheets':
            console.log('[LeadStore] Initializing Google Sheets provider');
            return new GoogleSheetLeadStore();
            
        case 'json':
        default:
            console.log('[LeadStore] Initializing JSON file provider');
            return new JsonLeadStore();
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

export { JsonLeadStore } from './JsonLeadStore.js';
export { GoogleSheetLeadStore } from './GoogleSheetLeadStore.js';
export { LeadStore } from './LeadStore.js';

export default createLeadStore;
