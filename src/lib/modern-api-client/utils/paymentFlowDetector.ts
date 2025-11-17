/**
 * Payment flow detection
 */

export function isInPaymentFlow(): boolean {
  if (typeof window === "undefined") return false;
  
  return window.location.pathname.includes("/payment/") ||
    window.location.search.includes("transfer_id") ||
    window.location.search.includes("payment_uuid") ||
    window.location.search.includes("octo_payment_UUID") ||
    window.location.search.includes("octo-status");
}

export function shouldRedirectToLogin(): boolean {
  if (typeof window === "undefined") return false;
  
  return !window.location.pathname.includes("/auth/") &&
    !window.location.pathname.includes("/login");
}
