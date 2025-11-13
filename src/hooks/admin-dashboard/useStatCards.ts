import { useMemo } from "react";
import { DashboardStats } from "@/services/adminDashboardService";
import { StatCard } from "./types";

interface UseStatCardsProps {
  stats: DashboardStats;
  t: (key: string) => string;
}

export function useStatCards({ stats, t }: UseStatCardsProps) {
  const statCards: StatCard[] = useMemo(
    () => [
      {
        key: "totalUsers" as const,
        title: t("admin.dashboard.stats.totalUsers"),
        value: stats.totalUsers,
        color: "bg-emerald-500",
        icon: "Users",
      },
      {
        key: "totalProducts" as const,
        title: t("admin.dashboard.stats.totalProducts"),
        value: stats.totalProducts,
        color: "bg-green-500",
        icon: "Package",
      },
      {
        key: "totalOrders" as const,
        title: t("admin.dashboard.stats.totalOrders"),
        value: stats.totalOrders,
        color: "bg-emerald-500",
        icon: "ShoppingCart",
      },
      {
        key: "pendingOrders" as const,
        title: t("admin.dashboard.stats.pendingOrders"),
        value: stats.pendingOrders,
        color: "bg-orange-500",
        icon: "TrendingUp",
      },
    ],
    [stats, t]
  );

  return { statCards };
}
