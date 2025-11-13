import React from 'react';
import { useRouter } from 'next/navigation';

interface PaymentSuccessActionsProps {
  isSuccessful: boolean;
  clearCart: () => void;
  t: (key: string) => string;
}

export default function PaymentSuccessActions({
  isSuccessful,
  clearCart,
  t,
}: PaymentSuccessActionsProps) {
  const router = useRouter();

  const handleContinueShopping = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      localStorage.setItem('cart', '[]');
    }
    clearCart();
    router.push('/catalog');
  };

  const handleViewOrders = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      localStorage.setItem('cart', '[]');
    }
    clearCart();
    router.push('/orders');
  };

  return (
    <div className="space-y-3">
      {isSuccessful && (
        <button
          onClick={handleViewOrders}
          className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {t('payment.viewOrders')}
        </button>
      )}
      <button
        onClick={handleContinueShopping}
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
      >
        {t('payment.continueShopping')}
      </button>
    </div>
  );
}
