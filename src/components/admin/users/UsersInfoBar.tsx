"use client";
import React from "react";

interface UsersInfoBarProps {
  total: number;
  page: number;
  totalPages: number;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function UsersInfoBar({ total, page, totalPages, t }: UsersInfoBarProps) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="text-sm text-gray-600">
          <span>{t('admin.orders.info.orders', { total: String(total) })}</span>
          {total > 0 && (
            <span className="ml-2 text-xs sm:text-sm text-gray-500">{t('admin.orders.info.page', { page: String(page), pages: String(totalPages) })}</span>
          )}
        </div>
      </div>
    </div>
  );
}
