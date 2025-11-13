"use client";
import React from "react";
import Image from "next/image";
import { getFullImageUrl } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface ProductCarouselProps {
  item: {
    image?: string;
    name?: string;
  };
}

export default function ProductCarousel({ item }: ProductCarouselProps) {
  const imageSource = item.image || null;
  const alt = item.name || "Product";

  if (!imageSource) {
    return (
      <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 rounded-md border text-gray-400 shrink-0">
        <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8" />
      </div>
    );
  }

  return (
    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-md overflow-hidden border shrink-0">
      <Image
        src={getFullImageUrl(imageSource)}
        alt={alt}
        width={64}
        height={64}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
