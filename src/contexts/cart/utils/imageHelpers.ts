/**
 * Cart image utilities
 */

import { SlipperImage } from "@/types";

type ImageLike = { id: number; image_url?: string; image_path?: string };

export function prepareFallbackImages(
  images: SlipperImage[] | ImageLike[] | undefined
): Array<{ id: number; image_url: string }> {
  if (!images) return [];
  
  return images.map((img: SlipperImage | ImageLike) => ({
    id: (img as SlipperImage | ImageLike).id,
    image_url: (img as SlipperImage).image_path || (img as ImageLike).image_url || "",
  }));
}

export function enrichCartItemImages<T extends { id: number; images?: Array<{ id: number; image_url: string }>; image?: string }>(
  items: T[],
  productId: number,
  fallbackImages: Array<{ id: number; image_url: string }>,
  productImage?: string
): T[] {
  return items.map((it) =>
    it.id === productId
      ? {
        ...it,
        images: it.images && it.images.length > 0 ? it.images : fallbackImages,
        image: it.image || productImage,
      }
      : it
  );
}
