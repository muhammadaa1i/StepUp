"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";

/**
 * Hook to validate checkout preconditions
 */
export function useCheckoutValidation(
  isAuthenticated: boolean,
  itemCount: number,
  t: (key: string) => string
) {
  const validateCheckout = useCallback((offerAccepted: boolean): boolean => {
    if (!isAuthenticated) {
      toast.error(t('auth.login'));
      return false;
    }

    if (itemCount === 0) {
      toast.error(t('cartPage.emptyCart'));
      return false;
    }

    if (!offerAccepted) {
      toast.error(t('offer.mustAccept'));
      return false;
    }

    return true;
  }, [isAuthenticated, itemCount, t]);

  return { validateCheckout };
}
