import { useCallback } from "react";
import { PaymentStatus } from "./types";

interface UsePaymentStateParams {
  setCurrentPayment: (payment: PaymentStatus | null) => void;
}

export function usePaymentState({ setCurrentPayment }: UsePaymentStateParams) {
  const clearPaymentState = useCallback(() => {
    setCurrentPayment(null);
  }, [setCurrentPayment]);

  return { clearPaymentState };
}
