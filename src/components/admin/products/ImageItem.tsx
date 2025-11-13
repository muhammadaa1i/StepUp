"use client";
import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { getFullImageUrl } from "@/lib/utils";

interface ImageItemProps {
  image: {
    id: number;
    image_url: string;
    is_primary?: boolean;
    alt_text?: string;
  };
  isDeleting: boolean;
  onDelete: (imageId: number) => Promise<void>;
  onSetPrimary: (imageId: number) => Promise<void>;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function ImageItem({
  image,
  isDeleting,
  onDelete,
  onSetPrimary,
  t,
}: ImageItemProps) {
  const fullUrl = getFullImageUrl(image.image_url);

  return (
    <li className="relative group rounded border overflow-hidden bg-gray-50">
      <div className="relative w-full h-20">
        <Image
          src={fullUrl}
          alt={image.alt_text || "product image"}
          fill
          className="object-cover"
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-product.svg";
          }}
        />
      </div>

      {image.is_primary && (
        <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[9px] px-1 py-0.5 rounded">
          {t("admin.products.images.primaryBadge")}
        </span>
      )}

      <div className="absolute top-1 right-1 flex gap-1">
        {!image.is_primary && (
          <button
            type="button"
            aria-label="Set primary"
            onClick={() => onSetPrimary(image.id)}
            className="bg-green-500 hover:bg-green-600 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition"
            title="Set as primary"
          >
            <span className="text-[10px]">★</span>
          </button>
        )}
        <button
          type="button"
          aria-label={t("admin.products.images.removeImageAria")}
          disabled={isDeleting}
          onClick={() => onDelete(image.id)}
          className="bg-black/50 hover:bg-black/70 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition disabled:opacity-60"
        >
          {isDeleting ? (
            <span className="animate-pulse text-[10px]">…</span>
          ) : (
            <Trash2 className="h-3 w-3" />
          )}
        </button>
      </div>
    </li>
  );
}
