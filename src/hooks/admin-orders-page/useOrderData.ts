"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useI18n } from "@/i18n";
import { Order, SearchParams } from "@/types";
import { PAGINATION } from "@/lib/constants";
import { AdminOrdersService } from "@/services/adminOrdersService";
import { toast } from "react-toastify";
import { PaginationState } from "./types";
import { useOrderNormalization } from "./useOrderNormalization";

export function useOrderData() {
  const { t } = useI18n();
  const { normalizeOrders } = useOrderNormalization();
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
  
  const lastErrorRef = useRef<number>(0);
  const shownAuthErrorRef = useRef<boolean>(false); // Track if auth error was already shown
  const ERROR_THROTTLE = 3000; // Only show error once every 3 seconds

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const { items: rawItems, total } = await AdminOrdersService.list<any>(filters);
      const processedOrders = normalizeOrders(Array.isArray(rawItems) ? rawItems : []);

      const limit = Number(filters.limit || PAGINATION.DEFAULT_LIMIT);
      const skip = Number(filters.skip || 0);
      const windowed =
        processedOrders.length > limit ? processedOrders.slice(skip, skip + limit) : processedOrders;
      setOrders(windowed);

      // Prefer server total if provided; otherwise use processed length.
      const serverTotal = typeof total === "number" && total > 0 ? Number(total) : undefined;
      const baseTotal = serverTotal ?? processedOrders.length;
      // Heuristic: if exactly a full page is returned, assume there may be another page.
      const estimatedFromWindow = skip + windowed.length + (windowed.length === limit ? 1 : 0);
      const effectiveTotal = Math.max(baseTotal, estimatedFromWindow);
      const computedTotalPages = Math.max(1, Math.ceil(effectiveTotal / limit));

      setPagination({
        total: effectiveTotal,
        page: Math.floor(skip / limit) + 1,
        limit,
        totalPages: computedTotalPages,
      });
      
      // Reset auth error flag on successful fetch
      shownAuthErrorRef.current = false;
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      
      // Handle 401 auth errors specially - only show once per session
      if (error?.status === 401) {
        if (!shownAuthErrorRef.current) {
          shownAuthErrorRef.current = true;
          toast.error(t("admin.orders.toasts.authError") || t("errors.authenticationRequired"));
        }
        // Silently fail on subsequent attempts
        return;
      }
      
      // For other errors, throttle to prevent duplicates
      const now = Date.now();
      if (now - lastErrorRef.current > ERROR_THROTTLE) {
        lastErrorRef.current = now;
        toast.error(t("admin.orders.toasts.loadError"));
      }
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handlePageChange = useCallback(
    (page: number) => {
      const skip = (page - 1) * pagination.limit;
      setFilters((prev) => ({ ...prev, skip }));
    },
    [pagination.limit]
  );

  const handleLimitChange = useCallback((limit: number) => {
    const safe = Math.max(1, Math.min(limit || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT));
    setPagination((prev) => ({ ...prev, limit: safe, page: 1 }));
    setFilters((prev) => ({ ...prev, limit: safe, skip: 0 }));
  }, []);

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
