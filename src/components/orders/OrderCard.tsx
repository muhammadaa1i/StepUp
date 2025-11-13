"use client";
import React from "react";
import { Order } from "@/types";
import { getValidOrderItems, canRefundOrder } from "@/lib/orderHelpers";
import type { StatusMap } from "@/lib/orderStatusConfig";
import { OrderHeader } from "./OrderHeader";
import { ProductPreview } from "./ProductPreview";
import { OrderInfo } from "./OrderInfo";
import { OrderActions } from "./OrderActions";

interface OrderCardProps {
  order: Order;
  statusConfig: StatusMap;
  formatDate: (date: string) => string;
  formatPrice: (price: number) => string;
  onShowDetails: (order: Order) => void;
  onRequestRefund: () => void;
  t: (key: string) => string;
}

export default function OrderCard({
  order,
  statusConfig,
  formatDate,
  formatPrice,
  onShowDetails,
  onRequestRefund,
  t,
}: OrderCardProps) {
  const StatusIcon = statusConfig[order.status]?.icon ?? (() => null);
  const validItems = getValidOrderItems(order.items);

  return (
    <div className="card p-3 sm:p-6 hover:shadow-lg transition mx-2 sm:mx-0">
      <OrderHeader
        orderId={order.id}
        createdAt={order.created_at}
        status={order.status}
        totalAmount={order.total_amount}
        statusIcon={StatusIcon}
        statusColor={statusConfig[order.status]?.color || ""}
        statusLabel={statusConfig[order.status]?.label || ""}
        formatDate={formatDate}
        formatPrice={formatPrice}
        t={t}
      />

      <ProductPreview items={validItems} />

      <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <OrderInfo
          itemCount={validItems.length}
          paymentMethod={order.payment_method}
        />
        <OrderActions
          order={order}
          canRefund={canRefundOrder(order.status as string)}
          onShowDetails={() => onShowDetails(order)}
          onRequestRefund={onRequestRefund}
          t={t}
        />
      </div>
    </div>
  );
}
