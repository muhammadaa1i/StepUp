"use client";
import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import ProductImage from "@/components/products/ProductImage";
import { formatPrice } from "@/lib/utils";

export interface CartItemShape {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

interface Props {
  item: CartItemShape;
  index: number;
  total: number;
  onUpdate: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  t: (k: string, vars?: Record<string, string>) => string;
}

export default function CartItemRow({ item, index, total, onUpdate, onRemove, t }: Props) {
  const dec = () => onUpdate(item.id, item.quantity - 6);
  const inc = () => onUpdate(item.id, item.quantity + 6);

  return (
    <div
      className={`p-3 sm:p-4 lg:p-6 ${index !== total - 1 ? "border-b border-gray-200" : ""}`}
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        {/* Product Image */}
        <div className="shrink-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-md sm:rounded-lg overflow-hidden flex items-center justify-center border border-emerald-100">
            <ProductImage item={item as any} />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 leading-tight wrap-break-word">
            {item.name}
          </h3>
          {(item.size || item.color) && (
            <div className="text-xs sm:text-sm text-gray-600 mb-2">
              {item.size && <span>{t('product.size')}: {item.size}</span>}
              {item.size && item.color && <span> • </span>}
              {item.color && <span>{t('cartPage.color')}: {item.color}</span>}
            </div>
          )}
          <p className="text-base sm:text-lg lg:text-xl font-bold text-emerald-600 mb-3 sm:mb-4 wrap-break-word">
            {formatPrice(item.price, t('common.currencySom'))}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={dec}
                className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 hover:text-gray-900 transition-colors"
                disabled={item.quantity <= 60}
              >
                <Minus className="h-3 sm:h-4 w-3 sm:w-4" />
              </button>
              <span className="w-8 sm:w-12 text-center text-sm sm:text-base font-semibold text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={inc}
                className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Plus className="h-3 sm:h-4 w-3 sm:w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Item Total & Remove */}
        <div className="flex flex-col items-end justify-between ml-2 sm:ml-auto">
          <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 wrap-break-word text-right">
            {formatPrice(item.price * item.quantity, t('common.currencySom'))}
          </p>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:text-red-700 mt-6 p-1 sm:p-2 rounded-md hover:bg-red-50"
            aria-label="Remove from cart"
          >
            <Trash2 className="h-4 sm:h-5 w-4 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
