"use client";

import { useCallback } from "react";
import { Slipper } from "@/types";
import { modernApiClient } from "@/lib/modernApiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import { ImageRecord, ImagesApiResponse } from "./types";

/**
 * Hook to fetch and merge product images from multiple sources
 */
export function useProductImageFetching() {
  const fetchProductImages = useCallback(async (product: Slipper): Promise<Slipper> => {
    if (!product?.id) return product;

    try {
      const imgsResp = await modernApiClient.get(
        API_ENDPOINTS.SLIPPER_IMAGES(product.id),
        undefined,
        { cache: false }
      );

      const imgs = ((imgsResp as ImagesApiResponse)?.data || (imgsResp as ImageRecord[])) as ImageRecord[];

      if (Array.isArray(imgs) && imgs.length) {
        const embedded = (product.images as unknown as ImageRecord[]) || [];
        const mergedMap = new Map<number, ImageRecord>();

        // Merge embedded and fetched images, avoiding duplicates
        [...embedded, ...imgs].forEach((img) => {
          if (!mergedMap.has(img.id)) mergedMap.set(img.id, img);
        });

        const merged = Array.from(mergedMap.values());

        // Ensure at least one image is marked as primary
        if (!merged.some((m) => m.is_primary)) {
          if (merged.length) merged[0] = { ...merged[0], is_primary: true };
        }

        return {
          ...product,
          images: merged as unknown as Slipper["images"],
        };
      }
    } catch {
      // Gallery images load failed (non-critical), return original product
    }

    return product;
  }, []);

  return { fetchProductImages };
}
