// src/utils/useOnceEffect.ts
// Hook to run effect only once per dependency set (prevents repeated analytics calls)

import { useEffect, useRef } from 'react';

/**
 * Run effect only once per unique dependency set
 * Useful for analytics tracking that should fire once per page/component lifecycle
 */
export function useOnceEffect(
  effect: () => void | (() => void),
  deps: React.DependencyList
): void {
  const hasRunRef = useRef<Set<string>>(new Set());
  
  useEffect(() => {
    // Create a key from dependencies
    const key = JSON.stringify(deps);
    
    // Only run if we haven't seen this dependency set before
    if (!hasRunRef.current.has(key)) {
      hasRunRef.current.add(key);
      return effect();
    }
  }, deps);
}

/**
 * Debounced effect - runs after delay, cancels previous if deps change
 */
export function useDebouncedEffect(
  effect: () => void | (() => void),
  deps: React.DependencyList,
  delay: number = 300
): void {
  useEffect(() => {
    const timer = setTimeout(() => {
      effect();
    }, delay);
    
    return () => clearTimeout(timer);
  }, deps);
}
