export interface UseAuthGateParams {
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin?: boolean;
  t: (key: string, params?: Record<string, string>) => string;
}

export interface UseAuthGateResult {
  shouldSkipAllChecks: boolean;
  shouldShowMinimalLoading: boolean;
  shouldShowFullLoading: boolean;
  isMobile: boolean;
  hasAnyAuthData: boolean;
}

export interface AuthDataCheck {
  hasAnyAuthData: boolean;
}

export interface DeviceDetection {
  isMobile: boolean;
}
