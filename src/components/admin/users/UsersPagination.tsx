"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UsersPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  count: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function UsersPagination({ page, totalPages, total, count, isLoading, onPageChange, t }: UsersPaginationProps) {
  if (totalPages <= 1) return null;

  const buildPages = () => {
    const items: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let p = 1; p <= totalPages; p++) items.push(p);
    } else {
      items.push(1);
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      if (start > 2) items.push('ellipsis');
      for (let p = start; p <= end; p++) items.push(p);
      if (end < totalPages - 1) items.push('ellipsis');
      items.push(totalPages);
    }
    return items;
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
      {/* Mobile/Tablet */}
      <div className="xl:hidden">
        <div className="text-sm text-gray-600 text-center mb-4">
          {t('admin.products.pagination.shown', { count: String(count), total: String(total) })}
        </div>
        <div className="flex justify-between items-center">
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1 || isLoading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-lg shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{t('common.previous')}</span>
            <span className="sm:hidden">{t('common.previous')}</span>
          </button>
          <span className="text-sm text-gray-700">
            <span className="hidden sm:inline">{t('common.page')} {page} {t('common.of')} {totalPages}</span>
            <span className="sm:hidden">{page}/{totalPages}</span>
          </span>
          <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages || isLoading} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-lg shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            <span className="hidden sm:inline">{t('common.next')}</span>
            <span className="sm:hidden">{t('common.next')}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden xl:flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {t('admin.products.pagination.shown', { count: String(count), total: String(total) })}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1 || isLoading} className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex space-x-1">
            {buildPages().map((val, idx) => val === 'ellipsis' ? (
              <span key={`e-${idx}`} className="px-3 py-2 text-sm text-gray-500 select-none">…</span>
            ) : (
              <button
                key={val}
                onClick={() => onPageChange(val)}
                className={`px-4 py-2 rounded-lg border font-medium text-sm shadow-sm transition-colors ${val === page ? 'bg-emerald-500 text-white border-emerald-500 cursor-default pointer-events-none' : 'hover:bg-gray-50 border-gray-300'}`}
                aria-current={val === page ? 'page' : undefined}
                disabled={isLoading}
              >
                {val}
              </button>
            ))}
          </div>
          <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages || isLoading} className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
