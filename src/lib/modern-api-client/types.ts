/**
 * Modern API client types
 */

export interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
  expiry: number;
}

export interface RequestConfig {
  cache?: boolean;
  ttl?: number;
  retries?: number;
  timeout?: number;
  /** Force network fetch (skip reading existing cache) but still write result if cache=true */
  force?: boolean;
}

export interface CacheStats {
  size: number;
  entries: string[];
}

export interface BatchRequest {
  endpoint: string;
  params?: Record<string, unknown>;
}
