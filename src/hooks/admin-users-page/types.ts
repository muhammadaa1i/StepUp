import { User } from "@/types";

export interface PaginationState {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UseAdminUsersPageReturn {
  t: (key: string) => string;
  locale: string;
  currentUser: User | null | undefined;
  users: User[];
  isLoading: boolean;
  pagination: PaginationState;
  handlePageChange: (page: number) => void;
  handleLimitChange: (limit: number) => void;
}

export interface UsersApiResponse {
  items: User[];
  total: number;
  totalPages: number;
}
