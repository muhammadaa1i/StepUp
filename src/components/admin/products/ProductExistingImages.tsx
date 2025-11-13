"use client";
import React from "react";
import ImageItem from "./ImageItem";

interface ProductExistingImagesProps {
  t: (key: string, params?: Record<string, string>) => string;
  editingImages: Array<{
    id: number;
    image_url: string;
    is_primary?: boolean;
    alt_text?: string;
  }>;
  loadingImages: boolean;
  deletingImageIds: number[];
  onDeleteExistingImage: (imageId: number) => Promise<void>;
  onSetPrimaryImage: (imageId: number) => Promise<void>;
}

export default function ProductExistingImages({
  t,
  editingImages,
  loadingImages,
  deletingImageIds,
  onDeleteExistingImage,
  onSetPrimaryImage,
}: ProductExistingImagesProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold text-gray-700">
          {t("admin.products.images.current")}
        </h4>
        {loadingImages && (
          <span className="text-[10px] text-gray-500">
            {t("admin.products.images.loading")}
          </span>
        )}
      </div>

      {!loadingImages && editingImages.length === 0 && (
        <div className="text-[11px] text-gray-z500 border border-dashed rounded p-2">
          {t("admin.products.images.none")}
        </div>
      )}

      {editingImages.length > 0 && (
        <>
          <ul className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {editingImages.map((img) => (
              <ImageItem
                key={img.id}
                image={img}
                isDeleting={deletingImageIds.includes(img.id)}
                onDelete={onDeleteExistingImage}
                onSetPrimary={onSetPrimaryImage}
                t={t}
              />
            ))}
          </ul>
          <p className="text-[10px] text-gray-500">
            {t("admin.products.images.addingHint")}
          </p>
        </>
      )}
    </div>
  );
}
