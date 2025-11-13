import React from "react";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import RefundOrderInfo from "../RefundOrderInfo";

interface RefundDialogContentProps {
  isSuccess: boolean;
  order: Order;
  t: (key: string, params?: Record<string, string>) => string;
}

export const RefundDialogContent: React.FC<RefundDialogContentProps> = ({
  isSuccess,
  order,
  t,
}) => {
  if (isSuccess) {
    return (
      <div className="text-center space-y-3">
        <div className="text-green-600 font-medium">
          {t("admin.orders.refundConfirm.successMessage", {
            amount: formatPrice(order.total_amount),
          })}
        </div>
        <div className="text-sm text-gray-600">
          {t("admin.orders.refundConfirm.processingMessage", {
            orderId: String(order.id),
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-600">
        {t("admin.orders.refundConfirm.message")}
      </p>
      <RefundOrderInfo order={order} t={t} />
    </>
  );
};
