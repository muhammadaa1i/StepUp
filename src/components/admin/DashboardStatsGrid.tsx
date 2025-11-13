"use client";
import React from "react";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";

export interface StatCard {
  key: "totalUsers" | "totalProducts" | "totalOrders" | "pendingOrders";
  title: string;
  value: number;
  color: string; // tailwind bg-* color
  icon: "Users" | "Package" | "ShoppingCart" | "TrendingUp";
}

const iconMap = {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
};

interface DashboardStatsGridProps {
  isLoading: boolean;
  cards: StatCard[];
  changed?: Set<StatCard["key"]>;
}

export default function DashboardStatsGrid({ isLoading, cards }: DashboardStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card) => {
        const Icon = iconMap[card.icon];
        return (
          <div key={card.key} className={`bg-white rounded-lg shadow p-4 sm:p-6`}>
            <div className="flex items-center">
              <div className={`${card.color} rounded-md p-2 sm:p-3`}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{card.title}</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{isLoading ? '...' : card.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
