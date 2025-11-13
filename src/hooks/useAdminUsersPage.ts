"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/i18n";
import { User, SearchParams } from "@/types";
import { PAGINATION } from "@/lib/constants";
import { PaginationState, UseAdminUsersPageReturn } from "./admin-users-page/types";
import { useUsersFetching } from "./admin-users-page/useUsersFetching";
import { usePaginationHandlers } from "./admin-users-page/usePaginationHandlers";

export function useAdminUsersPage(): UseAdminUsersPageReturn {
  const { t, locale } = useI18n();
  const { user: currentUser, isLoading: authLoading, logout } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    total: 0,
    page: 1,
    limit: PAGINATION.DEFAULT_LIMIT as number,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<SearchParams>({ skip: 0, limit: PAGINATION.DEFAULT_LIMIT });

  const { fetchUsers } = useUsersFetching({
    filters,
    t,
    logout,
    setUsers,
    setPagination,
    setIsLoading,
    setHasError,
  });

  useEffect(() => {
    // Don't retry if there was an error
    if (hasError) return;
    
    if (!authLoading && currentUser?.is_admin) {
      fetchUsers();
    } else if (!authLoading && !currentUser?.is_admin) {
      setIsLoading(false);
      setUsers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, currentUser?.is_admin, filters, hasError]);

  const { handlePageChange, handleLimitChange } = usePaginationHandlers({
    pagination,
    setFilters,
    setPagination,
  });

  return {
    t,
    locale,
    currentUser,
    users,
    isLoading,
    pagination,
    handlePageChange,
    handleLimitChange,
  };
}

export default useAdminUsersPage;
