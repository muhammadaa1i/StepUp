/**
 * Register operation
 */

import { toast } from "react-toastify";
import { User, RegisterRequest } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { extractErrorMessage } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants";
import { storeAuthData } from "../authStorage";

interface RegisterOptions {
  userData: RegisterRequest;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setTokenVerified: (verified: boolean) => void;
  t: (key: string) => string;
}

export async function register({
  userData,
  setUser,
  setIsLoading,
  setTokenVerified,
  t,
}: RegisterOptions): Promise<void> {
  try {
    setIsLoading(true);
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);

    const { access_token, refresh_token, user: newUser } = response.data;

    storeAuthData(access_token, refresh_token, newUser);
    setUser(newUser);
    setTokenVerified(true);
    toast.success(t('auth.toasts.registrationSuccess'));
  } catch (error: unknown) {
    const axiosError = error as { 
      response?: { data?: unknown; status?: number; statusText?: string };
      message?: string;
    };
    
    let message = extractErrorMessage(
      axiosError.response?.data,
      t('auth.errors.registrationFailed')
    );
    
    if (!message || message === t('auth.errors.registrationFailed')) {
      if (axiosError.response) {
        const code = axiosError.response.status 
          ? ` (HTTP ${axiosError.response.status}${axiosError.response.statusText ? ' ' + axiosError.response.statusText : ''})` 
          : '';
        message = `${t('auth.errors.registrationFailed')}${code}`;
      } else if (axiosError.message && /network|failed|cors|fetch/i.test(axiosError.message)) {
        message = `${t('auth.errors.registrationFailedNetwork')}`;
      }
    }
    
    if (/user with this phone number already exists/i.test(message)) {
      message = t('auth.errors.existingPhone');
    } else if (/user with this name already exists/i.test(message)) {
      message = t('auth.errors.existingName');
    }
    
    toast.error(message);
    throw error;
  } finally {
    setIsLoading(false);
  }
}
