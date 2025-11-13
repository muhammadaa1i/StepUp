"use client";

import { useMemo } from 'react';
import { Slipper } from '@/types';
import { getFullImageUrl } from '@/lib/utils';

/**
 * Hook to build image URLs from product data with primary image prioritization
 */
export function useModalImageUrls(product: Slipper | null) {
  const images = useMemo((): string[] => {
    const urls: string[] = [];
    
    if (product?.images && product.images.length) {
      // Add primary image first
      const primary = product.images.find(i => i.is_primary);
      if (primary) urls.push(getFullImageUrl(primary.image_path));
      
      // Add remaining images, avoiding duplicates
      product.images.forEach(img => {
        const full = getFullImageUrl(img.image_path);
        if (!urls.includes(full)) urls.push(full);
      });
    } else if (product?.image) {
      // Fallback to single image field
      urls.push(getFullImageUrl(product.image));
    }
    
    if (!urls.length) urls.push('/placeholder-product.svg');
    return urls;
  }, [product?.id, product?.images, product?.image]);

  return images;
}
