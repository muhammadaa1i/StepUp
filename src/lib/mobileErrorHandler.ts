/**
 * Mobile error handling module
 */

export interface MobileErrorInfo {
  message: string;
  stack?: string;
  context?: string;
  timestamp: number;
}

export interface ErrorDetails {
  error: Error;
  context?: string;
}

export interface ErrorQueueItem {
  error: Error;
  context?: string;
  timestamp: number;
}

class MobileErrorHandler {
  private errorQueue: ErrorQueueItem[] = [];
  private maxQueueSize = 50;

  log(error: Error, context?: string): void {
    const item: ErrorQueueItem = {
      error,
      context,
      timestamp: Date.now(),
    };

    this.errorQueue.push(item);

    // Keep queue size limited
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error(`[${context || "Error"}]:`, error);
    }
  }

  getErrors(): ErrorQueueItem[] {
    return [...this.errorQueue];
  }

  clear(): void {
    this.errorQueue = [];
  }
}

export const mobileErrorHandler = new MobileErrorHandler();
export { MobileErrorHandler };
