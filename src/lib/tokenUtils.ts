import Cookies from "js-cookie";

function decodeJwt(token: string): { exp?: number; iat?: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const json = atob(payload.padEnd(payload.length + (4 - (payload.length % 4)) % 4, "="));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isExpiredJwt(token: string, skewMs = 30_000): boolean {
  const data = decodeJwt(token);
  if (!data || !data.exp) return false; // If we can't decode, don't treat as expired here
  const nowMs = Date.now();
  const expMs = data.exp * 1000;
  return expMs <= nowMs + skewMs; // Consider near-expiry as expired to avoid race
}

/**
 * Returns true only if a syntactically valid, non-expired access token exists.
 * We proactively treat near-expiry tokens as expired to avoid 401 noise.
 */
export function hasValidToken(): boolean {
  if (typeof window === "undefined") return false;

  const accessToken = Cookies.get("access_token");

  // Must exist and look like a JWT
  if (!accessToken || accessToken.length < 10 || !accessToken.includes(".")) {
    return false;
  }

  // Consider token invalid if expired or close to expiry
  if (isExpiredJwt(accessToken)) {
    return false;
  }

  return true;
}

export function getTokenInfo() {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  
  return {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    accessTokenLength: accessToken?.length || 0,
    refreshTokenLength: refreshToken?.length || 0,
  };
}

export function clearInvalidTokens() {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  
  // Remove tokens if they appear invalid
  if (accessToken && (accessToken.length < 10 || !accessToken.includes('.') || isExpiredJwt(accessToken))) {
    Cookies.remove("access_token");
  }
  
  if (refreshToken && (refreshToken.length < 10 || !refreshToken.includes('.'))) {
    Cookies.remove("refresh_token");
  }
}