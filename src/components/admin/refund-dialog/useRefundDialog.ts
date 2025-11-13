import { useState, useEffect, useCallback } from "react";
import { Order } from "@/types";

interface UseRefundDialogOptions {
  isOpen: boolean;
  order: Order | null;
  onConfirm: (orderId: number) => Promise<void>;
  onCancel: () => void;
}

export function useRefundDialog({ isOpen, order, onConfirm, onCancel }: UseRefundDialogOptions) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);

  // Reset state when dialog opens/closes or order changes
  useEffect(() => {
    if (!isOpen || !order) {
      setIsProcessing(false);
      setIsSuccess(false);
      setCurrentOrderId(null);
    } else if (order && order.id !== currentOrderId) {
      setIsProcessing(false);
      setIsSuccess(false);
      setCurrentOrderId(order.id);
    }
  }, [isOpen, order?.id, currentOrderId, order]);

  const handleConfirm = useCallback(async () => {
    if (!order || isProcessing || order.id !== currentOrderId) {
      return;
    }

    try {
      setIsProcessing(true);
      await onConfirm(order.id);

      if (order.id === currentOrderId) {
        setIsSuccess(true);
        setTimeout(() => {
          if (order.id === currentOrderId) {
            setIsSuccess(false);
            setIsProcessing(false);
            onCancel();
          }
        }, 1500);
      } else {
        setIsProcessing(false);
      }
    } catch {
      setIsProcessing(false);
    }
  }, [order, isProcessing, currentOrderId, onConfirm, onCancel]);

  const handleCancel = useCallback(() => {
    if (!isProcessing) {
      setIsSuccess(false);
      setIsProcessing(false);
      onCancel();
    }
  }, [isProcessing, onCancel]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isProcessing) {
      handleCancel();
    }
  }, [isProcessing, handleCancel]);

  return {
    isProcessing,
    isSuccess,
    handleConfirm,
    handleCancel,
    handleBackdropClick,
  };
}
