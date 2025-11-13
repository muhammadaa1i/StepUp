import modernApiClient from "@/lib/modernApiClient";
import {
  CATEGORIES_CFG,
  CATEGORIES_CFG_NO_CACHE,
  CATEGORIES_CFG_LONG,
} from "./config";

export const get = (url: string, params?: Record<string, unknown>) =>
  modernApiClient.get(url, params, CATEGORIES_CFG);

export const post = (url: string, body?: unknown) =>
  modernApiClient.post(url, body, CATEGORIES_CFG_NO_CACHE);

export const put = (url: string, body?: unknown) =>
  modernApiClient.put(url, body, CATEGORIES_CFG_NO_CACHE);

export const del = (url: string) =>
  modernApiClient.delete(url, CATEGORIES_CFG_LONG);
