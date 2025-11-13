"use client";
import React from "react";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { statusIcons, statusColors } from "./OrdersTableDesktop";

interface OrdersTableMobileProps {
  orders: Order[];
  locale: string;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function OrdersTableMobile({ orders, locale, t }: OrdersTableMobileProps) {
  return (
    <div className="divide-y divide-gray-900">
      {orders.map((order) => (
        <div
          key={`mobile-${order.id}`}
          className="p-4 lg:p-6 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm lg:text-base font-medium text-gray-900">
              {order.user?.name ||
                (order as unknown as { user_name?: string }).user_name ||
                t('admin.common.unspecified')}{' '}
              {order.user?.surname || ''}
            </div>
            <span
              className={`inline-flex items-center px-2 py-1 text-xs lg:text-sm font-semibold rounded-full ${
                statusColors[order.status]
              }`}
            >
              {statusIcons[order.status]}
              <span className="ml-1">{t(`admin.orders.status.${order.status}`)}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm lg:text-base">
            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                {t('admin.orders.table.items')}
              </div>
              <div className="text-gray-900">
                {t('admin.orders.itemsCount', {
                  count: String(order.items?.length || 0),
                })}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                {t('admin.orders.table.amount')}
              </div>
              <div className="font-medium text-gray-900">
                {formatPrice(order.total_amount, 'сум', locale)}
              </div>
            </div>

            <div className="lg:block hidden">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                {t('admin.orders.table.date')}
              </div>
              <div className="text-gray-500">{formatDate(order.created_at, locale)}</div>
            </div>
          </div>

          <div className="mt-3 pt-3 lg:hidden">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              {t('admin.orders.table.date')}
            </div>
            <div className="text-xs text-gray-500">{formatDate(order.created_at, locale)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
