/**
 * Authentication Endpoints
 * All authentication-related API endpoints
 * Following SRP: Authentication concerns only
 */

const AUTH_BASE = "/auth";

export const AuthEndpoints = {
  /**
   * User registration
   * POST /auth/register
   */
  REGISTER: `${AUTH_BASE}/register`,

  /**
   * User login
   * POST /auth/login
   */
  LOGIN: `${AUTH_BASE}/login`,

  /**
   * Refresh access token
   * POST /auth/refresh
   */
  REFRESH: `${AUTH_BASE}/refresh`,

  /**
   * User logout
   * POST /auth/logout
   */
  LOGOUT: `${AUTH_BASE}/logout`,

  /**
   * Forgot password
   * POST /auth/forgot-password
   */
  FORGOT_PASSWORD: `${AUTH_BASE}/forgot-password`,
} as const;

export type AuthEndpoint = typeof AuthEndpoints[keyof typeof AuthEndpoints];
