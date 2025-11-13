"use client";

import React from 'react';
import { X } from 'lucide-react';
import { useI18n } from '@/i18n';
import { RefundContactInfo } from './refund-contact/RefundContactInfo';

interface RefundContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RefundContactModal: React.FC<RefundContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-300 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(156, 163, 175, 0.8)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {t('orders.refund.contactModal.title')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-200 transform hover:scale-110 active:scale-95 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              {t('orders.refund.contactModal.message')}
            </p>
          </div>

          <RefundContactInfo t={t} />
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-5 py-3 bg-linear-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {t('orders.refund.contactModal.closeButton')}
          </button>
        </div>
      </div>
    </div>
  );
};
