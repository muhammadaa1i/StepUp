/**
 * Cart storage utilities for localStorage and cookie management
 */

import { CartItem } from "./cartTransformers";

/**
 * Save cart items to localStorage
 */
export function saveToStorage(items: CartItem[]): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }
}

/**
 * Load cart items from localStorage with deduplication
 */
export function loadFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  
  try {
    const saved = localStorage.getItem("cart");
    if (!saved) return [];
    
    const parsed: CartItem[] = JSON.parse(saved);
    
    // Deduplicate items by id and sum quantities
    const itemsMap = new Map<number, CartItem>();
    parsed.forEach((it) => {
      if (itemsMap.has(it.id)) {
        const existing = itemsMap.get(it.id)!;
        existing.quantity += Math.max(1, Math.round(it.quantity || 1));
      } else {
        itemsMap.set(it.id, {
          ...it,
          quantity: Math.max(1, Math.round(it.quantity || 1)),
        });
      }
    });
    
    return Array.from(itemsMap.values());
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    return [];
  }
}

/**
 * Clear cart from localStorage
 */
export function clearStorage(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Failed to clear cart storage:", error);
    }
  }
}
