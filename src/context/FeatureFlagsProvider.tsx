/**
 * Feature Flags Provider
 * 
 * Fetches feature flags from server and provides them via React Context.
 * Supports dev overrides via window.__DEV_FEATURE_OVERRIDES__
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getOrCreateAnonId } from '../utils/rollout';
import { trackEvent } from '../services/analytics';
import i18n from '../i18n';

export interface FeatureFlagValue {
    enabled: boolean;
    reason: 'env' | 'rollout' | 'explicit' | 'dev-override';
    percentage?: number;
}

export interface FeatureFlags {
    [key: string]: FeatureFlagValue;
}

interface FeatureFlagsContextType {
    flags: FeatureFlags;
    loading: boolean;
    anonId: string;
    refresh: () => Promise<void>;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

interface FeatureFlagsProviderProps {
    children: ReactNode;
}

export const FeatureFlagsProvider: React.FC<FeatureFlagsProviderProps> = ({ children }) => {
    const [flags, setFlags] = useState<FeatureFlags>({});
    const [loading, setLoading] = useState(true);
    const [anonId, setAnonId] = useState<string>('');

    const fetchFlags = async () => {
        try {
            const id = getOrCreateAnonId();
            setAnonId(id);

            // Check for dev overrides first
            const devOverrides = typeof window !== 'undefined' 
                ? (window as any).__DEV_FEATURE_OVERRIDES__ 
                : undefined;

            if (devOverrides && typeof devOverrides === 'object') {
                // Apply dev overrides and mark them
                const overriddenFlags: FeatureFlags = {};
                Object.keys(devOverrides).forEach(key => {
                    overriddenFlags[key] = {
                        enabled: Boolean(devOverrides[key]),
                        reason: 'dev-override',
                    };
                });
                setFlags(overriddenFlags);
                setLoading(false);
                return;
            }

            // Fetch from server
            const response = await fetch('/api/featureflags', {
                headers: {
                    'X-PT-Anon-ID': id,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const fetchedFlags = data.flags || {};
                setFlags(fetchedFlags);
                
                // Debug: log fetched flags (dev only)
                console.log('[Feature Flags] ✅ Fetched flags:', fetchedFlags);
                
                // Warn if all flags are disabled
                const enabledCount = Object.values(fetchedFlags).filter((f: any) => f.enabled).length;
                if (enabledCount === 0) {
                    console.warn('[Feature Flags] ⚠️  All flags are disabled. Check server .env.local file for FEATURE_* variables.');
                }
            } else {
                const errorText = await response.text().catch(() => 'Unknown error');
                console.error('[Feature Flags] ❌ Failed to fetch flags:', response.status, errorText);
                console.warn('[Feature Flags] Using defaults (all disabled). Server may not be running or .env.local not configured.');
                // Default to all features disabled for safety
                setFlags({});
            }
        } catch (error) {
            console.error('[Feature Flags] Error fetching flags:', error);
            setFlags({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlags();
    }, []);

    const refresh = async () => {
        setLoading(true);
        await fetchFlags();
    };

    return (
        <FeatureFlagsContext.Provider value={{ flags, loading, anonId, refresh }}>
            {children}
        </FeatureFlagsContext.Provider>
    );
};

/**
 * Hook to use feature flags context
 */
export const useFeatureFlagsContext = (): FeatureFlagsContextType => {
    const context = useContext(FeatureFlagsContext);
    if (!context) {
        throw new Error('useFeatureFlagsContext must be used within FeatureFlagsProvider');
    }
    return context;
};

/**
 * Hook to check if a specific feature is enabled
 * @param flagName - Feature flag name (e.g., 'proposal_review')
 * @returns { enabled: boolean, reason: string }
 */
export const useFeatureFlag = (flagName: string): FeatureFlagValue => {
    const { flags, anonId } = useFeatureFlagsContext();
    
    const normalizedName = flagName.toLowerCase();
    const flag = flags[normalizedName];

    // Default behavior: if flag is undefined, return disabled (backwards compatible)
    if (!flag) {
        return {
            enabled: false,
            reason: 'explicit', // Explicitly disabled if not configured
        };
    }

    // Track feature impression when enabled
    React.useEffect(() => {
        if (flag.enabled) {
            trackEvent('feature_impression', {
                flag: normalizedName,
                flagValue: flag.enabled,
                reason: flag.reason,
                anonId,
                locale: i18n.language || 'en',
            });
        }
    }, [flag.enabled, normalizedName, flag.reason, anonId]);

    return flag;
};
