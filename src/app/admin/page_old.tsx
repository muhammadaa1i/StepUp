"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStatsGrid, { type StatCard } from "@/components/admin/DashboardStatsGrid";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

// Slim, SRP-friendly legacy page using the shared hook + grid
export default function AdminDashboardLegacy() {
  const { t, isLoading, statCards, changedStats } = useAdminDashboard();
  const cards = statCards as StatCard[]; // align types with grid props
  const changed = changedStats as Set<StatCard["key"]>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('admin.dashboard.title')}</h1>
            </div>
          </div>
        </div>

        <DashboardStatsGrid isLoading={isLoading} cards={cards} changed={changed} />
      </div>
    </AdminLayout>
  );
}
