/**
 * GoogleSheetLeadStore - Google Sheets-based lead storage
 * 
 * Stores leads in a Google Sheet for easy access and integration.
 * Requires Google Sheets API credentials via environment variables.
 * 
 * Environment variables:
 * - GSHEETS_SPREADSHEET_ID: The actual spreadsheet ID from the Google Sheets URL
 *   Example URL: https://docs.google.com/spreadsheets/d/1haP11eMsvEVjbLsJYUD7MlalBYxmUathYvXUHe7JsKY/edit
 *   The ID is: 1haP11eMsvEVjbLsJYUD7MlalBYxmUathYvXUHe7JsKY
 *   NOTE: This must be the actual ID, NOT a friendly name like "my-leads"
 * - GSHEETS_SHEET_NAME: Name of the sheet tab (default: "Leads")
 * - GSHEETS_CLIENT_EMAIL: Service account email
 * - GSHEETS_PRIVATE_KEY: Service account private key (with \n for newlines, wrapped in quotes)
 */

import { LeadStore } from './LeadStore.js';
import { safeSheetStr } from '../utils.js';

export class GoogleSheetLeadStore extends LeadStore {
    constructor() {
        super();
        this.spreadsheetId = process.env.GSHEETS_SPREADSHEET_ID;
        this.clientEmail = process.env.GSHEETS_CLIENT_EMAIL;
        // Handle both escaped \n (from .env files) and literal newlines
        this.privateKey = process.env.GSHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
        this.sheets = null;
        this.sheetName = process.env.GSHEETS_SHEET_NAME || 'Leads';
        this.isConfigured = false;
        
        this._validateConfig();
    }

    /**
     * Validate configuration and log diagnostic information
     * @returns {boolean} True if configuration is valid
     */
    _validateConfig() {
        const issues = [];
        
        if (!this.spreadsheetId) {
            issues.push('GSHEETS_SPREADSHEET_ID not configured');
        } else if (this.spreadsheetId.includes('-') && !this.spreadsheetId.match(/^[a-zA-Z0-9_-]{20,}$/)) {
            // Warn if ID looks like a friendly name (contains dashes but doesn't match spreadsheet ID pattern)
            console.warn('[GoogleSheetLeadStore] WARNING: GSHEETS_SPREADSHEET_ID may be incorrect.');
            console.warn('[GoogleSheetLeadStore] It should be the ID from the URL, not a friendly name.');
            console.warn('[GoogleSheetLeadStore] Example: https://docs.google.com/spreadsheets/d/1haP11eMsvEVjbLsJYUD7MlalBYxmUathYvXUHe7JsKY/edit');
            console.warn('[GoogleSheetLeadStore] Current value:', this.spreadsheetId);
        }
        
        if (!this.clientEmail) {
            issues.push('GSHEETS_CLIENT_EMAIL not configured');
        }
        
        if (!this.privateKey) {
            issues.push('GSHEETS_PRIVATE_KEY not configured');
        } else if (!this.privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
            issues.push('GSHEETS_PRIVATE_KEY appears malformed (missing BEGIN marker)');
        }
        
        if (issues.length > 0) {
            issues.forEach(issue => console.warn(`[GoogleSheetLeadStore] ${issue}`));
            this.isConfigured = false;
        } else {
            this.isConfigured = true;
        }
        
        return this.isConfigured;
    }
    
    /**
     * Log configuration status for startup diagnostics
     */
    logConfig() {
        console.log('[GoogleSheetLeadStore] Configuration:');
        console.log(`  - Spreadsheet ID: ${this.spreadsheetId ? this.spreadsheetId.substring(0, 10) + '...' : 'NOT SET'}`);
        console.log(`  - Sheet Name: ${this.sheetName}`);
        console.log(`  - Client Email: ${this.clientEmail ? 'SET (' + this.clientEmail.substring(0, 20) + '...)' : 'NOT SET'}`);
        console.log(`  - Private Key: ${this.privateKey ? 'SET (length: ' + this.privateKey.length + ')' : 'NOT SET'}`);
        console.log(`  - Configured: ${this.isConfigured ? 'YES' : 'NO'}`);
    }

