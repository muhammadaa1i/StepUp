/**
 * Modern API Client with caching and retry logic
 */

import { CacheEntry, RequestConfig, CacheStats, BatchRequest } from "./types";
import { TIMEOUTS } from "./constants";
import { clearCachePattern, getCacheStats } from "./cache";
import { AuthManager } from "./auth";
import { RequestExecutor } from "./request";
import { executeWithRetries } from "./retry";

class ModernApiClient {
  private cache = new Map<string, CacheEntry>();
  private pendingRequests = new Map<string, Promise<unknown>>();
  private authManager = new AuthManager();
  private requestExecutor = new RequestExecutor(this.authManager);

  async get(
    endpoint: string,
    params?: Record<string, unknown>,
    config: RequestConfig = {}
  ): Promise<unknown> {
    const { retries = 1, timeout = TIMEOUTS.get } = config;

    const requestPromise = executeWithRetries(
      () => this.requestExecutor.makeRequest(endpoint, { params, timeout }),
      retries,
      timeout
    );

    try {
      const data = await requestPromise;
      return data;
    } finally {
      // Cleanup
    }
  }

  async post(
    endpoint: string,
    data?: unknown,
    config: RequestConfig = {}
  ): Promise<unknown> {
    const { retries = 1, timeout = TIMEOUTS.post } = config;

    return executeWithRetries(
      () =>
        this.requestExecutor.makeRequest(endpoint, {
          method: "POST",
          body: data ? JSON.stringify(data) : undefined,
        }),
      retries,
      timeout
    );
  }

  async put(
    endpoint: string,
    data?: unknown,
    config: RequestConfig = {}
  ): Promise<unknown> {
    const { retries = 2, timeout = TIMEOUTS.put } = config;

    return executeWithRetries(
      () =>
        this.requestExecutor.makeRequest(endpoint, {
          method: "PUT",
          body: data ? JSON.stringify(data) : undefined,
        }),
      retries,
      timeout
    );
  }

  async delete(endpoint: string, config: RequestConfig = {}): Promise<unknown> {
    const { retries = 2, timeout = TIMEOUTS.delete } = config;

    return executeWithRetries(
      () =>
        this.requestExecutor.makeRequest(endpoint, {
          method: "DELETE",
        }),
      retries,
      timeout
    );
  }

  async batch(requests: BatchRequest[]): Promise<unknown[]> {
    const promises = requests.map(({ endpoint, params }) =>
      this.get(endpoint, params).catch((error) => ({ error }))
    );

    return Promise.all(promises);
  }

  preload(endpoint: string, params?: Record<string, unknown>): void {
    this.get(endpoint, params).catch(() => {
      // Silently fail for preloading
    });
  }

  clearCache(pattern?: string): void {
    clearCachePattern(this.cache, pattern);
  }

  getCacheStats(): CacheStats {
    return getCacheStats(this.cache);
  }
}

export const modernApiClient = new ModernApiClient();
