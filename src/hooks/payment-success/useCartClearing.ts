"use client";

export function useCartClearing(clearCart: () => void) {
  const clearAllCartStorage = () => {
    if (typeof window === 'undefined') return;

    // Clear cart from localStorage
    try {
      localStorage.removeItem('cart');
      localStorage.setItem('cart', '[]');
    } catch (localError) {
      console.warn('Failed to clear cart from localStorage:', localError);
    }

    // Clear cart from sessionStorage
    try {
      sessionStorage.removeItem('cart');
    } catch (sessionError) {
      console.warn('Failed to clear cart from sessionStorage:', sessionError);
    }

    // Set payment success cookie
    try {
      const host = window.location.hostname;
      const parts = host.split('.');
      const baseDomain = parts.length >= 2 ? parts.slice(-2).join('.') : host;
      document.cookie = `payment_success=1; path=/; max-age=600`;
      if (baseDomain.includes('.')) {
        document.cookie = `payment_success=1; path=/; domain=.${baseDomain}; max-age=600`;
      }
    } catch (cookieError) {
      console.warn('Failed to set payment success cookie:', cookieError);
    }

    // Call clearCart function
    clearCart();

    // Dispatch payment success event
    window.dispatchEvent(new CustomEvent('payment:success'));
  };

  return {
    clearAllCartStorage,
  };
}
