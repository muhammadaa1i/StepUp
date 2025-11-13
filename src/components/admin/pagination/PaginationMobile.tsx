import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "./types";

export const PaginationMobile: React.FC<PaginationProps> = ({
  page,
  totalPages,
  total,
  count,
  isLoading,
  onPageChange,
  t,
  shownKey,
}) => {
  return (
    <div className="xl:hidden">
      <div className="text-sm text-gray-600 text-center mb-4">
        {t(shownKey, { count: String(count), total: String(total) })}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-lg shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{t("common.previous")}</span>
          <span className="sm:hidden">{t("common.previous")}</span>
        </button>
        <span className="text-sm text-gray-700">
          <span className="hidden sm:inline">
            {t("common.page")} {page} {t("common.of")} {totalPages}
          </span>
          <span className="sm:hidden">
            {page}/{totalPages}
          </span>
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-lg shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <span className="hidden sm:inline">{t("common.next")}</span>
          <span className="sm:hidden">{t("common.next")}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
