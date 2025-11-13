"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Package } from "lucide-react";
import { useI18n } from "@/i18n";
import { Order } from "@/types";

import { RefundContactModal } from "@/components/ui/RefundContactModal";
import { OrderDetailsModal } from "@/components/ui/OrderDetailsModal";
import OrderCard from "@/components/orders/OrderCard";
import useOrders from "@/hooks/useOrders";
import { getOrderStatusConfig } from "@/lib/orderStatusConfig";
import { formatOrderDate, formatOrderPrice } from "@/lib/orderHelpers";


export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const { t, locale } = useI18n();
  const { filteredOrders, isLoading } = useOrders(isAuthenticated, t);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const statusConfig = getOrderStatusConfig(t);

  const formatDate = (dateString: string) =>
    formatOrderDate(dateString, locale);
  const formatPrice = (price: number) =>
    formatOrderPrice(price, locale, t("common.currencySom"));

  const handleRefundRequest = () => {
    setShowRefundModal(true);
  };

  const handleShowOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedOrder(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">
            {t("ordersPage.authRequiredTitle")}
          </h1>
          <p>{t("ordersPage.authRequiredMessage")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">
          {t("ordersPage.title")}
        </h1>
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                statusConfig={statusConfig}
                formatDate={formatDate}
                formatPrice={formatPrice}
                onShowDetails={handleShowOrderDetails}
                onRequestRefund={handleRefundRequest}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">{t("ordersPage.noneYet")}</div>
        )}
      </div>

      {/* Refund Contact Modal */}
      <RefundContactModal
        isOpen={showRefundModal}
        onClose={() => setShowRefundModal(false)}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showDetailsModal}
        onClose={handleCloseDetailsModal}
        formatDate={formatDate}
        statusConfig={statusConfig}
      />
    </div>
  );
}
