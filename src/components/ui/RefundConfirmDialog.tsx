"use client";

import React from 'react';
import { useI18n } from '@/i18n';
import { Order } from '@/types';
import { RefundDialogHeader } from './refund-confirm/RefundDialogHeader';
import { RefundWarningMessage } from './refund-confirm/RefundWarningMessage';
import { RefundOrderDetails } from './refund-confirm/RefundOrderDetails';
import { RefundActions } from './refund-confirm/RefundActions';

interface RefundConfirmDialogProps {
  isOpen: boolean;
  order: Order | null;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

export const RefundConfirmDialog: React.FC<RefundConfirmDialogProps> = ({
  isOpen,
  order,
  onConfirm,
  onCancel,
  isProcessing = false
}) => {
  const { t } = useI18n();

  if (!isOpen || !order) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={(e) => e.target === e.currentTarget && !isProcessing && onCancel()}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        <RefundDialogHeader onCancel={onCancel} isProcessing={isProcessing} t={t} />

        <div className="p-6">
          <RefundWarningMessage t={t} />

          <div className="space-y-4">
            <RefundOrderDetails order={order} t={t} />

            <div className="text-center text-sm text-gray-600 bg-emerald-50 p-3 rounded-lg">
              <p>
                {t('orders.refund.processingNotice') || 'Refund will be processed within 24-48 hours'}
              </p>
            </div>
          </div>
        </div>

        <RefundActions
          onConfirm={onConfirm}
          onCancel={onCancel}
          isProcessing={isProcessing}
          t={t}
        />
      </div>
    </div>
  );
};
