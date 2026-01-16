/**
 * Server utility functions for input sanitization and validation
 */

/**
 * Safe string sanitization helper
 * - Handles null/undefined by returning empty string
 * - Converts to string and trims
 * - Replaces newlines with single space
 * - Collapses multiple spaces
 * - Truncates to maxLen
 * 
 * @param {any} value - Input value to sanitize
 * @param {number} maxLen - Maximum length to truncate to
 * @returns {string} Sanitized string
 */
export function safeStr(value, maxLen) {
    if (value === null || value === undefined) {
        return '';
    }
    
    return String(value)
        .trim()
        .replace(/[\r\n]+/g, ' ')      // Replace newlines with single space
        .replace(/\s+/g, ' ')           // Collapse multiple spaces
        .substring(0, maxLen);
}

/**
 * Escape strings that could be interpreted as formulas in Google Sheets
 * Prefixes with single quote if string starts with: = + - @
 * 
 * @param {string} value - String value to escape
 * @returns {string} Escaped string safe for Sheets
 */
export function escapeSheetFormula(value) {
    if (typeof value !== 'string' || value.length === 0) {
        return value;
    }
    
    const formulaChars = ['=', '+', '-', '@'];
    if (formulaChars.includes(value.charAt(0))) {
        return "'" + value;
    }
    
    return value;
}

/**
 * Combined sanitization for Google Sheets: truncate + escape formulas
 * 
 * @param {any} value - Input value to sanitize
 * @param {number} maxLen - Maximum length to truncate to
 * @returns {string} Sanitized and escaped string
 */
export function safeSheetStr(value, maxLen) {
    const sanitized = safeStr(value, maxLen);
    return escapeSheetFormula(sanitized);
}

export default { safeStr, escapeSheetFormula, safeSheetStr };
