/**
 * Hook for initial cart load
 */

import { useEffect } from "react";
import { CartItem } from "./cartTransformers";
import { saveToStorage, loadFromStorage } from "./cartStorage";
import { hasValidToken } from "@/lib/tokenUtils";

interface UseCartInitOptions {
  isAuthenticated: boolean;
  syncFromServer: () => Promise<CartItem[] | null>;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export function useCartInit({
  isAuthenticated,
  syncFromServer,
  setItems,
}: UseCartInitOptions) {
  useEffect(() => {
    let mounted = true;
    let hasInitialized = false; // Prevent multiple initializations
    
    const timeoutId = setTimeout(() => {
      if (hasInitialized) return;
      hasInitialized = true;
      
      (async () => {
        if (isAuthenticated && hasValidToken()) {
          try {
            const mapped = await syncFromServer();
            if (!mounted || !mapped) return;
            
            const prevForImages = loadFromStorage();
            const hasLocalItems = prevForImages.length > 0;
            const hasServerItems = mapped.length > 0;
            
            if (hasServerItems || !hasLocalItems) {
              setItems(mapped);
              saveToStorage(mapped);
            } else {
              setItems(prevForImages);
            }
          } catch {
            const savedCart = loadFromStorage();
            if (mounted && savedCart.length > 0) {
              setItems(savedCart);
            }
          }
        } else {
          const savedCart = loadFromStorage();
          if (mounted && savedCart.length > 0) {
            setItems(savedCart);
          }
        }
      })();
    }, 100);
    
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
    // Only run once on mount - ignore function changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
