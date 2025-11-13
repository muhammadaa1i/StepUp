import { useCallback } from "react";
import { PaymentService, PaymentStatus as ServicePaymentStatus } from "@/services/paymentService";
import { toast } from "react-toastify";
import { PaymentStatus } from "./types";

interface UsePaymentCancellationParams {
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  setCurrentPayment: (payment: PaymentStatus | null) => void;
  t: (key: string) => string;
}

export function usePaymentCancellation({
  isProcessing,
  setIsProcessing,
  setCurrentPayment,
  t,
}: UsePaymentCancellationParams) {
  const cancelPayment = useCallback(
    async (transferId: string): Promise<boolean> => {
      if (isProcessing) return false;

      setIsProcessing(true);
      try {
        const result: ServicePaymentStatus = await PaymentService.refundPayment({
          octo_payment_UUID: transferId,
          reason: "Payment cancelled",
        });
        // Map service type to context type
        const mappedResult: PaymentStatus = {
          status: result.status,
          transferId: transferId,
          amount: result.amount,
          createdAt: result.created_at,
          updatedAt: result.updated_at,
        };
        setCurrentPayment(mappedResult);
        toast.success(t("payment.success.title"));
        return true;
      } catch (error) {
        console.error("Payment cancellation failed:", error);
        toast.error(t("payment.error.failed"));
        return false;
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, setIsProcessing, setCurrentPayment, t]
  );

  return { cancelPayment };
}
