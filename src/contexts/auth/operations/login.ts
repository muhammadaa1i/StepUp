/**
 * Login operation
 */

import { toast } from "react-toastify";
import { User, LoginRequest } from "@/types";
import { apiClient } from "@/lib/apiClient";
import { extractErrorMessage } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants";
import { storeAuthData } from "../authStorage";

interface LoginOptions {
  credentials: LoginRequest;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setTokenVerified: (verified: boolean) => void;
  t: (key: string) => string;
}

export async function login({
  credentials,
  setUser,
  setIsLoading,
  setTokenVerified,
  t,
}: LoginOptions): Promise<void> {
  try {
    setIsLoading(true);

    const resp = await apiClient.post(API_ENDPOINTS.LOGIN, credentials);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Login Debug] Full response:', resp);
    }
    
    // Handle different response formats
    let responseData = resp.data || resp || {};
    
    if (responseData.data) {
      responseData = responseData.data;
    }
    
    const { access_token, refresh_token, user: userData } = responseData as {
      access_token?: string;
      refresh_token?: string;
      user?: User;
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('[Login Debug] Extracted tokens:', {
        hasAccessToken: !!access_token,
        hasRefreshToken: !!refresh_token,
        hasUser: !!userData,
      });
    }

    if (!access_token || !refresh_token || !userData) {
      console.error('[Login Error] Missing required fields:', {
        access_token: !!access_token,
        refresh_token: !!refresh_token,
        userData: !!userData
      });
      toast.error(t('auth.errors.invalidServerResponse'));
      throw new Error('invalid server response');
    }
    
    storeAuthData(access_token, refresh_token, userData);
    setUser(userData);
    setTokenVerified(true);
    
    setTimeout(() => {
      toast.success(t('auth.toasts.loginSuccess'));
    }, 100);
  } catch (error: unknown) {
    console.error("[Login Error] Full error object:", error);
    
    let errorMessage = t('auth.toasts.loginInvalid');
    
    if (error instanceof Error) {
      const errorWithResponse = error as Error & { 
        response?: { data?: unknown; status?: number };
        status?: number;
      };
      
      if (errorWithResponse.response?.data) {
        const serverMsg = extractErrorMessage(errorWithResponse.response.data);
        if (serverMsg) {
          errorMessage = serverMsg;
        }
      }
      
      if (!errorWithResponse.response?.data && error.message) {
        const msg = error.message.toLowerCase();
        if (msg.includes("incorrect") || msg.includes("401") || msg.includes("unauthorized")) {
          errorMessage = t('auth.serverMessages.incorrectCredentials');
        } else if (!msg.includes("http error")) {
          errorMessage = error.message;
        }
      }
    }
    
    const msgLower = errorMessage.toLowerCase();
    if (msgLower.includes('incorrect name or password') || 
        msgLower.includes('incorrect') && (msgLower.includes('name') || msgLower.includes('password'))) {
      errorMessage = t('auth.serverMessages.incorrectCredentials');
    }
    
    console.error("[Login Error] Final error message:", errorMessage);
    toast.error(errorMessage);
    throw error;
  } finally {
    setIsLoading(false);
  }
}
