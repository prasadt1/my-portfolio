/**
 * LeadStore Interface
 * 
 * Abstract interface for lead storage providers.
 * Implement this interface to add new storage backends.
 */

/**
 * @typedef {Object} Lead
 * @property {string} email - Lead email address
 * @property {string} [name] - Optional name
 * @property {string} locale - Language preference (en/de)
 * @property {string} sourcePath - Page where lead was captured
 * @property {string} leadMagnet - Lead magnet identifier
 * @property {string} timestamp - ISO timestamp
 * @property {boolean} consent - GDPR consent given
 * @property {string} [consentTimestamp] - When consent was given
 * @property {string} [ipHash] - Hashed IP for fraud prevention
 * @property {string} [userAgent] - Browser user agent
 * @property {string} [referrer] - HTTP referrer
 */

/**
 * LeadStore base class
 * @abstract
 */
export class LeadStore {
    /**
     * Save a lead to the storage backend
     * @param {Lead} lead - The lead data to save
     * @returns {Promise<void>}
     * @abstract
     */
    async saveLead(lead) {
        throw new Error('saveLead must be implemented by subclass');
    }

    /**
     * Check if email already exists
     * @param {string} email - Email to check
     * @returns {Promise<boolean>}
     */
    async emailExists(email) {
        throw new Error('emailExists must be implemented by subclass');
    }

    /**
     * Get all leads (for admin/export)
     * @returns {Promise<Lead[]>}
     */
    async getAllLeads() {
        throw new Error('getAllLeads must be implemented by subclass');
    }
}

export default LeadStore;
