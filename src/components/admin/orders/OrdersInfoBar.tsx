"use client";
import React from "react";

interface OrdersInfoBarProps {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  onLimitChange?: (limit: number) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function OrdersInfoBar({ total, page, totalPages, limit, onLimitChange, t }: OrdersInfoBarProps) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="text-sm text-gray-600">
          <span>{t('admin.orders.info.orders', { total: String(total) })}</span>
          {total > 0 && (
            <span className="ml-2 text-xs sm:text-sm text-gray-500">{t('admin.orders.info.page', { page: String(page), pages: String(totalPages) })}</span>
          )}
        </div>
        {onLimitChange && (
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <span className="hidden sm:inline">Per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {[10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  );
}
