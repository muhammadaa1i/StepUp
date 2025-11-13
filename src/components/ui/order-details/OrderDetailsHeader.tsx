import React from 'react';
import { X } from 'lucide-react';

interface OrderDetailsHeaderProps {
  orderId: number;
  onClose: () => void;
  t: (key: string) => string;
}

export const OrderDetailsHeader: React.FC<OrderDetailsHeaderProps> = ({
  orderId,
  onClose,
  t,
}) => {
  return (
    <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-bold">
        {t("orders.details.title")} #{orderId}
      </h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label={t("common.close") || "Close"}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};
