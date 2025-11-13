"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/i18n";
import { toast } from "react-toastify";
import { useCheckoutValidation } from "./checkout/useCheckoutValidation";
import { useDuplicatePaymentCheck } from "./checkout/useDuplicatePaymentCheck";
import { useOrderCreation } from "./checkout/useOrderCreation";
import { usePaymentCreation } from "./checkout/usePaymentCreation";
import { usePaymentStorage } from "./checkout/usePaymentStorage";
import { usePaymentRedirect } from "./checkout/usePaymentRedirect";

export type { UseCheckoutResult, CheckoutOptions } from "./checkout/types";

/**
 * Encapsulates checkout orchestration (order creation + payment initiation).
 * Performs async work and browser-side side effects; UI stays declarative.
 */
export function useCheckout() {
  const { items, itemCount, totalAmount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { t } = useI18n();
  const [isProcessing, setIsProcessing] = useState(false);

  // Sub-hooks for focused responsibilities
  const { validateCheckout } = useCheckoutValidation(isAuthenticated, items.length, t);
  const { checkForDuplicatePayment } = useDuplicatePaymentCheck(t);
  const { createOrder } = useOrderCreation();
  const { createPayment } = usePaymentCreation(t);
  const { savePaymentData, saveUserBackup } = usePaymentStorage();
  const { redirectToPayment } = usePaymentRedirect();

  const handleCheckout = useCallback(async ({ offerAccepted }: { offerAccepted: boolean }) => {
    if (isProcessing) return;

    // Validate checkout preconditions
    if (!validateCheckout(offerAccepted)) return;

    // Check for duplicate payment attempts
    if (await checkForDuplicatePayment()) return;

    setIsProcessing(true);
    try {
      // Create order
      const order = await createOrder();

      // Create payment
      const payment = await createPayment(order, totalAmount, itemCount, user?.name);

      // Persist payment data for post-redirect flows
      savePaymentData(order, payment.octo_payment_UUID, user?.id);

      // Backup user data for mobile quirks
      saveUserBackup(user);

      // Redirect to payment gateway
      redirectToPayment(payment.octo_pay_url!);
    } catch (error) {
      const message = error instanceof Error ? error.message : t('payment.error.initiation');
      console.error('Checkout error:', error);
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  }, [
    isProcessing,
    validateCheckout,
    checkForDuplicatePayment,
    createOrder,
    createPayment,
    savePaymentData,
    saveUserBackup,
    redirectToPayment,
    totalAmount,
    itemCount,
    user,
    t,
  ]);

  return { isProcessing, handleCheckout };
}

export default useCheckout;
