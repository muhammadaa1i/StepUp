/**
 * localStorage management utilities for auth
 */

import { User } from "@/types";
import { mobileStorage } from "@/lib/mobileStorage";
import { mobileErrorHandler } from "@/lib/mobileErrorHandler";

export function setAuthLocalStorage(
  accessToken: string,
  refreshToken: string,
  userData: User
): void {
  try {
    mobileStorage.setAuthToken(accessToken);
    mobileStorage.setUser(userData);
    localStorage.setItem('refresh_token', refreshToken);
  } catch (error) {
    mobileErrorHandler.log(error as Error, 'auth-storage');
  }
}

export function clearAuthLocalStorage(): void {
  mobileStorage.removeAuthToken();
  mobileStorage.removeUser();
  try {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
  } catch {}
}

export function getAuthLocalStorage(): {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
} {
  const user = mobileStorage.getUser();
  const accessToken = mobileStorage.getAuthToken();
  const refreshToken = typeof localStorage !== "undefined" 
    ? localStorage.getItem('refresh_token') 
    : null;

  return { user, accessToken, refreshToken };
}
