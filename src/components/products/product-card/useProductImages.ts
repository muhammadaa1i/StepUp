"use client";

import { useMemo } from "react";
import { Slipper } from "@/types";
import { getFullImageUrl } from "@/lib/utils";

export function useProductImages(slipper: Slipper) {
  const imageUrls = useMemo(() => {
    const urls: string[] = [];
    if (slipper.images && slipper.images.length > 0) {
      const primary = slipper.images.find((i) => i.is_primary);
      if (primary) urls.push(getFullImageUrl(primary.image_path));
      slipper.images.forEach((img) => {
        const full = getFullImageUrl(img.image_path);
        if (!urls.includes(full)) urls.push(full);
      });
    } else if (slipper.image) {
      urls.push(getFullImageUrl(slipper.image));
    }
    if (!urls.length) urls.push("/placeholder-product.svg");
    return urls;
  }, [slipper.images, slipper.image]);

  return { imageUrls };
}
