import modernApiClient from "@/lib/modernApiClient";
import { API_ENDPOINTS } from "@/lib/constants";

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
}

function extractCount(response: unknown): number {
  if (!response) return 0;
  const data: any = response as any;

  if (typeof data?.total === "number") return data.total;
  if (typeof data?.count === "number") return data.count;

  if (data?.data && !Array.isArray(data.data)) {
    const nested = data.data as { total?: number; count?: number; items?: unknown[] };
    if (typeof nested.total === "number") return nested.total;
    if (typeof nested.count === "number") return nested.count;
    if (Array.isArray(nested.items)) return nested.items.length;
  }

  if (Array.isArray(data?.data)) return data.data.length;
  if (Array.isArray(data?.items)) return data.items.length;
  if (Array.isArray(data)) return data.length;

  // Fallback: scan for a likely total/count/array
  if (data && typeof data === "object") {
    for (const key of Object.keys(data)) {
      const v = (data as any)[key];
      if (Array.isArray(v)) return v.length;
      if (typeof v === "number" && (key.includes("total") || key.includes("count"))) return v;
    }
  }
  return 0;
}

// Cache for dashboard stats with 30-second TTL
let statsCache: { data: DashboardStats; timestamp: number } | null = null;
const CACHE_TTL = 30000; // 30 seconds

async function fetchStat(endpoint: string, params?: Record<string, unknown>): Promise<number> {
  try {
    const response = await modernApiClient.get(
      endpoint, 
      { ...params, limit: 1 }, 
      { cache: true, timeout: 5000, retries: 0, ttl: 30000 } // 30-second cache TTL
    );
    return extractCount(response);
  } catch (err: any) {
    // Silently handle auth and rate limit errors
    const isAuthError = err?.status === 401 || err?.message?.includes('Authentication');
    const isRateLimitError = err?.status === 429;
    
    if (isAuthError || isRateLimitError) {
      return 0; // Return 0 silently for auth/rate limit errors
    }
    
    // Only log other errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Dashboard: error fetching ${endpoint}`, err);
    }
    return 0;
  }
}

export const AdminDashboardService = {
  async fetchCounts(): Promise<DashboardStats> {
    // Check cache first - if data is fresh, return it immediately
    if (statsCache && Date.now() - statsCache.timestamp < CACHE_TTL) {
      return statsCache.data;
    }
    
    // Fetch fresh data without timestamp params to allow API-level caching
    const [totalUsers, totalProducts, totalOrders, pendingOrders] = await Promise.all([
      fetchStat(API_ENDPOINTS.USERS),
      fetchStat(API_ENDPOINTS.SLIPPERS),
      fetchStat(API_ENDPOINTS.ORDERS),
      fetchStat(API_ENDPOINTS.ORDERS, { status: "pending" }),
    ]);

    const data = { totalUsers, totalProducts, totalOrders, pendingOrders };
    
    // Update cache
    statsCache = { data, timestamp: Date.now() };
    
    return data;
  },
  
  // Clear cache manually if needed (e.g., after creating/deleting entities)
  clearCache() {
    statsCache = null;
  },
};
