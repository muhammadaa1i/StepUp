/**
 * Payment timeout calculator
 */

export function calculatePaymentTimeout(baseTimeout = 4000): number {
  if (typeof window === 'undefined') return baseTimeout;
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Mobile devices often have slower connections
  const mobileTimeout = Math.max(baseTimeout, 8000);
  return isMobile ? mobileTimeout : baseTimeout;
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
