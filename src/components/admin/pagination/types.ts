export interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  count: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  t: (key: string, params?: Record<string, string>) => string;
  shownKey: string;
}
