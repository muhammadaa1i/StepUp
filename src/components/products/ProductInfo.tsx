"use client";
import React from "react";
import { Slipper } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Package, Ruler, DollarSign, Layers, Tag } from "lucide-react";

interface ProductInfoProps {
  product: Slipper;
  t: (key: string, params?: Record<string, string>) => string;
  locale?: string;
}

export default function ProductInfo({ product, t, locale = "ru" }: ProductInfoProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.name}</h1>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-700">
          <DollarSign className="h-5 w-5 mr-3 text-emerald-600 shrink-0" />
          <span className="font-semibold mr-2">{t('productDetail.price')}:</span>
          <span className="text-2xl font-bold text-emerald-600">
            {formatPrice(product.price, "сум", locale)}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <Ruler className="h-5 w-5 mr-3 text-gray-600 shrink-0" />
          <span className="font-semibold mr-2">{t('productDetail.size')}:</span>
          <span>{product.size || t('productDetail.notSpecified')}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <Package className="h-5 w-5 mr-3 text-gray-600 shrink-0" />
          <span className="font-semibold mr-2">{t('productDetail.quantity')}:</span>
          <span
            className={
              product.quantity > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"
            }
          >
            {product.quantity} {t('productDetail.pairsAvailable')}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <Layers className="h-5 w-5 mr-3 text-gray-600 shrink-0" />
          <span className="font-semibold mr-2">{t('productDetail.minOrder')}:</span>
          <span>60 {t('productDetail.pairs')}</span>
        </div>
      </div>

      {product.category_name && (
        <div className="mb-6 inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
          <Tag className="h-4 w-4 mr-2" />
          {product.category_name}
        </div>
      )}
    </>
  );
}
