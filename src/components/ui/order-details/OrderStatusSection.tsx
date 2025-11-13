import React from 'react';
import { Calendar } from 'lucide-react';

interface OrderStatusSectionProps {
  createdAt: string;
  status: string;
  formatDate: (dateString: string) => string;
  statusConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }>;
  t: (key: string) => string;
}

export const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({
  createdAt,
  status,
  formatDate,
  statusConfig,
  t,
}) => {
  const StatusIcon = statusConfig[status]?.icon;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">{t("orders.details.orderDate")}</span>
        </div>
        <p className="text-lg font-semibold ml-7">{formatDate(createdAt)}</p>
      </div>
      <div>
        <span
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusConfig[status]?.color}`}
        >
          {StatusIcon && <StatusIcon className="h-4 w-4 mr-2" />}
          {statusConfig[status]?.label}
        </span>
      </div>
    </div>
  );
};
