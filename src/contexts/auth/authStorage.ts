/**
 * Simplified auth storage utilities
 */

import { User } from "@/types";
import { setAuthCookies, clearAuthCookies, getAuthCookies, getCookieOptions } from "./utils/cookieManager";
import { setAuthLocalStorage, clearAuthLocalStorage, getAuthLocalStorage } from "./utils/localStorageManager";

export { getCookieOptions };

export function storeAuthData(accessToken: string, refreshToken: string, userData: User): void {
  // Store in cookies
  setAuthCookies(accessToken, refreshToken, JSON.stringify(userData));
  
  // Store in localStorage as fallback
  setAuthLocalStorage(accessToken, refreshToken, userData);
}

export function loadAuthData(): { user: User | null; accessToken: string | null } {
  // Try cookies first
  const cookies = getAuthCookies();
  
  if (cookies.user && cookies.accessToken) {
    try {
      const userData = JSON.parse(cookies.user);
      return { user: userData, accessToken: cookies.accessToken };
    } catch (error) {
      console.error("Failed to parse stored user data:", error);
    }
  }

  // Fallback to localStorage
  const localStorage = getAuthLocalStorage();
  
  if (localStorage.user && localStorage.accessToken) {
    // Restore to cookies
    setAuthCookies(localStorage.accessToken, localStorage.refreshToken || "", JSON.stringify(localStorage.user));
    
    return { user: localStorage.user, accessToken: localStorage.accessToken };
  }

  return { user: null, accessToken: null };
}

export function clearAuthData(): void {
  clearAuthCookies();
  clearAuthLocalStorage();
}

export function updateStoredUser(userData: User): void {
  const cookies = getAuthCookies();
  if (cookies.accessToken && cookies.refreshToken) {
    setAuthCookies(cookies.accessToken, cookies.refreshToken, JSON.stringify(userData));
  }
}
