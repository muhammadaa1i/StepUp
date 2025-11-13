import { Order, SearchParams } from "@/types";

export interface PaginationState {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RefundDialogState {
  showRefundDialog: boolean;
  selectedOrderForRefund: Order | null;
}

export type { SearchParams };
