import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { AnalyticsEvent, UserTraits } from '../types/analytics';
import { trackEvent as trackEventWithAttribution } from '../services/analytics';
import { getAttributionSnapshot } from '../utils/attribution';
import i18n from '../i18n';

interface AnalyticsContextType {
    trackEvent: (event: AnalyticsEvent) => void;
    identifyUser: (userId: string, traits?: UserTraits) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within an AnalyticsProvider');
    }
    return context;
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [sessionId, setSessionId] = useState<string>('');

    useEffect(() => {
        // Generate session ID if not exists
        let sid = sessionStorage.getItem('analytics_session_id');
        if (!sid) {
            sid = Math.random().toString(36).substring(2, 15);
            sessionStorage.setItem('analytics_session_id', sid);
        }
        setSessionId(sid);
        
        // Initialize attribution snapshot on app mount (Phase 3.0)
        // This ensures attribution is captured even before any analytics events fire
        if (typeof window !== 'undefined') {
            getAttributionSnapshot(i18n.language || 'en');
        }
    }, []);

    const trackEvent = (event: AnalyticsEvent) => {
        // Use attribution-aware trackEvent (Phase 3.0)
        const props = 'properties' in event ? event.properties : undefined;
        trackEventWithAttribution(event.name, props);
        
        // Get attribution for logging (Phase 3.0)
        const attribution = typeof window !== 'undefined' 
            ? getAttributionSnapshot(i18n.language || 'en')
            : null;
        
        // Also log for backwards compatibility with existing console logs
        // Include attribution in console log for debugging (Phase 3.0)
        const eventData = {
            eventName: event.name,
            properties: props,
            attribution: attribution ? {
                utm_source: attribution.utm_source,
                utm_medium: attribution.utm_medium,
                utm_campaign: attribution.utm_campaign,
                landingPath: attribution.landingPath,
                currentPath: attribution.currentPath,
            } : undefined,
            timestamp: new Date().toISOString(),
            path: window.location.pathname,
            sessionId
        };
        console.log('📊 Analytics Event:', eventData);

        // Mock: scoring lead
        if (event.name === 'download_case_study' || event.name === 'calculate_roi') {
            console.log('🔥 Lead Score Increased +10');
        }
    };

    const identifyUser = (userId: string, traits?: UserTraits) => {
        console.log('👤 Identify User:', { userId, traits });
    };

    // Track Page Views (now uses attribution-aware tracking)
    useEffect(() => {
        trackEvent({ name: 'page_view', properties: { path: location.pathname } });
    }, [location]);

    return (
        <AnalyticsContext.Provider value={{ trackEvent, identifyUser }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
