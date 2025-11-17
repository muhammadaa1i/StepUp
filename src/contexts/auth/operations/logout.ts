/**
 * Logout operation
 */

import { toast } from "react-toastify";
import { User } from "@/types";
import { clearAuthData } from "../authStorage";
import { apiClient } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { hasValidToken } from "@/lib/tokenUtils";

interface LogoutOptions {
  setUser: (user: User | null) => void;
  setTokenVerified: (verified: boolean) => void;
  t: (key: string) => string;
}

export function logout({
  setUser,
  setTokenVerified,
  t,
}: LogoutOptions): void {
  // Best-effort server-side logout (token invalidation), only if we have a token
  if (hasValidToken()) {
    // Fire-and-forget; UI must not block on this
    void apiClient.post(API_ENDPOINTS.LOGOUT).catch(() => {
      // Swallow errors: client logout proceeds regardless
    });
  }

  clearAuthData();
  setUser(null);
  setTokenVerified(false);
  
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cart:clear", { detail: { intentional: true } }));
  }
  toast.success(t('auth.toasts.logoutSuccess'));
}
