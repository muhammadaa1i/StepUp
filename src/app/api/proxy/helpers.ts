// Re-export all proxy utilities from modular files
export { CORS_HEADERS, withCorsJson, errorJson } from "./cors";
export { API_BASE_URL, getEndpointOrError, buildTargetUrl, forwardHeaders } from "./request";
export { parseUpstream, errorFromUpstream } from "./response";
export { testLoginIfEnabled } from "./auth";
export { proxy } from "./proxyHandler";
