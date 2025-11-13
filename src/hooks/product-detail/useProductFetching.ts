"use client";

import { useCallback } from "react";
import { Slipper } from "@/types";
import { modernApiClient } from "@/lib/modernApiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { ProductApiResponse } from "./types";
import { useProductImageFetching } from "./useProductImageFetching";
import { useProductErrorHandling } from "./useProductErrorHandling";

/**
 * Hook to fetch product data from API
 */
export function useProductFetching(
  setProduct: (product: Slipper | null) => void,
  setIsLoading: (loading: boolean) => void,
  setHasError: (hasError: boolean) => void,
  t: (key: string) => string
) {
  const { fetchProductImages } = useProductImageFetching();
  const { handleProductError } = useProductErrorHandling(t);

  const fetchProduct = useCallback(async (productId: string) => {
    try {
      setIsLoading(true);

      // Fetch base product data
      const response = await modernApiClient.get(
        API_ENDPOINTS.SLIPPER_BY_ID(Number(productId)),
        { include_images: true },
        { cache: false }
      );

      let productData: Slipper =
        ((response as ProductApiResponse)?.data || (response as Slipper)) as Slipper;

      // Fetch and merge additional images
      productData = await fetchProductImages(productData);

      setProduct(productData);
      setHasError(false);
    } catch (error: unknown) {
      setHasError(true);
      handleProductError(error);
    } finally {
      setIsLoading(false);
    }
  }, [setProduct, setIsLoading, setHasError, fetchProductImages, handleProductError]);

  return { fetchProduct };
}
