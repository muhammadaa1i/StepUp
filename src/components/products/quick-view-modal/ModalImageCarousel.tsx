"use client";

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ModalImageCarouselProps } from './types';

/**
 * Image carousel component for quick view modal
 */
export const ModalImageCarousel: React.FC<ModalImageCarouselProps> = ({
  images,
  currentIndex,
  productName,
  onPrevious,
  onNext,
  onSelectIndex,
  t,
}) => {
  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-gray-50 to-gray-100 aspect-square w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-none lg:h-full lg:aspect-square lg:flex-1">
        {/* Slides */}
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="min-w-full h-full flex items-center justify-center p-3 sm:p-5 lg:p-6">
              <div className="relative w-full h-full rounded-md bg-white shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src={src}
                  alt={productName}
                  fill
                  className="object-contain rounded-md"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 400px"
                  unoptimized
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={onPrevious} 
              aria-label={t('common.previous') || 'Previous image'} 
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>
            <button 
              onClick={onNext} 
              aria-label={t('common.next') || 'Next image'} 
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onSelectIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
