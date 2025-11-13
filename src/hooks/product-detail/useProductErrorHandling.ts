"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";

/**
 * Hook to handle product fetch errors with user-friendly messages
 */
export function useProductErrorHandling(t: (key: string) => string) {
  const handleProductError = useCallback((error: unknown) => {
    const axiosError = error as { response?: { status?: number } };

    if (axiosError.response?.status === 503) {
      toast.error(t('errors.serverUnavailableLong'));
    } else if (axiosError.response?.status === 404) {
      toast.error(t('productDetail.notFound'));
    } else if (axiosError.response?.status && axiosError.response.status >= 500) {
      toast.error(t('errors.serverErrorLong'));
    } else {
      toast.error(t('errors.productsLoad'));
    }
  }, [t]);

  return { handleProductError };
}
