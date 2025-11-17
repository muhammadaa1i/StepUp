/**
 * Simplified mobile storage
 */

import { isStorageAvailable, safeLocalStorageGet, safeLocalStorageSet, safeLocalStorageRemove } from "./utils/storageHelpers";

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER: "user",
  CART: "cart",
  PREFERENCES: "preferences",
} as const;

class MobileStorage {
  private prefix: string;
  private memoryFallback: Map<string, string>;

  constructor(prefix = "app_") {
    this.prefix = prefix;
    this.memoryFallback = new Map();
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set(key: string, value: any): void {
    const fullKey = this.getKey(key);
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);

    if (isStorageAvailable()) {
      if (!safeLocalStorageSet(fullKey, stringValue)) {
        this.memoryFallback.set(fullKey, stringValue);
      }
    } else {
      this.memoryFallback.set(fullKey, stringValue);
    }
  }

  get(key: string): string | null {
    const fullKey = this.getKey(key);

    if (isStorageAvailable()) {
      const value = safeLocalStorageGet(fullKey);
      if (value !== null) return value;
    }

    return this.memoryFallback.get(fullKey) || null;
  }

  remove(key: string): void {
    const fullKey = this.getKey(key);
    safeLocalStorageRemove(fullKey);
    this.memoryFallback.delete(fullKey);
  }

  clear(): void {
    if (isStorageAvailable()) {
      try {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith(this.prefix)) {
            localStorage.removeItem(key);
          }
        });
      } catch {}
    }
    this.memoryFallback.clear();
  }

  // Auth helpers
  setAuthToken(token: string): void {
    this.set(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  getAuthToken(): string | null {
    return this.get(STORAGE_KEYS.AUTH_TOKEN);
  }

  removeAuthToken(): void {
    this.remove(STORAGE_KEYS.AUTH_TOKEN);
  }

  setUser(user: any): void {
    this.set(STORAGE_KEYS.USER, user);
  }

  getUser(): any {
    const userStr = this.get(STORAGE_KEYS.USER);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  removeUser(): void {
    this.remove(STORAGE_KEYS.USER);
  }
}

export const mobileStorage = new MobileStorage();
export { MobileStorage };
