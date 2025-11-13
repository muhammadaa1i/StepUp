/**
 * Payment Endpoints
 * All payment-related API endpoints (OCTO integration)
 * Following SRP: Payment processing concerns only
 */

const PAYMENTS_BASE = "/payments/octo";

export const PaymentEndpoints = {
  /**
   * Create payment
   * POST /payments/octo/create
   */
  CREATE: `${PAYMENTS_BASE}/create`,

  /**
   * Refund payment
   * POST /payments/octo/refund
   */
  REFUND: `${PAYMENTS_BASE}/refund`,

  /**
   * Payment notification webhook
   * POST /payments/octo/notify
   */
  NOTIFY: `${PAYMENTS_BASE}/notify`,
} as const;

export type PaymentEndpoint = typeof PaymentEndpoints[keyof typeof PaymentEndpoints];
