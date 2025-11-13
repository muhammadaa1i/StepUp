import { Dispatch, MutableRefObject, SetStateAction, useCallback, useRef } from "react";
import { AdminDashboardService, DashboardStats } from "@/services/adminDashboardService";

interface UseStatsFetchingProps {
  prevStatsRef: MutableRefObject<DashboardStats>;
  isMountedRef: MutableRefObject<boolean>;
  setStats: Dispatch<SetStateAction<DashboardStats>>;
  setChangedStats: Dispatch<SetStateAction<Set<keyof DashboardStats>>>;
  setLastUpdated: Dispatch<SetStateAction<Date | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export function useStatsFetching({
  prevStatsRef,
  isMountedRef,
  setStats,
  setChangedStats,
  setLastUpdated,
  setIsLoading,
}: UseStatsFetchingProps) {
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      if (!isMountedRef.current) return;
      setIsLoading(true);
      const newStats = await AdminDashboardService.fetchCounts();

      // detect changes using ref to avoid hook deps loop
      const changed = new Set<keyof DashboardStats>();
      (Object.keys(newStats) as (keyof DashboardStats)[]).forEach((k) => {
        if (prevStatsRef.current[k] !== newStats[k]) changed.add(k);
      });

      if (!isMountedRef.current) return;
      setStats(newStats);
      setChangedStats(changed);
      setLastUpdated(new Date());
      prevStatsRef.current = newStats;

      // auto-clear changed after 3s
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
      clearTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) setChangedStats(new Set());
      }, 3000);
    } catch (error) {
      // Silently handle errors to prevent infinite loops
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { fetchStats, clearTimerRef };
}
