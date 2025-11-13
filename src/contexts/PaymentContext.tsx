"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { useI18n } from "@/i18n";
import { PaymentContextType, PaymentStatus } from "./payment/types";
import { usePaymentStatus } from "./payment/usePaymentStatus";
import { usePaymentCancellation } from "./payment/usePaymentCancellation";
import { usePaymentState } from "./payment/usePaymentState";

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [currentPayment, setCurrentPayment] = useState<PaymentStatus | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useI18n();

  // Payment status checking
  const { checkPaymentStatus } = usePaymentStatus({
    isProcessing,
    setIsProcessing,
    t,
  });

  // Payment cancellation/refund
  const { cancelPayment } = usePaymentCancellation({
    isProcessing,
    setIsProcessing,
    setCurrentPayment,
    t,
  });

  // Payment state management
  const { clearPaymentState } = usePaymentState({ setCurrentPayment });

  const value: PaymentContextType = useMemo(
    () => ({
      currentPayment,
      isProcessing,
      checkPaymentStatus,
      cancelPayment,
      clearPaymentState,
    }),
    [
      currentPayment,
      isProcessing,
      checkPaymentStatus,
      cancelPayment,
      clearPaymentState,
    ]
  );

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
