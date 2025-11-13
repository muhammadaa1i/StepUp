"use client";

import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { modernApiClient } from '@/lib/modernApiClient';
import { API_ENDPOINTS } from '@/lib/constants';
import { PaymentOrderData } from './types';

export function useOrderStatusUpdate(t: (key: string) => string) {
  const cancelDuplicateOrders = useCallback(
    async (orderData: PaymentOrderData) => {
      if (!orderData.batch_info?.all_order_ids || orderData.batch_info.all_order_ids.length === 0) {
        return;
      }

      const otherOrderIds = orderData.batch_info.all_order_ids.filter(
        (id: string | number) => String(id) !== String(orderData.order_id)
      );

      for (const orderId of otherOrderIds) {
        try {
          await modernApiClient.put(`${API_ENDPOINTS.ORDERS}/${orderId}`, {
            status: 'CANCELLED',
            notes: 'Cancelled - duplicate of paid order',
          });
        } catch (err) {
          console.warn(`Failed to cancel duplicate order ${orderId}:`, err);
        }
      }
    },
    []
  );

  const cancelOrphanedOrders = useCallback(
    async (orderData: PaymentOrderData) => {
      try {
        const userOrders = await modernApiClient.get(`${API_ENDPOINTS.ORDERS}`, {
          user_id: orderData.user_id,
          status: 'CREATED',
          limit: 20,
        });

        const ordersData =
          Array.isArray(userOrders)
            ? userOrders
            : (userOrders as { data?: unknown; items?: unknown[] }).items ||
              (userOrders as { data?: unknown; items?: unknown[] }).data ||
              [];

        if (!Array.isArray(ordersData) || ordersData.length === 0) {
          return;
        }

        const orderCreatedTime = new Date(orderData.created_at || Date.now()).getTime();

        for (const orphanOrder of ordersData) {
          const orphanId =
            (orphanOrder as { id?: number; order_id?: string }).id ||
            (orphanOrder as { id?: number; order_id?: string }).order_id;
          const orphanCreatedAt = (orphanOrder as { created_at?: string }).created_at;

          if (String(orphanId) === String(orderData.order_id)) continue;

          if (orphanCreatedAt) {
            const orphanTime = new Date(orphanCreatedAt).getTime();
            const timeDiff = Math.abs(orderCreatedTime - orphanTime);

            if (timeDiff < 5 * 60 * 1000) {
              try {
                await modernApiClient.put(`${API_ENDPOINTS.ORDERS}/${orphanId}`, {
                  status: 'CANCELLED',
                  notes: 'Auto-cancelled - likely duplicate order attempt',
                });
              } catch (err) {
                console.warn(`Failed to cancel orphaned order ${orphanId}:`, err);
              }
            }
          }
        }
      } catch (err) {
        console.warn('Failed to check for orphaned orders:', err);
      }
    },
    []
  );

  const updateOrderStatus = useCallback(
    async (orderData: PaymentOrderData | null) => {
      if (!orderData) {
        console.warn('No order data to update');
        return;
      }

      try {
        const updateRequest = {
          status: 'PAID',
          notes: `Payment completed via ${orderData.payment_method}. Payment ID: ${orderData.payment_id}`,
        };

        const response = await modernApiClient.put(
          `${API_ENDPOINTS.ORDERS}/${orderData.order_id}`,
          updateRequest
        );

        if (response) {
          await cancelDuplicateOrders(orderData);
          await cancelOrphanedOrders(orderData);
          toast.success(t('payment.orderCreated') || 'Payment confirmed successfully!');
          
          if (typeof window !== 'undefined') {
            localStorage.removeItem('paymentOrder');
          }
        }
      } catch (error) {
        console.error('Failed to create order:', error);
        toast.error(t('payment.orderCreateError') || 'Failed to create order');
      }
    },
    [t, cancelDuplicateOrders, cancelOrphanedOrders]
  );

  return {
    updateOrderStatus,
  };
}
