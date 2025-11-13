"use client";
import React from "react";
import ProductCard from "@/components/products/ProductCard";
import { Slipper } from "@/types";

type Props = {
  products: Slipper[];
  onAddToCart: (p: Slipper) => void;
  onViewDetails: (p: Slipper) => void;
};

export default function CatalogProductGrid({ products, onAddToCart, onViewDetails }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          slipper={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
