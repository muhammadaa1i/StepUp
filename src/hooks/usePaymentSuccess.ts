import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCartClearing } from './payment-success/useCartClearing';
import { usePaymentStorage } from './payment-success/usePaymentStorage';
import { useOrderStatusUpdate } from './payment-success/useOrderStatusUpdate';

export type { UsePaymentSuccessProps } from './payment-success/types';

interface UsePaymentSuccessProps {
  transferId: string | null;
  clearCart: () => void;
  t: (key: string) => string;
  onLoadingChange: (loading: boolean) => void;
  onErrorChange: (error: string | null) => void;
}

export function usePaymentSuccess({
  transferId,
  clearCart,
  t,
  onLoadingChange,
  onErrorChange,
}: UsePaymentSuccessProps) {
  const { clearAllCartStorage } = useCartClearing(clearCart);
  const { getPaymentOrderData, restoreUserSession, cleanupPaymentStorage } = usePaymentStorage();
  const { updateOrderStatus } = useOrderStatusUpdate(t);

  // Immediate cart clear on mount
  useEffect(() => {
    clearAllCartStorage();
  }, [clearAllCartStorage]);

  useEffect(() => {
    if (!transferId) {
      onErrorChange('Transfer ID not found');
      onLoadingChange(false);
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        // Mark payment as successful
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('payment_success_flag', 'true');
        }

        // Clear all cart storage
        clearAllCartStorage();

        // Additional cart clear with delay
        setTimeout(() => {
          clearAllCartStorage();
        }, 100);

        // Restore user session
        restoreUserSession();

        toast.success(t('payment.success.message'));
        
        // Get payment order data and update status
        const orderData = getPaymentOrderData();
        await updateOrderStatus(orderData);
      } catch (err) {
        console.error('Payment processing error:', err);
        onErrorChange(err instanceof Error ? err.message : t('payment.error.statusCheck'));
      } finally {
        onLoadingChange(false);
        
        // Final cleanup
        clearAllCartStorage();
        cleanupPaymentStorage();
      }
    };

    checkPaymentStatus();
  }, [
    transferId,
    t,
    updateOrderStatus,
    clearAllCartStorage,
    getPaymentOrderData,
    restoreUserSession,
    cleanupPaymentStorage,
    onLoadingChange,
    onErrorChange,
  ]);
}
