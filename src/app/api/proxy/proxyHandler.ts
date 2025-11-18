import { NextRequest } from "next/server";
import { withCorsJson, errorJson } from "./cors";
import { getEndpointOrError, buildTargetUrl, forwardHeaders } from "./request";
import { parseUpstream, errorFromUpstream } from "./response";

export async function proxy(request: NextRequest, method: "GET" | "POST" | "PUT" | "DELETE") {
  const ep = getEndpointOrError(request);
  if ("error" in ep) return ep.error;
  const { endpoint, searchParams } = ep;
  const url = buildTargetUrl(endpoint, searchParams);

  try {
    const incomingContentType = request.headers.get("content-type") || "";
    const isMultipart = incomingContentType.includes("multipart/form-data");
    const headers = forwardHeaders(request, { isMultipart, includeContentType: method !== "GET" && method !== "DELETE" });

    let body: BodyInit | null = null;
    if (method === "POST" || method === "PUT") {
      if (isMultipart) {
        body = await request.formData();
      } else {
        const text = await request.text();
        if (text) {
          try {
            const parsed = JSON.parse(text);
            body = JSON.stringify(parsed);
          } catch {
            body = text;
          }
        }
      }
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body,
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const payload = await errorFromUpstream(response, url.toString());
      return withCorsJson(payload, { status: response.status });
    }

    const data = await parseUpstream(response);
    return withCorsJson(data);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TimeoutError") return errorJson("Request timeout - API server is not responding", 408);
      if (error.message.includes("fetch")) return errorJson("Network error - Unable to connect to API server", 503);
    }
    return errorJson("Internal server error", 500);
  }
}
