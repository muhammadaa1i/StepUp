import { useMemo } from "react";

interface UseLoadingStatesProps {
  isMobile: boolean;
  hasAnyAuthData: boolean;
  isLoading: boolean;
}

export function useLoadingStates({ isMobile, hasAnyAuthData, isLoading }: UseLoadingStatesProps) {
  const shouldSkipAllChecks = isMobile && hasAnyAuthData;
  const shouldShowMinimalLoading = isMobile && !hasAnyAuthData && isLoading;
  const shouldShowFullLoading = !isMobile && isLoading;

  return useMemo(
    () => ({
      shouldSkipAllChecks,
      shouldShowMinimalLoading,
      shouldShowFullLoading,
    }),
    [shouldSkipAllChecks, shouldShowMinimalLoading, shouldShowFullLoading]
  );
}
