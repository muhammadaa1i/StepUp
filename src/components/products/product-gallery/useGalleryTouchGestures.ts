"use client";

import { useRef, useCallback } from "react";

/**
 * Hook to handle touch gestures for gallery navigation
 */
export function useGalleryTouchGestures(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  swipeThreshold: number = 40
) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    
    if (touchStartX.current == null || touchEndX.current == null) return;
    
    const delta = touchEndX.current - touchStartX.current;
    
    if (Math.abs(delta) > swipeThreshold) {
      if (delta > 0) {
        onSwipeRight(); // Swipe right = previous
      } else {
        onSwipeLeft(); // Swipe left = next
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  }, [onSwipeLeft, onSwipeRight, swipeThreshold]);

  return { onTouchStart, onTouchEnd };
}
