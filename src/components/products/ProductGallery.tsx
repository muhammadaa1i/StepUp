"use client";

import React, { useState, useCallback } from "react";
import { ProductGalleryProps } from "./product-gallery/types";
import { useGalleryAutoplay } from "./product-gallery/useGalleryAutoplay";
import { useGalleryTouchGestures } from "./product-gallery/useGalleryTouchGestures";
import { useGalleryKeyboardNav } from "./product-gallery/useGalleryKeyboardNav";
import { GalleryCarousel } from "./product-gallery/GalleryCarousel";
import { GalleryThumbnails } from "./product-gallery/GalleryThumbnails";

export default function ProductGallery({
  imageUrls,
  productName,
  activeIndex,
  setActiveIndex,
  t,
}: ProductGalleryProps) {
  const [imageError, setImageError] = useState(false);

  // Navigation handlers
  const goPrev = useCallback(() => {
    if (imageUrls.length < 2) return;
    setActiveIndex((activeIndex - 1 + imageUrls.length) % imageUrls.length);
  }, [imageUrls.length, activeIndex, setActiveIndex]);

  const goNext = useCallback(() => {
    if (imageUrls.length < 2) return;
    setActiveIndex((activeIndex + 1) % imageUrls.length);
  }, [imageUrls.length, activeIndex, setActiveIndex]);

  // Autoplay management
  const { startAutoplay, stopAutoplay } = useGalleryAutoplay(
    imageUrls.length,
    activeIndex,
    setActiveIndex,
    4000
  );

  // Touch gesture support
  const { onTouchStart, onTouchEnd } = useGalleryTouchGestures(goNext, goPrev, 40);

  // Keyboard navigation
  useGalleryKeyboardNav(goPrev, goNext);

  const handleImageError = useCallback(() => setImageError(true), []);

  return (
    <div className="w-full lg:w-1/2">
      <GalleryCarousel
        imageUrls={imageUrls}
        productName={productName}
        activeIndex={activeIndex}
        imageError={imageError}
        onPrevious={goPrev}
        onNext={goNext}
        onSelectIndex={setActiveIndex}
        onImageError={handleImageError}
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        t={t}
      />

      <GalleryThumbnails
        imageUrls={imageUrls}
        productName={productName}
        activeIndex={activeIndex}
        onSelectIndex={setActiveIndex}
      />
    </div>
  );
}
