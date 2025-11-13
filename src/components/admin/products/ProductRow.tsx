"use client";
import React, { memo, useCallback } from "react";
import { Slipper } from "@/types";
import ProductRowDesktop from "./ProductRowDesktop";
import ProductRowMobile from "./ProductRowMobile";
import ProductImage from "@/components/admin/products/ProductImage";

interface ProductRowProps {
  product: Slipper;
  onEdit: (p: Slipper) => void;
  onDelete: (id: number) => void;
  onToggleAvailability: (p: Slipper) => void;
  navigate: (id: number) => void;
  imageIndex: number;
  setImageIndex: (productId: number, nextIndex: number) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onEdit,
  onDelete,
  onToggleAvailability,
  navigate,
  imageIndex,
  setImageIndex,
  t,
}) => {
  const handlePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!product.images || product.images.length === 0) return;
      const list = product.images;
      const safeIdx = ((imageIndex % list.length) + list.length) % list.length;
      setImageIndex(product.id, (safeIdx - 1 + list.length) % list.length);
    },
    [imageIndex, product, setImageIndex]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!product.images || product.images.length === 0) return;
      const list = product.images;
      const safeIdx = ((imageIndex % list.length) + list.length) % list.length;
      setImageIndex(product.id, (safeIdx + 1) % list.length);
    },
    [imageIndex, product, setImageIndex]
  );

  const handleNavigate = useCallback(() => {
    navigate(product.id);
  }, [navigate, product.id]);

  return (
    <>
      <ProductRowDesktop
        product={product}
        imageIndex={imageIndex}
        onNavigate={handleNavigate}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleAvailability={onToggleAvailability}
        onPrevImage={handlePrev}
        onNextImage={handleNext}
        ProductImage={ProductImage}
        t={t}
      />
      <ProductRowMobile
        product={product}
        imageIndex={imageIndex}
        onNavigate={handleNavigate}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleAvailability={onToggleAvailability}
        ProductImage={ProductImage}
        t={t}
      />
    </>
  );
};

export default memo(ProductRow);
