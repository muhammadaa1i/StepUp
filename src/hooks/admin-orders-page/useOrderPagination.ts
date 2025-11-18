/**
 * Hook for handling pagination
 */

import { useCallback } from "react";
import { SearchParams } from "@/types";
import { PAGINATION } from "@/lib/constants";
import { PaginationState } from "./types";

interface UseOrderPaginationOptions {
  pagination: PaginationState;
  setPagination: (updater: (prev: PaginationState) => PaginationState) => void;
  setFilters: (updater: (prev: SearchParams) => SearchParams) => void;
}

export function useOrderPagination({
  pagination,
  setPagination,
  setFilters,
}: UseOrderPaginationOptions) {
  const handlePageChange = useCallback(
    (page: number) => {
      const skip = (page - 1) * pagination.limit;
      setFilters((prev) => ({ ...prev, skip }));
    },
    [pagination.limit, setFilters]
  );

  const handleLimitChange = useCallback(
    (limit: number) => {
      const safe = Math.max(1, Math.min(limit || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT));
      setPagination((prev) => ({ ...prev, limit: safe, page: 1 }));
      setFilters((prev) => ({ ...prev, limit: safe, skip: 0 }));
    },
    [setPagination, setFilters]
  );

  return { handlePageChange, handleLimitChange };
}
