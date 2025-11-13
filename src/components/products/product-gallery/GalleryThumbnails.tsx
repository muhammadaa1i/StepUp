"use client";

import React from "react";
import Image from "next/image";
import { GalleryThumbnailsProps } from "./types";

/**
 * Thumbnail grid component for product gallery
 */
export const GalleryThumbnails: React.FC<GalleryThumbnailsProps> = ({
  imageUrls,
  productName,
  activeIndex,
  onSelectIndex,
}) => {
  if (imageUrls.length <= 1) return null;

  return (
    <div className="grid grid-cols-6 gap-2 mt-4">
      {imageUrls.slice(0, 6).map((url, idx) => (
        <button
          key={idx}
          onClick={() => onSelectIndex(idx)}
          className={`aspect-square rounded overflow-hidden border-2 transition-all ${
            idx === activeIndex ? "border-emerald-500" : "border-gray-300"
          }`}
        >
          <Image
            src={url}
            alt={`${productName} ${idx + 1}`}
            width={100}
            height={100}
            className="object-cover w-full h-full"
            unoptimized
          />
        </button>
      ))}
    </div>
  );
};
