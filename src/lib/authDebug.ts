/**
 * Auth debug utilities
 */
import Cookies from "js-cookie";

export interface AuthDebugInfo {
  hasCookie: boolean;
  hasLocalStorage: boolean;
  cookieValue?: string;
  localStorageValue?: string;
  timestamp: number;
}

export interface Credentials {
  username: string;
  password: string;
}

export const AUTH_DEBUG = {
  enabled: process.env.NODE_ENV === "development",
  log: (message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[AuthDebug] ${message}`, data || "");
    }
  },
};

export function getAuthDebugInfo(): AuthDebugInfo {
  const cookieToken = Cookies.get("access_token");
  const localToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  return {
    hasCookie: !!cookieToken,
    hasLocalStorage: !!localToken,
    cookieValue: cookieToken,
    localStorageValue: localToken || undefined,
    timestamp: Date.now(),
  };
}

export function checkAuthRequirements(): boolean {
  const info = getAuthDebugInfo();
  return info.hasCookie || info.hasLocalStorage;
}

export function logAuthStatus(): void {
  const info = getAuthDebugInfo();
  AUTH_DEBUG.log("Auth Status", {
    hasCookie: info.hasCookie,
    hasLocalStorage: info.hasLocalStorage,
    timestamp: new Date(info.timestamp).toISOString(),
  });
}
