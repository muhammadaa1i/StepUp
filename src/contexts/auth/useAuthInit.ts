/**
 * Hook for auth initialization
 */

import { useEffect, useRef } from "react";
import { User } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { debugMobileAuth, isMobileDevice } from "@/lib/mobileDebug";
import { loadAuthData, getCookieOptions } from "./authStorage";
import Cookies from "js-cookie";

interface UseAuthInitOptions {
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setTokenVerified: (verified: boolean) => void;
  clearAuthData: () => void;
}

export function useAuthInit({
  setUser,
  setIsLoading,
  setTokenVerified,
  clearAuthData,
}: UseAuthInitOptions) {
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const navigationType = typeof window !== "undefined" && 
        (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type;
      const isBackForwardNavigation = navigationType === "back_forward";
      
      if (isInitializedRef.current || isBackForwardNavigation) return;
      isInitializedRef.current = true;

      if (process.env.NODE_ENV === "production" && isMobileDevice()) {
        debugMobileAuth();
      }

      try {
        const { user: userData, accessToken } = loadAuthData();

        if (userData && accessToken) {
          setUser(userData);
          setTokenVerified(true);
          
          const isMobile = typeof window !== "undefined" && 
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          if (isMobile) {
            setIsLoading(false);
          }

          const isHardRefresh = navigationType === "reload";
          
          if (!isHardRefresh && !isBackForwardNavigation) {
            try {
              await new Promise((resolve) => setTimeout(resolve, 500));
              const response = await apiClient.get(API_ENDPOINTS.USER_PROFILE);
              setUser(response.data);
              Cookies.set("user", JSON.stringify(response.data), {
                ...getCookieOptions(),
                expires: 7,
              });
            } catch {
              // Token verification failed - let interceptors handle refresh
            }
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (error instanceof SyntaxError) {
          clearAuthData();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [setUser, setIsLoading, setTokenVerified, clearAuthData]);
}
