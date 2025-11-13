"use client";

import React, { useState } from "react";
import { Order } from "@/types";
import { useI18n } from "@/i18n";
import { OrderDetailsHeader } from "./order-details/OrderDetailsHeader";
import { OrderStatusSection } from "./order-details/OrderStatusSection";
import { OrderInfoGrid } from "./order-details/OrderInfoGrid";
import { OrderItemsCarousel } from "./order-details/OrderItemsCarousel";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  formatDate: (dateString: string) => string;
  statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }>;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  formatDate,
  statusConfig,
}: OrderDetailsModalProps) {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || !order) return null;

  // Filter valid items
  const validItems = order.items.filter(item => {
    const hasValidProduct = !!item.name && item.name.trim().length > 0;
    const qty = Number(item.quantity ?? 0);
    return hasValidProduct && qty > 0;
  });

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? validItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === validItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        
        <OrderDetailsHeader orderId={order.id} onClose={onClose} t={t} />

        <div className="px-6 py-4 space-y-6">
          <OrderStatusSection
            createdAt={order.created_at}
            status={order.status}
            formatDate={formatDate}
            statusConfig={statusConfig}
            t={t}
          />

          <OrderInfoGrid order={order} totalItems={validItems.length} t={t} />

          <OrderItemsCarousel
            items={validItems}
            currentIndex={currentIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSetIndex={setCurrentIndex}
            t={t}
          />

          {order.notes && (
            <div className="pb-4 border-b">
              <h3 className="text-lg font-semibold mb-2">{t("orders.details.notes")}</h3>
              <p className="text-gray-700 bg-yellow-50 p-3 rounded-md">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            {t("common.close") || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
