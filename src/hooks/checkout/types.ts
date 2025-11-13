export interface UseCheckoutResult {
  isProcessing: boolean;
  handleCheckout: (opts: { offerAccepted: boolean }) => Promise<void>;
}

export interface CheckoutOptions {
  offerAccepted: boolean;
}

export interface PaymentOrderData {
  order_id: number | string;
  payment_id?: string;
  user_id?: number;
  payment_method: string;
  created_at: string;
}

export interface OrderResponse {
  id?: number;
  order_id?: number | string;
  total_amount?: number;
}

export interface PaymentResponse {
  success: boolean;
  octo_pay_url?: string;
  payment_url?: string;
  pay_url?: string;
  octo_payment_UUID?: string;
  errMessage?: string;
}
