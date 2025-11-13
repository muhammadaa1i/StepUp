"use client";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n";
import { DashboardStats } from "@/services/adminDashboardService";
import { UseAdminDashboardReturn } from "./admin-dashboard/types";
import { useStatsFetching } from "./admin-dashboard/useStatsFetching";
import { useStatCards } from "./admin-dashboard/useStatCards";

export function useAdminDashboard(): UseAdminDashboardReturn {
  const { t } = useI18n();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [changedStats, setChangedStats] = useState<Set<keyof DashboardStats>>(new Set());

  const prevStatsRef = useRef<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });

  const isMountedRef = useRef(true);

  const { fetchStats, clearTimerRef } = useStatsFetching({
    prevStatsRef,
    isMountedRef,
    setStats,
    setChangedStats,
    setLastUpdated,
    setIsLoading,
  });

  useEffect(() => {
    isMountedRef.current = true;
    fetchStats();
    const timerRef = clearTimerRef;
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { statCards } = useStatCards({ stats, t });

  return { t, stats, isLoading, lastUpdated, changedStats, statCards, fetchStats };
}

export default useAdminDashboard;
