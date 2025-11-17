/**
 * Product list response parser
 */

import { Slipper } from "@/types";

interface ProductListParams {
  skip?: number;
  limit?: number;
  page?: number;
  [k: string]: unknown;
}

export interface ProductListResult {
  items: Slipper[];
  total: number;
  totalPages: number;
}

type RawResponse = unknown;
type Wrap = {
  items?: Slipper[];
  data?: Slipper[];
  total?: number | string;
  pages?: number | string;
  total_pages?: number | string;
};

export function parseProductListResponse(
  resp: RawResponse,
  params: ProductListParams = {}
): ProductListResult {
  const raw = (resp as { data?: unknown })?.data ?? resp;

  let items: Slipper[] = [];
  let total = 0;
  let totalPages = 1;

  if (Array.isArray(raw)) {
    items = raw as Slipper[];
    total = items.length;
    totalPages = 1;
  } else if (raw && typeof raw === "object") {
    const w = raw as Wrap;
    if (Array.isArray(w.items)) items = w.items as Slipper[];
    else if (Array.isArray(w.data)) items = w.data as Slipper[];
    total = w.total != null ? Number(w.total) : items.length;
    totalPages = Number(
      w.pages ?? 
      w.total_pages ?? 
      Math.ceil(total / Number(params.limit || 10))
    ) || 1;
  }

  return { items, total, totalPages };
}
