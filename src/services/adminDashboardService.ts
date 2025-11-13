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

async function fetchStat(endpoint: string, params?: Record<string, unknown>): Promise<number> {
  const now = Date.now();
  try {
    const response = await modernApiClient.get(
      endpoint, 
      { ...params, limit: 1, _nc: now }, 
      { cache: true, timeout: 3000, retries: 1 } // Super fast with caching
    );
    return extractCount(response);
  } catch (err: any) {
    // Only log non-auth errors in development
    if (process.env.NODE_ENV === 'development' && !err?.message?.includes('Authentication')) {
      console.error(`Dashboard: error fetching ${endpoint}`, err);
    }
    return 0;
  }
}

export const AdminDashboardService = {
  async fetchCounts(): Promise<DashboardStats> {
    const [totalUsers, totalProducts, totalOrders, pendingOrders] = await Promise.all([
      fetchStat(API_ENDPOINTS.USERS),
      fetchStat(API_ENDPOINTS.SLIPPERS),
      fetchStat(API_ENDPOINTS.ORDERS),
      fetchStat(API_ENDPOINTS.ORDERS, { status: "pending" }),
    ]);

    return { totalUsers, totalProducts, totalOrders, pendingOrders };
  },
};
