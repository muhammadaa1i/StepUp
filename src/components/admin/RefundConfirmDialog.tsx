import React from "react";
import { Order } from "@/types";
import { useI18n } from "@/i18n";
import RefundDialogHeader from "./RefundDialogHeader";
import { useRefundDialog } from "./refund-dialog/useRefundDialog";
import { RefundDialogContent } from "./refund-dialog/RefundDialogContent";
import { RefundDialogActions } from "./refund-dialog/RefundDialogActions";

interface RefundConfirmDialogProps {
  isOpen: boolean;
  order: Order | null;
  onConfirm: (orderId: number) => Promise<void>;
  onCancel: () => void;
}

export default function RefundConfirmDialog({
  isOpen,
  order,
  onConfirm,
  onCancel,
}: RefundConfirmDialogProps) {
  const { t } = useI18n();
  const {
    isProcessing,
    isSuccess,
    handleConfirm,
    handleCancel,
    handleBackdropClick,
  } = useRefundDialog({ isOpen, order, onConfirm, onCancel });

  if (!isOpen || !order) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <RefundDialogHeader
          isSuccess={isSuccess}
          title={t("admin.orders.refundConfirm.title")}
          successTitle={t("admin.orders.refundConfirm.successTitle")}
          onClose={handleCancel}
          isProcessing={isProcessing}
        />

        {/* Content */}
        <div className="p-6 space-y-4">
          <RefundDialogContent isSuccess={isSuccess} order={order} t={t} />
        </div>

        {/* Actions */}
        <RefundDialogActions
          isSuccess={isSuccess}
          isProcessing={isProcessing}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          t={t}
        />
      </div>
    </div>
  );
}
