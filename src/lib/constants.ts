/**
 * Re-export from new modular endpoint system
 * All endpoints now organized by domain with proper SRP
 */
export { 
  API_BASE_URL,
  API_ENDPOINTS,
  API_CONFIG,
  API_VERSION,
} from "@/lib/api/endpoints";

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export const PAGINATION = {
  // Show 10 items per page across admin lists (orders, products, users)
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
