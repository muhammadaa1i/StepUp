import { useCallback } from "react";
import { toast } from "react-toastify";
import { PaymentStatus } from "./types";

interface UsePaymentStatusParams {
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  t: (key: string) => string;
}

export function usePaymentStatus({
  isProcessing,
  setIsProcessing,
  t,
}: UsePaymentStatusParams) {
  const checkPaymentStatus = useCallback(
    async (_transferId: string): Promise<PaymentStatus | null> => {
      if (isProcessing) return null;

      setIsProcessing(true);
      try {
        // Payment status checking not implemented yet
        toast.info(
          t("payment.statusCheckNotAvailable") ||
            "Payment status checking not available"
        );
        return null;
      } catch (error) {
        console.error("Payment status check failed:", error);
        toast.error(t("payment.error.statusCheck"));
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, setIsProcessing, t]
  );

  return { checkPaymentStatus };
}
