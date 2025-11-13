import React from "react";
import ProductCarousel from "./ProductCarousel";

interface OrderItem {
  image: string;
  name?: string;
  slipper?: {
    name?: string;
  };
}

interface ProductPreviewProps {
  items: OrderItem[];
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({ items }) => {
  return (
    <div className="flex gap-1 sm:gap-2 overflow-x-auto mb-4 pb-2">
      {items.slice(0, 3).map((item, index) => (
        <div key={index} className="shrink-0">
          <ProductCarousel
            item={{
              image: item.image,
              name: item.name || item.slipper?.name,
            }}
          />
        </div>
      ))}
      {items.length > 3 && (
        <div className="shrink-0 h-12 w-12 sm:h-16 sm:w-16 bg-gray-100 rounded-md flex items-center justify-center text-xs font-medium text-gray-600">
          <span className="text-xs">+{items.length - 3}</span>
        </div>
      )}
    </div>
  );
};
