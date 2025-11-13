"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/i18n";
import { extractArray } from "./catalog-products/utils";
import { useCatalogData } from "./catalog-products/useCatalogData";

export default function useCatalogProducts(initial: unknown | null) {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const initialProducts = extractArray(initial);
  
  const {
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
    fetchProducts,
    abortControllerRef,
    mountedRef,
    setHasError,
    setErrorMessage,
    setErrorStatus,
    setHasLoaded,
    setIsInitialLoading,
    lastRequestParamsRef,
  } = useCatalogData(t, initialProducts);

  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    if (products.length === 0) fetchProducts();
    const abortController = abortControllerRef;
    const timeoutRef = fetchTimeoutRef;
    return () => {
      mountedRef.current = false;
      if (abortController.current) abortController.current.abort();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // category/search from URL
  useEffect(() => {
    const categoryId = searchParams.get("category");
    const search = searchParams.get("search");
    setFilters((prev) => {
      const newCategory = categoryId ? Number(categoryId) : undefined;
      const newSearch = search || undefined;
      if (prev.category_id === newCategory && prev.search === newSearch) return prev;
      return { ...prev, category_id: newCategory, search: newSearch, skip: 0 };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // debounced fetching on filter change
  useEffect(() => {
    if (isInitialLoading || !mountedRef.current) return;
    if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) fetchProducts();
    }, 150); // Faster debounce for better UX
    return () => {
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, isInitialLoading]);

  const handlePageChange = (page: number) => {
    const skip = (page - 1) * pagination.limit;
    setFilters((prev) => ({ ...prev, skip }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setHasError(false);
    setErrorMessage("");
    setErrorStatus(undefined);
    setHasLoaded(false);
    setIsInitialLoading(true);
    lastRequestParamsRef.current = "";
    fetchProducts();
  };

  return {
    products,
    isLoading,
    isInitialLoading,
    hasLoaded,
    hasError,
    errorMessage,
    errorStatus,
    pagination,
    handlePageChange,
    handleRetry,
  };
}
