"use client";

import { useCallback } from "react";
import { getOrderStatus } from "@/services/checkoutService";
import { toast } from "react-toastify";

/**
 * Hook to check for duplicate payment attempts
 */
export function useDuplicatePaymentCheck(t: (key: string) => string) {
  const checkForDuplicatePayment = useCallback(async (): Promise<boolean> => {
    // Check session marker for recent payment attempts
    const existing = typeof window !== 'undefined' ? sessionStorage.getItem('paymentOrder') : null;
    
    if (!existing) return false;

    try {
      const parsed = JSON.parse(existing) as { order_id?: number | string; created_at?: string };
      const createdAt = parsed.created_at ? new Date(parsed.created_at).getTime() : 0;
      
      // Check if payment was created in last 5 minutes
      if (Date.now() - createdAt < 5 * 60 * 1000 && parsed.order_id) {
        const status = await getOrderStatus(Number(parsed.order_id));
        
        // If order is still pending, block duplicate payment
        if (status && !['PAID', 'CANCELLED', 'FAILED'].includes(status)) {
          toast.warning(t('payment.alreadyProcessing'));
          return true;
        }
      }
    } catch {
      // Ignore parsing issues, allow payment to proceed
    }

    return false;
  }, [t]);

  return { checkForDuplicatePayment };
}
