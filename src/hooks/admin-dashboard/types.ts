import { DashboardStats } from "@/services/adminDashboardService";

export interface UseAdminDashboardReturn {
  t: (key: string) => string;
  stats: DashboardStats;
  isLoading: boolean;
  lastUpdated: Date | null;
  changedStats: Set<keyof DashboardStats>;
  statCards: StatCard[];
  fetchStats: () => Promise<void>;
}

export interface StatCard {
  key: keyof DashboardStats;
  title: string;
  value: number;
  color: string;
  icon: string;
}
