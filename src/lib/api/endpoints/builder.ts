/**
 * Endpoint Builder Utilities
 * Helper functions for building dynamic endpoints with type safety
 * Following SRP: URL construction and query parameter handling
 */

/**
 * Builds a URL with query parameters
 * @param endpoint - Base endpoint path
 * @param params - Query parameters object
 * @returns Complete URL with query string
 */
export function buildUrlWithParams(
  endpoint: string,
  params?: Record<string, unknown>
): string {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }

  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${endpoint}?${queryString}` : endpoint;
}

/**
 * Builds a resource URL with ID
 * @param baseEndpoint - Base endpoint path
 * @param id - Resource ID
 * @param subpath - Optional subpath after ID
 * @returns Complete resource URL
 */
export function buildResourceUrl(
  baseEndpoint: string,
  id: number | string,
  subpath?: string
): string {
  const base = `${baseEndpoint}${id}/`;
  return subpath ? `${base}${subpath}` : base;
}

/**
 * Builds a nested resource URL
 * @param baseEndpoint - Base endpoint path
 * @param resourceId - Parent resource ID
 * @param nestedResource - Nested resource name
 * @param nestedId - Optional nested resource ID
 * @returns Complete nested resource URL
 */
export function buildNestedResourceUrl(
  baseEndpoint: string,
  resourceId: number | string,
  nestedResource: string,
  nestedId?: number | string
): string {
  const base = `${baseEndpoint}${resourceId}/${nestedResource}`;
  return nestedId ? `${base}/${nestedId}` : base;
}

/**
 * Type-safe endpoint builder
 */
export class EndpointBuilder {
  constructor(private basePath: string) {}

  /**
   * Get the base path
   */
  get base(): string {
    return this.basePath;
  }

  /**
   * Build URL for a specific resource by ID
   */
  byId(id: number | string): string {
    return buildResourceUrl(this.basePath, id);
  }

  /**
   * Build URL with query parameters
   */
  withParams(params: Record<string, unknown>): string {
    return buildUrlWithParams(this.basePath, params);
  }

  /**
   * Build URL for a nested resource
   */
  nested(
    resourceId: number | string,
    nestedResource: string,
    nestedId?: number | string
  ): string {
    return buildNestedResourceUrl(
      this.basePath,
      resourceId,
      nestedResource,
      nestedId
    );
  }
}
