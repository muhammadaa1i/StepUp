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
      const endpoints = [
        API_ENDPOINTS.USERS,
        API_ENDPOINTS.SLIPPERS,
        API_ENDPOINTS.ORDERS,
      ];
      
      await Promise.all(
        endpoints.map(endpoint =>
          modernApiClient.get(
            endpoint,
            { limit: 1 },
            { cache: true, timeout: 2000, retries: 0 }
          ).catch(() => {})
        )
      );
    } catch {
      // Silent fail
    }
  },

  /**
   * Prefetch all admin data
   */
  async prefetchAll() {
    // Run all prefetches in parallel, but don't wait for them
    Promise.all([
      this.prefetchDashboard(),
      this.prefetchUsers(),
      this.prefetchOrders(),
      this.prefetchProducts(),
      this.prefetchCategories(),
    ]).catch(() => {});
  },
};
