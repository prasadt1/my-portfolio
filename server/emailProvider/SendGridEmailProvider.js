/**
 * SendGridEmailProvider - SendGrid API-based email sending
 * 
 * Uses SendGrid's v3 API for email delivery.
 * Recommended for production use.
 * 
 * Environment variables:
 * - SENDGRID_API_KEY: SendGrid API key
 * - FROM_EMAIL: Default from address (must be verified in SendGrid)
 * - FROM_NAME: Default from name
 * - REPLY_TO_EMAIL: Reply-to address
 */

import { EmailProvider } from './EmailProvider.js';

export class SendGridEmailProvider extends EmailProvider {
    constructor() {
        super();
        this.apiKey = process.env.SENDGRID_API_KEY;
        this.fromEmail = process.env.FROM_EMAIL;
        this.fromName = process.env.FROM_NAME || 'Prasad Tilloo';
        this.replyTo = process.env.REPLY_TO_EMAIL;
        this.apiUrl = 'https://api.sendgrid.com/v3/mail/send';
    }

    isConfigured() {
        return !!(this.apiKey && this.fromEmail);
    }

    getProviderName() {
        return 'SendGrid API';
    }

    /**
     * Send an email via SendGrid API
     * @param {import('./EmailProvider.js').EmailOptions} options
     * @returns {Promise<import('./EmailProvider.js').SendResult>}
     */
    async send(options) {
        if (!this.isConfigured()) {
            console.warn('[SendGridEmailProvider] Not configured, skipping email send');
            return { success: false, error: 'SendGrid not configured' };
        }

        try {
            const payload = {
                personalizations: [{
                    to: [{ email: options.to }]
                }],
                from: {
                    email: options.from || this.fromEmail,
                    name: this.fromName
                },
                subject: options.subject,
                content: [
                    ...(options.text ? [{ type: 'text/plain', value: options.text }] : []),
                    { type: 'text/html', value: options.html }
                ]
            };

            // Add reply-to if specified
            if (options.replyTo || this.replyTo) {
                payload.reply_to = { email: options.replyTo || this.replyTo };
            }

            // Add attachments if any
            if (options.attachments && options.attachments.length > 0) {
                payload.attachments = options.attachments.map(att => ({
                    content: att.content.toString('base64'),
                    filename: att.filename,
                    type: att.contentType,
                    disposition: 'attachment'
                }));
            }

            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`SendGrid API error: ${response.status} - ${errorBody}`);
            }

            // SendGrid returns 202 Accepted on success
            const messageId = response.headers.get('x-message-id') || 'sent';
            
            console.log('[SendGridEmailProvider] Email sent:', messageId);
            
            return {
                success: true,
                messageId
            };
        } catch (err) {
            console.error('[SendGridEmailProvider] Send failed:', err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }
}

export default SendGridEmailProvider;
