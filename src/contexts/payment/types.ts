export interface PaymentStatus {
  status: string;
  transferId: string;
  amount?: number;
  currency?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaymentContextType {
  currentPayment: PaymentStatus | null;
  isProcessing: boolean;
  checkPaymentStatus: (transferId: string) => Promise<PaymentStatus | null>;
  cancelPayment: (transferId: string) => Promise<boolean>;
  clearPaymentState: () => void;
}
