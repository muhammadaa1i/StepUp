import modernApiClient from "@/lib/modernApiClient";
import { CART_CFG } from "./config";

export const get = (url: string) =>
  modernApiClient.get(url, undefined, CART_CFG);

export const post = (url: string, body?: unknown) =>
  modernApiClient.post(url, body, CART_CFG);

export const put = (url: string, body?: unknown) =>
  modernApiClient.put(url, body, CART_CFG);

export const del = (url: string) =>
  modernApiClient.delete(url, CART_CFG);
