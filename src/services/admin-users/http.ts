import modernApiClient from "@/lib/modernApiClient";
import { USERS_CFG, USERS_CFG_NO_CACHE } from "./config";

export const get = (url: string, params?: Record<string, unknown>) =>
  modernApiClient.get(url, params, USERS_CFG);

export const getNoCache = (url: string, params?: Record<string, unknown>) =>
  modernApiClient.get(url, params, USERS_CFG_NO_CACHE);

export const put = (url: string, body?: unknown) =>
  modernApiClient.put(url, body, USERS_CFG_NO_CACHE);

export const del = (url: string) =>
  modernApiClient.delete(url, USERS_CFG_NO_CACHE);
