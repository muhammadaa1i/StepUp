"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";
import { Order, SearchParams } from "@/types";
import { PAGINATION } from "@/lib/constants";
import { PaginationState } from "./types";
import { useOrderFetch } from "./useOrderFetch";
import { useOrderPagination } from "./useOrderPagination";
import { useTokenRefreshListener } from "./useTokenRefreshListener";

export function useOrderData() {
  const { t } = useI18n();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    total: 0,
    page: 1,
    limit: PAGINATION.DEFAULT_LIMIT as number,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<SearchParams>({
    skip: 0,
    limit: PAGINATION.DEFAULT_LIMIT,
  });

  // Fetch orders with error handling
  const { fetchOrders, shownAuthErrorRef } = useOrderFetch({
    filters,
    setOrders,
    setPagination,
    setIsLoading,
    t,
  });

  // Handle pagination
  const { handlePageChange, handleLimitChange } = useOrderPagination({
    pagination,
    setPagination,
    setFilters,
  });

  // Listen for token refresh events
  useTokenRefreshListener({
    fetchOrders,
    shownAuthErrorRef,
  });

  // Fetch orders when filters change
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    orders,
    setOrders,
    isLoading,
    pagination,
    handlePageChange,
    handleLimitChange,
    fetchOrders,
  };
}
