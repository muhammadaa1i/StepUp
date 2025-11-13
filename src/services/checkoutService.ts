/**
 * Checkout Service
 * Handles order creation and checkout flow
 * Following SRP: Checkout and order creation concerns only
 */

import { modernApiClient } from "@/lib/modernApiClient";
import { OrderEndpoints, buildUrlWithParams } from "@/lib/api/endpoints";
import { Order } from "@/types";
import { PaymentService, PaymentResponse } from "@/services/paymentService";

type ApiEnvelope<T> = { data?: T; item?: T; items?: T; order?: T } | T;

/**
 * Helper: Normalize order response from various API envelope formats
 */
function normalizeOrder(raw: ApiEnvelope<Partial<Order>>): Order {
  const container = raw as Record<string, unknown> & {
    data?: unknown;
    order?: unknown;
    item?: unknown;
  };
  const apiOrder = (
    container.data || container.order || container.item || raw
  ) as Partial<Order>;
  
  const id = (
    apiOrder.id ?? 
    (apiOrder.order_id ? parseInt(String(apiOrder.order_id), 10) : undefined)
  ) as number | undefined;
  
  const nowISO = new Date().toISOString();
  return {
    id: id || 0,
    order_id: apiOrder.order_id,
    user_id: (apiOrder.user_id ?? 0) as number,
    items: (apiOrder.items as unknown[]) as Order["items"],
    status: (apiOrder.status as Order["status"]) || "CREATED",
    total_amount: (apiOrder.total_amount as number) ?? 0,
    notes: apiOrder.notes,
    payment_method: apiOrder.payment_method,
    created_at: apiOrder.created_at || nowISO,
    updated_at: apiOrder.updated_at || apiOrder.created_at || nowISO,
  } as Order;
}

export interface CreateOrderOptions {
  clearCart?: boolean;
  timeout?: number;
  retryCount?: number;
}

/**
 * Create order from cart items
 * Automatically clears cart if specified
 */
export async function createOrderFromCart(options: CreateOrderOptions = {}): Promise<Order> {
  const { clearCart = false, timeout = 6000, retryCount = 1 } = options;
  const endpoint = buildUrlWithParams(OrderEndpoints.FROM_CART, { clear_cart: clearCart });

  let attempt = 0;
  while (true) {
    try {
      const res = await modernApiClient.post(endpoint, undefined, { timeout });
      return normalizeOrder(res as ApiEnvelope<Partial<Order>>);
    } catch (err) {
      if (attempt++ >= retryCount) throw err;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
}

/**
 * Get order status by ID
 */
export async function getOrderStatus(orderId: number): Promise<string | undefined> {
  const res = await modernApiClient.get(OrderEndpoints.BY_ID(Number(orderId)));
  const any = res as Record<string, unknown> & { data?: { status?: string } };
  return (any.status as string) || any?.data?.status as string | undefined;
}

export interface CreatePaymentOptions {
  timeout?: number;
  retryCount?: number;
}

/**
 * Create payment for an order
 * Handles retries automatically
 */
export async function createPaymentForOrder(params: {
  orderId: number;
  amount: number;
  description: string;
}, options: CreatePaymentOptions = {}): Promise<PaymentResponse> {
  const { timeout = 4000, retryCount = 1 } = options;
  let attempt = 0;
  while (true) {
    try {
      return await PaymentService.createPayment({
        amount: PaymentService.formatAmount(params.amount),
        description: params.description,
        order_id: params.orderId,
      }, timeout);
    } catch (err) {
      if (attempt++ >= retryCount) throw err;
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
}
