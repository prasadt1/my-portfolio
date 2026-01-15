/**
 * EmailProvider Factory
 * 
 * Creates the appropriate email provider based on environment configuration.
 * 
 * Environment variables:
 * - EMAIL_PROVIDER: 'smtp' (default for dev) or 'sendgrid_api' (recommended for prod)
 * 
 * For SMTP, also configure:
 * - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL
 * 
 * For SendGrid API, also configure:
 * - SENDGRID_API_KEY, FROM_EMAIL
 */

import { SmtpEmailProvider } from './SmtpEmailProvider.js';
import { SendGridEmailProvider } from './SendGridEmailProvider.js';

/**
 * Create an email provider instance based on environment configuration
 * @returns {import('./EmailProvider.js').EmailProvider}
 */
export function createEmailProvider() {
    const provider = process.env.EMAIL_PROVIDER || 'smtp';
    
    console.log(`[EmailProvider] Using provider: ${provider}`);
    
    switch (provider.toLowerCase()) {
        case 'sendgrid':
        case 'sendgrid_api':
            console.log('[EmailProvider] Initializing SendGrid API provider');
            return new SendGridEmailProvider();
            
        case 'smtp':
        case 'gmail':
        default:
            console.log('[EmailProvider] Initializing SMTP provider');
            return new SmtpEmailProvider();
    }
}

/**
 * Null email provider for when email is not configured
 * Logs instead of sending
 */
export class NullEmailProvider {
    isConfigured() {
        return false;
    }

    getProviderName() {
        return 'Null (logging only)';
    }

    async send(options) {
        console.log('[NullEmailProvider] Email would be sent to:', options.to);
        console.log('[NullEmailProvider] Subject:', options.subject);
        return { success: true, messageId: 'null-provider' };
    }
}

export { SmtpEmailProvider } from './SmtpEmailProvider.js';
export { SendGridEmailProvider } from './SendGridEmailProvider.js';
export { EmailProvider } from './EmailProvider.js';

export default createEmailProvider;
