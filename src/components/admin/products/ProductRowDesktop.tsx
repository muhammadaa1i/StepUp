import React from "react";
import { Slipper } from "@/types";
import { formatPrice } from "@/lib/utils";
import ProductImageGallery from "./ProductImageGallery";
import ProductAvailabilityBadge from "./ProductAvailabilityBadge";
import ProductActions from "./ProductActions";

interface ProductRowDesktopProps {
  product: Slipper;
  imageIndex: number;
  onNavigate: () => void;
  onEdit: (p: Slipper) => void;
  onDelete: (id: number) => void;
  onToggleAvailability: (p: Slipper) => void;
  onPrevImage: (e: React.MouseEvent) => void;
  onNextImage: (e: React.MouseEvent) => void;
  ProductImage: React.ComponentType<{
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
    productId: number;
  }>;
  t: (key: string) => string;
}

export default function ProductRowDesktop({
  product,
  imageIndex,
  onNavigate,
  onEdit,
  onDelete,
  onToggleAvailability,
  onPrevImage,
  onNextImage,
  ProductImage,
  t,
}: ProductRowDesktopProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleAvailability(product);
  };

  return (
    <tr
      onClick={onNavigate}
      className="hover:bg-gray-50 cursor-pointer hidden md:table-row"
      title={t("admin.products.table.product")}
    >
      {/* Product with Image */}
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="shrink-0 h-12 w-12 relative group">
            <ProductImageGallery
              images={product.images}
              fallbackImage={product.image}
              productName={product.name}
              productId={product.id}
              currentIndex={imageIndex}
              onPrevious={onPrevImage}
              onNext={onNextImage}
              ProductImage={ProductImage}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden xs:table-cell">
        <div className="text-sm text-gray-900">{formatPrice(product.price)}</div>
      </td>

      {/* Size */}
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
        <div className="text-sm text-gray-900">
          {product.size || t("admin.common.unspecified")}
        </div>
      </td>

      {/* Availability */}
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
        <ProductAvailabilityBadge
          product={product}
          onToggle={handleToggle}
          t={t}
        />
      </td>

      {/* Actions */}
      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <ProductActions
          product={product}
          onEdit={handleEdit}
          onDelete={handleDelete}
          t={t}
        />
      </td>
    </tr>
  );
}
