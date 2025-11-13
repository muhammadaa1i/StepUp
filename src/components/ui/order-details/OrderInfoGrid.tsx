import React from 'react';
import { CreditCard, MapPin, Package } from 'lucide-react';
import { Order } from '@/types';

interface OrderInfoGridProps {
  order: Order;
  totalItems: number;
  t: (key: string) => string;
}

export const OrderInfoGrid: React.FC<OrderInfoGridProps> = ({
  order,
  totalItems,
  t,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b">
      {order.payment_method && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{t("orders.details.paymentMethod")}</span>
          </div>
          <p className="font-medium ml-7">{order.payment_method}</p>
        </div>
      )}
      
      {order.shipping_address && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">{t("orders.details.shippingAddress")}</span>
          </div>
          <p className="font-medium ml-7">{order.shipping_address}</p>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Package className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">{t("orders.details.totalItems")}</span>
        </div>
        <p className="font-medium ml-7">
          {totalItems} {t("common.items")}
        </p>
      </div>

      {order.user_name && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">{t("orders.details.customerName")}</span>
          </div>
          <p className="font-medium">{order.user_name}</p>
        </div>
      )}
    </div>
  );
};
