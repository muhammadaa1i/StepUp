/**
 * Refresh strategy definitions
 *
 * Important: Use the same-origin proxy when running in the browser to avoid
 * cross-origin cookie/domain issues that lead to 401 on refresh.
 */

import { buildUrl as buildProxyUrl } from "../request/url";
import { API_BASE_URL } from "../../constants";

// Build URL depending on environment:
// - In the browser, route through our Next.js proxy: /api/proxy?endpoint=/auth/refresh
// - On the server (SSR), call the upstream API directly.
const buildUrl = (suffix: string) => {
  if (typeof window !== "undefined") {
    return buildProxyUrl(suffix);
  }
  return new URL(suffix.replace(/^\/+/, "/"), API_BASE_URL + "/").toString();
};

export interface RefreshStrategy {
  label: string;
  run: () => Promise<Response>;
}

export function createRefreshStrategies(refreshToken: string): RefreshStrategy[] {
  return [
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
}

export async function tryWithTrailingSlash(): Promise<Response> {
  return fetch(buildUrl("/auth/refresh/"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
}
