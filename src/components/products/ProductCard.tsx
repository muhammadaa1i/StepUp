"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/i18n";
import { formatPrice } from "@/lib/utils";
import { ProductCardProps } from "./product-card/types";
import { useProductImages } from "./product-card/useProductImages";
import { useImageCarousel } from "./product-card/useImageCarousel";
import { useCartActions } from "./product-card/useCartActions";
import { ProductCardMedia } from "./product-card/ProductCardMedia";
import { ProductCardDetails } from "./product-card/ProductCardDetails";

const ProductCard: React.FC<ProductCardProps> = ({ slipper, onAddToCart, onViewDetails }) => {
  const [imageError, setImageError] = useState(false);
  const { t } = useI18n();
  const { user } = useAuth();
  const isAdmin = !!user?.is_admin;

  const { imageUrls } = useProductImages(slipper);
  const { activeIndex, setActiveIndex, goPrev, goNext } = useImageCarousel(imageUrls);
  const { inCart, cartItem, addPending, setAddPending, handleAddToCart, increaseQuantity, decreaseQuantity } =
    useCartActions(slipper, onAddToCart);

  const availabilityInfo = useMemo(() => {
    const quantity = slipper.quantity || 0;
    const isAvailable = quantity > 0;
    const canAddToCart = quantity >= 60;
    let displayText: string;
    if (quantity === 0) {
      displayText = t("product.notAvailable");
    } else if (quantity < 60) {
      displayText = `${t("product.availableQuantity", { count: quantity.toString() })} (${t("product.insufficientForOrder")})`;
    } else {
      displayText = t("product.availableQuantity", { count: quantity.toString() });
    }
    return { isAvailable, canAddToCart, displayText, quantity };
  }, [slipper.quantity, t]);

  const formattedPrice = useMemo(() => formatPrice(slipper.price, t("common.currencySom")), [slipper.price, t]);

  const handleImageError = useCallback(() => setImageError(true), []);

  const canDecrease = !!cartItem && cartItem.quantity > 60;
  const canIncrease = !!cartItem && cartItem.quantity + 6 <= (availabilityInfo.quantity || 0);

  const handleViewDetails = useCallback(() => {
    if (onViewDetails) onViewDetails(slipper);
  }, [onViewDetails, slipper]);

  const handleAddClick = () => {
    if (!availabilityInfo.canAddToCart || addPending) return;
    setAddPending(true);
    handleAddToCart();
  };

  return (
    <div
      className={`relative flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer border ${
        inCart && !isAdmin ? "border-emerald-500 ring-1 ring-emerald-400/40" : "border-gray-100"
      }`}
      onClick={onViewDetails ? handleViewDetails : undefined}
      tabIndex={onViewDetails ? 0 : undefined}
      role={onViewDetails ? "button" : undefined}
      onKeyPress={
        onViewDetails
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") handleViewDetails();
            }
          : undefined
      }
    >
      <ProductCardMedia
        imageUrls={imageUrls}
        activeIndex={activeIndex}
        imageError={imageError}
        inCart={inCart}
        isAdmin={isAdmin}
        cartQuantity={cartItem?.quantity}
        isAvailable={availabilityInfo.isAvailable}
        canAddToCart={availabilityInfo.canAddToCart}
        slipperName={slipper.name}
        onImageError={handleImageError}
        onPrevImage={goPrev}
        onNextImage={goNext}
        onSelectImage={setActiveIndex}
        t={t}
      />
      <ProductCardDetails
        name={slipper.name}
        size={slipper.size}
        price={formattedPrice}
        inCart={inCart}
        isAdmin={isAdmin}
        hasAddToCart={!!onAddToCart}
        canAddToCart={availabilityInfo.canAddToCart}
        addPending={addPending}
        cartQuantity={cartItem?.quantity}
        canDecrease={canDecrease}
        canIncrease={canIncrease}
        onDecrease={(e) => decreaseQuantity(e, canDecrease)}
        onIncrease={(e) => increaseQuantity(e, canIncrease)}
        onAddClick={handleAddClick}
        t={t}
      />
    </div>
  );
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
