/**
 * Hook for cart computed values and helpers
 */

import { useMemo, useCallback } from "react";
import { CartItem } from "./cartTransformers";

interface UseCartHelpersOptions {
  items: CartItem[];
}

export function useCartHelpers({ items }: UseCartHelpersOptions) {
  // Derive lookup structures
  const itemsMap = useMemo(() => {
    const m = new Map<number, CartItem>();
    for (const it of items) m.set(it.id, it);
    return m;
  }, [items]);
  
  const itemsIdSet = useMemo(() => new Set<number>(items.map(i => i.id)), [items]);

  // Helper functions
  const isInCart = useCallback((productId: number | string) => {
    const idNum = Number(productId);
    return itemsIdSet.has(idNum);
  }, [itemsIdSet]);
  
  const getCartItem = useCallback((productId: number | string) => {
    const idNum = Number(productId);
    return itemsMap.get(idNum);
  }, [itemsMap]);

  // Computed values
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const distinctCount = items.length;
  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return {
    isInCart,
    getCartItem,
    itemCount,
    distinctCount,
    totalAmount,
  };
}
