import React from 'react';
import { Package } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/types';

interface RefundOrderDetailsProps {
  order: Order;
  t: (key: string) => string;
}

export const RefundOrderDetails: React.FC<RefundOrderDetailsProps> = ({ order, t }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Package className="h-4 w-4" />
        {t('orders.refund.orderDetails') || 'Order Details'}
      </h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">
            {t('orders.refund.orderNumber')}:
          </span>
          <span className="font-medium">#{order.id}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">
            {t('orders.refund.itemCount') || 'Items'}:
          </span>
          <span className="font-medium">
            {order.items.length} {t('common.items')}
          </span>
        </div>
        
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-gray-900 font-semibold">
            {t('orders.refund.refundAmount') || 'Refund Amount'}:
          </span>
          <span className="font-bold text-lg text-red-600">
            {formatPrice(order.total_amount)}
          </span>
        </div>
      </div>
    </div>
  );
};
