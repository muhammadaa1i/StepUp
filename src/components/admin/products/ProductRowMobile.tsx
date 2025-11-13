import React from "react";
import { Package } from "lucide-react";
import { Slipper } from "@/types";
import { formatPrice } from "@/lib/utils";
import { getFullImageUrl } from "@/lib/utils";
import ProductAvailabilityBadge from "./ProductAvailabilityBadge";
import ProductActions from "./ProductActions";

interface ProductRowMobileProps {
  product: Slipper;
  imageIndex: number;
  onNavigate: () => void;
  onEdit: (p: Slipper) => void;
  onDelete: (id: number) => void;
  onToggleAvailability: (p: Slipper) => void;
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

export default function ProductRowMobile({
  product,
  imageIndex,
  onNavigate,
  onEdit,
  onDelete,
  onToggleAvailability,
  ProductImage,
  t,
}: ProductRowMobileProps) {
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
    <tr className="md:hidden">
      <td colSpan={5} className="px-3 py-3">
        <div
          className="flex gap-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
          onClick={onNavigate}
          role="button"
          tabIndex={0}
          title={t("admin.products.table.product")}
        >
          {/* Image */}
          <div className="shrink-0 h-14 w-14 relative rounded-md overflow-hidden bg-gray-100">
            {product.images && product.images.length ? (
              (() => {
                const list = product.images;
                const safeIdx = ((imageIndex % list.length) + list.length) % list.length;
                const image = list[safeIdx];
                return (
                  <div className="relative w-full h-full">
                    <ProductImage
                      src={getFullImageUrl(image.image_path)}
                      alt={product.name}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                      productId={product.id}
                    />
                  </div>
                );
              })()
            ) : product.image ? (
              <div className="relative w-full h-full">
                <ProductImage
                  src={getFullImageUrl(product.image)}
                  alt={product.name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                  productId={product.id}
                />
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-gray-900 truncate text-sm leading-snug">
                {product.name}
              </p>
              <ProductAvailabilityBadge
                product={product}
                onToggle={handleToggle}
                t={t}
                compact
              />
            </div>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-500">
              <span>{formatPrice(product.price)}</span>
              {product.size && <span>{product.size}</span>}
            </div>
            <div className="mt-2">
              <ProductActions
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
                t={t}
                compact
              />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
