/**
 * JsonToolRequestStore - JSON file-based tool request storage
 * Phase 5 Enhanced: Project Similarity Matcher
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class JsonToolRequestStore {
    constructor(filePath = null) {
        this.filePath = filePath || path.join(__dirname, '../tool-requests.json');
        this._ensureFileExists();
    }

    _ensureFileExists() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
            if (process.env.NODE_ENV !== 'test') {
                console.log('[JsonToolRequestStore] Created tool-requests file:', this.filePath);
            }
        }
    }

    _read() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('[JsonToolRequestStore] Error reading:', err.message);
            return [];
        }
    }

    _write(records) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(records, null, 2), 'utf8');
        } catch (err) {
            console.error('[JsonToolRequestStore] Error writing:', err.message);
            throw err;
        }
    }

    /**
     * Save a tool request (e.g. project_similarity)
     * @param {Object} req - { timestamp, toolKey, email, locale, persona, queryText, topMatchSlug, topMatchScore, attribution }
     */
    async saveToolRequest(req) {
        const records = this._read();
        records.push({ ...req, savedAt: new Date().toISOString() });
        this._write(records);
        if (process.env.NODE_ENV === 'development') {
            console.log('[JsonToolRequestStore] Tool request saved:', req.toolKey, req.email?.substring(0, 3) + '***');
        }
    }
}

export default JsonToolRequestStore;
