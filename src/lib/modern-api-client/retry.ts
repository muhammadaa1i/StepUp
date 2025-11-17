/**
 * Request retry with exponential backoff
 */

export const executeWithRetries = async (
  fn: () => Promise<unknown>,
  retries: number,
  timeout: number
): Promise<unknown> => {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const result = await fn();
      clearTimeout(timeoutId);
      return result;
    } catch (error: unknown) {
      if (i === retries) throw error;

      // Don't retry on client errors or rate limiting
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        (error as { status: number }).status &&
        [400, 401, 403, 404, 422, 429].includes(
          (error as { status: number }).status
        )
      ) {
        throw error;
      }

      // Retry with backoff for server/network errors
      const errorWithStatus = error as { status?: number; name?: string };
      const isServerError =
        errorWithStatus.status && errorWithStatus.status >= 500;
      const isNetworkError =
        !errorWithStatus.status || errorWithStatus.name === "AbortError";

      if (isServerError || isNetworkError) {
        const baseDelay = Math.pow(2, i) * 1000;
        const jitter = Math.random() * 1000;
        await new Promise((resolve) => setTimeout(resolve, baseDelay + jitter));
      } else {
        throw error;
      }
    }
  }

  throw new Error("Max retries exceeded");
};
