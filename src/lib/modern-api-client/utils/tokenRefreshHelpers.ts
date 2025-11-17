/**
 * Token refresh utilities
 */

import { refreshAccessToken as performRefresh } from "../tokenRefresh";

export async function attemptTokenRefresh(refreshToken: string): Promise<boolean> {
  try {
    return await performRefresh(refreshToken);
  } catch {
    return false;
  }
}

export function shouldAttemptRefresh(
  lastRefreshFailAt: number,
  cooldown: number,
  endpoint: string
): boolean {
  const canAttempt = Date.now() - lastRefreshFailAt > cooldown;
  const isRefreshEndpoint = endpoint.includes("/auth/refresh");
  
  return canAttempt && !isRefreshEndpoint;
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  
  // Try cookies first
  const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('refresh_token='))
    ?.split('=')[1];
  
  if (cookieToken) return cookieToken;
  
  // Fallback to localStorage
  try {
    return localStorage.getItem("refresh_token");
  } catch {
    return null;
  }
}
