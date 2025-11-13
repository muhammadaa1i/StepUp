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

export const handle401 = async (
  authManager: AuthManager,
  endpoint: string,
  options: RequestOptions,
  retryFn: (opts: RequestOptions) => Promise<unknown>
): Promise<unknown> => {
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
  } else if (isAdminEndpoint(endpoint) && isAdminPage()) {
    redirectToLogin();
  }

  const error = new Error("Authentication required. Please log in again.");
  (error as any).status = 401;
  throw error;
};
