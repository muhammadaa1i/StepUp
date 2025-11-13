import React from 'react';
import Image from 'next/image';
import { Package, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { OrderItem } from '@/types';
import { getFullImageUrl } from '@/lib/utils';

interface OrderItemsCarouselProps {
  items: OrderItem[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onSetIndex: (index: number) => void;
  t: (key: string) => string;
}

export const OrderItemsCarousel: React.FC<OrderItemsCarouselProps> = ({
  items,
  currentIndex,
  onPrevious,
  onNext,
  onSetIndex,
  t,
}) => {
  const totalItems = items.length;

  if (totalItems === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        {t("orders.details.noItems") || "No items"}
      </p>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Package className="h-5 w-5" />
        {t("orders.details.orderItems")}
      </h3>
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col items-center justify-center p-8 bg-linear-to-br from-gray-50 to-gray-100"
              >
                <div className="mb-4">
                  {item.image ? (
                    <div className="h-48 w-48 sm:h-64 sm:w-64 rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                      <Image
                        src={getFullImageUrl(item.image)}
                        alt={item.name || "Product"}
                        width={256}
                        height={256}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-48 sm:h-64 sm:w-64 flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300 rounded-lg border-2 border-gray-200 shadow-lg text-gray-400">
                      <ImageIcon className="h-24 w-24" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {totalItems > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Previous item"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Next item"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {totalItems > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => onSetIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-emerald-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to item ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
