/**
 * Hook for syncing cart with server
 */

import { useCallback, useRef } from "react";
import cartService from "@/services/cartService";
import { CartItem, mapServerToClient } from "./cartTransformers";
import { loadFromStorage } from "./cartStorage";
import { hasValidToken } from "@/lib/tokenUtils";

interface UseCartServerSyncOptions {
  isAuthenticated: boolean;
  itemsRef: React.MutableRefObject<CartItem[]>;
  suppressHydrationRef: React.MutableRefObject<number>;
}

export function useCartServerSync({
  isAuthenticated,
  itemsRef,
  suppressHydrationRef,
}: UseCartServerSyncOptions) {
  const lastServerSyncRef = useRef<number>(0);
  const SERVER_SYNC_COOLDOWN_MS = 10000; // 10s throttle to avoid 429

  const syncFromServer = useCallback(async (): Promise<CartItem[] | null> => {
    try {
      // If we're in a clear window, skip hydrating from server
      if (suppressHydrationRef.current > Date.now()) return null;
      
      // Only sync for authenticated users with a present, valid access token
      // to avoid noisy 401s and pointless refresh attempts
      if (!isAuthenticated || !hasValidToken()) return null;
      
      const cart = await cartService.getCart();
      const prevForImages = itemsRef.current.length > 0 
        ? itemsRef.current 
        : loadFromStorage();
      
      const mapped = mapServerToClient(cart, prevForImages);
      
      lastServerSyncRef.current = Date.now();
      return mapped;
    } catch (error) {
      // Silently handle auth errors
      const isAuthError = error instanceof Error && 
        (error.message.includes('401') || 
         error.message.includes('Unauthorized') ||
         error.message.includes('Authentication required'));
      
      if (!isAuthError) {
        console.error("Failed to sync from server:", error);
      }
      return null;
    }
  }, [isAuthenticated, itemsRef, suppressHydrationRef]);

  const canSyncFromServer = useCallback(() => {
    const now = Date.now();
    return (
      isAuthenticated &&
      hasValidToken() &&
      now - lastServerSyncRef.current >= SERVER_SYNC_COOLDOWN_MS
    );
  }, [isAuthenticated]);

  return {
    syncFromServer,
    canSyncFromServer,
  };
}
