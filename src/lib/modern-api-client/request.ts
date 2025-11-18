// HTTP request execution with modular helpers
import { AuthManager } from "./auth";
import { buildHeaders } from "./request/headers";
import { buildUrl } from "./request/url";
import { createErrorFromResponse, logRefundError } from "./request/error";
import { hasValidToken } from "../tokenUtils";
import { REFRESH_COOLDOWN } from "./constants";
import {
  handle401,
  type RequestOptions,
} from "./request/auth-handler";

export class RequestExecutor {
  private authManager: AuthManager;

  constructor(authManager: AuthManager) {
    this.authManager = authManager;
  }

  async makeRequest(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<unknown> {
    const {
      params,
      headers: optionHeaders,
      timeout = 10000, // Increased default timeout to 10 seconds
      ...fetchOptions
    } = options;

    // Avoid sending unusable requests for protected endpoints when no token
    // Note: GET requests to /stepups/ (products) are public
    const method = options.method || "GET";
    const isProtected =
      endpoint.includes("/orders") ||
      endpoint.startsWith("/cart") ||
      endpoint.includes("/users") ||
      (endpoint.includes("/stepups") && method !== "GET"); // Only protect non-GET product requests

    if (isProtected && typeof window !== "undefined" && !hasValidToken()) {
      // Try to refresh token automatically before throwing error
      if (!options._retry) {
        try {
          const refreshed = await this.authManager.attemptRefresh(endpoint);
          if (refreshed) {
            // Token refreshed successfully, retry the request
            return await this.makeRequest(endpoint, { ...options, _retry: true });
          }
        } catch {
          // Refresh failed, proceed to throw error
        }
      }
      
      const err: any = new Error("Authentication required");
      err.status = 401;
      throw err; // Short-circuit without network
    }

    // If a refresh recently failed, short-circuit protected endpoints for a cooldown window
    if (isProtected && typeof window !== "undefined") {
      const lastFail = this.authManager.getLastRefreshFailTime?.() || 0;
      if (lastFail && Date.now() - lastFail < REFRESH_COOLDOWN) {
        const err: any = new Error("Authentication required");
        err.status = 401;
        throw err;
      }
    }

    const url = buildUrl(endpoint, params);
    const headers = buildHeaders(optionHeaders);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method: options.method || "GET",
        headers,
        signal: controller.signal,
        keepalive: true,
        cache: options.method === "GET" ? "default" : "no-cache",
        ...fetchOptions,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return await this.handleErrorResponse(response, endpoint, options);
      }

      return response.json();
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(
          "Request timeout - Please check your connection and try again"
        );
      }
      throw error;
    }
  }

  private async handleErrorResponse(
    response: Response,
    endpoint: string,
    options: RequestOptions
  ): Promise<unknown> {
    if (response.status === 401 && !options._retry) {
      return await handle401(
        this.authManager,
        endpoint,
        options,
        (opts) => this.makeRequest(endpoint, opts)
      );
    }

    if (endpoint.includes("/payments/octo/refund")) {
      await logRefundError(response);
    }

    throw await createErrorFromResponse(response);
  }
}
