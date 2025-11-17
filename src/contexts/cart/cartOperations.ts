/**
 * Cart operations factory - exports all operations
 */

import { Slipper, User } from "@/types";
import { CartItem } from "./cartTransformers";
import { addToCart } from "./operations/addToCart";
import { removeFromCart } from "./operations/removeFromCart";
import { updateQuantity } from "./operations/updateQuantity";
import { clearCart } from "./operations/clearCart";

interface CartOperationsOptions {
  items: CartItem[];
  itemsRef: React.MutableRefObject<CartItem[]>;
  isAuthenticated: boolean;
  user: User | null;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  suppressHydrationRef: React.MutableRefObject<number>;
  t: (key: string, vars?: Record<string, string>) => string;
}

export function createCartOperations({
  items,
  itemsRef,
  isAuthenticated,
  user,
  setItems,
  suppressHydrationRef,
  t,
}: CartOperationsOptions) {
  
  return {
    addToCart: (product: Slipper, quantity?: number, _size?: string, _color?: string) => {
      void _size;
      void _color;
      addToCart({ product, quantity, user, isAuthenticated, itemsRef, setItems, t });
    },
    
    removeFromCart: (productId: number) => {
      removeFromCart({ productId, user, items, itemsRef, setItems, t });
    },
    
    updateQuantity: (productId: number, quantity: number) => {
      updateQuantity({ productId, quantity, user, items, itemsRef, setItems, t });
    },
    
    clearCart: () => {
      clearCart({ setItems, suppressHydrationRef, t });
    },
  };
}
