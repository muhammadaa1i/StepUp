"use client";
import React from "react";
import Pagination from "../common/Pagination";

interface OrdersPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  count: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function OrdersPagination(props: OrdersPaginationProps) {
  return <Pagination {...props} shownKey="admin.orders.pagination.shown" />;
}
