import modernApiClient from "@/lib/modernApiClient";
import { ORDERS_CFG, ORDERS_CFG_NO_CACHE } from "./config";

export const get = (url: string, params?: Record<string, unknown>) =>
  modernApiClient.get(url, params, ORDERS_CFG);

export const getNoCache = (url: string, params?: Record<string, unknown>) =>
  modernApiClient.get(url, params, ORDERS_CFG_NO_CACHE);

export const post = (url: string, body?: unknown) =>
  modernApiClient.post(url, body, ORDERS_CFG_NO_CACHE);

export const put = (url: string, body?: unknown) =>
  modernApiClient.put(url, body, ORDERS_CFG_NO_CACHE);

export const del = (url: string) =>
  modernApiClient.delete(url, ORDERS_CFG_NO_CACHE);
