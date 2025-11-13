/**
 * Cache management utilities
 */

import { CacheEntry, CacheStats } from "./types";
import { CACHE_TTL, MAX_CACHE_SIZE } from "./constants";

export const getCacheKey = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  const paramString = params ? JSON.stringify(params) : "";
  return `${endpoint}:${paramString}`;
};

export const getCacheTTL = (endpoint: string): number => {
  if (endpoint.includes("/categories")) return CACHE_TTL.categories;
  if (endpoint.includes("/slippers/") && endpoint.match(/\/slippers\/\d+$/))
    return CACHE_TTL.productDetail;
  if (endpoint.includes("/slippers")) return CACHE_TTL.products;
  if (endpoint.includes("/profile") || endpoint.includes("/users/me"))
    return CACHE_TTL.profile;
  if (endpoint.includes("/orders")) return CACHE_TTL.orders;
  if (endpoint.includes("/search")) return CACHE_TTL.search;
  return CACHE_TTL.default;
};

export const isValidCache = (entry: CacheEntry): boolean => {
  return Date.now() < entry.expiry;
};

export const setCache = (
  cache: Map<string, CacheEntry>,
  key: string,
  data: unknown,
  ttl: number
): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    expiry: Date.now() + ttl,
  });

  // Cleanup old cache entries
  if (cache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(cache.entries());
    entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
    cache.clear();
    entries.slice(0, MAX_CACHE_SIZE).forEach(([key, value]) => {
      cache.set(key, value);
    });
  }
};

export const clearCachePattern = (
  cache: Map<string, CacheEntry>,
  pattern?: string
): void => {
  if (!pattern) {
    cache.clear();
    return;
  }

  for (const [key] of cache) {
    if (key.includes(pattern)) {
      cache.delete(key);
    }
  }
};

export const getCacheStats = (cache: Map<string, CacheEntry>): CacheStats => {
  return {
    size: cache.size,
    entries: Array.from(cache.keys()),
  };
};
