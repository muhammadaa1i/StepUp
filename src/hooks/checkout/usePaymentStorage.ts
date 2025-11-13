"use client";

import { useCallback } from "react";
import { PaymentOrderData, OrderResponse } from "./types";

/**
 * Hook to manage payment data persistence across browser contexts
 */
export function usePaymentStorage() {
  const savePaymentData = useCallback((
    order: OrderResponse,
    paymentId: string | undefined,
    userId: number | undefined
  ) => {
    const payload: PaymentOrderData = {
      order_id: order.order_id || order.id!,
      payment_id: paymentId,
      user_id: userId,
      payment_method: 'OCTO',
      created_at: new Date().toISOString(),
    };

    // Primary: sessionStorage
    try {
      sessionStorage.setItem('paymentOrder', JSON.stringify(payload));
    } catch {
      // Fallback: localStorage
      try {
        localStorage.setItem('paymentOrder_fallback', JSON.stringify({ 
          order_id: order.order_id || order.id 
        }));
      } catch {
        // Silent fail - payment can still proceed
      }
    }
  }, []);

  const saveUserBackup = useCallback((user: unknown) => {
    if (!user) return;
    
    try {
      sessionStorage.setItem('userBackup', JSON.stringify(user));
    } catch {
      // Silent fail - not critical
    }
  }, []);

  return { savePaymentData, saveUserBackup };
}
