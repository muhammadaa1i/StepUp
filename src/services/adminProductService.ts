/**
 * Simplified admin product service
 */

import modernApiClient from "@/lib/modernApiClient";
import { ProductEndpoints } from "@/lib/api/endpoints";
import { Slipper } from "@/types";
import { parseProductListResponse, ProductListResult } from "./utils/productParser";

export interface ProductListParams {
  skip?: number;
  limit?: number;
  page?: number;
  include_images?: boolean;
  [k: string]: unknown;
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
      { cache: true, timeout: 5000, retries: 1 }
    );

    return parseProductListResponse(resp, params);
  },

  async create(payload: ProductPayload): Promise<Slipper> {
    const resp = await modernApiClient.post(ProductEndpoints.CREATE, payload);
    return (resp as { data?: Slipper })?.data ?? (resp as Slipper);
  },

  async update(id: number, payload: ProductPayload): Promise<Slipper> {
    const resp = await modernApiClient.put(ProductEndpoints.UPDATE(id), payload);
    return (resp as { data?: Slipper })?.data ?? (resp as Slipper);
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
    return (resp as { data?: Slipper })?.data ?? (resp as Slipper);
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
    const data = (resp as { data?: Array<any> })?.data ?? resp;
    return (Array.isArray(data) ? data : []) as Array<{
      id: number;
      image_url: string;
      is_primary?: boolean;
      alt_text?: string;
    }>;
  },

  async deleteImage(productId: number, imageId: number): Promise<void> {
    await modernApiClient.delete(ProductEndpoints.DELETE_IMAGE(productId, imageId));
  },

  async setPrimaryImage(productId: number, imageId: number): Promise<void> {
    await modernApiClient.put(ProductEndpoints.SET_PRIMARY_IMAGE(productId, imageId));
  }
};
