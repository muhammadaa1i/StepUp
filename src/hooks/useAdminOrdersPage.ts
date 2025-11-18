"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import { useOrderData } from "./admin-orders-page/useOrderData";
import { useRefundActions } from "./admin-orders-page/useRefundActions";

export type { PaginationState, SearchParams } from "./admin-orders-page/types";

export function useAdminOrdersPage() {
  const { t, locale } = useI18n();
  const [refreshKey, setRefreshKey] = useState(0);

  // Order data fetching & pagination
  const { orders, setOrders, isLoading, pagination, handlePageChange, handleLimitChange } =
    useOrderData();

  // Refund dialog & actions
  const { showRefundDialog, selectedOrderForRefund, handleRefundClick, handleRefundConfirm, handleRefundCancel } =
    useRefundActions(setOrders, setRefreshKey);

  return {
    t,
    locale,
    orders,
    isLoading,
    pagination,
    handlePageChange,
    handleLimitChange,
    // refund state
    showRefundDialog,
    selectedOrderForRefund,
    handleRefundClick,
    handleRefundConfirm,
    handleRefundCancel,
    refreshKey,
  };
}

export default useAdminOrdersPage;
