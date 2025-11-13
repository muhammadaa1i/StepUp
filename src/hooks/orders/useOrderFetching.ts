"use client";

import { useCallback } from "react";
import modernApiClient from "@/lib/modernApiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { Order } from "@/types";
import { toast } from "react-toastify";
import { normalizeOrders } from "./useOrderNormalization";

/**
 * Hook for fetching orders from API
 */
export function useOrderFetching(
  setOrders: (orders: Order[]) => void,
  setFilteredOrders: (orders: Order[]) => void,
  setIsLoading: (loading: boolean) => void,
  lastFetchRef: React.MutableRefObject<number>,
  t: (key: string) => string
) {
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await modernApiClient.get(API_ENDPOINTS.ORDERS);
      console.log("Orders API Response:", response);

      const normalizedOrders = normalizeOrders(response);
      
      setOrders(normalizedOrders);
      setFilteredOrders(normalizedOrders);
      lastFetchRef.current = Date.now();
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(t("errors.productsLoad"));
    } finally {
      setIsLoading(false);
    }
  }, [setOrders, setFilteredOrders, setIsLoading, lastFetchRef, t]);

  return { fetchOrders };
}
