"use client";
import React from "react";
import { PaginationProps } from "../pagination/types";
import { PaginationMobile } from "../pagination/PaginationMobile";
import { PaginationDesktop } from "../pagination/PaginationDesktop";

export default function Pagination(props: PaginationProps) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
      {/* Mobile/Tablet */}
      <PaginationMobile {...props} />

      {/* Desktop */}
      <PaginationDesktop {...props} />
    </div>
  );
}
