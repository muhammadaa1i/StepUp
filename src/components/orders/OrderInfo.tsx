import React from "react";
import { Package, CreditCard } from "lucide-react";

interface OrderInfoProps {
  itemCount: number;
  paymentMethod?: string;
}

export const OrderInfo: React.FC<OrderInfoProps> = ({
  itemCount,
  paymentMethod,
}) => {
  return (
    <div className="text-xs sm:text-sm text-gray-600 flex flex-wrap items-center gap-2 sm:gap-4">
      <span className="flex items-center">
        <Package className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
        {itemCount}
      </span>
      {paymentMethod && (
        <span className="flex items-center">
          <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1" />
          <span className="hidden sm:inline">{paymentMethod}</span>
        </span>
      )}
    </div>
  );
};
