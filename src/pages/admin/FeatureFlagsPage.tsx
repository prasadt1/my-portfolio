/**
 * Feature Flags Admin Page (Dev-Only)
 * 
 * Simplified UI for viewing and testing feature flags.
 */

import React, { useState, useEffect } from 'react';
import { useFeatureFlagsContext } from '../../context/FeatureFlagsProvider';
import { RefreshCw, Info, Hash, Server, Monitor } from 'lucide-react';

const FeatureFlagsPage: React.FC = () => {
    const { flags, loading, anonId, refresh } = useFeatureFlagsContext();
    const [testAnonId, setTestAnonId] = useState('');
    const [testRolloutPercent, setTestRolloutPercent] = useState(10);
    
    const flagNames = [
        'proposal_review',
        'risk_radar',
        'risk_radar_export',
        'arch_generator',
        'exec_modal',
        'sticky_cta',
    ];

    // Load dev overrides from localStorage (don't call refresh, just read localStorage)
    const [devOverrides, setDevOverrides] = useState<Record<string, boolean>>(() => {
        if (typeof window === 'undefined') return {};
        try {
            const stored = localStorage.getItem('__DEV_FEATURE_OVERRIDES__');
            return stored ? JSON.parse(stored) : {};
        } catch {
            return {};
        }
    });

    // Update override without refreshing (to prevent reset bug)
    const updateDevOverride = (flagName: string, enabled: boolean | null) => {
        const newOverrides = { ...devOverrides };
        
        if (enabled === null) {
            // Clear override
            delete newOverrides[flagName];
        } else {
            // Set override
            newOverrides[flagName] = enabled;
        }
        
        setDevOverrides(newOverrides);
        
        if (typeof window !== 'undefined') {
            // Update localStorage and window object
            if (Object.keys(newOverrides).length === 0) {
                localStorage.removeItem('__DEV_FEATURE_OVERRIDES__');
                delete (window as any).__DEV_FEATURE_OVERRIDES__;
            } else {
                localStorage.setItem('__DEV_FEATURE_OVERRIDES__', JSON.stringify(newOverrides));
                (window as any).__DEV_FEATURE_OVERRIDES__ = newOverrides;
            }
        }
    };

    // Calculate rollout for test anon ID
    const calculateRollout = (flagName: string, percentage: number): boolean => {
        if (!testAnonId || percentage <= 0) return false;
        if (percentage >= 100) return true;
        
        const key = `${testAnonId}${flagName.toUpperCase()}`;
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = ((hash << 5) - hash) + key.charCodeAt(i);
            hash = hash & hash;
        }
        const pct = Math.abs(hash) % 100;
        return pct < percentage;
    };

    // Production check
    if (import.meta.env.PROD) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        Admin Page Not Available
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        This page is only available in development mode.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Feature Flags Admin
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        View current flags from server and override locally for testing.
                    </p>
                </div>

                {/* Anon ID & Refresh */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-6 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2">Anon ID:</span>
                        <code className="text-sm text-slate-900 dark:text-white font-mono">{anonId}</code>
                    </div>
                    <button
                        onClick={() => refresh()}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                        Refresh from Server
                    </button>
                </div>

                {/* Feature Flags List */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-6">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Feature Flags
                        </h2>
                    </div>
                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                        {flagNames.map((flagName) => {
                            const serverFlag = flags[flagName];
                            const hasOverride = flagName in devOverrides;
                            const serverEnabled = serverFlag?.enabled || false;
                            const overrideValue = hasOverride ? devOverrides[flagName] : null;
                            const effectiveEnabled = hasOverride ? overrideValue : serverEnabled;
                            
                            return (
                                <div key={flagName} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        {/* Left: Flag name and status */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <code className="text-base font-mono font-semibold text-slate-900 dark:text-white">
                                                    {flagName}
                                                </code>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    effectiveEnabled
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                                }`}>
                                                    {effectiveEnabled ? 'ON' : 'OFF'}
                                                </span>
                                            </div>
                                            
                                            {/* Server value indicator */}
                                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Server size={12} />
                                                    <span>Server: <strong className={serverEnabled ? 'text-emerald-600' : 'text-slate-500'}>{serverEnabled ? 'ON' : 'OFF'}</strong></span>
                                                    {serverFlag?.reason && (
                                                        <span className="text-slate-400">({serverFlag.reason})</span>
                                                    )}
                                                </div>
                                                {hasOverride && (
                                                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                                                        <Monitor size={12} />
                                                        <span>Override: <strong>{overrideValue ? 'ON' : 'OFF'}</strong></span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Right: Toggle buttons */}
                                        <div className="flex items-center gap-2 ml-6">
                                            <button
                                                onClick={() => updateDevOverride(flagName, true)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    hasOverride && overrideValue === true
                                                        ? 'bg-emerald-600 text-white shadow-md'
                                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-400'
                                                }`}
                                            >
                                                Enable
                                            </button>
                                            <button
                                                onClick={() => updateDevOverride(flagName, false)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    hasOverride && overrideValue === false
                                                        ? 'bg-red-600 text-white shadow-md'
                                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400'
                                                }`}
                                            >
                                                Disable
                                            </button>
                                            {hasOverride && (
                                                <button
                                                    onClick={() => updateDevOverride(flagName, null)}
                                                    className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                                    title="Clear override (use server value)"
                                                >
                                                    Use Server
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Rollout Simulator */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <Hash size={18} />
                        Rollout Simulator
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Test deterministic rollout: Enter an anon ID and percentage.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Test Anonymous ID
                            </label>
                            <input
                                type="text"
                                value={testAnonId}
                                onChange={(e) => setTestAnonId(e.target.value)}
                                placeholder="e.g., test-user-123"
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Percentage (0-100)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={testRolloutPercent}
                                onChange={(e) => setTestRolloutPercent(parseInt(e.target.value) || 0)}
                                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {testAnonId && (
                        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {flagNames.map((flagName) => {
                                    const enabled = calculateRollout(flagName, testRolloutPercent);
                                    return (
                                        <div key={flagName} className="flex items-center justify-between text-sm p-2 bg-white dark:bg-slate-800 rounded">
                                            <code className="font-mono text-xs text-slate-700 dark:text-slate-300">{flagName}</code>
                                            <span className={`font-medium ${enabled ? 'text-emerald-600' : 'text-slate-500'}`}>
                                                {enabled ? '✓ ON' : '✗ OFF'}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <Info className="text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" size={18} />
                        <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1">
                            <p><strong>Server value:</strong> Current flag state from server (from <code className="bg-white/50 px-1 rounded">.env.local</code>)</p>
                            <p><strong>Override:</strong> Local browser override (stored in <code className="bg-white/50 px-1 rounded">localStorage</code>). Click "Use Server" to clear.</p>
                            <p><strong>Current Status:</strong> Shows what's actually active (override takes precedence over server).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureFlagsPage;
