"use client";

import React from "react";
import { ShoppingCart, Loader2, Plus, Minus } from "lucide-react";

interface ProductCardDetailsProps {
  name: string;
  size: string;
  price: string;
  inCart: boolean;
  isAdmin: boolean;
  hasAddToCart: boolean;
  canAddToCart: boolean;
  addPending: boolean;
  cartQuantity?: number;
  canDecrease: boolean;
  canIncrease: boolean;
  onDecrease: (e: React.MouseEvent) => void;
  onIncrease: (e: React.MouseEvent) => void;
  onAddClick: () => void;
  t: (key: string, options?: Record<string, string>) => string;
}

export const ProductCardDetails: React.FC<ProductCardDetailsProps> = ({
  name,
  size,
  price,
  inCart,
  isAdmin,
  hasAddToCart,
  canAddToCart,
  addPending,
  cartQuantity,
  canDecrease,
  canIncrease,
  onDecrease,
  onIncrease,
  onAddClick,
  t,
}) => {
  return (
    <div className="flex flex-col flex-1 p-3 gap-1">
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-snug min-h-9">
        {name}
      </h3>
      <div className="flex items-center text-xs sm:text-sm text-gray-600">
        <span className="truncate">
          {t("product.size")}: {size}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-base sm:text-lg font-bold text-emerald-600">{price}</span>
        {inCart && !isAdmin && (
          <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium">
            {t("cart.inCart")}
          </span>
        )}
      </div>

      {/* Quantity Controls */}
      {/* Quantity Controls (compact) */}
      {inCart && hasAddToCart && !isAdmin && (
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs text-gray-500">{t("product.quantity")}:</span>
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDecrease(e);
              }}
              className={`p-1 rounded border text-xs transition-colors ${canDecrease
                  ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                  : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                }`}
              disabled={!canDecrease}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-12 text-center text-xs font-semibold text-gray-900">{cartQuantity || 60}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Allow click even when visually disabled so we can show a toast in catalog
                onIncrease(e);
              }}
              className={`p-1 rounded border text-xs transition-colors ${canIncrease
                  ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                }`}
              aria-disabled={!canIncrease}
              title={!canIncrease ? t("product.insufficientStock") : undefined}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      {hasAddToCart && !inCart && !isAdmin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddClick();
          }}
          disabled={!canAddToCart || addPending}
          className={`mt-2 w-full inline-flex items-center justify-center gap-1 rounded-md text-white text-xs sm:text-sm font-medium py-1.5 transition-colors ${!canAddToCart || addPending ? "bg-gray-300 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          title={
            !canAddToCart
              ? t("product.insufficientStockTooltip", { min: "60" })
              : t("cart.addToCartHint")
          }
        >
          {addPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}{" "}
          {t("cart.addToCart")}
        </button>
      )}
    </div>
  );
}
