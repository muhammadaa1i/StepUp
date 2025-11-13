import { Slipper } from "@/types";

export interface UseProductDetailProps {
  productId: string;
  t: (key: string, params?: Record<string, string>) => string;
}

export interface UseProductDetailResult {
  product: Slipper | null;
  isLoading: boolean;
  hasError: boolean;
  imageUrls: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export interface ImageRecord {
  id: number;
  image_url: string;
  image_path?: string;
  is_primary?: boolean;
  alt_text?: string;
  created_at?: string;
}

export interface ProductApiResponse {
  data?: Slipper;
  [key: string]: unknown;
}

export interface ImagesApiResponse {
  data?: ImageRecord[];
  [key: string]: unknown;
}
