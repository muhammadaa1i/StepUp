"use client";

import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { GalleryCarouselProps } from "./types";

/**
 * Main carousel component for product gallery
 */
export const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  imageUrls,
  productName,
  activeIndex,
  imageError,
  onPrevious,
  onNext,
  onSelectIndex,
  onImageError,
  onMouseEnter,
  onMouseLeave,
  onTouchStart,
  onTouchEnd,
  t,
}) => {
  const safeActive = Math.min(activeIndex, imageUrls.length - 1);
  const currentImage = imageUrls[safeActive];

  return (
    <div
      className="relative aspect-4/3 w-full bg-gray-100 rounded-lg overflow-hidden group select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role={imageUrls.length > 1 ? "region" : undefined}
      aria-roledescription={imageUrls.length > 1 ? "carousel" : undefined}
      aria-label={
        imageUrls.length > 1
          ? t('productDetail.imageGallery', { count: String(imageUrls.length) })
          : undefined
      }
    >
      {/* Main Image */}
      {!imageError && currentImage !== "/placeholder-product.svg" ? (
        <Image
          fill
          key={currentImage}
          src={currentImage}
          alt={productName}
          unoptimized
          className="object-contain transition-opacity duration-300"
          onError={onImageError}
          priority={safeActive === 0}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Package className="h-20 w-20 mb-2" />
          <span className="text-sm">{t('productDetail.noImage')}</span>
        </div>
      )}

      {/* Navigation Controls */}
      {imageUrls.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={t('common.previous')}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={t('common.next')}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {imageUrls.map((_, idx) => (
              <button
                key={idx}
                onClick={() => onSelectIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === safeActive ? "bg-white w-6" : "bg-white/50"
                }`}
                aria-label={t('productDetail.goToImage', { number: String(idx + 1) })}
                aria-current={idx === safeActive ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
