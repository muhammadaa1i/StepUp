"use client";

import { toast } from 'react-toastify';
import { User } from '@/types';
import { apiClient } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/lib/constants';
import { ProfileFormData } from './schema';

export function useProfileSubmit(
  user: User | null,
  updateUser: (user: User) => void,
  t: (key: string) => string,
  onEditingChange: (isEditing: boolean) => void,
  reset: (data: Partial<ProfileFormData>) => void
) {
  const verifyCurrentPassword = async (password: string): Promise<boolean> => {
    try {
      const verifyResp = await fetch('/api/proxy?endpoint=/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user?.name ?? '', password }),
      });
      return verifyResp.ok;
    } catch {
      return false;
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const isPasswordChange = Boolean(
        (data.current_password && data.current_password.trim()) ||
          (data.new_password && data.new_password.trim()) ||
          (data.confirm_new_password && data.confirm_new_password.trim())
      );

      if (isPasswordChange) {
        const current = data.current_password?.trim() || '';
        const next = data.new_password?.trim() || '';
        const confirm = data.confirm_new_password?.trim() || '';

        if (!current || !next || !confirm) {
          toast.error(t('profilePage.validation.allPasswordFieldsRequired'));
          return;
        }
        if (next.length < 8) {
          toast.error(t('profilePage.validation.newPasswordMin'));
          return;
        }
        if (next !== confirm) {
          toast.error(t('auth.validation.passwordsMismatch'));
          return;
        }

        const isValid = await verifyCurrentPassword(data.current_password!);
        if (!isValid) {
          toast.error(t('auth.toasts.loginInvalid'));
          return;
        }
      }

      const updateData: {
        name: string;
        surname: string;
        phone_number: string;
        current_password?: string;
        new_password?: string;
        confirm_new_password?: string;
      } = {
        name: data.name,
        surname: data.surname,
        phone_number: data.phone_number,
      };

      if (isPasswordChange && data.new_password && data.confirm_new_password) {
        updateData.current_password = data.current_password;
        updateData.new_password = data.new_password;
        updateData.confirm_new_password = data.confirm_new_password;
      }

      const response = await apiClient.put(API_ENDPOINTS.USER_PROFILE, updateData);

      updateUser(response.data);
      onEditingChange(false);
      toast.success(t('profilePage.toasts.updateSuccess'));

      reset({
        ...data,
        current_password: '',
        new_password: '',
        confirm_new_password: '',
      });
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { detail?: string } } };
      const message = axiosError.response?.data?.detail || t('profilePage.toasts.updateError');
      toast.error(message);
    }
  };

  return { onSubmit };
}
