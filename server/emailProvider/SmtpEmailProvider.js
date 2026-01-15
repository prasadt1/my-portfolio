/**
 * SmtpEmailProvider - SMTP-based email sending
 * 
 * Uses nodemailer for SMTP delivery.
 * Suitable for Gmail (with App Password), SendGrid SMTP, or any SMTP server.
 * 
 * Environment variables:
 * - SMTP_HOST: SMTP server host (e.g., smtp.gmail.com)
 * - SMTP_PORT: SMTP port (default: 587)
 * - SMTP_SECURE: Use SSL (default: false for STARTTLS)
 * - SMTP_USER: SMTP username
 * - SMTP_PASS: SMTP password (App Password for Gmail)
 * - FROM_EMAIL: Default from address
 * - FROM_NAME: Default from name
 * - REPLY_TO_EMAIL: Reply-to address
 */

import nodemailer from 'nodemailer';
import { EmailProvider } from './EmailProvider.js';

export class SmtpEmailProvider extends EmailProvider {
    constructor() {
        super();
        this.host = process.env.SMTP_HOST;
        this.port = parseInt(process.env.SMTP_PORT || '587', 10);
        this.secure = process.env.SMTP_SECURE === 'true';
        this.user = process.env.SMTP_USER;
        this.pass = process.env.SMTP_PASS;
        this.fromEmail = process.env.FROM_EMAIL;
        this.fromName = process.env.FROM_NAME || 'Prasad Tilloo';
        this.replyTo = process.env.REPLY_TO_EMAIL;
        
        this.transporter = null;
    }

    isConfigured() {
        return !!(this.host && this.user && this.pass && this.fromEmail);
    }

    getProviderName() {
        return `SMTP (${this.host || 'not configured'})`;
    }

    _createTransporter() {
        if (this.transporter) return this.transporter;

        const isGmail = this.host === 'smtp.gmail.com';
        
        const config = {
            host: this.host,
            port: this.port,
            secure: this.secure,
            auth: {
                user: this.user,
                pass: this.pass,
            },
            ...(isGmail && {
                requireTLS: true,
                tls: {
                    rejectUnauthorized: false
                }
            })
        };

        this.transporter = nodemailer.createTransport(config);
        
        // Verify connection
        this.transporter.verify().catch(err => {
            console.error('[SmtpEmailProvider] Connection verification failed:', err.message);
        });

        return this.transporter;
    }

    /**
     * Send an email via SMTP
     * @param {import('./EmailProvider.js').EmailOptions} options
     * @returns {Promise<import('./EmailProvider.js').SendResult>}
     */
    async send(options) {
        if (!this.isConfigured()) {
            console.warn('[SmtpEmailProvider] Not configured, skipping email send');
            return { success: false, error: 'SMTP not configured' };
        }

        try {
            const transporter = this._createTransporter();

            const mailOptions = {
                from: options.from || `"${this.fromName}" <${this.fromEmail}>`,
                to: options.to,
                subject: options.subject,
                html: options.html,
                ...(options.text && { text: options.text }),
                ...(options.replyTo || this.replyTo) && { replyTo: options.replyTo || this.replyTo },
                ...(options.attachments && { attachments: options.attachments })
            };

            const info = await transporter.sendMail(mailOptions);
            
            console.log('[SmtpEmailProvider] Email sent:', info.messageId);
            
            return {
                success: true,
                messageId: info.messageId
            };
        } catch (err) {
            console.error('[SmtpEmailProvider] Send failed:', err.message);
            return {
                success: false,
                error: err.message
            };
        }
    }
}

export default SmtpEmailProvider;
