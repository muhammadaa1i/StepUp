/**
 * Product Service
 * Handles all product-related business logic
 * Following SRP: Product domain operations only
 */

import modernApiClient from "@/lib/modernApiClient";
import { ProductEndpoints } from "@/lib/api/endpoints";
import { Slipper } from "@/types";

export interface ProductListParams { 
  skip?: number; 
  limit?: number; 
  include_images?: boolean; 
  search?: string; 
  category_id?: number;
}

interface ApiEnvelope<T> { 
  data?: T; 
  items?: T; 
  total?: number; 
  page?: number; 
  pages?: number; 
  total_pages?: number;
}

/**
 * Helper: Unwrap array from API envelope
 */
function unwrapArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  const env = value as ApiEnvelope<T[]> | undefined;
  if (Array.isArray(env?.data)) return env!.data as T[];
  if (Array.isArray(env?.items)) return env!.items as T[];
  return [];
}

/**
 * Fetch all products with optional filters
 */
export async function fetchProducts(params: ProductListParams = {}): Promise<Slipper[]> {
  const res = await modernApiClient.get(
    ProductEndpoints.LIST, 
    params as Record<string, unknown>, 
    { cache: true }
  );
  const raw = (res as ApiEnvelope<Slipper[]> | Slipper[]);
  return unwrapArray<Slipper>(raw);
}

/**
 * Fetch single product by ID
 */
export async function fetchProduct(id: number): Promise<Slipper | null> {
  try {
    const res = await modernApiClient.get(
      ProductEndpoints.BY_ID(id), 
      undefined, 
      { cache: true }
    );
    const env = res as ApiEnvelope<Slipper> | Slipper;
    if ((env as ApiEnvelope<Slipper>).data) return (env as ApiEnvelope<Slipper>).data as Slipper;
    return (env as Slipper) || null;
  } catch {
    return null;
  }
}

/**
 * Create new product
 */
export async function createProduct(payload: Partial<Slipper>): Promise<Slipper> {
  const created = await modernApiClient.post(ProductEndpoints.CREATE, payload);
  const env = created as ApiEnvelope<Slipper> | Slipper;
  return (env as ApiEnvelope<Slipper>).data || (env as Slipper);
}

/**
 * Update existing product
 */
export async function updateProduct(id: number, payload: Partial<Slipper>): Promise<void> {
  await modernApiClient.put(ProductEndpoints.UPDATE(id), payload);
}

/**
 * Delete product by ID
 */
export async function deleteProduct(id: number): Promise<void> {
  await modernApiClient.delete(ProductEndpoints.DELETE(id));
}

/**
 * Clear all product-related caches
 */
export function clearProductCaches(): void {
  modernApiClient.clearCache("/slippers");
  modernApiClient.clearCache("/slipper");
}
