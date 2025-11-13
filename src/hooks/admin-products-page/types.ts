import { Slipper } from "@/types";

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ProductFormData {
  name: string;
  size: string;
  price: string;
  quantity: string;
  is_available: boolean;
}

export interface ProductImage {
  id: number;
  image_url: string;
  is_primary?: boolean;
  alt_text?: string;
}

export interface UploadProgress {
  current: number;
  total: number;
}
