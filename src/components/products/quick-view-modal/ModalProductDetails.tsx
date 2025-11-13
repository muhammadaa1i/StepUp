"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { ModalProductDetailsProps } from './types';

/**
 * Product details component for quick view modal
 */
export const ModalProductDetails: React.FC<ModalProductDetailsProps> = ({
  product,
  price,
  inCart,
  isAdmin,
  onAddToCart,
  t,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Price & Size */}
      <div>
        <p className="text-sm text-gray-500 mb-1">
          {t('product.size')}: <span className="font-medium text-gray-800">{product.size}</span>
        </p>
        <p className="text-2xl font-bold text-emerald-600">{price}</p>
      </div>

      {/* Product Info */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>{t('product.availableQuantity', { count: String(product.quantity || 0) })}</p>
        {product.category_name && (
          <p>{t('product.category')}: {product.category_name}</p>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="mt-auto pt-2">
        {!isAdmin && !inCart && (
          <button
            onClick={onAddToCart}
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md py-2 transition"
          >
            <ShoppingCart className="h-5 w-5" /> {t('cart.addToCart')}
          </button>
        )}
        {!isAdmin && inCart && (
          <div className="w-full text-center py-2 rounded-md bg-green-100 text-green-700 font-semibold">
            {t('cart.inCart')}
          </div>
        )}
      </div>
    </div>
  );
};
