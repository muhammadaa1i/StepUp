/**
 * Category Endpoints
 * All category-related API endpoints
 * Following SRP: Category management concerns only
 */

import { EndpointBuilder } from "./builder";

const CATEGORIES_BASE = "/categories/";

export const CategoryEndpoints = {
  /**
   * List all categories
   * GET /categories/
   */
  LIST: CATEGORIES_BASE,

  /**
   * Get category by ID
   * GET /categories/:id
   */
  BY_ID: (id: number) => `${CATEGORIES_BASE}${id}`,

  /**
   * Create new category
   * POST /categories/
   */
  CREATE: CATEGORIES_BASE,

  /**
   * Update category by ID
   * PUT /categories/:id
   */
  UPDATE: (id: number) => `${CATEGORIES_BASE}${id}`,

  /**
   * Delete category by ID
   * DELETE /categories/:id
   */
  DELETE: (id: number) => `${CATEGORIES_BASE}${id}`,
} as const;

/**
 * Type-safe category endpoint builder
 */
export const categoryEndpointBuilder = new EndpointBuilder(CATEGORIES_BASE);

export type CategoryEndpoint = typeof CategoryEndpoints[keyof typeof CategoryEndpoints];
