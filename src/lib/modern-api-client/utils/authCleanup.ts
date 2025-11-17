/**
 * Auth data cleanup utilities
 */

export function clearCookies(): void {
  if (typeof document === "undefined") return;
  
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function clearLocalStorageAuth(): void {
  try {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
  } catch {}
}

export function clearAuthData(): void {
  clearCookies();
  clearLocalStorageAuth();
}

export function restoreUserBackup(): void {
  const userBackup = typeof sessionStorage !== "undefined" 
    ? sessionStorage.getItem("userBackup") 
    : null;
    
  if (userBackup && typeof document !== "undefined") {
    const secure = process.env.NODE_ENV === "production";
    document.cookie = `user=${userBackup}; max-age=${7*24*60*60}; path=/; samesite=strict${secure ? '; secure' : ''}`;
  }
}
