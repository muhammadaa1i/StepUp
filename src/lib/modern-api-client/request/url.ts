import { API_BASE_URL } from "../../constants";

export const buildUrl = (
  endpoint: string,
  params?: Record<string, unknown>
): string => {
  let url: URL;

  if (typeof window !== "undefined") {
    url = new URL("/api/proxy", window.location.origin);
    const ep = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    url.searchParams.set("endpoint", ep);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          url.searchParams.append(key, String(value));
      });
    }
  } else {
    url = new URL(endpoint.replace(/^\/+/, "/"), API_BASE_URL + "/");
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null)
          url.searchParams.append(key, String(value));
      });
    }
  }

  return url.toString();
};
