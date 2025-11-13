/**
 * Cart Endpoints
 * All cart-related API endpoints
 * Following SRP: Shopping cart concerns only
 */

import { EndpointBuilder } from "./builder";

const CART_BASE = "/cart";

export const CartEndpoints = {
  /**
   * Get cart
   * GET /cart
   */
  GET: CART_BASE,

  /**
   * Get cart total
   * GET /cart/total
   */
  TOTAL: `${CART_BASE}/total`,

  /**
   * Get cart items
   * GET /cart/items
   */
  ITEMS: `${CART_BASE}/items`,

  /**
   * Add item to cart
   * POST /cart/items
   */
  ADD_ITEM: `${CART_BASE}/items`,

  /**
   * Get cart item by ID
   * GET /cart/items/:id
   */
  ITEM_BY_ID: (cartItemId: number) => `${CART_BASE}/items/${cartItemId}`,

  /**
   * Update cart item by ID
   * PUT /cart/items/:id
   */
  UPDATE_ITEM: (cartItemId: number) => `${CART_BASE}/items/${cartItemId}`,

  /**
   * Delete cart item by ID
   * DELETE /cart/items/:id
   */
  DELETE_ITEM: (cartItemId: number) => `${CART_BASE}/items/${cartItemId}`,

  /**
   * Clear entire cart
   * DELETE /cart/clear
   */
  CLEAR: `${CART_BASE}/clear`,
} as const;

/**
 * Type-safe cart endpoint builder
 */
export const cartEndpointBuilder = new EndpointBuilder(CART_BASE);

export type CartEndpoint = typeof CartEndpoints[keyof typeof CartEndpoints];
