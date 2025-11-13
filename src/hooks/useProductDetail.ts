"use client";

import { useState, useEffect } from "react";
import { Slipper } from "@/types";
import { useProductFetching } from "./product-detail/useProductFetching";
import { useProductImageUrls } from "./product-detail/useProductImageUrls";

export type { UseProductDetailProps, UseProductDetailResult } from "./product-detail/types";

interface UseProductDetailProps {
  productId: string;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function useProductDetail({ productId, t }: UseProductDetailProps) {
  const [product, setProduct] = useState<Slipper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Product fetching logic
  const { fetchProduct } = useProductFetching(setProduct, setIsLoading, setHasError, t);

  // Build image URLs from product data
  const imageUrls = useProductImageUrls(product);

  // Initial fetch when productId changes
  useEffect(() => {
    if (productId) fetchProduct(productId);
  }, [productId, fetchProduct]);

  // Ensure activeIndex is in bounds
  useEffect(() => {
    if (activeIndex >= imageUrls.length) setActiveIndex(0);
  }, [imageUrls.length, activeIndex]);

  return {
    product,
    isLoading,
    hasError,
    imageUrls,
    activeIndex,
    setActiveIndex,
  };
}
