"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export function useImageCarousel(imageUrls: string[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeIndex >= imageUrls.length) setActiveIndex(0);
  }, [imageUrls.length, activeIndex]);

  useEffect(() => {
    if (imageUrls.length < 2) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % imageUrls.length);
    }, 4000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [imageUrls.length]);

  const goPrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (imageUrls.length < 2) return;
      setActiveIndex((i) => (i - 1 + imageUrls.length) % imageUrls.length);
    },
    [imageUrls.length]
  );

  const goNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (imageUrls.length < 2) return;
      setActiveIndex((i) => (i + 1) % imageUrls.length);
    },
    [imageUrls.length]
  );

  return {
    activeIndex,
    setActiveIndex,
    goPrev,
    goNext,
  };
}
