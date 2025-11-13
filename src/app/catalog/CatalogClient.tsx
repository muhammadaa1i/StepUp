"use client";
import React, { useState } from "react";
import ProductQuickViewModal from "@/components/products/ProductQuickViewModal";
import ErrorPage from "@/components/common/ErrorPage";
import { Slipper } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useI18n } from "@/i18n";
import CatalogPagination from "@/components/catalog/CatalogPagination";
import CatalogLoadingGrid from "@/components/catalog/CatalogLoadingGrid";
import CatalogEmptyState from "@/components/catalog/CatalogEmptyState";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import CatalogProductGrid from "@/components/catalog/CatalogProductGrid";
import useCatalogProducts from "@/hooks/useCatalogProducts";

interface Props { initial: unknown | null }

export default function CatalogClient({ initial }: Props) {
  const { t } = useI18n();
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState<Slipper | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const {
    products,
    isLoading,
    isInitialLoading,
    hasLoaded,
    hasError,
    errorMessage,
    errorStatus,
    pagination,
    handlePageChange,
    handleRetry,
  } = useCatalogProducts(initial);

  const openQuickView = (p: Slipper) => {
    setQuickViewProduct(p);
    setIsQuickViewOpen(true);
  };
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    // delay clearing to allow exit animation if added later
    setTimeout(() => setQuickViewProduct(null), 200);
  };

  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50">
      <CatalogHeader />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          {pagination.total > 0 && (<p className="text-sm text-gray-600">{t('catalog.pageStatus', { page: String(pagination.page), totalPages: String(pagination.totalPages) })}</p>)}
        </div>
        {isInitialLoading || isLoading ? (
          <CatalogLoadingGrid />
        ) : hasError ? (
          <ErrorPage error={{ status: errorStatus, message: errorMessage }} onRetry={handleRetry} />
        ) : Array.isArray(products) && products.length > 0 ? (
          <>
            <CatalogProductGrid
              products={products}
              onAddToCart={addToCart}
              onViewDetails={openQuickView}
            />
            <CatalogPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
            <ProductQuickViewModal
              product={quickViewProduct}
              isOpen={isQuickViewOpen}
              onClose={closeQuickView}
            />
          </>
        ) : hasLoaded ? (
          <CatalogEmptyState />
        ) : null}
      </div>
    </div>
  );
}
