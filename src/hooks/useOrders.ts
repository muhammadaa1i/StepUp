"use client";

import { useState, useEffect, useRef } from "react";
import { Order } from "@/types";
import { useOrderFetching } from "./orders/useOrderFetching";
import { useOrderAutoRefresh } from "./orders/useOrderAutoRefresh";

export type { UseOrdersProps, UseOrdersResult } from "./orders/types";

export default function useOrders(
  isAuthenticated: boolean,
  t: (key: string) => string
) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lastFetchRef = useRef<number>(0);

  // Order fetching logic
  const { fetchOrders } = useOrderFetching(
    setOrders,
    setFilteredOrders,
    setIsLoading,
    lastFetchRef,
    t
  );

  // Auto-refresh on focus/visibility with 15s cooldown
  useOrderAutoRefresh(fetchOrders, lastFetchRef, 15000);

  // Initial fetch when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

  // Update filtered orders when orders change
  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  return {
    orders,
    filteredOrders,
    isLoading,
    fetchOrders,
  };
}
