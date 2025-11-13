import { useEffect } from "react";
import { attemptMobileAuthRestore } from "@/lib/mobileAuth";

interface UseAuthRedirectProps {
  isAdmin?: boolean;
  shouldSkipAllChecks: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasAnyAuthData: boolean;
  isMobile: boolean;
  t: (key: string, params?: Record<string, string>) => string;
}

export function useAuthRedirect({
  isAdmin,
  shouldSkipAllChecks,
  isLoading,
  isAuthenticated,
  hasAnyAuthData,
  isMobile,
  t,
}: UseAuthRedirectProps) {
  useEffect(() => {
    if (isAdmin) {
      // Redirect admins away from cart pages
      if (typeof window !== "undefined") {
        // Use a small toast via custom event to avoid coupling to toast lib
        try {
          window.dispatchEvent(
            new CustomEvent("ui:toast:error", {
              detail: { message: t("cart.adminCannotAccessCart") },
            })
          );
        } catch {}
        window.location.href = "/admin";
      }
      return;
    }

    if (shouldSkipAllChecks) {
      // Attempt auth restoration in background without blocking UI
      attemptMobileAuthRestore();
      return;
    }

    if (!isLoading && !isAuthenticated && !hasAnyAuthData) {
      const redirectDelay = isMobile ? 500 : 1000;
      const timer = setTimeout(() => {
        if (!isAuthenticated && !hasAnyAuthData && typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }, redirectDelay);
      return () => clearTimeout(timer);
    }
  }, [isAdmin, shouldSkipAllChecks, isLoading, isAuthenticated, hasAnyAuthData, isMobile, t]);
}
