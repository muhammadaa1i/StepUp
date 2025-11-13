"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface ProductCardMediaProps {
  imageUrls: string[];
  activeIndex: number;
  imageError: boolean;
  inCart: boolean;
  isAdmin: boolean;
  cartQuantity?: number;
  isAvailable: boolean;
  canAddToCart: boolean;
  slipperName: string;
  onImageError: () => void;
  onPrevImage: (e?: React.MouseEvent) => void;
  onNextImage: (e?: React.MouseEvent) => void;
  onSelectImage: (index: number) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

export function ProductCardMedia({
  imageUrls,
  activeIndex,
  imageError,
  inCart,
  isAdmin,
  cartQuantity,
  isAvailable,
  canAddToCart,
  slipperName,
  onImageError,
  onPrevImage,
  onNextImage,
  onSelectImage,
  t,
}: ProductCardMediaProps) {
  return (
    <div className="relative aspect-4/3 w-full bg-gray-100">
      {inCart && !isAdmin && (
        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 z-10 bg-emerald-600 text-white text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm sm:rounded-md shadow-sm flex items-center space-x-1">
          <Check className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
          <span className="truncate">
            {t("cart.inCart")}
            {cartQuantity ? `: ${cartQuantity}` : ""}
          </span>
        </div>
      )}
      {!imageError && imageUrls[activeIndex] !== "/placeholder-product.svg" ? (
        <>
          <Image
            key={imageUrls[activeIndex]}
            src={imageUrls[activeIndex]}
            alt={slipperName}
            fill
            className="object-cover transition-opacity duration-300"
            onError={onImageError}
            loading="lazy"
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={onPrevImage}
                onTouchStart={(e) => e.stopPropagation()}
                aria-label="Previous image"
                className="absolute left-0.5 sm:left-1 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 active:bg-black/70 text-white rounded-full p-1.5 sm:p-2 backdrop-blur-sm focus:outline-none text-xs sm:text-sm transition-colors duration-150 touch-manipulation"
              >
                ‹
              </button>
              <button
                onClick={onNextImage}
                onTouchStart={(e) => e.stopPropagation()}
                aria-label="Next image"
                className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 active:bg-black/70 text-white rounded-full p-1.5 sm:p-2 backdrop-blur-sm focus:outline-none text-xs sm:text-sm transition-colors duration-150 touch-manipulation"
              >
                ›
              </button>
              <div className="absolute bottom-1.5 sm:bottom-2 left-0 right-0 flex items-center justify-center gap-1">
                {imageUrls.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to image ${i + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectImage(i);
                    }}
                    className={`h-1 sm:h-1.5 rounded-full transition-all ${
                      i === activeIndex ? "bg-white w-3 sm:w-4" : "bg-white/50 w-1.5 sm:w-2"
                    }`}
                    style={{ lineHeight: 0 }}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">👟</div>
            <div className="text-sm">{t("common.imageUnavailable")}</div>
          </div>
        </div>
      )}
      {!isAvailable && (
        <div className="absolute inset-0 bg-white bg-opacity-85 flex items-center justify-center">
          <span className="text-gray-700 font-semibold bg-white px-3 py-1 rounded-lg shadow-sm border">
            {t("product.notAvailable")}
          </span>
        </div>
      )}
      {isAvailable && !canAddToCart && (
        <div className="absolute inset-0 bg-yellow-50 bg-opacity-85 flex items-center justify-center">
          <span className="text-yellow-800 font-semibold bg-yellow-100 px-3 py-1 rounded-lg shadow-sm border">
            {t("product.insufficientStock")}
          </span>
        </div>
      )}
    </div>
  );
}
