import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { AnalyticsEvent, UserTraits } from '../types/analytics';

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
    }, []);

    const trackEvent = (event: AnalyticsEvent) => {
        const eventData = {
            eventName: event.name,
            properties: 'properties' in event ? event.properties : undefined,
            timestamp: new Date().toISOString(),
            path: window.location.pathname,
            sessionId
        };

        // In a real app, send to Segment/Mixpanel/Google Analytics
        console.log('📊 Analytics Event:', eventData);

        // Mock: scoring lead
        if (event.name === 'download_case_study' || event.name === 'calculate_roi') {
            console.log('🔥 Lead Score Increased +10');
        }
    };

    const identifyUser = (userId: string, traits?: UserTraits) => {
        console.log('👤 Identify User:', { userId, traits });
    };

    // Track Page Views
    useEffect(() => {
        trackEvent({ name: 'page_view', properties: { path: location.pathname } });
    }, [location]);

    return (
        <AnalyticsContext.Provider value={{ trackEvent, identifyUser }}>
            {children}
        </AnalyticsContext.Provider>
    );
};
