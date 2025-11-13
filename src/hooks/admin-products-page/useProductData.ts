"use client";

import { useState, useCallback, useEffect } from "react";
import { Slipper } from "@/types";
import { PAGINATION } from "@/lib/constants";
import { AdminProductService, ProductListParams } from "@/services/adminProductService";
import { PaginationState } from "./types";

export function useProductData() {
  const [products, setProducts] = useState<Slipper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: (PAGINATION.DEFAULT_LIMIT as number) || 10,
    total: 0,
    totalPages: 1,
  });

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: ProductListParams = {
        skip: (pagination.page - 1) * pagination.pageSize,
        limit: pagination.pageSize,
        page: pagination.page,
        include_images: true,
        _nc: Date.now(),
      };
      const { items, total, totalPages } = await AdminProductService.list(params);
      setProducts(items);
      setPagination((p) => ({ ...p, total, totalPages }));
    } catch (e) {
      console.error("Fetch products failed", e);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.page, pagination.pageSize]);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.pageSize]);

  const handlePageChange = (page: number) => {
    setPagination((p) => ({ ...p, page: Math.max(1, page) }));
  };

  return {
    products,
    setProducts,
    isLoading,
    pagination,
    setPagination,
    fetchProducts,
    handlePageChange,
  };
}
