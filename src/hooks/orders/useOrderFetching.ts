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
  isAuthenticated: boolean,
  setOrders: (orders: Order[]) => void,
  setFilteredOrders: (orders: Order[]) => void,
  setIsLoading: (loading: boolean) => void,
  lastFetchRef: React.MutableRefObject<number>,
  t: (key: string) => string,
  setAuthError: (v: boolean) => void
) {
  const fetchOrders = useCallback(async () => {
    // Don't hit protected endpoint if not authenticated
    if (!isAuthenticated) return;

    // Extra safety: ensure we actually have an access token to avoid a guaranteed 401
    let hasAccess = false;
    if (typeof document !== "undefined") {
      try {
        hasAccess = document.cookie.includes("access_token=") ||
          !!localStorage.getItem("access_token");
      } catch {
        hasAccess = document.cookie.includes("access_token=");
      }
    }
    if (!hasAccess) {
      return; // Skip fetch; auth context will transition and page will show auth required UI
    }
    try {
      setIsLoading(true);

      const response = await modernApiClient.get(API_ENDPOINTS.ORDERS);
      console.log("Orders API Response:", response);

      const normalizedOrders = normalizeOrders(response);
      
      setOrders(normalizedOrders);
      setFilteredOrders(normalizedOrders);
      lastFetchRef.current = Date.now();
    } catch (error: any) {
      const status = (error && typeof error === 'object' && 'status' in error) ? Number(error.status) : undefined;
      const msg = String(error?.message || "");
      const isAuthError = status === 401 ||
        msg.includes("Authentication required") ||
        msg.includes("Unauthorized") ||
        msg.includes("Incorrect name or password") ||
        msg.includes("401");

      if (isAuthError) {
        setAuthError(true);
      } else {
        console.error("Error fetching orders:", error);
        toast.error(t("errors.ordersLoad") || t("errors.default"));
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, setOrders, setFilteredOrders, setIsLoading, lastFetchRef, t, setAuthError]);

  return { fetchOrders };
}
