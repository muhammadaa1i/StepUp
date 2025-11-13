import React from "react";
import { Package } from "lucide-react";
import { getFullImageUrl } from "@/lib/utils";
import { SlipperImage } from "@/types";

interface ProductImageGalleryProps {
  images?: SlipperImage[];
  fallbackImage?: string;
  productName: string;
  productId: number;
  currentIndex: number;
  onPrevious: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  ProductImage: React.ComponentType<{
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
    productId: number;
  }>;
}

export default function ProductImageGallery({
  images,
  fallbackImage,
  productName,
  productId,
  currentIndex,
  onPrevious,
  onNext,
  ProductImage,
}: ProductImageGalleryProps) {
  if (!images || images.length === 0) {
    if (fallbackImage) {
      return (
        <ProductImage
          className="h-12 w-12 rounded-lg object-cover"
          src={getFullImageUrl(fallbackImage)}
          alt={productName}
          width={48}
          height={48}
          productId={productId}
        />
      );
    }
    return (
      <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
        <Package className="h-6 w-6 text-gray-400" />
      </div>
    );
  }

  const safeIndex = ((currentIndex % images.length) + images.length) % images.length;
  const currentImage = images[safeIndex];

  return (
    <>
      <ProductImage
        className="h-12 w-12 rounded-lg object-cover transition-opacity duration-200"
        src={getFullImageUrl(currentImage.image_path)}
        alt={productName}
        width={48}
        height={48}
        productId={productId}
      />
      {images.length > 1 && (
        <>
          <button
            onClick={onPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full px-1 py-0.5 opacity-0 group-hover:opacity-100 transition text-[10px] leading-none"
            aria-label="Prev image"
          >
            ‹
          </button>
          <button
            onClick={onNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full px-1 py-0.5 opacity-0 group-hover:opacity-100 transition text-[10px] leading-none"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-0.5 pb-0.5 opacity-0 group-hover:opacity-100 transition">
            {images.slice(0, 4).map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1.5 w-1.5 rounded-full ${
                  dotIdx === safeIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
            {images.length > 4 && (
              <span className="text-[8px] text-white/80 ml-0.5">+{images.length - 4}</span>
            )}
          </div>
        </>
      )}
    </>
  );
}
