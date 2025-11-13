/**
 * Mobile Auth - Mobile authentication utilities
 */
import Cookies from "js-cookie";
import { mobileStorage } from "./mobileStorage";

export interface MobileAuthState {
  isAuthenticated: boolean;
  hasToken: boolean;
  hasUser: boolean;
  source: "cookie" | "localStorage" | "none";
}

export function getMobileAuthState(): MobileAuthState {
  const cookieToken = Cookies.get("access_token");
  const localToken = mobileStorage.getAuthToken();
  const user = mobileStorage.getUser();

  if (cookieToken) {
    return {
      isAuthenticated: true,
      hasToken: true,
      hasUser: !!user,
      source: "cookie",
    };
  }

  if (localToken) {
    return {
      isAuthenticated: true,
      hasToken: true,
      hasUser: !!user,
      source: "localStorage",
    };
  }

  return {
    isAuthenticated: false,
    hasToken: false,
    hasUser: false,
    source: "none",
  };
}

export function logMobileAuthState(): void {
  const state = getMobileAuthState();
  console.log("[MobileAuth]", state);
}

export function attemptMobileAuthRestore(): boolean {
  const localToken = mobileStorage.getAuthToken();
  
  if (localToken && !Cookies.get("access_token")) {
    // Restore from localStorage to cookie
    Cookies.set("access_token", localToken, {
      expires: 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return true;
  }

  return false;
}

export function isMobileAuthenticated(): boolean {
  return getMobileAuthState().isAuthenticated;
}
