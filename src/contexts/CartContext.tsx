"use client";

import React, { createContext, useContext, useRef, useState, startTransition } from "react";
import { useI18n } from "@/i18n";
import { useAuth } from "@/contexts/AuthContext";
import { CartItem } from "./cart/cartTransformers";
import { useCartServerSync } from "./cart/useCartServerSync";
import { useCartEnrichment } from "./cart/useCartEnrichment";
import { useCartInit } from "./cart/useCartInit";
import { useCartEvents } from "./cart/useCartEvents";
import { useCartStorageSync } from "./cart/useCartStorageSync";
import { useCartHelpers } from "./cart/useCartHelpers";
import { createCartOperations } from "./cart/cartOperations";
import { saveToStorage } from "./cart/cartStorage";
import { buildContextValue, CartContextType } from "./cart/contextBuilder";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const itemsRef = useRef<CartItem[]>([]);
  const suppressHydrationRef = useRef<number>(0);
  const { t } = useI18n();
  const { isAuthenticated, user } = useAuth();

  React.useEffect(() => { itemsRef.current = items; }, [items]);

  const { syncFromServer, canSyncFromServer } = useCartServerSync({
    isAuthenticated,
    itemsRef,
    suppressHydrationRef,
  });

  useCartEnrichment({
    items,
    itemsRef,
    onItemsEnriched: (enriched) => {
      startTransition(() => setItems(enriched));
      saveToStorage(enriched);
    },
  });

  useCartInit({
    isAuthenticated,
    syncFromServer,
    setItems: (action) => startTransition(() => setItems(action)),
  });

  useCartEvents({ setItems, suppressHydrationRef });

  useCartStorageSync({
    items,
    setItems: (action) => startTransition(() => setItems(action)),
    syncFromServer,
    canSyncFromServer,
  });

  const operations = createCartOperations({
    items,
    itemsRef,
    isAuthenticated,
    user,
    setItems: (action) => startTransition(() => setItems(action)),
    suppressHydrationRef,
    t,
  });

  const { isInCart, getCartItem, itemCount, distinctCount, totalAmount } = useCartHelpers({ items });

  const value = buildContextValue({
    items,
    itemCount,
    distinctCount,
    totalAmount,
    operations,
    isInCart,
    getCartItem,
  });

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
