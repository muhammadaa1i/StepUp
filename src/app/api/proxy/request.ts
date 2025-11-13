import { NextRequest } from "next/server";
import { errorJson } from "./cors";
import { API_BASE_URL } from "@/lib/api/endpoints";

export { API_BASE_URL };

export function getEndpointOrError(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint");
  if (!endpoint) return { error: errorJson("Endpoint parameter is required", 400) } as const;
  return { endpoint, searchParams } as const;
}

export function buildTargetUrl(endpoint: string, srcParams: URLSearchParams) {
  const url = new URL(endpoint, API_BASE_URL);
  srcParams.forEach((value, key) => { if (key !== "endpoint") url.searchParams.append(key, value); });
  return url;
}

export function forwardHeaders(request: NextRequest, opts?: { isMultipart?: boolean; includeContentType?: boolean }) {
  const isMultipart = opts?.isMultipart ?? false;
  const includeContentType = opts?.includeContentType ?? true;
  const headers: Record<string, string> = { Accept: "application/json" };
  if (includeContentType && !isMultipart) headers["Content-Type"] = "application/json";
  const authHeader = request.headers.get("authorization");
  if (authHeader) headers.Authorization = authHeader;
  return headers;
}
