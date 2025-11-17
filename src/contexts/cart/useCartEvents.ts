/**
 * Hook for cart event listeners
 */

import { useEffect } from "react";
import { CartItem } from "./cartTransformers";

interface UseCartEventsOptions {
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  suppressHydrationRef: React.MutableRefObject<number>;
}

export function useCartEvents({
  setItems,
  suppressHydrationRef,
}: UseCartEventsOptions) {
  useEffect(() => {
    const handleCartClear = (event: Event) => {
      const customEvent = event as CustomEvent;
      const isIntentional = customEvent.detail?.intentional !== false;
      
      if (isIntentional) {
        suppressHydrationRef.current = Date.now() + 8000;
        setItems([]);
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart");
        }
      }
    };

    const handlePaymentSuccess = () => {
      suppressHydrationRef.current = Date.now() + 8000;
      setItems([]);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", "[]");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("cart:clear", handleCartClear);
      window.addEventListener("payment:success", handlePaymentSuccess);

      return () => {
        window.removeEventListener("cart:clear", handleCartClear);
        window.removeEventListener("payment:success", handlePaymentSuccess);
      };
    }
  }, [setItems, suppressHydrationRef]);
}
