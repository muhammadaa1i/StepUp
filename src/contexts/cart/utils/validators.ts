/**
 * Cart validation utilities
 */

import { toast } from "react-toastify";
import { Slipper, User } from "@/types";
import { CartItem } from "../cartTransformers";

export function validateAddToCart(
  product: Slipper,
  user: User | null,
  itemsRef: React.MutableRefObject<CartItem[]>,
  t: (key: string, vars?: Record<string, string>) => string
): boolean {
  if (user?.is_admin) {
    toast.error(t("cart.adminCannotAddToCart") || "Администраторы не могут добавлять товары в корзину");
    return false;
  }
  
  const availableStock = product.quantity || 0;
  const minOrder = 60; // Minimum order quantity (one pack)
  
  if (availableStock <= 0) {
    toast.error(t("cart.outOfStock", { name: product.name }));
    return false;
  }

  if (availableStock < minOrder) {
    toast.error(
      t("cart.insufficientStock", { 
        name: product.name, 
        available: availableStock.toString() 
      })
    );
    return false;
  }

  const existingItem = itemsRef.current.find((i) => i.id === product.id);
  if (existingItem) {
    toast.info(t("cart.alreadyInCartAddMore") || `${product.name} уже в корзине`);
    return false;
  }

  return true;
}

export function validateUserCanModifyCart(
  user: User | null,
  t: (key: string) => string
): boolean {
  if (user?.is_admin) {
    toast.error(t("cart.adminCannotModifyCart") || "Администраторы не могут изменять корзину");
    return false;
  }
  return true;
}
