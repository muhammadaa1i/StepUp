/**
 * Forgot password operation
 */

import { toast } from "react-toastify";
import { apiClient } from "@/lib/apiClient";
import { extractErrorMessage } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants";

interface ForgotPasswordOptions {
  payload: { name: string; password?: string; confirm_password?: string };
  setIsLoading: (loading: boolean) => void;
  t: (key: string) => string;
}

export async function forgotPassword({
  payload,
  setIsLoading,
  t,
}: ForgotPasswordOptions): Promise<void> {
  try {
    setIsLoading(true);

    if (payload.password) {
      const resetBody = {
        name: payload.name,
        new_password: payload.password,
        confirm_new_password: payload.confirm_password,
      };
      await apiClient.post(API_ENDPOINTS.FORGOT_PASSWORD, resetBody);
    } else {
      return;
    }
    
    if (payload.password) {
      toast.success(t('auth.toasts.passwordChangeSuccess'));
    } else {
      toast.success(t('auth.toasts.userFoundEnterNewPassword'));
    }
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: unknown } };
    
    if (process.env.NODE_ENV !== 'production') {
      console.error('[forgotPassword][debug] payload sent:', payload);
      console.error('[forgotPassword][debug] server response:', axiosError.response?.data);
    }
    
    const message = extractErrorMessage(
      axiosError.response?.data,
      payload.password ? t('auth.errors.passwordChangeFailed') : t('auth.errors.userSearchFailed')
    );
    toast.error(message);
    throw error;
  } finally {
    setIsLoading(false);
  }
}
