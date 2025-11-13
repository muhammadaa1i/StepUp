"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import OrdersPagination from "@/components/admin/orders/OrdersPagination";
import RefundConfirmDialog from "@/components/admin/RefundConfirmDialog";
import { useAdminOrdersPage } from "@/hooks/useAdminOrdersPage";

export default function AdminOrdersPage() {
  const {
    t,
    locale,
    orders,
    isLoading,
    pagination,
  handlePageChange,
    // refund state
    showRefundDialog,
    selectedOrderForRefund,
    handleRefundClick,
    handleRefundConfirm,
    handleRefundCancel,
  } = useAdminOrdersPage();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('admin.orders.title')}</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">{t('admin.orders.subtitle')}</p>
          </div>
        </div>

        <OrdersTable orders={orders} isLoading={isLoading} locale={locale} onRefundClick={handleRefundClick} />

        <OrdersPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          count={orders.length}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          t={t}
        />
      </div>

      <RefundConfirmDialog
        key={selectedOrderForRefund?.id || 'no-order'}
        isOpen={showRefundDialog}
        order={selectedOrderForRefund}
        onConfirm={handleRefundConfirm}
        onCancel={handleRefundCancel}
      />
    </AdminLayout>
  );
}
