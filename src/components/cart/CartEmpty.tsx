"use client";
import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartEmpty({ t }: { t: (k: string, vars?: Record<string, string>) => string }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingBag className="h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 text-gray-400 mx-auto mb-4 sm:mb-6" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            {t('cartPage.emptyTitle')}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
            {t('cartPage.emptySubtitle')}
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
            {t('cartPage.continueShopping')}
          </Link>
        </div>
      </div>
    </div>
  );
}
