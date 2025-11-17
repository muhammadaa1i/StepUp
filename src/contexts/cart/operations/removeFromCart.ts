/**
 * Remove from cart operation
 */

import { toast } from "react-toastify";
import { User } from "@/types";
import cartService from "@/services/cartService";
import { CartItem, mapServerToClient, reconcilePartial } from "../cartTransformers";
import { saveToStorage } from "../cartStorage";

interface RemoveFromCartOptions {
  productId: number;
  user: User | null;
  items: CartItem[];
  itemsRef: React.MutableRefObject<CartItem[]>;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  t: (key: string, vars?: Record<string, string>) => string;
}

export function removeFromCart({
  productId,
  user,
  items,
  itemsRef,
  setItems,
  t,
}: RemoveFromCartOptions) {
  if (user?.is_admin) {
    toast.error(t("cart.adminCannotModifyCart") || "Администраторы не могут изменять корзину");
    return;
  }
  
  const removedItem = items.find((item) => item.id === productId);
  const cartItemId = removedItem?._cartItemId;
  
  // Optimistic update
  setItems((prevItems) => {
    const next = prevItems.filter((i) => i.id !== productId);
    try { saveToStorage(next); } catch { /* ignore */ }
    return next;
  });
  
  if (removedItem) {
    toast.success(t("cart.removed", { name: removedItem.name }));
  }
  
  if (!cartItemId) return;
  
  // Sync with server
  syncRemoveWithServer(productId, cartItemId, itemsRef, setItems);
}

async function syncRemoveWithServer(
  productId: number,
  cartItemId: number,
  itemsRef: React.MutableRefObject<CartItem[]>,
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>
) {
  try {
    const cart = await cartService.deleteItem(cartItemId);
    let mapped = mapServerToClient(cart, itemsRef.current);
    mapped = reconcilePartial(mapped, itemsRef.current, productId, "delete");
    
    if (!itemsRef.current.some(i => i.id === productId)) {
      setItems(mapped);
      saveToStorage(mapped);
    }
  } catch {
    // Server sync failed, optimistic update already happened
  }
}
