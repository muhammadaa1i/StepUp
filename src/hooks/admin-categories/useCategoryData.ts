"use client";

import { useState, useCallback, useEffect } from "react";
import { Category } from "@/types";
import { PAGINATION } from "@/lib/constants";
import adminCategoryService from "@/services/adminCategoryService";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { PaginationState, CategoryFilters } from "./types";

export function useCategoryData() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading, logout } = useAuth();
  const [pagination, setPagination] = useState<PaginationState>({
    total: 0,
    page: 1,
    limit: PAGINATION.DEFAULT_LIMIT as number,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<CategoryFilters>({
    skip: 0,
    limit: PAGINATION.DEFAULT_LIMIT,
  });

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const { items, total, totalPages } = await adminCategoryService.list(filters);
      setCategories(items);
      setPagination((prev) => ({
        ...prev,
        total,
        totalPages: totalPages || Math.ceil((total || 0) / (filters.limit || PAGINATION.DEFAULT_LIMIT)),
        page: Math.floor((filters.skip || 0) / (filters.limit || PAGINATION.DEFAULT_LIMIT)) + 1,
        limit: Number(filters.limit || PAGINATION.DEFAULT_LIMIT)
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      // If unauthorized, trigger logout and avoid noisy toast
      const status = (error as { status?: number }).status;
      if (status === 401) {
        try { logout(); } catch {}
      } else {
        toast.error("Ошибка загрузки категорий");
      }
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    // Only fetch when admin is confirmed to reduce 401 spam
    if (!authLoading && user?.is_admin) {
      fetchCategories();
    } else if (!authLoading && !user?.is_admin) {
      // Not an admin: stop loading state to allow parent to redirect
      setIsLoading(false);
      setCategories([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.is_admin, filters]);

  const handlePageChange = useCallback((page: number) => {
    const skip = (page - 1) * pagination.limit;
    setFilters((prev) => ({ ...prev, skip }));
  }, [pagination.limit]);

  return {
    categories,
    isLoading,
    pagination,
    handlePageChange,
    fetchCategories,
  };
}
