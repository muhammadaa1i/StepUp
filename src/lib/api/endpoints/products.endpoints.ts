/**
 * Product (StepUps) Endpoints
 * All product-related API endpoints
 * Following SRP: Product management concerns only
 */

import { EndpointBuilder } from "./builder";

const PRODUCTS_BASE = "/stepups/";

export const ProductEndpoints = {
  /**
   * List all products (Read Slippers)
   * GET /stepups/
   */
  LIST: PRODUCTS_BASE,

  /**
   * Create new product
   * POST /stepups/
   */
  CREATE: PRODUCTS_BASE,

  /**
   * Get product by ID (Read Slipper)
   * GET /stepups/{slipper_id}
   */
  BY_ID: (id: number) => `${PRODUCTS_BASE}${id}`,

  /**
   * Update product by ID
   * PUT /stepups/{slipper_id}
   */
  UPDATE: (id: number) => `${PRODUCTS_BASE}${id}`,

  /**
   * Delete product by ID
   * DELETE /stepups/{slipper_id}
   */
  DELETE: (id: number) => `${PRODUCTS_BASE}${id}`,

  /**
   * Upload images for product
   * POST /stepups/{slipper_id}/upload-images
   */
  UPLOAD_IMAGES: (id: number) => `${PRODUCTS_BASE}${id}/upload-images`,

  /**
   * Get product images
   * GET /stepups/{slipper_id}/images
   */
  IMAGES: (id: number) => `${PRODUCTS_BASE}${id}/images`,

  /**
   * Delete specific product image
   * DELETE /stepups/{slipper_id}/images/{image_id}
   */
  DELETE_IMAGE: (slipperId: number, imageId: number) =>
    `${PRODUCTS_BASE}${slipperId}/images/${imageId}`,

  /**
   * Set primary image for product
   * PUT /stepups/{slipper_id}/images/{image_id}/set-primary
   */
  SET_PRIMARY_IMAGE: (slipperId: number, imageId: number) =>
    `${PRODUCTS_BASE}${slipperId}/images/${imageId}/set-primary`,
} as const;

/**
 * Type-safe product endpoint builder
 */
export const productEndpointBuilder = new EndpointBuilder(PRODUCTS_BASE);
