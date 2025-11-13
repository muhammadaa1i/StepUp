/**
 * API Client - Simple axios-based HTTP client
 */
import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://stepupy.duckdns.org";

// Create axios instance
const instance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
instance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiClient = {
  get: (url: string, params?: any) => instance.get(url, { params }),
  post: (url: string, data?: any) => instance.post(url, data),
  put: (url: string, data?: any) => instance.put(url, data),
  patch: (url: string, data?: any) => instance.patch(url, data),
  delete: (url: string) => instance.delete(url),
};

export const buildUrl = (path: string, params?: Record<string, any>): string => {
  const url = new URL(path, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  return url.toString();
};

export const tokenStorage = {
  get: () => Cookies.get("access_token") || localStorage.getItem("access_token"),
  set: (token: string) => {
    Cookies.set("access_token", token);
    localStorage.setItem("access_token", token);
  },
  remove: () => {
    Cookies.remove("access_token");
    localStorage.removeItem("access_token");
  },
};

export default apiClient;
