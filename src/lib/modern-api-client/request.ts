// HTTP request execution with modular helpers
import { AuthManager } from "./auth";
import { buildHeaders } from "./request/headers";
import { buildUrl } from "./request/url";
import { createErrorFromResponse, logRefundError } from "./request/error";
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

    throw createErrorFromResponse(response);
  }
}
