/**
 * Console error filter to suppress expected authentication errors
 * This prevents the console from being cluttered with expected 401 errors during login attempts
 */

if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  const originalConsoleError = console.error;
  
  console.error = function(...args: unknown[]) {
    // Convert arguments to string for checking
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    
    // Suppress expected authentication errors
    const isExpected401 = 
      message.includes('401') && 
      (message.includes('Unauthorized') || 
       message.includes('stepupy.duckdns.org/auth/') ||
       message.includes('/auth/login') ||
       message.includes('/auth/refresh') ||
       message.includes('/api/proxy?endpoint=%2Fcart'));
    
    // Suppress axios errors during login that are handled by the UI
    const isHandledAuthError = 
      message.includes('AxiosError') && 
      (message.includes('auth/login') || message.includes('auth/refresh'));
    
    // Suppress "Failed to load resource" for auth endpoints
    const isResourceLoadError = 
      message.includes('Failed to load resource') && 
      (message.includes('auth/') || message.includes('cart'));
    
    // Suppress cart sync errors when not authenticated (expected)
    const isCartSyncError = 
      (message.includes('400') || message.includes('401')) && 
      message.includes('Bad Request') && 
      message.includes('endpoint=%2Fcart');
    
    if (!isExpected401 && !isHandledAuthError && !isResourceLoadError && !isCartSyncError) {
      originalConsoleError.apply(console, args);
    }
  };
}
