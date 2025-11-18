/**
 * Hook for handling token refresh events
 */

import { useEffect, MutableRefObject } from "react";

interface UseTokenRefreshListenerOptions {
  fetchOrders: () => Promise<void>;
  shownAuthErrorRef: MutableRefObject<boolean>;
}

export function useTokenRefreshListener({
  fetchOrders,
  shownAuthErrorRef,
}: UseTokenRefreshListenerOptions) {
  useEffect(() => {
    const handleTokenRefresh = () => {
      // Reset error flag and retry fetching
      shownAuthErrorRef.current = false;
      fetchOrders();
    };

    window.addEventListener("auth:token-refreshed", handleTokenRefresh);

    return () => {
      window.removeEventListener("auth:token-refreshed", handleTokenRefresh);
    };
  }, [fetchOrders, shownAuthErrorRef]);
}
