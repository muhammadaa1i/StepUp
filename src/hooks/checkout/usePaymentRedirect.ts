"use client";

import { useCallback } from "react";

/**
 * Hook to handle robust payment URL redirection across different browsers/devices
 */
export function usePaymentRedirect() {
  const redirectToPayment = useCallback((paymentUrl: string) => {
    const isIOS = typeof navigator !== 'undefined' && (/iPad|iPhone|iPod/.test(navigator.userAgent));
    const isSafari = typeof navigator !== 'undefined' && (/^((?!chrome|android).)*safari/i.test(navigator.userAgent));

    // iOS/Safari require special handling due to popup blockers
    if (isIOS || isSafari) {
      const a = document.createElement('a');
      a.href = paymentUrl;
      a.target = '_self';
      a.style.display = 'none';
      document.body.appendChild(a);
      
      setTimeout(() => {
        a.click();
        document.body.removeChild(a);
      }, 100);

      // Fallback if click doesn't work
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = paymentUrl;
        }
      }, 500);
    } else {
      // Standard redirect for other browsers
      if (typeof window !== 'undefined') {
        window.location.href = paymentUrl;
      }
    }
  }, []);

  return { redirectToPayment };
}
