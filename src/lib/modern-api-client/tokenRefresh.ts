/**
 * Token refresh with multi-strategy approach
 */

import Cookies from "js-cookie";
import { API_BASE_URL } from "../constants";

interface TokenResult {
  access?: string;
  refresh?: string;
}

const parseTokens = async (resp: Response): Promise<TokenResult> => {
  let body: Record<string, unknown> = {};
  try {
    body = await resp.clone().json();
  } catch {}

  const headers = resp.headers;
  let access = (body["access_token"] ||
    body["accessToken"] ||
    body["access"]) as string | undefined;

  if (!access) {
    const authH =
      headers.get("Authorization") || headers.get("authorization");
    if (authH && /bearer/i.test(authH)) {
      const parts = authH.split(/\s+/);
      if (parts.length === 2) access = parts[1];
    }
  }

  let refresh = (body["refresh_token"] ||
    body["refreshToken"] ||
    body["refresh"]) as string | undefined;
  if (!refresh)
    refresh =
      headers.get("Refresh-Token") || headers.get("refresh-token") || undefined;

  return { access, refresh };
};

const buildUrl = (suffix: string) =>
  new URL(suffix.replace(/^\/+/, "/"), API_BASE_URL + "/").toString();

export const refreshAccessToken = async (
  refreshToken: string
): Promise<boolean> => {
  const strategies: Array<{ label: string; run: () => Promise<Response> }> = [
    {
      label: "json-double-field",
      run: () =>
        fetch(buildUrl("/auth/refresh"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken, refreshToken }),
        }),
    },
    {
      label: "header-refresh-token",
      run: () =>
        fetch(buildUrl("/auth/refresh"), {
          method: "POST",
          headers: { "Refresh-Token": refreshToken, Accept: "application/json" },
        }),
    },
    {
      label: "form-urlencoded",
      run: () =>
        fetch(buildUrl("/auth/refresh"), {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: new URLSearchParams({ refresh_token: refreshToken }).toString(),
        }),
    },
  ];

  let lastErr: unknown = null;
  for (const strat of strategies) {
    let resp = await strat.run();
    if (!resp.ok && (resp.status === 404 || resp.status === 422)) {
      // Try with trailing slash
      resp = await fetch(buildUrl("/auth/refresh/"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
    }

    if (resp.ok) {
      const { access, refresh } = await parseTokens(resp);
      const cookieOptions = {
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      };
      if (access)
        Cookies.set("access_token", access, { ...cookieOptions, expires: 1 });
      if (refresh)
        Cookies.set("refresh_token", refresh, { ...cookieOptions, expires: 30 });
      if (access || refresh) return !!access;

      lastErr = new Error(
        `Refresh strategy '${strat.label}' returned no tokens`
      );
      continue;
    } else {
      lastErr = new Error(
        `Refresh strategy '${strat.label}' failed status ${resp.status}`
      );
      continue;
    }
  }

  throw lastErr || new Error("All refresh strategies failed");
};
