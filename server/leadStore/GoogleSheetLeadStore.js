/**
 * GoogleSheetLeadStore - Google Sheets-based lead storage
 * 
 * Stores leads in a Google Sheet for easy access and integration.
 * Requires Google Sheets API credentials via environment variables.
 * 
 * Environment variables:
 * - GSHEETS_SPREADSHEET_ID: The ID of the Google Sheet
 * - GSHEETS_CLIENT_EMAIL: Service account email
 * - GSHEETS_PRIVATE_KEY: Service account private key (with \n for newlines)
 */

import { LeadStore } from './LeadStore.js';

export class GoogleSheetLeadStore extends LeadStore {
    constructor() {
        super();
        this.spreadsheetId = process.env.GSHEETS_SPREADSHEET_ID;
        this.clientEmail = process.env.GSHEETS_CLIENT_EMAIL;
        this.privateKey = process.env.GSHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
        this.sheets = null;
        this.sheetName = 'Leads'; // Default sheet name
        
        this._validateConfig();
    }

    _validateConfig() {
        if (!this.spreadsheetId) {
            console.warn('[GoogleSheetLeadStore] GSHEETS_SPREADSHEET_ID not configured');
        }
        if (!this.clientEmail) {
            console.warn('[GoogleSheetLeadStore] GSHEETS_CLIENT_EMAIL not configured');
        }
        if (!this.privateKey) {
            console.warn('[GoogleSheetLeadStore] GSHEETS_PRIVATE_KEY not configured');
        }
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
     * Save a lead to Google Sheets
     * @param {Object} lead - Lead data
     * @returns {Promise<void>}
     */
    async saveLead(lead) {
        if (!this.spreadsheetId || !this.clientEmail || !this.privateKey) {
            console.warn('[GoogleSheetLeadStore] Not configured, skipping Google Sheets save');
            return;
        }

        try {
            const sheets = await this._getSheets();
            
            // Prepare row data
            // Columns: timestamp, email, name, source, lang, consent, ipHash, userAgent, leadMagnet, referrer
            const row = [
                lead.timestamp || new Date().toISOString(),
                lead.email || '',
                lead.name || '',
                lead.sourcePath || '',
                lead.locale || 'en',
                lead.consent ? 'TRUE' : 'FALSE',
                lead.consentTimestamp || '',
                lead.ipHash || '',
                lead.userAgent || '',
                lead.leadMagnet || '',
                lead.referrer || ''
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

            console.log('[GoogleSheetLeadStore] Lead saved to Google Sheets:', lead.email);
        } catch (err) {
            console.error('[GoogleSheetLeadStore] Error saving to Google Sheets:', err.message);
            // Don't throw - graceful degradation
        }
    }

    /**
     * Check if email already exists in Google Sheets
     * @param {string} email - Email to check
     * @returns {Promise<boolean>}
     */
    async emailExists(email) {
        if (!this.spreadsheetId || !this.clientEmail || !this.privateKey) {
            return false;
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
            return false;
        }
    }

    /**
     * Get all leads from Google Sheets
     * @returns {Promise<Array>}
     */
    async getAllLeads() {
        if (!this.spreadsheetId || !this.clientEmail || !this.privateKey) {
            return [];
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
            return [];
        }
    }
}

export default GoogleSheetLeadStore;
