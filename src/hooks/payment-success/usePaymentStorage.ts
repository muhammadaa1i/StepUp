"use client";

import { PaymentOrderData } from "./types";

export function usePaymentStorage() {
  const getPaymentOrderData = (): PaymentOrderData | null => {
    if (typeof window === 'undefined') return null;

    let paymentOrderData: string | null = null;

    // Try sessionStorage first
    try {
      paymentOrderData = sessionStorage.getItem('paymentOrder');
    } catch (sessionError) {
      console.warn('SessionStorage access failed:', sessionError);
    }

    // Fallback to localStorage
    if (!paymentOrderData) {
      try {
        paymentOrderData = localStorage.getItem('paymentOrder_fallback');
      } catch (localError) {
        console.warn('LocalStorage fallback access failed:', localError);
      }
    }

    // Fallback to history state
    if (!paymentOrderData) {
      try {
        const historyState = window.history.state;
        if (historyState?.paymentData) {
          paymentOrderData = decodeURIComponent(historyState.paymentData);
        }
      } catch (historyError) {
        console.warn('History state access failed:', historyError);
      }
    }

    if (!paymentOrderData) {
      console.warn('No payment order data found in any storage method');
      return null;
    }

    try {
      return JSON.parse(paymentOrderData);
    } catch (error) {
      console.error('Failed to parse payment order data:', error);
      return null;
    }
  };

  const restoreUserSession = () => {
    if (typeof window === 'undefined') return;

    const userBackup = sessionStorage.getItem('userBackup');
    if (userBackup) {
      try {
        sessionStorage.removeItem('userBackup');
        sessionStorage.removeItem('paymentRedirectTime');
      } catch (error) {
        console.warn('Could not clear user backup:', error);
      }
    }
  };

  const cleanupPaymentStorage = () => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem('paymentOrder');
      sessionStorage.removeItem('payment_success_flag');
    } catch (error) {
      console.warn('Failed to cleanup payment storage:', error);
    }
  };

  return {
    getPaymentOrderData,
    restoreUserSession,
    cleanupPaymentStorage,
  };
}
