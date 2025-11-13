export interface PaginationState {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoryFilters {
  skip?: number;
  limit?: number;
}

export interface CategoryFormData {
  name: string;
  description: string;
  is_active: boolean;
}
