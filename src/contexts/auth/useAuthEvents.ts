/**
 * Hook for auth event listeners
 */

import { useEffect } from "react";
import { User } from "@/types";

interface UseAuthEventsOptions {
  setUser: (user: User | null) => void;
  setTokenVerified: (verified: boolean) => void;
}

export function useAuthEvents({ setUser, setTokenVerified }: UseAuthEventsOptions) {
  // Listen for logout events
  useEffect(() => {
    const handleAutoLogout = () => {
      const isPaymentPage = window.location.pathname.includes('/payment/') ||
        window.location.search.includes('transfer_id') ||
        window.location.search.includes('payment_uuid');

      const isNavigating = document.readyState !== 'complete' || 
                           document.visibilityState === 'hidden';

      if (!isPaymentPage && !isNavigating) {
        setUser(null);
        setTokenVerified(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("auth:logout", handleAutoLogout);
      return () => window.removeEventListener("auth:logout", handleAutoLogout);
    }
  }, [setUser, setTokenVerified]);
}
