import Cookies from "js-cookie";
import { AuthManager } from "../auth";

export interface RequestOptions extends RequestInit {
  params?: Record<string, unknown>;
  timeout?: number;
  _retry?: boolean;
}

const getToken = (key: string): boolean => {
  if (Cookies.get(key)) return true;
  if (typeof window !== "undefined") {
    try {
      return !!localStorage.getItem(key);
    } catch {}
  }
  return false;
};

const isAdminEndpoint = (endpoint: string): boolean =>
  endpoint.includes("/users") ||
  endpoint.includes("/stepups") ||
  endpoint.includes("/orders") ||
  endpoint.includes("/categories");

const isAdminPage = (): boolean =>
  typeof window !== "undefined" &&
  window.location.pathname.startsWith("/admin");

const redirectToLogin = (): void => {
  if (
    typeof window !== "undefined" &&
    !window.location.pathname.includes("/auth/login")
  ) {
    window.location.href =
      "/auth/login?redirect=" + encodeURIComponent(window.location.pathname);
  }
};

const isPublicEndpoint = (endpoint: string): boolean => {
  // Only true public endpoints that don't need auth at all
  if (endpoint.includes("/products") || endpoint.includes("/catalog")) {
    return true;
  }
  
  // Admin accessing these endpoints should trigger refresh
  if (isAdminPage() && (endpoint.includes("/slippers") || endpoint.includes("/categories"))) {
    return false;
  }
  
  // Regular users browsing products/categories
  return endpoint.includes("/slippers") || endpoint.includes("/categories/");
};

export const handle401 = async (
  authManager: AuthManager,
  endpoint: string,
  options: RequestOptions,
  retryFn: (opts: RequestOptions) => Promise<unknown>
): Promise<unknown> => {
  // Don't attempt refresh on public endpoints - user is just browsing
  if (isPublicEndpoint(endpoint)) {
    const error = new Error("Authentication required. Please log in again.");
    (error as any).status = 401;
    throw error;
  }

  const hasRefreshToken = getToken("refresh_token");

  if (hasRefreshToken && !options._retry) {
    try {
      const refreshed = await authManager.attemptRefresh(endpoint);
      if (refreshed) {
        return await retryFn({ ...options, _retry: true });
      }
    } catch {
      if (process.env.NODE_ENV === "development") {
        console.warn("Token refresh failed");
      }
    }
  }

  const hasAnyToken = hasRefreshToken || getToken("access_token");

  if (hasAnyToken) {
    authManager.invalidateAuth();
  }
  
  // Always redirect to login on admin pages when auth fails
  if (isAdminPage()) {
    redirectToLogin();
  } else if (isAdminEndpoint(endpoint)) {
    // Also redirect if it's an admin endpoint even from non-admin pages
    redirectToLogin();
  }

  const error = new Error("Authentication required. Please log in again.");
  (error as any).status = 401;
  throw error;
};
