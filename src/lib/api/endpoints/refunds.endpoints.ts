/**
 * Refund Endpoints
 * All refund-related API endpoints
 * Following SRP: Refund management concerns only
 */

import { EndpointBuilder } from "./builder";

const REFUNDS_BASE = "/refunds/";

export const RefundEndpoints = {
  /**
   * List all refund requests
   * GET /refunds/
   */
  LIST: REFUNDS_BASE,

  /**
   * Get refund request by ID
   * GET /refunds/:id
   */
  BY_ID: (id: number) => `${REFUNDS_BASE}${id}`,

  /**
   * Create refund request
   * POST /refunds/
   */
  CREATE: REFUNDS_BASE,

  /**
   * Approve refund request (admin)
   * POST /refunds/:id/approve
   */
  APPROVE: (id: number) => `${REFUNDS_BASE}${id}/approve`,

  /**
   * Reject refund request (admin)
   * POST /refunds/:id/reject
   */
  REJECT: (id: number) => `${REFUNDS_BASE}${id}/reject`,

  /**
   * Update refund request
   * PUT /refunds/:id
   */
  UPDATE: (id: number) => `${REFUNDS_BASE}${id}`,

  /**
   * Delete refund request
   * DELETE /refunds/:id
   */
  DELETE: (id: number) => `${REFUNDS_BASE}${id}`,
} as const;

/**
 * Type-safe refund endpoint builder
 */
export const refundEndpointBuilder = new EndpointBuilder(REFUNDS_BASE);

export type RefundEndpoint = typeof RefundEndpoints[keyof typeof RefundEndpoints];
