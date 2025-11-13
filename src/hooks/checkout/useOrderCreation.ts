"use client";

import { useCallback } from "react";
import { createOrderFromCart } from "@/services/checkoutService";
import { OrderResponse } from "./types";

/**
 * Hook to handle order creation with mobile-optimized timeouts
 */
export function useOrderCreation() {
  const createOrder = useCallback(async (): Promise<OrderResponse> => {
    const isMobile = typeof window !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const order = await createOrderFromCart({ 
      clearCart: false, 
      timeout: isMobile ? 12000 : 6000, 
      retryCount: isMobile ? 2 : 1 
    });

    if (!order || (!order.id && !order.order_id)) {
      throw new Error('Invalid order response');
    }

    return order;
  }, []);

  return { createOrder };
}
