"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Slipper } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n";

export function useCartActions(slipper: Slipper, onAddToCart?: (slipper: Slipper) => void) {
  const { isInCart, getCartItem, addToCart, updateQuantity } = useCart();
  const { t } = useI18n();
  // Flag to avoid duplicate limit reached toasts per product
  const limitToastShownRef = useRef(false);

  const inCart = isInCart(slipper.id);
  const cartItem = inCart ? getCartItem(slipper.id) : undefined;

  // Show limit reached toast when quantity reaches available stock
  useEffect(() => {
    if (!cartItem || typeof slipper.quantity !== 'number') return;
    const max = slipper.quantity;
    if (cartItem.quantity >= max && max > 0 && !limitToastShownRef.current) {
      limitToastShownRef.current = true;
      toast.info(t('cart.limitReached'));
    } else if (cartItem.quantity < max) {
      // Reset flag if user reduces quantity below max
      limitToastShownRef.current = false;
    }
  }, [cartItem?.quantity, slipper.quantity, t]);

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
      if (!cartItem) return;
      if (canIncrease) {
        updateQuantity(slipper.id, cartItem.quantity + 6);
      } else {
        // Provide immediate feedback even if button visually disabled (defensive)
        toast.info(t('cart.limitReached'));
        limitToastShownRef.current = true;
      }
    },
    [updateQuantity, slipper.id, cartItem, t]
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
