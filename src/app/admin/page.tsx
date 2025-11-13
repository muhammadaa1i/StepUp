"use client";

import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStatsGrid, { type StatCard } from "@/components/admin/DashboardStatsGrid";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

export default function AdminDashboard() {
  const { t, isLoading, statCards, changedStats } = useAdminDashboard();
  const cards = statCards as StatCard[];
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