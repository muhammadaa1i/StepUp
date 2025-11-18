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
    let hasInitialized = false;
    
    const timeoutId = setTimeout(() => {
      if (hasInitialized) return;
      hasInitialized = true;
      
      (async () => {
        // Only sync from server if authenticated
        if (isAuthenticated && hasValidToken()) {
          try {
            const mapped = await syncFromServer();
            if (!mounted) return;
            
            const prevForImages = loadFromStorage();
            const hasLocalItems = prevForImages.length > 0;
            const hasServerItems = mapped && mapped.length > 0;
            
            // Priority: Use server data if it has items
            if (hasServerItems) {
              setItems(mapped);
              saveToStorage(mapped);
            } else if (!hasLocalItems && mapped) {
              // Server returned empty and no local items - set empty
              setItems(mapped);
              saveToStorage(mapped);
            }
            // If server is empty but we have local items, keep local (already loaded in initial state)
          } catch {
            // Server sync failed - keep local storage items (already loaded in initial state)
            if (process.env.NODE_ENV === "development") {
              console.log("Cart server sync failed, using local storage");
            }
          }
        }
        // If not authenticated, local storage items are already loaded in initial state
      })();
    }, 100);
    
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, []);
}
