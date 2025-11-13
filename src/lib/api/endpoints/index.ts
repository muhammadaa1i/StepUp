/**
 * API Endpoints - Main Export
 * Central hub for all API endpoints with proper modular structure
 * Following SRP: Each domain has its own endpoint module
 */

// Re-export all endpoint modules
export { AuthEndpoints } from "./auth.endpoints";
export { ProductEndpoints, productEndpointBuilder } from "./products.endpoints";
export { OrderEndpoints, orderEndpointBuilder } from "./orders.endpoints";
export { PaymentEndpoints } from "./payments.endpoints";
export { UserEndpoints, userEndpointBuilder } from "./users.endpoints";
export { CategoryEndpoints, categoryEndpointBuilder } from "./categories.endpoints";
export { CartEndpoints, cartEndpointBuilder } from "./cart.endpoints";
export { RefundEndpoints, refundEndpointBuilder } from "./refunds.endpoints";

// Re-export configuration and utilities
export { API_BASE_URL, API_CONFIG, API_VERSION } from "./config";
export { 
  buildUrlWithParams, 
  buildResourceUrl, 
  buildNestedResourceUrl,
  EndpointBuilder 
} from "./builder";

// Export all endpoint types
export type { AuthEndpoint } from "./auth.endpoints";
export type { OrderEndpoint } from "./orders.endpoints";
export type { PaymentEndpoint } from "./payments.endpoints";
export type { UserEndpoint } from "./users.endpoints";
export type { CategoryEndpoint } from "./categories.endpoints";
export type { CartEndpoint } from "./cart.endpoints";
export type { RefundEndpoint } from "./refunds.endpoints";
export type { ApiVersion } from "./config";

/**
 * Unified API Endpoints object (backward compatibility)
 * @deprecated Use individual endpoint modules instead (AuthEndpoints, ProductEndpoints, etc.)
 */
export const API_ENDPOINTS = {
  // Auth
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  FORGOT_PASSWORD: "/auth/forgot-password",

  // Users
  USERS: "/users/",
  USER_PROFILE: "/users/me",
  USER_BY_ID: (id: number) => `/users/${id}`,

  // Products (StepUps)
  SLIPPERS: "/stepups/",
  SLIPPER_BY_ID: (id: number) => `/stepups/${id}`,
  SLIPPER_UPLOAD_IMAGES: (id: number) => `/stepups/${id}/upload-images`,
  SLIPPER_IMAGES: (id: number) => `/stepups/${id}/images`,
  SLIPPER_UPDATE_IMAGE: (slipperId: number, imageId: number) => 
    `/stepups/${slipperId}/images/${imageId}`,
  SLIPPER_DELETE_IMAGE: (slipperId: number, imageId: number) =>
    `/stepups/${slipperId}/images/${imageId}`,

  // Orders
  ORDERS: "/orders/",
  ORDERS_FROM_CART: "/orders/from-cart",
  ORDER_BY_ID: (id: number) => `/orders/${id}`,

  // Categories
  CATEGORIES: "/categories/",
  CATEGORY_BY_ID: (id: number) => `/categories/${id}`,

  // Payments (OCTO)
  PAYMENT_CREATE: "/payments/octo/create",
  PAYMENT_REFUND: "/payments/octo/refund",
  PAYMENT_NOTIFY: "/payments/octo/notify",

  // Refund requests
  REFUND_REQUESTS: "/refunds/",
  REFUND_REQUEST_BY_ID: (id: number) => `/refunds/${id}`,
  REFUND_APPROVE: (id: number) => `/refunds/${id}/approve`,
  REFUND_REJECT: (id: number) => `/refunds/${id}/reject`,

  // Cart
  CART: "/cart",
  CART_TOTAL: "/cart/total",
  CART_ITEMS: "/cart/items",
  CART_ITEM_BY_ID: (cartItemId: number) => `/cart/items/${cartItemId}`,
  CART_CLEAR: "/cart/clear",
} as const;
