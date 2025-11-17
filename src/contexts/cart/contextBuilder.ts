/**
 * Cart context value builder
 */

import { Slipper } from "@/types";
import { CartItem } from "./cartTransformers";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  distinctCount: number;
  totalAmount: number;
  addToCart: (product: Slipper, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getCartItem: (productId: number) => CartItem | undefined;
}

interface BuildContextValueOptions {
  items: CartItem[];
  itemCount: number;
  distinctCount: number;
  totalAmount: number;
  operations: {
    addToCart: (product: Slipper, quantity?: number, size?: string, color?: string) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
  };
  isInCart: (productId: number) => boolean;
  getCartItem: (productId: number) => CartItem | undefined;
}

export function buildContextValue(options: BuildContextValueOptions): CartContextType {
  return {
    items: options.items,
    itemCount: options.itemCount,
    distinctCount: options.distinctCount,
    totalAmount: options.totalAmount,
    addToCart: options.operations.addToCart,
    removeFromCart: options.operations.removeFromCart,
    updateQuantity: options.operations.updateQuantity,
    clearCart: options.operations.clearCart,
    isInCart: options.isInCart,
    getCartItem: options.getCartItem,
  };
}

export type { CartContextType };
