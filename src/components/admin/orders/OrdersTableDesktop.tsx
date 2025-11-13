"use client";
import React from "react";
import { Order } from "@/types";
import OrderRow from "../common/OrderRow";
import { statusIcons, statusColors } from "../common/StatusBadge";

interface OrdersTableDesktopProps {
  orders: Order[];
  locale: string;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function OrdersTableDesktop({
  orders,
  locale,
  t,
}: OrdersTableDesktopProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("admin.orders.table.client")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("admin.orders.table.items")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("admin.orders.table.amount")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("admin.orders.table.status")}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("admin.orders.table.date")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} locale={locale} t={t} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { statusIcons, statusColors };
