// src/components/FeatureRouteGuard.tsx
// Route guard that checks feature flags and shows unavailable page if disabled

import { Navigate } from 'react-router-dom';
import { canAccessRoute } from '../config/featureRouting';
import UnavailablePage from '../pages/UnavailablePage';

interface FeatureRouteGuardProps {
  path: string;
  featureKey?: string;
  children: React.ReactNode;
}

export const FeatureRouteGuard: React.FC<FeatureRouteGuardProps> = ({
  path,
  featureKey,
  children,
}) => {
  const { enabled } = canAccessRoute(path);
  
  // If route is disabled, show unavailable page
  if (!enabled) {
    return <UnavailablePage />;
  }
  
  // If enabled, render children (route is accessible even if not promoted)
  return <>{children}</>;
};
