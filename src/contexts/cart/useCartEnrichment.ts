/**
 * Hook for enriching cart items with product images
 */

import { useEffect, useRef } from "react";
import { Slipper, SlipperImage } from "@/types";
import { fetchProduct } from "@/services/productService";
import { CartItem } from "./cartTransformers";

interface UseCartEnrichmentOptions {
  items: CartItem[];
  itemsRef: React.MutableRefObject<CartItem[]>;
  onItemsEnriched: (items: CartItem[]) => void;
}

type ImageLike = { id: number; image_url?: string; image_path?: string };

export function useCartEnrichment({
  items,
  itemsRef,
  onItemsEnriched,
}: UseCartEnrichmentOptions) {
  const enrichingRef = useRef<boolean>(false);
  const enrichedIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Run only on client
    if (typeof window === "undefined") return;
    if (enrichingRef.current) return;
    
    const current = itemsRef.current;
    if (!current || current.length === 0) return;

    // Identify items that need enrichment (no image and no images array)
    const needs = current
      .filter((it) => (!it.image && (!it.images || it.images.length === 0)))
      .map((it) => it.id)
      .filter((id) => !enrichedIdsRef.current.has(id));

    if (needs.length === 0) return;

    enrichingRef.current = true;
    
    (async () => {
      // Concurrency limit to avoid spikes
      const limit = 3;
      let idx = 0;
      const results: Record<number, Slipper | null> = {};

      const worker = async () => {
        while (idx < needs.length) {
          const i = idx++;
          const id = needs[i];
          enrichedIdsRef.current.add(id);
          try {
            const product = await fetchProduct(id);
            results[id] = product;
          } catch {
            results[id] = null;
          }
        }
      };

      const workers = Array.from({ length: Math.min(limit, needs.length) }, () => worker());
      await Promise.allSettled(workers);

      // Build updated items with images filled where available
      const updated = itemsRef.current.map((it) => {
        const product = results[it.id];
        if (!product) return it;
        
        const mappedImages = (product.images || []).map((img: SlipperImage | ImageLike) => ({
          id: (img as SlipperImage | ImageLike).id,
          image_url: (img as SlipperImage).image_path || (img as ImageLike).image_url || "",
        }));
        
        const firstImage = product.image || (mappedImages[0]?.image_url ?? "");
        
        if ((it.image && it.image.length > 0) || (it.images && it.images.length > 0)) {
          return it;
        }
        
        return {
          ...it,
          image: it.image || firstImage,
          images: (it.images && it.images.length > 0) ? it.images : mappedImages,
        };
      });

      // Only update state if there are changes (some items gained images)
      const changed = updated.some((u, ix) => {
        const prev = itemsRef.current[ix];
        const prevHas = !!(prev?.image) || (prev?.images && prev.images.length > 0);
        const nowHas = !!(u?.image) || (u?.images && u.images.length > 0);
        return nowHas && !prevHas;
      });

      if (changed) {
        onItemsEnriched(updated);
      }

      enrichingRef.current = false;
    })();
  }, [items, itemsRef, onItemsEnriched]);
}
