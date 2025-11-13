/**
 * User Endpoints
 * All user-related API endpoints
 * Following SRP: User management concerns only
 */

import { EndpointBuilder } from "./builder";

const USERS_BASE = "/users/";

export const UserEndpoints = {
  /**
   * List all users (admin)
   * GET /users/
   */
  LIST: USERS_BASE,

  /**
   * Get current user profile
   * GET /users/me
   */
  PROFILE: `${USERS_BASE}me`,

  /**
   * Get user by ID
   * GET /users/:id
   */
  BY_ID: (id: number) => `${USERS_BASE}${id}`,

  /**
   * Update current user profile
   * PUT /users/me
   */
  UPDATE_PROFILE: `${USERS_BASE}me`,

  /**
   * Update user by ID (admin)
   * PUT /users/:id
   */
  UPDATE: (id: number) => `${USERS_BASE}${id}`,

  /**
   * Delete user by ID (admin)
   * DELETE /users/:id
   */
  DELETE: (id: number) => `${USERS_BASE}${id}`,
} as const;

/**
 * Type-safe user endpoint builder
 */
export const userEndpointBuilder = new EndpointBuilder(USERS_BASE);

export type UserEndpoint = typeof UserEndpoints[keyof typeof UserEndpoints];
