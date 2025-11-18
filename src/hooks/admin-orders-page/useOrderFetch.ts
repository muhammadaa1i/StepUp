/**
 * Hook for fetching orders data
 */

import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { Order, SearchParams } from "@/types";
import { PAGINATION } from "@/lib/constants";
import { AdminOrdersService } from "@/services/adminOrdersService";
import { PaginationState } from "./types";
import { useOrderNormalization } from "./useOrderNormalization";

interface UseOrderFetchOptions {
  filters: SearchParams;
  setOrders: (orders: Order[]) => void;
  setPagination: (pagination: PaginationState) => void;
  setIsLoading: (loading: boolean) => void;
  t: (key: string) => string;
}

export function useOrderFetch({
  filters,
  setOrders,
  setPagination,
  setIsLoading,
  t,
}: UseOrderFetchOptions) {
  const { normalizeOrders } = useOrderNormalization();
  const lastErrorRef = useRef<number>(0);
  const shownAuthErrorRef = useRef<boolean>(false);
  const ERROR_THROTTLE = 3000;

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const { items: rawItems, total } = await AdminOrdersService.list<any>(filters);
      const processedOrders = normalizeOrders(Array.isArray(rawItems) ? rawItems : []);

      const limit = Number(filters.limit || PAGINATION.DEFAULT_LIMIT);
      const skip = Number(filters.skip || 0);
      const windowed =
        processedOrders.length > limit 
          ? processedOrders.slice(skip, skip + limit) 
          : processedOrders;
      
      setOrders(windowed);

      // Calculate pagination
      const serverTotal = typeof total === "number" && total > 0 ? Number(total) : undefined;
      const baseTotal = serverTotal ?? processedOrders.length;
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

      // Handle 401 auth errors - only show once per session
      if (error?.status === 401) {
        if (!shownAuthErrorRef.current) {
          shownAuthErrorRef.current = true;
          toast.error(t("admin.orders.toasts.authError") || t("errors.authenticationRequired"));
        }
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
  }, [filters, setOrders, setPagination, setIsLoading, normalizeOrders, t]);

  return { fetchOrders, shownAuthErrorRef };
}
