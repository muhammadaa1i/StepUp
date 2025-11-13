/**
 * Mobile storage module - localStorage wrapper with error handling
 */

export interface StorageOptions {
  prefix?: string;
  fallbackToMemory?: boolean;
}

export interface StorageInfo {
  key: string;
  value: any;
  timestamp: number;
}

export interface StorageInfoResult {
  items: StorageInfo[];
  total: number;
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER: "user",
  CART: "cart",
  PREFERENCES: "preferences",
} as const;

class MobileStorage {
  private prefix: string;
  private memoryFallback: Map<string, string>;

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix || "app_";
    this.memoryFallback = new Map();
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private isAvailable(): boolean {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  set(key: string, value: any): void {
    const fullKey = this.getKey(key);
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);

    if (this.isAvailable()) {
      try {
        localStorage.setItem(fullKey, stringValue);
      } catch (error) {
        console.error("localStorage.setItem failed:", error);
        this.memoryFallback.set(fullKey, stringValue);
      }
    } else {
      this.memoryFallback.set(fullKey, stringValue);
    }
  }

  get(key: string): string | null {
    const fullKey = this.getKey(key);

    if (this.isAvailable()) {
      try {
        return localStorage.getItem(fullKey);
      } catch (error) {
        console.error("localStorage.getItem failed:", error);
      }
    }

    return this.memoryFallback.get(fullKey) || null;
  }

  remove(key: string): void {
    const fullKey = this.getKey(key);

    if (this.isAvailable()) {
      try {
        localStorage.removeItem(fullKey);
      } catch (error) {
        console.error("localStorage.removeItem failed:", error);
      }
    }

    this.memoryFallback.delete(fullKey);
  }

  clear(): void {
    if (this.isAvailable()) {
      try {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.startsWith(this.prefix)) {
            localStorage.removeItem(key);
          }
        });
      } catch (error) {
        console.error("localStorage.clear failed:", error);
      }
    }

    this.memoryFallback.clear();
  }

  // Auth-specific helpers
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