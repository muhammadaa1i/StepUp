"use client";

import { useState, useCallback, useEffect } from "react";
import { Slipper } from "@/types";
import { useCart } from "@/contexts/CartContext";

export function useCartActions(slipper: Slipper, onAddToCart?: (slipper: Slipper) => void) {
  const { isInCart, getCartItem, addToCart, updateQuantity } = useCart();

  const inCart = isInCart(slipper.id);
  const cartItem = inCart ? getCartItem(slipper.id) : undefined;
  const [addPending, setAddPending] = useState(false);

  useEffect(() => {
    if (inCart && addPending) setAddPending(false);
  }, [inCart, addPending]);

  const handleAddToCart = useCallback(() => {
    if (onAddToCart) {
      onAddToCart(slipper);
    } else {
      addToCart(slipper);
    }
  }, [addToCart, onAddToCart, slipper]);

  const increaseQuantity = useCallback(
    (e: React.MouseEvent, canIncrease: boolean) => {
      e.stopPropagation();
      if (cartItem && canIncrease) {
        updateQuantity(slipper.id, cartItem.quantity + 6);
      }
    },
    [updateQuantity, slipper.id, cartItem]
  );

  const decreaseQuantity = useCallback(
    (e: React.MouseEvent, canDecrease: boolean) => {
      e.stopPropagation();
      if (cartItem && canDecrease) {
        updateQuantity(slipper.id, cartItem.quantity - 6);
      }
    },
    [updateQuantity, slipper.id, cartItem]
  );

  return {
    inCart,
    cartItem,
    addPending,
    setAddPending,
    handleAddToCart,
    increaseQuantity,
    decreaseQuantity,
  };
}
