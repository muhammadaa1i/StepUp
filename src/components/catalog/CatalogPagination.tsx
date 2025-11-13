"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function CatalogPagination({ page, totalPages, onPageChange }: Props) {
  const { t } = useI18n();
  
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push("ellipsis");
  }
  for (let i = startPage; i <= endPage; i++) pages.push(i);
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pages.push("ellipsis");
    pages.push(totalPages);
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label={t('common.previous')}
          title={t('common.previous')}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex space-x-1">
          {pages.map((val, idx) =>
            val === "ellipsis" ? (
              <span key={`e-${idx}`} className="px-3 py-2 text-sm text-gray-500 select-none">…</span>
            ) : (
              <button
                key={val}
                onClick={() => onPageChange(val)}
                className={`px-4 py-2 rounded-lg border font-medium text-sm shadow-sm transition-colors ${
                  val === page
                    ? "bg-emerald-500 text-white border-emerald-500 cursor-default pointer-events-none"
                    : "border-gray-300"
                }`}
                aria-current={val === page ? "page" : undefined}
                aria-label={t('common.page') + ' ' + val}
              >
                {val}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          aria-label={t('common.next')}
          title={t('common.next')}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
