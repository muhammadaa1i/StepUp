"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useI18n } from '@/i18n';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ProductQuickViewModalProps } from './quick-view-modal/types';
import { useModalImageUrls } from './quick-view-modal/useModalImageUrls';
import { ModalHeader } from './quick-view-modal/ModalHeader';
import { ModalImageCarousel } from './quick-view-modal/ModalImageCarousel';
import { ModalProductDetails } from './quick-view-modal/ModalProductDetails';

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { t } = useI18n();
  const { addToCart, isInCart } = useCart();
  const { user } = useAuth();
  const isAdmin = !!user?.is_admin;
  const [index, setIndex] = useState(0);

  // Build image URLs from product data
  const images = useModalImageUrls(product);

  // Reset index when product changes
  useEffect(() => { 
    setIndex(0); 
  }, [product?.id]);

  // Carousel navigation handlers
  const goPrev = useCallback(() => {
    setIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex(i => (i + 1) % images.length);
  }, [images.length]);

  const handleAddToCart = useCallback(() => {
    if (product) addToCart(product);
  }, [product, addToCart]);

  if (!isOpen || !product) return null;

  const price = formatPrice(product.price, t('common.currencySom'));
  const inCart = isInCart(product.id);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/60 overflow-y-auto" 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[92vh] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <ModalHeader 
          title={product.name} 
          onClose={onClose} 
          closeLabel={t('common.close') || 'Close'} 
        />

        <div className="p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <ModalImageCarousel
            images={images}
            currentIndex={index}
            productName={product.name}
            onPrevious={goPrev}
            onNext={goNext}
            onSelectIndex={setIndex}
            t={t}
          />

          <ModalProductDetails
            product={product}
            price={price}
            inCart={inCart}
            isAdmin={isAdmin}
            onAddToCart={handleAddToCart}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;