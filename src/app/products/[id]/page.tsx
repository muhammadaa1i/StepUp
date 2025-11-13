"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { ProductDetailSkeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n";
import useProductDetail from "@/hooks/useProductDetail";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import ProductActions from "@/components/products/ProductActions";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, getCartItem, updateQuantity } = useCart();
  const { user } = useAuth();
  const { t } = useI18n();

  const productId = params.id as string;
  const MIN_ORDER = 60;

  const { product, isLoading, hasError, imageUrls, activeIndex, setActiveIndex } =
    useProductDetail({ productId, t });

  // Check if product is in cart and get cart quantity
  const cartItem = product ? getCartItem(product.id) : null;
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (user?.is_admin || !product) return;
    addToCart(product);
  };

  const increaseQuantity = () => {
    if (user?.is_admin || !cartItem || !product) return;
    updateQuantity(product.id, cartItem.quantity + 6);
  };

  const decreaseQuantity = () => {
    if (user?.is_admin || !cartItem || !product) return;
    if (cartItem.quantity > MIN_ORDER) {
      updateQuantity(product.id, cartItem.quantity - 6);
    }
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (hasError || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {t('productDetail.notFound')}
          </h1>
          <button
            onClick={() => router.push("/catalog")}
            className="text-emerald-600 hover:text-emerald-800"
          >
            {t('common.returnToCatalog')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('common.back')}
        </button>

        <div className="bg-white rounded-xl shadow-md p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
          <ProductGallery
            imageUrls={imageUrls}
            productName={product.name}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            t={t}
          />

          <div className="w-full lg:w-1/2 flex flex-col">
            <ProductInfo product={product} t={t} />

            <ProductActions
              quantity={product.quantity}
              cartQuantity={cartQuantity}
              minOrder={MIN_ORDER}
              isAdmin={user?.is_admin || false}
              cartItem={cartItem}
              onAddToCart={handleAddToCart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              t={t}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
