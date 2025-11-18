/**
 * Cookie management utilities
 */

import Cookies from "js-cookie";

export function getCookieOptions() {
  return {
    sameSite: "lax" as const,
    secure: typeof window !== "undefined" 
      ? window.location.protocol === "https:" 
      : process.env.NODE_ENV === "production",
    path: "/",
    ...(typeof window !== "undefined" && 
        !window.location.hostname.includes("localhost") && 
        !window.location.hostname.includes("127.0.0.1") &&
        window.location.hostname.includes(".") 
        ? { domain: window.location.hostname } : {})
  };
}

export function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  userJson: string
): void {
  const options = getCookieOptions();
  
  try {
    Cookies.set("access_token", accessToken, { ...options, expires: 1 });
    Cookies.set("refresh_token", refreshToken, { ...options, expires: 30 });
    Cookies.set("user", userJson, { ...options, expires: 7 });
  } catch (error) {
    console.error('[Auth Storage] Failed to set cookies:', error);
  }
}

export function clearAuthCookies(): void {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("user");
}

export function getAuthCookies(): { 
  user: string | undefined; 
  accessToken: string | undefined;
  refreshToken: string | undefined;
} {
  return {
    user: Cookies.get("user"),
    accessToken: Cookies.get("access_token"),
    refreshToken: Cookies.get("refresh_token"),
  };
}