    async _getSheets() {
        if (this.sheets) return this.sheets;

        try {
            const { google } = await import('googleapis');
            
            const auth = new google.auth.GoogleAuth({
                credentials: {
                    client_email: this.clientEmail,
                    private_key: this.privateKey,
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            this.sheets = google.sheets({ version: 'v4', auth });
            return this.sheets;
        } catch (err) {
            console.error('[GoogleSheetLeadStore] Failed to initialize Google Sheets API:', err.message);
            throw err;
        }
    }
    
    /**
     * Verify that the sheet exists and is accessible
     * @returns {Promise<boolean>}
     */
    async verifyAccess() {
        if (!this.isConfigured) {
            return false;
        }
        
        try {
            const sheets = await this._getSheets();
            
            // Try to get spreadsheet metadata to verify access
            const response = await sheets.spreadsheets.get({
                spreadsheetId: this.spreadsheetId,
                fields: 'sheets.properties.title'
            });
            
            const sheetNames = response.data.sheets?.map(s => s.properties.title) || [];
            
            if (!sheetNames.includes(this.sheetName)) {
                console.warn(`[GoogleSheetLeadStore] Sheet "${this.sheetName}" not found in spreadsheet.`);
                console.warn(`[GoogleSheetLeadStore] Available sheets: ${sheetNames.join(', ')}`);
                console.warn(`[GoogleSheetLeadStore] Please create a sheet named "${this.sheetName}" or set GSHEETS_SHEET_NAME env var.`);
                return false;
            }
            
            console.log(`[GoogleSheetLeadStore] ✓ Verified access to spreadsheet, sheet "${this.sheetName}" found.`);
            return true;
        } catch (err) {
            console.error('[GoogleSheetLeadStore] Failed to verify access:', err.message);
            if (err.message.includes('not found')) {
                console.error('[GoogleSheetLeadStore] The spreadsheet ID may be incorrect.');
                console.error('[GoogleSheetLeadStore] Make sure GSHEETS_SPREADSHEET_ID is the ID from the URL, not a name.');
            } else if (err.message.includes('permission')) {
                console.error('[GoogleSheetLeadStore] Permission denied. Make sure you shared the spreadsheet with:');
                console.error(`[GoogleSheetLeadStore]   ${this.clientEmail}`);
            }
            return false;
        }
    }

    /**
     * Save a lead to Google Sheets
     * Defense-in-depth: sanitizes all fields before writing to prevent
     * PII overflow and formula injection attacks.
     * 
     * @param {Object} lead - Lead data
     * @returns {Promise<void>}
     * @throws {Error} If save fails (allows caller to handle fallback)
     */
    async saveLead(lead) {
        if (!this.isConfigured) {
            const error = new Error('Google Sheets not configured');
            error.code = 'NOT_CONFIGURED';
            throw error;
        }

        try {
            const sheets = await this._getSheets();
            
            // Defense-in-depth: Sanitize all fields with truncation and formula injection prevention
            // Even if /api/lead already sanitized, we enforce limits here too
            const row = [
                safeSheetStr(lead.timestamp || new Date().toISOString(), 40),
                safeSheetStr(lead.email, 160),
                safeSheetStr(lead.name, 120),
                safeSheetStr(lead.sourcePath, 200),
                safeSheetStr(lead.locale || 'en', 10),
                lead.consent ? 'TRUE' : 'FALSE',
                safeSheetStr(lead.consentTimestamp, 40),
                safeSheetStr(lead.ipHash, 64),
                safeSheetStr(lead.userAgent, 250),
                safeSheetStr(lead.leadMagnet, 80),
                safeSheetStr(lead.referrer, 300)
            ];

            await sheets.spreadsheets.values.append({
                spreadsheetId: this.spreadsheetId,
                range: `${this.sheetName}!A:K`,
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                requestBody: {
                    values: [row]
                }
            });

            // Log success without sensitive data (truncate email for privacy in logs)
            const maskedEmail = lead.email ? lead.email.substring(0, 3) + '***' : 'unknown';
            console.log('[GoogleSheetLeadStore] Lead saved to Google Sheets:', maskedEmail);
        } catch (err) {
            console.error('[GoogleSheetLeadStore] Error saving to Google Sheets:', err.message);
            
            // Add helpful error messages
            if (err.message.includes('not found')) {
                console.error('[GoogleSheetLeadStore] Spreadsheet or sheet not found. Check:');
                console.error('[GoogleSheetLeadStore]   1. GSHEETS_SPREADSHEET_ID is correct (from URL)');
                console.error(`[GoogleSheetLeadStore]   2. Sheet tab "${this.sheetName}" exists`);
            } else if (err.message.includes('permission') || err.message.includes('403')) {
                console.error('[GoogleSheetLeadStore] Permission denied. Ensure:');
                console.error(`[GoogleSheetLeadStore]   1. Spreadsheet is shared with: ${this.clientEmail}`);
                console.error('[GoogleSheetLeadStore]   2. Service account has Editor access');
            }
            
            // Re-throw to allow fallback handling
            throw err;
        }
    }

    /**
     * Check if email already exists in Google Sheets
     * @param {string} email - Email to check
     * @returns {Promise<boolean>}
     * @throws {Error} If check fails (allows caller to handle fallback)
     */
    async emailExists(email) {
        if (!this.isConfigured) {
            const error = new Error('Google Sheets not configured');
            error.code = 'NOT_CONFIGURED';
            throw error;
        }

        try {
            const sheets = await this._getSheets();
            
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `${this.sheetName}!B:B`, // Email column
            });

            const rows = response.data.values || [];
            return rows.some(row => row[0] === email);
        } catch (err) {
            console.error('[GoogleSheetLeadStore] Error checking email:', err.message);
            // Re-throw to allow fallback handling
            throw err;
        }
    }

    /**
     * Get all leads from Google Sheets
     * @returns {Promise<Array>}
     * @throws {Error} If fetch fails (allows caller to handle fallback)
     */
    async getAllLeads() {
        if (!this.isConfigured) {
            const error = new Error('Google Sheets not configured');
            error.code = 'NOT_CONFIGURED';
            throw error;
        }

        try {
            const sheets = await this._getSheets();
            
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: `${this.sheetName}!A:K`,
            });

            const rows = response.data.values || [];
            
            // Skip header row if present
            const dataRows = rows.length > 0 && rows[0][0] === 'timestamp' ? rows.slice(1) : rows;
            
            return dataRows.map(row => ({
                timestamp: row[0] || '',
                email: row[1] || '',
                name: row[2] || '',
                sourcePath: row[3] || '',
                locale: row[4] || 'en',
                consent: row[5] === 'TRUE',
                consentTimestamp: row[6] || '',
                ipHash: row[7] || '',
                userAgent: row[8] || '',
                leadMagnet: row[9] || '',
                referrer: row[10] || ''
            }));
        } catch (err) {
            console.error('[GoogleSheetLeadStore] Error fetching leads:', err.message);
            // Re-throw to allow fallback handling
            throw err;
        }
    }
}

export default GoogleSheetLeadStore;
