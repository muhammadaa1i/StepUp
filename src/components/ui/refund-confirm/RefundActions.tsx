import React from 'react';
import { DollarSign } from 'lucide-react';

interface RefundActionsProps {
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
  t: (key: string) => string;
}

export const RefundActions: React.FC<RefundActionsProps> = ({
  onConfirm,
  onCancel,
  isProcessing,
  t,
}) => {
  return (
    <div className="bg-linear-to-r from-gray-50 to-gray-100 px-6 py-5 flex gap-4 border-t border-gray-200">
      <button
        onClick={onCancel}
        disabled={isProcessing}
        className="flex-1 px-5 py-3 text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 rounded-xl font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
      >
        {t('common.cancel')}
      </button>
      
      <button
        onClick={onConfirm}
        disabled={isProcessing}
        className="flex-1 px-5 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="font-medium">{t('orders.refund.requesting')}</span>
          </>
        ) : (
          <>
            <DollarSign className="h-5 w-5" />
            <span className="font-medium">{t('orders.refund.confirmButton') || 'Confirm Refund'}</span>
          </>
        )}
      </button>
    </div>
  );
};
