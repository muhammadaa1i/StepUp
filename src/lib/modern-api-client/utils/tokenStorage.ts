/**
 * Token storage utilities
 */

import Cookies from "js-cookie";

interface TokenSet {
  access?: string;
  refresh?: string;
}

export function storeTokens(tokens: TokenSet): boolean {
  const cookieOptions = {
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
  
  if (tokens.access) {
    Cookies.set("access_token", tokens.access, { ...cookieOptions, expires: 1 });
  }
  
  if (tokens.refresh) {
    Cookies.set("refresh_token", tokens.refresh, { ...cookieOptions, expires: 30 });
  }
  
  // Emit event that token was refreshed successfully
  if (typeof window !== "undefined" && tokens.access) {
    window.dispatchEvent(new CustomEvent("auth:token-refreshed", { 
      detail: { accessToken: tokens.access }
    }));
  }
  
  return !!(tokens.access || tokens.refresh);
}
