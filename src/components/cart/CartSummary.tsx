"use client";
import React from "react";
import Link from "next/link";
import { CreditCard, Loader2 } from "lucide-react";

interface Props {
  totalAmount: number;
  offerAccepted: boolean;
  setOfferAccepted: (v: boolean) => void;
  isProcessing: boolean;
  handleCheckout: (opts: { offerAccepted: boolean }) => void;
  isAuthenticated: boolean;
  t: (k: string, vars?: Record<string, string>) => string;
  formatPrice: (amount: number, currency: string) => string;
}

export default function CartSummary({ totalAmount, offerAccepted, setOfferAccepted, isProcessing, handleCheckout, isAuthenticated, t, formatPrice }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-8">
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <div className="flex justify-between items-start">
          <span className="text-base sm:text-lg font-bold">{t('cartPage.total')}</span>
          <span className="text-base sm:text-lg font-bold text-emerald-600 wrap-break-word text-right">
            {formatPrice(totalAmount, t('common.currencySom'))}
          </span>
        </div>
      </div>

      {/* Offer acceptance */}
      <div className="mb-4 sm:mb-5 rounded-md border border-gray-200 bg-gray-50 p-3 sm:p-4">
        <label className="flex items-start gap-2 sm:gap-3 cursor-pointer select-none">
          <input
            id="offer-accept"
            type="checkbox"
            className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 rounded border-gray-300 text-green-600 accent-green-600 shrink-0"
            checked={offerAccepted}
            onChange={(e) => setOfferAccepted(e.target.checked)}
          />
          <span className="text-xs sm:text-sm text-gray-700 leading-5">
            {t('offer.acceptLabel')} {" "}
            <a href="/offer" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline wrap-break-word">
              ({t('offer.viewLink')})
            </a>
          </span>
        </label>
      </div>

      <button
        onClick={() => handleCheckout({ offerAccepted })}
        disabled={isProcessing || !offerAccepted}
        className="w-full bg-emerald-600 text-white py-2.5 sm:py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 sm:h-5 w-4 sm:w-5 mr-2 animate-spin" />
            <span className="truncate">{t('payment.processing')}</span>
          </>
        ) : (
          <>
            <CreditCard className="h-4 sm:h-5 w-4 sm:w-5 mr-2 shrink-0" />
            <span className="truncate">{t('cartPage.checkout')}</span>
          </>
        )}
      </button>

      {!isAuthenticated && (
        <p className="text-xs sm:text-sm text-gray-600 text-center mt-3 sm:mt-4 leading-5">
          <Link href="/auth/login" className="text-emerald-600 hover:underline wrap-break-word">
            {t('cartPage.loginForCheckout')}
          </Link>
        </p>
      )}
    </div>
  );
}
