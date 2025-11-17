/**
 * Clear cart operation
 */

import { toast } from "react-toastify";
import cartService from "@/services/cartService";
import { CartItem } from "../cartTransformers";
import { saveToStorage } from "../cartStorage";

interface ClearCartOptions {
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  suppressHydrationRef: React.MutableRefObject<number>;
  t: (key: string) => string;
}

export function clearCart({
  setItems,
  suppressHydrationRef,
  t,
}: ClearCartOptions) {
  suppressHydrationRef.current = Date.now() + 8000;
  setItems([]);
  saveToStorage([]);

  const isPaymentSuccess =
    typeof window !== "undefined" &&
    (window.location.pathname.includes("/payment/success") ||
      sessionStorage.getItem("payment_success_flag"));
  
  if (!isPaymentSuccess) {
    setTimeout(() => {
      try { toast.success(t("cart.cleared")); } catch { }
    }, 0);
  }

  // Sync with server
  syncClearWithServer(suppressHydrationRef);
}

async function syncClearWithServer(suppressHydrationRef: React.MutableRefObject<number>) {
  try {
    await cartService.clear();
  } catch {
    // keep optimistic cleared state
  } finally {
    setTimeout(() => { suppressHydrationRef.current = 0; }, 500);
  }
}
