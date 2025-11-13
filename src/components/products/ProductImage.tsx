"use client";

import Image from "next/image";
import React from "react";
import { getFullImageUrl } from "@/lib/utils";
import { useI18n } from "@/i18n";

type ImageLike = { image_url?: string };

export interface ProductImageProps {
  item: { images?: ImageLike[]; image?: string; name: string };
  className?: string;
}

/**
 * Pure UI component: renders a product image with graceful fallback.
 * No data fetching or side effects beyond local image error handling state.
 */
export function ProductImage({ item, className }: ProductImageProps) {
  const [imageError, setImageError] = React.useState(false);
  const { t } = useI18n();

  let imageUrl = "";
  if (item.images && item.images.length > 0 && item.images[0].image_url) {
    imageUrl = item.images[0].image_url as string;
  } else if (item.image) {
    imageUrl = item.image;
  }

  if (!imageUrl || imageError) {
    return (
      <div className={"w-full h-full bg-gray-200 flex items-center justify-center " + (className || "")}> 
        <span className="text-gray-400 text-xs text-center">
          {t("common.imageUnavailable")}
        </span>
      </div>
    );
  }

  const fullImageUrl = getFullImageUrl(imageUrl);

  return (
    <Image
      src={fullImageUrl}
      alt={item.name}
      width={96}
      height={96}
      className={"w-full h-full object-contain bg-white " + (className || "")}
      onError={() => setImageError(true)}
      priority
    />
  );
}

export default ProductImage;
