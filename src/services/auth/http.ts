import modernApiClient from "@/lib/modernApiClient";
import { AUTH_CFG } from "./config";

export const post = (url: string, body?: unknown) =>
  modernApiClient.post(url, body, AUTH_CFG);

export const postNoRetry = (url: string, body?: unknown) =>
  modernApiClient.post(url, body, { ...AUTH_CFG, retries: 0 });
