"use client";

import { useEffect, useCallback } from "react";

/**
 * Hook to handle keyboard navigation for gallery
 */
export function useGalleryKeyboardNav(
  onPrevious: () => void,
  onNext: () => void
) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      onPrevious();
    } else if (e.key === "ArrowRight") {
      onNext();
    }
  }, [onPrevious, onNext]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
