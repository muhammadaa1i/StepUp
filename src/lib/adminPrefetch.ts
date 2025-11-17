import modernApiClient from "./modernApiClient";
import { API_ENDPOINTS } from "./constants";

/**
 * Prefetch admin data in the background to improve perceived performance
 */
export const AdminPrefetch = {
  /**
   * Prefetch users list
   */
  async prefetchUsers() {
    try {
      await modernApiClient.get(
        API_ENDPOINTS.USERS,
        { skip: 0, limit: 10 },
        { cache: true, timeout: 3000, retries: 0 }
      );
    } catch {
      // Silent fail - it's just prefetch
    }
  },

  /**
   * Prefetch orders list
   */
  async prefetchOrders() {
    try {
      await modernApiClient.get(
        API_ENDPOINTS.ORDERS,
        { skip: 0, limit: 10 },
        { cache: true, timeout: 3000, retries: 0 }
      );
    } catch {
      // Silent fail
    }
  },

  /**
   * Prefetch products list
   */
  async prefetchProducts() {
    try {
      await modernApiClient.get(
        API_ENDPOINTS.SLIPPERS,
        { skip: 0, limit: 10, include_images: false },
        { cache: true, timeout: 3000, retries: 0 }
      );
    } catch {
      // Silent fail
    }
  },

  /**
   * Prefetch categories
   */
  async prefetchCategories() {
    try {
      await modernApiClient.get(
        API_ENDPOINTS.CATEGORIES,
        { skip: 0, limit: 10 },
        { cache: true, timeout: 3000, retries: 0 }
      );
    } catch {
      // Silent fail
    }
  },

  /**
   * Prefetch dashboard stats
   */
  async prefetchDashboard() {
    try {
      // Just get counts, not full lists
      const endpoints = [
        { url: API_ENDPOINTS.USERS, params: { skip: 0, limit: 1 } },
        { url: API_ENDPOINTS.SLIPPERS, params: { skip: 0, limit: 1, include_images: false } },
        { url: API_ENDPOINTS.ORDERS, params: { skip: 0, limit: 1 } },
      ];
      
      await Promise.all(
        endpoints.map(({ url, params }) =>
          modernApiClient.get(
            url,
            params,
            { cache: true, timeout: 2000, retries: 0 }
          ).catch(() => {})
        )
      );
    } catch {
      // Silent fail
    }
  },

  /**
   * Prefetch all admin data (use sparingly - only on dashboard)
   */
  async prefetchAll() {
    // Only prefetch minimal data for dashboard stats
    // Individual pages will load their full data when needed
    this.prefetchDashboard().catch(() => {});
  },
};
