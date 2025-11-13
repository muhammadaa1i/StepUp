import { Dispatch, SetStateAction, useCallback } from "react";
import { SearchParams } from "@/types";
import { PAGINATION } from "@/lib/constants";
import { PaginationState } from "./types";

interface UsePaginationHandlersProps {
  pagination: PaginationState;
  setFilters: Dispatch<SetStateAction<SearchParams>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export function usePaginationHandlers({
  pagination,
  setFilters,
  setPagination,
}: UsePaginationHandlersProps) {
  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return;
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
    [setFilters, setPagination]
  );

  return { handlePageChange, handleLimitChange };
}
