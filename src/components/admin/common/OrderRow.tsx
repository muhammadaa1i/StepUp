"use client";
import React from "react";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import StatusBadge from "./StatusBadge";

interface OrderRowProps {
  order: Order;
  locale: string;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function OrderRow({ order, locale, t }: OrderRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {order.user?.name ||
            (order as unknown as { user_name?: string }).user_name ||
            t("admin.common.unspecified")}{" "}
          {order.user?.surname || ""}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {t("admin.orders.itemsCount", {
            count: String(order.items?.length || 0),
          })}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {formatPrice(order.total_amount, "сум", locale)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge
          status={order.status}
          label={t(`admin.orders.status.${order.status}`)}
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(order.created_at, locale)}
      </td>
    </tr>
  );
}
