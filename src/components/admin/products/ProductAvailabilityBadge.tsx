import React from "react";
import { Slipper } from "@/types";

interface ProductAvailabilityBadgeProps {
  product: Slipper;
  onToggle: (e: React.MouseEvent) => void;
  t: (key: string) => string;
  compact?: boolean;
}

export default function ProductAvailabilityBadge({
  product,
  onToggle,
  t,
  compact = false,
}: ProductAvailabilityBadgeProps) {
  const isAvailable = product.is_available !== false;

  if (compact) {
    return (
      <button
        onClick={onToggle}
        className={`px-2 py-0.5 text-[10px] font-medium rounded-full whitespace-nowrap ${
          isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {isAvailable ? t("admin.products.status.active") : t("admin.products.status.inactive")}
      </button>
    );
  }

  return (
    <button
      onClick={onToggle}
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
        isAvailable
          ? "bg-green-100 text-green-800 hover:bg-green-200"
          : "bg-red-100 text-red-700 hover:bg-red-200"
      }`}
      title={t("admin.common.toggleAvailability")}
    >
      {isAvailable ? t("admin.products.status.active") : t("admin.products.status.inactive")}
    </button>
  );
}
