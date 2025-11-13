"use client";
import React from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";

interface ProductActionsProps {
  quantity: number;
  cartQuantity: number;
  minOrder: number;
  isAdmin: boolean;
  cartItem: unknown;
  onAddToCart: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function ProductActions({
  quantity,
  cartQuantity,
  minOrder,
  isAdmin,
  cartItem,
  onAddToCart,
  onIncrease,
  onDecrease,
  t,
}: ProductActionsProps) {
  // Show stock warning if available but below minimum order
  if (quantity > 0 && quantity < minOrder) {
    return (
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          {t('productDetail.lowStock', { quantity: String(quantity), min: String(minOrder) })}
        </p>
      </div>
    );
  }

  // Show out of stock
  if (quantity === 0) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 font-semibold">{t('productDetail.outOfStock')}</p>
      </div>
    );
  }

  // Don't show actions for admin
  if (isAdmin) {
    return null;
  }

  // Product in cart - show quantity controls
  if (cartItem && cartQuantity >= minOrder) {
    return (
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <button
            onClick={onDecrease}
            disabled={cartQuantity <= minOrder}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="h-5 w-5" />
          </button>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{cartQuantity}</div>
            <div className="text-xs text-gray-500">{t('productDetail.pairs')}</div>
          </div>
          <button
            onClick={onIncrease}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 text-center">
          {t('productDetail.inCart', { count: String(cartQuantity) })}
        </p>
      </div>
    );
  }

  // Product not in cart - show add to cart button
  return (
    <button
      onClick={onAddToCart}
      className="mt-6 w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
    >
      <ShoppingCart className="h-5 w-5" />
      <span>{t('productDetail.addToCart')}</span>
    </button>
  );
}
