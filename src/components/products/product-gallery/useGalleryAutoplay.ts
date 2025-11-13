"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Hook to manage gallery autoplay functionality
 */
export function useGalleryAutoplay(
  imageCount: number,
  activeIndex: number,
  setActiveIndex: (index: number) => void,
  autoplayInterval: number = 4000
) {
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (imageCount < 2) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);

    autoplayRef.current = setInterval(() => {
      setActiveIndex((activeIndex + 1) % imageCount);
    }, autoplayInterval);
  }, [imageCount, activeIndex, setActiveIndex, autoplayInterval]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  // Start autoplay on mount
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  return { startAutoplay, stopAutoplay };
}
