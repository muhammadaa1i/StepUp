"use client";

import { useMemo } from "react";
import { UseAuthGateParams, UseAuthGateResult } from "./auth-gate/types";
import { useDeviceDetection } from "./auth-gate/useDeviceDetection";
import { useAuthDataCheck } from "./auth-gate/useAuthDataCheck";
import { useLoadingStates } from "./auth-gate/useLoadingStates";
import { useAuthRedirect } from "./auth-gate/useAuthRedirect";

/**
 * Encapsulates auth gating and redirection side-effects for client pages.
 * Components stay pure; this hook computes display flags and performs redirects.
 */
export function useAuthGate({ isAuthenticated, isLoading, isAdmin, t }: UseAuthGateParams): UseAuthGateResult {
  const { isMobile } = useDeviceDetection();
  const { hasAnyAuthData } = useAuthDataCheck();

  const { shouldSkipAllChecks, shouldShowMinimalLoading, shouldShowFullLoading } = useLoadingStates({
    isMobile,
    hasAnyAuthData,
    isLoading,
  });

  useAuthRedirect({
    isAdmin,
    shouldSkipAllChecks,
    isLoading,
    isAuthenticated,
    hasAnyAuthData,
    isMobile,
    t,
  });

  return useMemo(
    () => ({
      shouldSkipAllChecks,
      shouldShowMinimalLoading,
      shouldShowFullLoading,
      isMobile,
      hasAnyAuthData,
    }),
    [shouldSkipAllChecks, shouldShowMinimalLoading, shouldShowFullLoading, isMobile, hasAnyAuthData]
  );
}

export default useAuthGate;
