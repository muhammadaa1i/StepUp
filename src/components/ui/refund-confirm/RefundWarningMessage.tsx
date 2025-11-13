import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RefundWarningMessageProps {
  t: (key: string) => string;
}

export const RefundWarningMessage: React.FC<RefundWarningMessageProps> = ({ t }) => {
  return (
    <div className="flex items-start gap-3 mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
      <div className="text-sm text-amber-800">
        <p className="font-medium mb-1">
          {t('orders.refund.warningTitle') || 'Important Notice'}
        </p>
        <p>
          {t('orders.refund.confirmMessage')}
        </p>
      </div>
    </div>
  );
};
