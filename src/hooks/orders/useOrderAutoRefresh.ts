"use client";

import { useEffect } from "react";

/**
 * Hook to auto-refresh orders when window regains focus or becomes visible
 * Includes cooldown to prevent excessive API calls
 */
export function useOrderAutoRefresh(
  fetchOrders: () => Promise<void>,
  lastFetchRef: React.MutableRefObject<number>,
  cooldownMs: number = 15000,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const onFocus = () => {
      const now = Date.now();
      if (now - lastFetchRef.current >= cooldownMs) {
        fetchOrders();
      }
    };

    const onVisibility = () => {
      if (!document.hidden) onFocus();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [fetchOrders, lastFetchRef, cooldownMs, enabled]);
}
