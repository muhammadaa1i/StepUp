/**
 * Authentication state management
 */

import Cookies from "js-cookie";
import { NavigationTracker } from "./navigation";
import {
  REFRESH_COOLDOWN,
  NAVIGATION_GRACE_PERIOD,
  AUTH_INVALIDATION_COOLDOWN,
} from "./constants";
import { refreshAccessToken } from "./tokenRefresh";

export class AuthManager {
  private refreshPromise: Promise<boolean> | null = null;
  private lastRefreshFailAt = 0;
  private hasInvalidatedAuth = false;
  private navigationTracker = new NavigationTracker();

  async attemptRefresh(endpoint: string): Promise<boolean> {
    if (this.refreshPromise) return this.refreshPromise;

    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) return false;

    const canAttemptRefresh = () =>
      Date.now() - this.lastRefreshFailAt > REFRESH_COOLDOWN;

    if (!canAttemptRefresh() || endpoint.includes("/auth/refresh")) {
      return false;
    }

    this.refreshPromise = (async () => {
      try {
        const success = await refreshAccessToken(refreshToken);
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
    })();

    return this.refreshPromise;
  }

  private handleRefreshFailure(): void {
    const isPaymentFlow =
      typeof window !== "undefined" &&
      (window.location.pathname.includes("/payment/") ||
        window.location.search.includes("transfer_id") ||
        window.location.search.includes("payment_uuid") ||
        window.location.search.includes("octo_payment_UUID") ||
        window.location.search.includes("octo-status"));

    const isNavigating =
      typeof window !== "undefined" &&
      (this.navigationTracker.isNavigatingNow() ||
        this.navigationTracker.isHardRefresh() ||
        this.navigationTracker.isRecentNavigation(NAVIGATION_GRACE_PERIOD));

    if (!isPaymentFlow && !isNavigating) {
      this.clearAuthData();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:logout"));
      }
    } else {
      this.tryRestoreUserBackup();
    }
  }

  invalidateAuth(): void {
    const isRecentNavigation = this.navigationTracker.isRecentNavigation(
      NAVIGATION_GRACE_PERIOD
    );
    const isNavigatingNow = this.navigationTracker.isNavigatingNow();
    const isHardRefresh = this.navigationTracker.isHardRefresh();

    if (
      !isRecentNavigation &&
      !isNavigatingNow &&
      !isHardRefresh &&
      !this.hasInvalidatedAuth
    ) {
      this.hasInvalidatedAuth = true;
      this.clearAuthData();

      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/auth/") &&
        !window.location.pathname.includes("/login")
      ) {
        setTimeout(() => {
          window.location.href =
            "/auth/login?message=Session expired, please log in again";
        }, 500);
      }

      setTimeout(() => {
        this.hasInvalidatedAuth = false;
      }, AUTH_INVALIDATION_COOLDOWN);
    }
  }

  private clearAuthData(): void {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user");
    try {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      localStorage.removeItem("refresh_token");
    } catch {}
  }

  private tryRestoreUserBackup(): void {
    const userBackup = sessionStorage.getItem("userBackup");
    if (userBackup) {
      try {
        const cookieOptions = {
          sameSite: "strict" as const,
          secure: process.env.NODE_ENV === "production",
        };
        Cookies.set("user", userBackup, {
          ...cookieOptions,
          expires: 7,
        });
      } catch {}
    }
  }

  getLastRefreshFailTime(): number {
    return this.lastRefreshFailAt;
  }
}
