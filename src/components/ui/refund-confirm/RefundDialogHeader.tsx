import React from 'react';
import { XCircle, DollarSign } from 'lucide-react';

interface RefundDialogHeaderProps {
  onCancel: () => void;
  isProcessing: boolean;
  t: (key: string) => string;
}

export const RefundDialogHeader: React.FC<RefundDialogHeaderProps> = ({
  onCancel,
  isProcessing,
  t,
}) => {
  return (
    <div className="bg-linear-to-r from-red-500 to-red-600 px-6 py-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {t('orders.refund.confirmTitle')}
            </h3>
            <p className="text-red-100 text-sm">
              {t('orders.refund.confirmSubtitle') || 'Process refund request'}
            </p>
          </div>
        </div>
        {!isProcessing && (
          <button
            onClick={onCancel}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
