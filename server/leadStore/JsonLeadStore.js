/**
 * JsonLeadStore - JSON file-based lead storage
 * 
 * Stores leads in a local JSON file.
 * Default provider for development.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LeadStore } from './LeadStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class JsonLeadStore extends LeadStore {
    constructor(filePath = null) {
        super();
        this.filePath = filePath || path.join(__dirname, '../../leads.json');
        this._ensureFileExists();
    }

    _ensureFileExists() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
            console.log('[JsonLeadStore] Created leads file:', this.filePath);
        }
    }

    _readLeads() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('[JsonLeadStore] Error reading leads file:', err);
            return [];
        }
    }

    _writeLeads(leads) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(leads, null, 2), 'utf8');
        } catch (err) {
            console.error('[JsonLeadStore] Error writing leads file:', err);
            throw err;
        }
    }

    /**
     * Save a lead to the JSON file
     * @param {Object} lead - Lead data
     * @returns {Promise<void>}
     */
    async saveLead(lead) {
        const leads = this._readLeads();
        leads.push(lead);
        this._writeLeads(leads);
        console.log('[JsonLeadStore] Lead saved:', lead.email);
    }

    /**
     * Check if email already exists
     * @param {string} email - Email to check
     * @returns {Promise<boolean>}
     */
    async emailExists(email) {
        const leads = this._readLeads();
        return leads.some(lead => lead.email === email);
    }

    /**
     * Get all leads
     * @returns {Promise<Array>}
     */
    async getAllLeads() {
        return this._readLeads();
    }
}

export default JsonLeadStore;
