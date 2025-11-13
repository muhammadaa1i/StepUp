import { Dispatch, SetStateAction } from "react";
import { User, SearchParams } from "@/types";
import { PAGINATION } from "@/lib/constants";
import { AdminUsersService } from "@/services/adminUsersService";
import { toast } from "react-toastify";
import { PaginationState } from "./types";

interface UseUsersFetchingProps {
  filters: SearchParams;
  t: (key: string) => string;
  logout: () => void;
  setUsers: Dispatch<SetStateAction<User[]>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setHasError: Dispatch<SetStateAction<boolean>>;
}

export function useUsersFetching({
  filters,
  t,
  logout,
  setUsers,
  setPagination,
  setIsLoading,
  setHasError,
}: UseUsersFetchingProps) {
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const { items, total, totalPages } = await AdminUsersService.list<User>(filters);
      setUsers(Array.isArray(items) ? items : []);
      setPagination({
        total: Number(total) || 0,
        page: Math.floor((filters.skip || 0) / (filters.limit || PAGINATION.DEFAULT_LIMIT)) + 1,
        limit: Number(filters.limit || PAGINATION.DEFAULT_LIMIT),
        totalPages: Number(totalPages) || 1,
      });
    } catch (e: unknown) {
      console.error("Error fetching users:", e);
      setHasError(true); // Set error flag to prevent retry loop
      const status = (e as { status?: number })?.status;
      const errorMessage = (e as { message?: string })?.message || "";
      
      if (status === 401) {
        try {
          logout();
        } catch {}
      } else if (errorMessage.includes("timeout")) {
        toast.error(t("admin.users.toasts.timeoutError") || "Request timeout - Please check your connection");
      } else {
        toast.error(t("admin.users.toasts.loadError"));
      }
      setUsers([]);
      setPagination((prev) => ({ ...prev, total: 0, totalPages: 1 }));
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchUsers };
}
