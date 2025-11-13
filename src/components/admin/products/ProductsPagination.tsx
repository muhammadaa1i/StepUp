"use client";
import React from "react";
import Pagination from "../common/Pagination";

interface ProductsPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  count: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function ProductsPagination(props: ProductsPaginationProps) {
  return <Pagination {...props} shownKey="admin.products.pagination.shown" />;
}
