"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useCart } from '@/contexts/CartContext';
import { usePaymentSuccess } from '@/hooks/usePaymentSuccess';
import PaymentSuccessActions from '@/components/payment/PaymentSuccessActions';

function PaymentSuccessContent() {
  const { t } = useI18n();
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transferId =
    searchParams.get('transfer_id') ||
    searchParams.get('octo_payment_UUID') ||
    searchParams.get('payment_uuid') ||
    searchParams.get('octo-status');

  usePaymentSuccess({
    transferId,
    clearCart,
    t,
    onLoadingChange: setLoading,
    onErrorChange: setError,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('payment.checking')}</h2>
          <p className="text-gray-600">{t('payment.pleaseWait')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('payment.error.title')}</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <PaymentSuccessActions isSuccessful={false} clearCart={clearCart} t={t} />
        </div>
      </div>
    );
  }

  const isSuccessful = !error;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-md">
        {isSuccessful ? (
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        ) : (
          <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        )}

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {isSuccessful ? t('payment.success.title') : t('payment.pending.title')}
        </h2>

        <p className="text-gray-600 mb-4">
          {isSuccessful ? t('payment.success.message') : t('payment.pending.message')}
        </p>

        <PaymentSuccessActions isSuccessful={isSuccessful} clearCart={clearCart} t={t} />
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
