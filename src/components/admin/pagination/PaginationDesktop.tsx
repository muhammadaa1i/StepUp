import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "./types";
import { buildPages } from "./buildPages";

export const PaginationDesktop: React.FC<PaginationProps> = ({
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
    <div className="hidden xl:flex justify-between items-center">
      <div className="text-sm text-gray-600">
        {t(shownKey, { count: String(count), total: String(total) })}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || isLoading}
          className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex space-x-1">
          {buildPages(totalPages, page).map((val, idx) =>
            val === "ellipsis" ? (
              <span
                key={`e-${idx}`}
                className="px-3 py-2 text-sm text-gray-500 select-none"
              >
                …
              </span>
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
                disabled={isLoading}
              >
                {val}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || isLoading}
          className="p-3 rounded-lg border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
