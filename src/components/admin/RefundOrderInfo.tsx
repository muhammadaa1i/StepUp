"use client";
import React from "react";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";

interface RefundOrderInfoProps {
  order: Order;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function RefundOrderInfo({ order, t }: RefundOrderInfoProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">
          {t("admin.orders.refundConfirm.orderIdLabel")}
        </span>
        <span className="text-sm font-medium">#{order.id}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">
          {t("admin.orders.refundConfirm.customerLabel")}
        </span>
        <span className="text-sm font-medium">
          {order.user?.name} {order.user?.surname}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">
          {t("admin.orders.refundConfirm.originalAmountLabel")}
        </span>
        <span className="text-sm font-medium">
          {formatPrice(order.total_amount)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-600">
          {t("admin.orders.refundConfirm.statusLabel")}
        </span>
        <span className="text-sm font-medium">
          {t(`admin.orders.status.${order.status}`)}
        </span>
      </div>
    </div>
  );
}
