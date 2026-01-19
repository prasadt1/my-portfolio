// src/utils/featureDiagnostics.ts
// Feature flag diagnostics for dev mode - Phase 3.1

import { FEATURES, type FeatureKey } from '../config/features';
import { isEnabled, isPromoted } from '../config/featureUtils';
import { isCompetitionMode } from '../config/competition';

interface FeatureDiagnostic {
    key: FeatureKey;
    enabled: boolean;
    promoted: boolean;
    accessible: boolean;
    visible: boolean;
}

/**
 * Get diagnostics for all features
 */
export function getFeatureDiagnostics(): FeatureDiagnostic[] {
    return Object.keys(FEATURES).map(key => {
        const featureKey = key as FeatureKey;
        const flag = FEATURES[featureKey];
        return {
            key: featureKey,
            enabled: flag.enabled,
            promoted: flag.promoted,
            accessible: isEnabled(featureKey),
            visible: isPromoted(featureKey),
        };
    });
}

/**
 * Log feature diagnostics to console (dev only)
 */
export function logFeatureDiagnostics(): void {
    if (process.env.NODE_ENV !== 'development') {
        return; // Only log in dev
    }

    const diagnostics = getFeatureDiagnostics();
    const competitionMode = isCompetitionMode();

    console.group('🔧 Feature Flag Diagnostics');
    console.log(`Competition Mode: ${competitionMode ? 'ON' : 'OFF'}`);
    console.table(
        diagnostics.map(d => ({
            Feature: d.key,
            Enabled: d.enabled ? '✅' : '❌',
            Promoted: d.promoted ? '✅' : '❌',
            Accessible: d.accessible ? '✅' : '❌',
            Visible: d.visible ? '✅' : '❌',
        }))
    );
    console.groupEnd();
}

/**
 * Get summary of feature state
 */
export function getFeatureSummary(): {
    total: number;
    enabled: number;
    promoted: number;
    competitionMode: boolean;
} {
    const diagnostics = getFeatureDiagnostics();
    return {
        total: diagnostics.length,
        enabled: diagnostics.filter(d => d.enabled).length,
        promoted: diagnostics.filter(d => d.promoted).length,
        competitionMode: isCompetitionMode(),
    };
}
