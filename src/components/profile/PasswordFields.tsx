import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProfileFormData } from '@/hooks/useProfileForm';
import { PasswordField } from './password-fields/PasswordField';

interface PasswordFieldsProps {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  isEditing: boolean;
  showPasswords: {
    current: boolean;
    new: boolean;
    confirm: boolean;
  };
  onTogglePassword: (field: 'current' | 'new' | 'confirm') => void;
  t: (key: string) => string;
}

export default function PasswordFields({
  register,
  errors,
  isEditing,
  showPasswords,
  onTogglePassword,
  t,
}: PasswordFieldsProps) {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        {t('profilePage.passwordChangeOptional')}
      </h2>
      <div className="space-y-4">
        <PasswordField
          name="current_password"
          label={t('profilePage.currentPassword')}
          register={register}
          error={errors.current_password?.message}
          isEditing={isEditing}
          showPassword={showPasswords.current}
          onTogglePassword={() => onTogglePassword('current')}
        />

        <PasswordField
          name="new_password"
          label={t('profilePage.newPassword')}
          placeholder={t('profilePage.newPasswordPlaceholder')}
          register={register}
          error={errors.new_password?.message}
          isEditing={isEditing}
          showPassword={showPasswords.new}
          onTogglePassword={() => onTogglePassword('new')}
        />

        <PasswordField
          name="confirm_new_password"
          label={t('profilePage.confirmNewPassword')}
          placeholder={t('profilePage.confirmNewPasswordPlaceholder')}
          register={register}
          error={errors.confirm_new_password?.message}
          isEditing={isEditing}
          showPassword={showPasswords.confirm}
          onTogglePassword={() => onTogglePassword('confirm')}
        />
      </div>
    </div>
  );
}
