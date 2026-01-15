/**
 * Lightweight Analytics Event Tracking Utility
 * 
 * Logs events to console in development and optionally posts to /api/events in production.
 * GDPR compliant - no PII collection.
 */

interface EventProps {
  [key: string]: string | number | boolean | undefined;
}

interface AnalyticsEvent {
  name: string;
  props?: EventProps;
  timestamp: string;
  url: string;
  userAgent?: string;
}

const isDev = import.meta.env.DEV;
const API_ENDPOINT = '/api/events';

/**
 * Track an analytics event
 * @param name - Event name (e.g., 'leadmagnet_view', 'cta_click')
 * @param props - Optional event properties
 */
export const trackEvent = async (name: string, props?: EventProps): Promise<void> => {
  const event: AnalyticsEvent = {
    name,
    props,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // Always log to console in development
  if (isDev) {
    console.log('[Analytics]', name, props || '');
  }

  // Also send to gtag if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      event_category: props?.category || 'engagement',
      event_label: props?.label || name,
      ...props,
    });
  }

  // In production, optionally POST to server
  if (!isDev) {
    try {
      // Fire and forget - don't await to avoid blocking UI
      fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).catch(() => {
        // Silently fail - analytics should never break the app
      });
    } catch {
      // Silently fail
    }
  }
};

// Predefined event names for type safety and consistency
export const AnalyticsEvents = {
  // Lead Magnet Events
  LEADMAGNET_VIEW: 'leadmagnet_view',
  LEADMAGNET_SUBMIT: 'leadmagnet_submit',
  LEADMAGNET_SUBMIT_SUCCESS: 'leadmagnet_submit_success',
  LEADMAGNET_SUBMIT_ERROR: 'leadmagnet_submit_error',
  
  // CTA Events
  CTA_ARCH_REVIEW_CLICK: 'cta_arch_review_click',
  CTA_BOOK_CALL_CLICK: 'cta_book_call_click',
  CTA_MAILTO_CLICK: 'cta_mailto_click',
  CTA_VIDEO_CLICK: 'cta_video_click',
  
  // Page Events
  PAGE_VIEW: 'page_view',
  
  // Form Events
  FORM_START: 'form_start',
  FORM_FIELD_FOCUS: 'form_field_focus',
  CONSENT_GIVEN: 'consent_given',
} as const;

export type AnalyticsEventName = typeof AnalyticsEvents[keyof typeof AnalyticsEvents];

export default trackEvent;
