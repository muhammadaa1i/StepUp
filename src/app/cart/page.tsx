"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import { useI18n } from "@/i18n";
import useAuthGate from "@/hooks/useAuthGate";
import useCheckout from "@/hooks/useCheckout";
import CartEmpty from "@/components/cart/CartEmpty";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import CartAuthGate from "@/components/cart/CartAuthGate";

export default function CartPage() {
  const {
    items,
    itemCount,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { isAuthenticated, user, isLoading } = useAuth();
  const { isProcessing, handleCheckout } = useCheckout();
  const [offerAccepted, setOfferAccepted] = useState(false);

  const { t } = useI18n();
  const { shouldShowFullLoading, shouldShowMinimalLoading, shouldSkipAllChecks } = useAuthGate({
    isAuthenticated,
    isLoading,
    isAdmin: user?.is_admin,
    t,
  });

  return (
    <CartAuthGate
      shouldShowFullLoading={shouldShowFullLoading}
      shouldShowMinimalLoading={shouldShowMinimalLoading}
      shouldSkipAllChecks={shouldSkipAllChecks}
      isAuthenticated={isAuthenticated}
      isLoading={isLoading}
      t={t}
    >
      {items.length === 0 ? (
        <CartEmpty t={t} />
      ) : (
        <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="mb-6 sm:mb-8">
              <Link
                href="/catalog"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-3 sm:mb-4 text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 sm:h-5 w-4 sm:w-5 mr-1 sm:mr-2" />
                {t('cartPage.continue')}
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center leading-tight">
                  <ShoppingCart className="h-5 sm:h-6 lg:h-8 w-5 sm:w-6 lg:w-8 mr-2 sm:mr-3 shrink-0" />
                  <span className="wrap-break-word">
                    {t('cartPage.heading')} ({t('cartPage.itemsCount', { count: String(itemCount) })})
                  </span>
                </h1>
                <button
                  onClick={clearCart}
                  className="bg-red-600 text-white hover:bg-red-500 px-3 py-1.5 sm:py-1 rounded-md text-sm font-medium transition-colors shrink-0 self-start sm:self-auto"
                >
                  {t('cartPage.clear')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm">
                  {items.map((item, index) => (
                    <CartItemRow
                      key={`${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}-${index}`}
                      item={item as any}
                      index={index}
                      total={items.length}
                      onUpdate={updateQuantity}
                      onRemove={removeFromCart}
                      t={t}
                    />
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <CartSummary
                  totalAmount={totalAmount}
                  offerAccepted={offerAccepted}
                  setOfferAccepted={setOfferAccepted}
                  isProcessing={isProcessing}
                  handleCheckout={handleCheckout}
                  isAuthenticated={isAuthenticated}
                  t={t}
                  formatPrice={formatPrice} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </CartAuthGate>
  );
}
