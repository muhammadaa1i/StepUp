/**
 * Ultra-simplified authentication manager
 */

import { NavigationTracker } from "./navigation";
import { REFRESH_COOLDOWN, NAVIGATION_GRACE_PERIOD, AUTH_INVALIDATION_COOLDOWN } from "./constants";
import { attemptTokenRefresh, shouldAttemptRefresh, getRefreshToken } from "./utils/tokenRefreshHelpers";
import { isInPaymentFlow, shouldRedirectToLogin } from "./utils/paymentFlowDetector";
import { clearAuthData, restoreUserBackup } from "./utils/authCleanup";

export class AuthManager {
  private refreshPromise: Promise<boolean> | null = null;
  private lastRefreshFailAt = 0;
  private hasInvalidatedAuth = false;
  private navigationTracker = new NavigationTracker();

  async attemptRefresh(endpoint: string): Promise<boolean> {
    if (this.refreshPromise) return this.refreshPromise;

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      // No refresh token - don't attempt refresh
      return false;
    }

    if (!shouldAttemptRefresh(this.lastRefreshFailAt, REFRESH_COOLDOWN, endpoint)) {
      return false;
    }

    // Prevent refresh attempts on catalog/product endpoints when not authenticated
    // UNLESS we're on an admin page where these endpoints need auth
    const isAdminPage = typeof window !== "undefined" && 
                        window.location.pathname.startsWith("/admin");
    
    const isPublicEndpoint = !isAdminPage && (
      endpoint.includes('/products') || 
      endpoint.includes('/catalog') ||
      endpoint.includes('/slippers')
    );
    
    if (isPublicEndpoint) {
      // Public endpoints shouldn't trigger refresh - user is just browsing
      return false;
    }

    this.refreshPromise = this.executeRefresh(refreshToken);
    return this.refreshPromise;
  }

  private async executeRefresh(refreshToken: string): Promise<boolean> {
    try {
      const success = await attemptTokenRefresh(refreshToken);
      return success;
    } catch {
      this.lastRefreshFailAt = Date.now();
      this.handleRefreshFailure();
      return false;
    } finally {
      const p = this.refreshPromise;
      setTimeout(() => {
        if (this.refreshPromise === p) this.refreshPromise = null;
      }, 50);
    }
  }

  private handleRefreshFailure(): void {
    const isPayment = isInPaymentFlow();
    const isNavigating = this.isCurrentlyNavigating();

    if (!isPayment && !isNavigating) {
      clearAuthData();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }
    } else {
      restoreUserBackup();
    }
  }

  private isCurrentlyNavigating(): boolean {
    return this.navigationTracker.isNavigatingNow() ||
      this.navigationTracker.isHardRefresh() ||
      this.navigationTracker.isRecentNavigation(NAVIGATION_GRACE_PERIOD);
  }

  invalidateAuth(): void {
    const canInvalidate = !this.navigationTracker.isRecentNavigation(NAVIGATION_GRACE_PERIOD) &&
      !this.navigationTracker.isNavigatingNow() &&
      !this.navigationTracker.isHardRefresh() &&
      !this.hasInvalidatedAuth;

    if (canInvalidate) {
      this.performInvalidation();
    }
  }

  private performInvalidation(): void {
    this.hasInvalidatedAuth = true;
    clearAuthData();

    if (typeof window !== "undefined" && shouldRedirectToLogin()) {
      setTimeout(() => {
        window.location.href = "/auth/login?message=Session expired, please log in again";
      }, 500);
    }

    setTimeout(() => {
      this.hasInvalidatedAuth = false;
    }, AUTH_INVALIDATION_COOLDOWN);
  }

  getLastRefreshFailTime(): number {
    return this.lastRefreshFailAt;
  }
}
