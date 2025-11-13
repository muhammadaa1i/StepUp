"use client";
import React from "react";
import { Order } from "@/types";
import { useI18n } from "@/i18n";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";
import OrdersTableDesktop from "./OrdersTableDesktop";
import OrdersTableMobile from "./OrdersTableMobile";

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  locale: string;
  onRefundClick: (order: Order) => void;
}

export default function OrdersTable({ orders, isLoading, locale, onRefundClick: _onRefundClick }: OrdersTableProps) {
  const { t } = useI18n();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <TableSkeleton />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {t('admin.orders.empty.title')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{t('admin.orders.empty.subtitle')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Desktop Table */}
      <div className="hidden xl:block">
        <OrdersTableDesktop orders={orders} locale={locale} t={t} />
      </div>

      {/* Tablet/Mobile Cards */}
      <div className="xl:hidden">
        <OrdersTableMobile orders={orders} locale={locale} t={t} />
      </div>
    </div>
  );
}

