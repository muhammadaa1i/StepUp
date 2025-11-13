"use client";

import { useCallback } from "react";
import { createPaymentForOrder } from "@/services/checkoutService";
import { OrderResponse, PaymentResponse } from "./types";

/**
 * Hook to handle payment creation with mobile-optimized timeouts
 */
export function usePaymentCreation(t: (key: string, params?: Record<string, string>) => string) {
  const createPayment = useCallback(async (
    order: OrderResponse,
    totalAmount: number,
    itemCount: number,
    userName?: string
  ): Promise<PaymentResponse> => {
    const isMobile = typeof window !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const description = t('payment.orderDescription', {
      itemCount: String(itemCount),
      customerName: userName || 'Customer',
    });

    const payment = await createPaymentForOrder({
      orderId: order.id || Number(order.order_id),
      amount: (order.total_amount ?? totalAmount) as number,
      description,
    }, { 
      timeout: isMobile ? 10000 : 4000, 
      retryCount: isMobile ? 2 : 1 
    });

    const paymentUrl = payment.octo_pay_url || payment.payment_url || payment.pay_url;
    
    if (!payment.success || !paymentUrl) {
      throw new Error(payment.errMessage || t('payment.error.initiation'));
    }

    return { ...payment, octo_pay_url: paymentUrl };
  }, [t]);

  return { createPayment };
}
