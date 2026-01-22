// src/pages/admin/DiagnosticsPage.tsx
// Dev-only diagnostics page - Phase 3.1

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFeatureDiagnostics, getFeatureSummary } from '../../utils/featureDiagnostics';
import { isCompetitionMode } from '../../config/competition';
import SEO from '../../components/SEO';

// Simple analytics event cache (last 10 events)
const MAX_CACHED_EVENTS = 10;
let cachedEvents: Array<{ name: string; props?: Record<string, any>; timestamp: string }> = [];

// Intercept analytics events for diagnostics
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const originalTrackEvent = (window as any).__trackEvent;
    if (originalTrackEvent) {
        (window as any).__trackEvent = (...args: any[]) => {
            cachedEvents.push({
                name: args[0],
                props: args[1],
                timestamp: new Date().toISOString(),
            });
            if (cachedEvents.length > MAX_CACHED_EVENTS) {
                cachedEvents = cachedEvents.slice(-MAX_CACHED_EVENTS);
            }
            return originalTrackEvent(...args);
        };
    }
}

const DiagnosticsPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [persona, setPersona] = useState<string>('unknown');
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        // Phase 3.4E: Token gate check
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const expectedToken = import.meta.env.VITE_ADMIN_TOKEN;

        // In development, allow access without token for easier local testing
        if (import.meta.env.DEV || process.env.NODE_ENV === 'development') {
            // If token is provided and matches, use it; otherwise allow access in dev
            if (expectedToken && token && token === expectedToken) {
                setIsAuthorized(true);
            } else if (!expectedToken || !token) {
                // Allow access in dev if no token is required or no token provided
                setIsAuthorized(true);
            } else {
                // Token provided but doesn't match - still allow in dev but could show warning
                setIsAuthorized(true);
            }
        } else {
            // In production, require token
            if (!token || token !== expectedToken) {
                setIsAuthorized(false);
                return;
            }
            setIsAuthorized(true);
        }

        // Get persona from localStorage
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('pt_home_persona');
            if (stored) {
                setPersona(stored.replace('v1_', ''));
            }
            const globalPersona = localStorage.getItem('pt_persona_global');
            if (globalPersona) {
                setPersona(globalPersona.replace('v1_', ''));
            }
        }
    }, []);

    // Phase 3.4E: Token gate - show 404 if not authorized
    if (isAuthorized === false) {
        const isDev = process.env.NODE_ENV === 'development';
        const expectedToken = import.meta.env.VITE_ADMIN_TOKEN;
        
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        {isDev ? 'Access Restricted' : '404'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {isDev 
                            ? expectedToken 
                                ? 'This page requires an admin token. Add ?token=YOUR_TOKEN to the URL.'
                                : 'This page is protected. Set VITE_ADMIN_TOKEN in your .env file to enable access.'
                            : 'Page not found'}
                    </p>
                    {isDev && expectedToken && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Expected token starts with: {expectedToken.substring(0, 4)}...
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Show loading while checking auth
    if (isAuthorized === null) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-slate-600 dark:text-slate-400">Loading...</p>
                </div>
            </div>
        );
    }

    const diagnostics = getFeatureDiagnostics();
    const summary = getFeatureSummary();
    const competitionMode = isCompetitionMode();

    return (
        <>
            <SEO
                title="Diagnostics (Dev Only) | Prasad Tilloo"
                description="Development diagnostics page"
            />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                        🔧 Diagnostics (Dev Only)
                    </h1>

                    {/* Current State */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Current State</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Locale:</span>
                                    <span className="font-mono text-slate-900 dark:text-white">{i18n.language}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Active Persona:</span>
                                    <span className="font-mono text-slate-900 dark:text-white">{persona || 'none'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Competition Mode:</span>
                                    <span className="font-mono text-slate-900 dark:text-white">{competitionMode ? 'ON' : 'OFF'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Feature Summary</h2>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Total Features:</span>
                                    <span className="font-mono text-slate-900 dark:text-white">{summary.total}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Enabled:</span>
                                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{summary.enabled}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Promoted:</span>
                                    <span className="font-mono text-blue-600 dark:text-blue-400">{summary.promoted}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Flags Table */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Feature Flags</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-700">
                                        <th className="text-left py-2 px-4 text-slate-600 dark:text-slate-400">Feature</th>
                                        <th className="text-center py-2 px-4 text-slate-600 dark:text-slate-400">Enabled</th>
                                        <th className="text-center py-2 px-4 text-slate-600 dark:text-slate-400">Promoted</th>
                                        <th className="text-center py-2 px-4 text-slate-600 dark:text-slate-400">Accessible</th>
                                        <th className="text-center py-2 px-4 text-slate-600 dark:text-slate-400">Visible</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diagnostics.map((diag) => (
                                        <tr key={diag.key} className="border-b border-slate-100 dark:border-slate-800">
                                            <td className="py-2 px-4 font-mono text-slate-900 dark:text-white">{diag.key}</td>
                                            <td className="py-2 px-4 text-center">
                                                {diag.enabled ? '✅' : '❌'}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {diag.promoted ? '✅' : '❌'}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {diag.accessible ? '✅' : '❌'}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                {diag.visible ? '✅' : '❌'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Analytics Debug */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                            Analytics Debug (Last {cachedEvents.length} events)
                        </h2>
                        {cachedEvents.length === 0 ? (
                            <p className="text-sm text-slate-500 dark:text-slate-400">No events cached yet</p>
                        ) : (
                            <div className="space-y-2">
                                {cachedEvents.map((event, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-50 dark:bg-slate-900 rounded p-3 text-xs font-mono"
                                    >
                                        <div className="text-slate-900 dark:text-white font-semibold">{event.name}</div>
                                        <div className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                                            {event.timestamp}
                                        </div>
                                        {event.props && (
                                            <pre className="text-slate-600 dark:text-slate-400 mt-1 text-xs overflow-x-auto">
                                                {JSON.stringify(event.props, null, 2)}
                                            </pre>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DiagnosticsPage;
