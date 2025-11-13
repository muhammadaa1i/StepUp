"use client";

import { useState, useCallback } from "react";
import { useI18n } from "@/i18n";
import { toast } from "react-toastify";
import { Order } from "@/types";
import { AdminRefundService } from "@/services/adminRefundService";

export function useRefundActions(
  setOrders: (updater: (prev: Order[]) => Order[]) => void,
  setRefreshKey: (updater: (prev: number) => number) => void
) {
  const { t } = useI18n();
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [selectedOrderForRefund, setSelectedOrderForRefund] = useState<Order | null>(null);

  const handleRefundClick = useCallback(
    (order: Order) => {
      if (!AdminRefundService.canOrderBeRefunded(order.status)) {
        console.warn(`⚠️ Admin: Order #${order.id} cannot be refunded (status: ${order.status})`);
        toast.error(t("admin.orders.toasts.refundNotAllowed"));
        return;
      }
      setSelectedOrderForRefund(null);
      setShowRefundDialog(false);
      setTimeout(() => {
        setSelectedOrderForRefund(order);
        setShowRefundDialog(true);
      }, 50);
    },
    [t]
  );

  const handleRefundConfirm = useCallback(
    async (orderId: number) => {
      if (!selectedOrderForRefund) return;
      if (orderId !== selectedOrderForRefund.id) {
        console.error(`❌ Order ID mismatch! Expected: ${selectedOrderForRefund.id}, Got: ${orderId}`);
        toast.error(t("admin.orders.toasts.refundError"));
        return;
      }
      try {
        const result = await AdminRefundService.processRefund({ order_id: orderId });
        if (result.success) {
          toast.success(t("admin.orders.toasts.refundSuccess"));
          setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "REFUNDED" as const } : o)));
          setRefreshKey((prev) => prev + 1);
          setShowRefundDialog(false);
          setSelectedOrderForRefund(null);
        } else {
          console.error(`❌ Admin: Refund failed for order #${orderId}:`, result);
          toast.error(result.message || t("admin.orders.toasts.refundError"));
        }
      } catch (error) {
        console.error(`❌ Admin: Refund processing error for order #${orderId}:`, error);
        toast.error(t("admin.orders.toasts.refundError"));
      }
    },
    [selectedOrderForRefund, t, setOrders, setRefreshKey]
  );

  const handleRefundCancel = useCallback(() => {
    setShowRefundDialog(false);
    setSelectedOrderForRefund(null);
  }, []);

  return {
    showRefundDialog,
    selectedOrderForRefund,
    handleRefundClick,
    handleRefundConfirm,
    handleRefundCancel,
  };
}
