/**
 * EmailProvider Interface
 * 
 * Abstract interface for email sending providers.
 */

/**
 * @typedef {Object} EmailOptions
 * @property {string} to - Recipient email
 * @property {string} subject - Email subject
 * @property {string} html - HTML content
 * @property {string} [text] - Plain text content (optional)
 * @property {string} [from] - From address (uses default if not provided)
 * @property {string} [replyTo] - Reply-to address
 * @property {Array<{filename: string, content: Buffer, contentType: string}>} [attachments] - File attachments
 */

/**
 * @typedef {Object} SendResult
 * @property {boolean} success - Whether send was successful
 * @property {string} [messageId] - Message ID if successful
 * @property {string} [error] - Error message if failed
 */

/**
 * EmailProvider base class
 * @abstract
 */
export class EmailProvider {
    /**
     * Send an email
     * @param {EmailOptions} options - Email options
     * @returns {Promise<SendResult>}
     * @abstract
     */
    async send(options) {
        throw new Error('send must be implemented by subclass');
    }

    /**
     * Check if provider is configured and ready
     * @returns {boolean}
     */
    isConfigured() {
        return false;
    }

    /**
     * Get provider name for logging
     * @returns {string}
     */
    getProviderName() {
        return 'BaseEmailProvider';
    }
}

export default EmailProvider;
