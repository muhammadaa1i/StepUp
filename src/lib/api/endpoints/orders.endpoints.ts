/**
 * Order Endpoints
 * All order-related API endpoints
 * Following SRP: Order management concerns only
 */

import { EndpointBuilder } from "./builder";

const ORDERS_BASE = "/orders/";

export const OrderEndpoints = {
  /**
   * List all orders
   * GET /orders/
   */
  LIST: ORDERS_BASE,

  /**
   * Get order by ID
   * GET /orders/:id
   */
  BY_ID: (id: number) => `${ORDERS_BASE}${id}`,

  /**
   * Create order from cart
   * POST /orders/from-cart
   */
  FROM_CART: `${ORDERS_BASE}from-cart`,

  /**
   * Create new order
   * POST /orders/
   */
  CREATE: ORDERS_BASE,

  /**
   * Update order by ID
   * PUT /orders/:id
   */
  UPDATE: (id: number) => `${ORDERS_BASE}${id}`,

  /**
   * Cancel order by ID
   * POST /orders/:id/cancel
   */
  CANCEL: (id: number) => `${ORDERS_BASE}${id}/cancel`,

  /**
   * Delete order by ID
   * DELETE /orders/{order_id}
   */
  DELETE: (id: number) => `${ORDERS_BASE}${id}`,
} as const;

/**
 * Type-safe order endpoint builder
 */
export const orderEndpointBuilder = new EndpointBuilder(ORDERS_BASE);

export type OrderEndpoint = typeof OrderEndpoints[keyof typeof OrderEndpoints];
