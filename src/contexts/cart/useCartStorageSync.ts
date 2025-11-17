/**
 * Hook for cart storage sync
 */

import { useEffect, useRef } from "react";
import { CartItem } from "./cartTransformers";
import { saveToStorage, loadFromStorage } from "./cartStorage";

interface UseCartStorageSyncOptions {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  syncFromServer: () => Promise<CartItem[] | null>;
  canSyncFromServer: () => boolean;
}

export function useCartStorageSync({
  items,
  setItems,
  syncFromServer,
  canSyncFromServer,
}: UseCartStorageSyncOptions) {
  // Use refs to avoid recreating effect when functions change
  const syncFromServerRef = useRef(syncFromServer);
  const canSyncFromServerRef = useRef(canSyncFromServer);
  const setItemsRef = useRef(setItems);
  
  useEffect(() => {
    syncFromServerRef.current = syncFromServer;
    canSyncFromServerRef.current = canSyncFromServer;
    setItemsRef.current = setItems;
  });
  // Save to localStorage on changes
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  // Sync with storage on focus/visibility
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const lastStorageRawRef = { current: "" } as { current: string };
    let syncInProgress = false; // Prevent concurrent syncs
    
    const syncFromStorage = () => {
      if (syncInProgress) return; // Prevent overlapping syncs
      
      try {
        const stored = localStorage.getItem("cart");
        if (stored === lastStorageRawRef.current) return;
        lastStorageRawRef.current = stored || "";
        
        const normalized = loadFromStorage();
        setItemsRef.current(normalized);
      } catch {
        // ignore
      }
      
      if (canSyncFromServerRef.current()) {
        syncInProgress = true;
        setTimeout(() => {
          void syncFromServerRef.current().then(mapped => {
            if (mapped) {
              setItemsRef.current(mapped);
              saveToStorage(mapped);
            }
          }).finally(() => {
            syncInProgress = false;
          });
        }, 0);
      }
    };

    const onVisibility = () => {
      if (!document.hidden) syncFromStorage();
    };
    
    window.addEventListener("focus", syncFromStorage);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("storage", syncFromStorage);
    
    return () => {
      window.removeEventListener("focus", syncFromStorage);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("storage", syncFromStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only set up listeners once, use refs for current values
}
