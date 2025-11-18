/**
 * Simplified update quantity operation
 */

import { User } from "@/types";
import cartService from "@/services/cartService";
import { CartItem, mapServerToClient, reconcilePartial } from "../cartTransformers";
import { saveToStorage } from "../cartStorage";
import { validateUserCanModifyCart } from "../utils/validators";
import { snapQuantityToPackSize } from "../utils/quantityCalculator";

interface UpdateQuantityOptions {
  productId: number;
  quantity: number;
  user: User | null;
  items: CartItem[];
  itemsRef: React.MutableRefObject<CartItem[]>;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  t: (key: string) => string;
}

export function updateQuantity(options: UpdateQuantityOptions) {
  const { productId, quantity, user, items, itemsRef, setItems, t } = options;

  if (!validateUserCanModifyCart(user, t)) {
    return;
  }
  
  const cartItem = items.find((item) => item.id === productId);
  if (!cartItem) return;

  const isIncrease = quantity > cartItem.quantity;
  const snapped = snapQuantityToPackSize(quantity, isIncrease);

  // Optimistic update
  setItems((prev) => prev.map((i) => (i.id === productId ? { ...i, quantity: snapped } : i)));
  
  try {
    const updated = itemsRef.current.map((i) => (i.id === productId ? { ...i, quantity: snapped } : i));
    saveToStorage(updated);
  } catch { /* ignore */ }

  if (!cartItem._cartItemId) return;

  // Sync with server
  syncQuantityWithServer(productId, snapped, cartItem._cartItemId, itemsRef, setItems);
}

async function syncQuantityWithServer(
  productId: number,
  snapped: number,
  cartItemId: number,
  itemsRef: React.MutableRefObject<CartItem[]>,
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
) {
  try {
    const cart = await cartService.updateItem(cartItemId, { quantity: snapped });
    let mapped = mapServerToClient(cart, itemsRef.current);
    mapped = reconcilePartial(mapped, itemsRef.current, productId, "update");
    
    const currentItem = itemsRef.current.find(i => i.id === productId);
    if (currentItem && currentItem.quantity === snapped) {
      setItems(mapped);
      saveToStorage(mapped);
    }
  } catch {
    console.error("Failed to sync quantity with server");
  }
}
