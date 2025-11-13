/**
 * Admin Product Service
 * Handles admin product management operations
 * Following SRP: Admin product CRUD and image management
 */

import modernApiClient from "@/lib/modernApiClient";
import { ProductEndpoints } from "@/lib/api/endpoints";
import { Slipper } from "@/types";

export interface ProductListParams {
  skip?: number;
  limit?: number;
  page?: number;
  include_images?: boolean;
  [k: string]: unknown;
}

export interface ProductListResult {
  items: Slipper[];
  total: number;
  totalPages: number;
}

export interface ProductPayload {
  name: string;
  size: string;
  price: number;
  quantity: number;
  is_available: boolean;
}

export const AdminProductService = {
  async list(params: ProductListParams = {}): Promise<ProductListResult> {
    const resp = await modernApiClient.get(
      ProductEndpoints.LIST,
      params as Record<string, unknown>,
      { cache: true, timeout: 5000, retries: 1 } // Enable caching for speed
    );

    const raw: unknown = (resp as { data?: unknown })?.data ?? resp;
    type Wrap = {
      items?: Slipper[];
      data?: Slipper[];
      total?: number | string;
      pages?: number | string;
      total_pages?: number | string;
    };

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
  },

  async create(payload: ProductPayload): Promise<Slipper> {
    const resp = await modernApiClient.post(ProductEndpoints.CREATE, payload);
    const data = (resp as { data?: Slipper })?.data ?? (resp as Slipper);
    return data as Slipper;
  },

  async update(id: number, payload: ProductPayload): Promise<Slipper> {
    const resp = await modernApiClient.put(ProductEndpoints.UPDATE(id), payload);
    const data = (resp as { data?: Slipper })?.data ?? (resp as Slipper);
    return data as Slipper;
  },

  async remove(id: number): Promise<void> {
    try {
      await modernApiClient.delete(ProductEndpoints.DELETE(id));
    } catch (err) {
      const status = (err as { status?: number })?.status;
      if (status === 404) {
        const altEndpoint = ProductEndpoints.BY_ID(id).replace(/\/$/, "");
        await modernApiClient.delete(altEndpoint);
      } else {
        throw err;
      }
    }
  },

  async toggleAvailable(id: number, is_available: boolean): Promise<Slipper> {
    const resp = await modernApiClient.put(ProductEndpoints.UPDATE(id), { is_available });
    const data = (resp as { data?: Slipper })?.data ?? (resp as Slipper);
    return data as Slipper;
  },

  async getImages(productId: number): Promise<Array<{
    id: number;
    image_url: string;
    is_primary?: boolean;
    alt_text?: string;
  }>> {
    const resp = await modernApiClient.get(
      ProductEndpoints.IMAGES(productId),
      undefined,
      { cache: false, force: true }
    );
    const data = (resp as {
      data?: Array<{
        id: number;
        image_url: string;
        is_primary?: boolean;
        alt_text?: string;
      }>;
    })?.data ?? resp;
    return (Array.isArray(data) ? data : []) as Array<{
      id: number;
      image_url: string;
      is_primary?: boolean;
      alt_text?: string;
    }>;
  },

  async deleteImage(productId: number, imageId: number): Promise<void> {
    await modernApiClient.delete(
      ProductEndpoints.DELETE_IMAGE(productId, imageId)
    );
  },

  async setPrimaryImage(productId: number, imageId: number): Promise<void> {
    await modernApiClient.put(
      ProductEndpoints.SET_PRIMARY_IMAGE(productId, imageId)
    );
  }
};
