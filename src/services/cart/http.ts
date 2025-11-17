import modernApiClient from "@/lib/modernApiClient";
import { CART_CFG } from "./config";
import { hasValidToken } from "@/lib/tokenUtils";

// Short-circuit network calls when we clearly don't have
// a usable access token. This prevents noisy 401s on the
// cart page when a user isn't authenticated anymore.
const requireToken = <T>(): Promise<T> =>
  Promise.reject(Object.assign(new Error("Authentication required"), { status: 401 }));

export const get = (url: string) =>
  hasValidToken() ? modernApiClient.get(url, undefined, CART_CFG) : requireToken();

export const post = (url: string, body?: unknown) =>
  hasValidToken() ? modernApiClient.post(url, body, CART_CFG) : requireToken();

export const put = (url: string, body?: unknown) =>
  hasValidToken() ? modernApiClient.put(url, body, CART_CFG) : requireToken();

export const del = (url: string) =>
  hasValidToken() ? modernApiClient.delete(url, CART_CFG) : requireToken();
