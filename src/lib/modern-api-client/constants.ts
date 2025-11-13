/**
 * Modern API client constants
 */

export const CACHE_TTL = {
  categories: 30 * 60 * 1000, // 30 minutes
  products: 3 * 60 * 1000, // 3 minutes
  productDetail: 10 * 60 * 1000, // 10 minutes
  profile: 1 * 60 * 1000, // 1 minute
  orders: 30 * 1000, // 30 seconds
  search: 2 * 60 * 1000, // 2 minutes
  default: 30 * 1000, // 30 seconds
} as const;

export const TIMEOUTS = {
  get: 3000,
  post: 5000,
  put: 10000,
  delete: 10000,
  default: 4000,
} as const;

export const MAX_CACHE_SIZE = 50;
export const REFRESH_COOLDOWN = 10_000; // 10 seconds
export const NAVIGATION_GRACE_PERIOD = 5000; // 5 seconds
export const AUTH_INVALIDATION_COOLDOWN = 5000; // 5 seconds
