/**
 * Cart data transformation utilities
 */

import { CartDTO, CartItemDTO } from "@/services/cartService";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: Array<{ id: number; image_url: string }>;
  image?: string;
  size?: string;
  color?: string;
  availableStock?: number; // Available stock quantity for validation
  _cartItemId?: number; // backend cart_item id
}

/**
 * Map server DTO to client items, preserving images from previous state
 * Automatically deduplicates items by slipper_id and sums quantities
 */
export function mapServerToClient(cart: CartDTO, prevItems: CartItem[]): CartItem[] {
  const prev = prevItems || [];
  const itemsMap = new Map<number, CartItem>();
  
  // Use Map to deduplicate by slipper_id
  (cart.items || []).forEach((it: CartItemDTO) => {
    const prevMatch = prev.find((p) => p.id === it.slipper_id);
    
    // If we already have this slipper_id, sum the quantities
    if (itemsMap.has(it.slipper_id)) {
      const existing = itemsMap.get(it.slipper_id)!;
      existing.quantity += Number(it.quantity || 0);
    } else {
      const mapped: CartItem = {
        id: it.slipper_id,
        name: it.name,
        price: it.price,
        quantity: Number(it.quantity || 0),
        images: prevMatch?.images || [],
        image: prevMatch?.image,
        availableStock: prevMatch?.availableStock, // Preserve stock info
        _cartItemId: it.id,
      };
      itemsMap.set(it.slipper_id, mapped);
    }
  });
  
  return Array.from(itemsMap.values());
}

/**
 * Merge server-mapped items with local when server returns a partial payload
 */
export function reconcilePartial(
  mapped: CartItem[],
  prev: CartItem[],
  changedId: number,
  op: "add" | "update" | "delete" | "clear"
): CartItem[] {
  if (op === "clear") return [];
  
  if (op === "delete") {
    // Start from local minus the removed item
    const base = prev.filter((i) => i.id !== changedId);
    if (mapped.length === 0) return base;
    // If mapped looks like a full cart, trust it
    if (mapped.length >= base.length) return mapped;
    // Otherwise, merge mapped changes into base
    const byId = new Map(mapped.map((i) => [i.id, i] as const));
    const merged = base.map((i) => byId.get(i.id) || i);
    // Include any mapped items not present in base
    mapped.forEach((i) => { 
      if (!merged.some((m) => m.id === i.id)) merged.push(i); 
    });
    return merged;
  }
  
  // add/update: keep previous, replace changed, include any new mapped items
  if (mapped.length === 0) return prev;
  // If mapped seems full (equal or more items than prev), prefer mapped
  if (mapped.length >= prev.length) return mapped;
  
  const byId = new Map(mapped.map((i) => [i.id, i] as const));
  const merged = prev.map((i) => byId.get(i.id) || i);
  mapped.forEach((i) => { 
    if (!merged.some((m) => m.id === i.id)) merged.push(i); 
  });
  return merged;
}

/**
 * Deduplicate cart items by ID and sum quantities
 */
export function deduplicateCartItems(items: CartItem[]): CartItem[] {
  const itemsMap = new Map<number, CartItem>();
  
  items.forEach((item) => {
    if (itemsMap.has(item.id)) {
      const existing = itemsMap.get(item.id)!;
      existing.quantity += Math.max(1, Math.round(item.quantity || 1));
    } else {
      itemsMap.set(item.id, {
        ...item,
        quantity: Math.max(1, Math.round(item.quantity || 1)),
      });
    }
  });
  
  return Array.from(itemsMap.values());
}
