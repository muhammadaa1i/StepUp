import React from "react";
import { Calendar } from "lucide-react";

interface OrderHeaderProps {
  orderId: number;
  createdAt: string;
  status: string;
  totalAmount: number;
  statusIcon: React.ComponentType<{ className?: string }>;
  statusColor: string;
  statusLabel: string;
  formatDate: (date: string) => string;
  formatPrice: (price: number) => string;
  t: (key: string) => string;
}

export const OrderHeader: React.FC<OrderHeaderProps> = ({
  orderId,
  createdAt,
  status: _status,
  totalAmount,
  statusIcon: StatusIcon,
  statusColor,
  statusLabel,
  formatDate,
  formatPrice,
  t,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
      <div className="flex-1">
        <h3 className="text-base sm:text-lg font-semibold">
          {t("ordersPage.title")} #{orderId}
        </h3>
        <div className="text-xs sm:text-sm text-gray-500 flex items-center mt-1">
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          {formatDate(createdAt)}
        </div>
      </div>
      <div className="flex flex-row sm:flex-col sm:text-right items-center sm:items-end justify-between sm:justify-start space-x-2 sm:space-x-0">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          <StatusIcon className="h-3 w-3 mr-1" />
          {statusLabel}
        </span>
        <div className="text-base sm:text-lg font-bold">
          {formatPrice(totalAmount)}
        </div>
      </div>
    </div>
  );
};
