"use client";

import { useMemo } from "react";
import { Slipper } from "@/types";
import { getFullImageUrl } from "@/lib/utils";

/**
 * Hook to build image URLs from product data with proper prioritization
 */
export function useProductImageUrls(product: Slipper | null) {
  const imageUrls = useMemo((): string[] => {
    if (!product) return [];

    const list: string[] = [];

    if (product.images && product.images.length) {
      // Add primary image first
      const primary = product.images.find((i) => i.is_primary);
      if (primary) list.push(getFullImageUrl(primary.image_path));

      // Add remaining images, avoiding duplicates
      product.images.forEach((img) => {
        const full = getFullImageUrl(img.image_path);
        if (!list.includes(full)) list.push(full);
      });
    } else if (product?.image) {
      // Fallback to single image field
      list.push(getFullImageUrl(product.image));
    }

    return list.length ? list : ["/placeholder-product.svg"];
  }, [product]);

  return imageUrls;
}
