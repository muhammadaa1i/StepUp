/**
 * API Configuration
 * Central configuration for API base URL and global settings
 * Following SRP: Single source of truth for API configuration
 */

/**
 * Base API URL - New backend endpoint
 * Updated to use stepupy.duckdns.org
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://stepupy.duckdns.org"
).replace(/\/$/, ""); // Remove trailing slash

/**
 * API Configuration constants
 */
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 10000, // 10 seconds default timeout
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

/**
 * API Version prefix for future versioning support
 */
export const API_VERSION = {
  V1: "/api/v1",
  CURRENT: "", // No version prefix for now, ready for migration
} as const;

export type ApiVersion = typeof API_VERSION[keyof typeof API_VERSION];
