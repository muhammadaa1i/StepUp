"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";
import modernApiClient from "@/lib/modernApiClient";
import { API_ENDPOINTS, PAGINATION } from "@/lib/constants";
import { Slipper, SearchParams as FilterParams } from "@/types";
import { extractArray, ApiEnvelope } from "./utils";

export function useCatalogData(t: (key: string) => string, initialProducts: Slipper[]) {
  const [products, setProducts] = useState<Slipper[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(initialProducts.length === 0);
  const [hasLoaded, setHasLoaded] = useState(initialProducts.length > 0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus, setErrorStatus] = useState<number | undefined>();
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: PAGINATION.DEFAULT_LIMIT as number,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<FilterParams>({
    skip: 0,
    limit: PAGINATION.DEFAULT_LIMIT,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const lastRequestParamsRef = useRef<string>("");
  const isRequestInProgressRef = useRef<boolean>(false);
  const mountedRef = useRef<boolean>(true);

  const fetchProducts = useCallback(async () => {
    if (isRequestInProgressRef.current || !mountedRef.current) return;
    try {
      const currentParams = JSON.stringify(filters);
      if (lastRequestParamsRef.current === currentParams) return;
      isRequestInProgressRef.current = true;
      lastRequestParamsRef.current = currentParams;
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      if (!isInitialLoading) setIsLoading(true);
      const params = { ...filters, include_images: true };
      const response = await modernApiClient.get(API_ENDPOINTS.SLIPPERS, params, {
        cache: true,
        ttl: 180000, // 3 minutes cache
        timeout: 4000, // Faster timeout
        retries: 0, // No retries to avoid rate limiting (429)
      });
      if (!mountedRef.current) return;
      const arrayData = extractArray(response);
      setProducts(arrayData);
      setHasError(false);
      setHasLoaded(true);
      setIsLoading(false);
      setIsInitialLoading(false);
      const meta = response as ApiEnvelope<Slipper[]>;
      setPagination({
        total: meta.total || arrayData.length || 0,
        page:
          meta.page || Math.floor((filters.skip || 0) / (filters.limit || PAGINATION.DEFAULT_LIMIT)) + 1,
        limit: Number(filters.limit || PAGINATION.DEFAULT_LIMIT),
        totalPages:
          meta.pages ||
          meta.total_pages ||
          Math.max(
            1,
            Math.ceil((meta.total || arrayData.length || 0) / (filters.limit || PAGINATION.DEFAULT_LIMIT))
          ),
      });
    } catch (err: unknown) {
      if ((err as { name?: string }).name === "AbortError") return;
      const apiErr = err as { status?: number; message?: string };
      
      // Handle rate limiting silently - show friendly message
      if (apiErr.status === 429) {
        console.warn("Rate limit reached, please wait a moment");
        setErrorStatus(429);
        setHasError(true);
        setErrorMessage(t("errors.tooManyRequests") || "Too many requests. Please wait a moment and try again.");
        toast.warning(t("errors.tooManyRequests") || "Too many requests. Please wait a moment.");
        // Don't clear products on rate limit - keep showing cached data
        setIsLoading(false);
        setIsInitialLoading(false);
        return;
      }
      
      console.error("Error fetching products:", err);
      setErrorStatus(apiErr.status);
      setHasError(true);
      setErrorMessage(apiErr.message || t("errors.productsLoad"));
      toast.error(apiErr.message || t("errors.productsLoad"));
      setProducts([]);
      setIsLoading(false);
      setIsInitialLoading(false);
    } finally {
      isRequestInProgressRef.current = false;
      abortControllerRef.current = null;
    }
  }, [filters, isInitialLoading, t]);

  return {
    products,
    isLoading,
    isInitialLoading,
    hasLoaded,
    hasError,
    errorMessage,
    errorStatus,
    pagination,
    filters,
    setFilters,
    setPagination,
    fetchProducts,
    abortControllerRef,
    mountedRef,
    setHasError,
    setErrorMessage,
    setErrorStatus,
    setHasLoaded,
    setIsInitialLoading,
    lastRequestParamsRef,
  };
}
