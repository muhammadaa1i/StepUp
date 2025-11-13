export interface PaymentOrderData {
  order_id: string | number;
  payment_id: string;
  payment_method: string;
  user_id: string | number;
  created_at?: string;
  batch_info?: {
    all_order_ids: (string | number)[];
  };
}

export interface UsePaymentSuccessProps {
  transferId: string | null;
  clearCart: () => void;
  t: (key: string) => string;
  onLoadingChange: (loading: boolean) => void;
  onErrorChange: (error: string | null) => void;
}
