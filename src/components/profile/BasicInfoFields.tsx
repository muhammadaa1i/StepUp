import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ProfileFormData } from '@/hooks/useProfileForm';

interface BasicInfoFieldsProps {
  register: UseFormRegister<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  isEditing: boolean;
  t: (key: string) => string;
}

export default function BasicInfoFields({
  register,
  errors,
  isEditing,
  t,
}: BasicInfoFieldsProps) {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">{t('profilePage.basicInfo')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('auth.name')}
          </label>
          <input
            {...register('name')}
            type="text"
            disabled={!isEditing}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
              !isEditing && 'bg-gray-50 cursor-not-allowed',
              errors.name && 'border-red-300 focus:border-red-500 focus:ring-red-500'
            )}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('auth.validation.surnameRequired').replace(' обязательна', '')}
          </label>
          <input
            {...register('surname')}
            type="text"
            disabled={!isEditing}
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
              !isEditing && 'bg-gray-50 cursor-not-allowed',
              errors.surname && 'border-red-300 focus:border-red-500 focus:ring-red-500'
            )}
          />
          {errors.surname && (
            <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('profilePage.phoneNumber')}
        </label>
        <input
          {...register('phone_number')}
          type="tel"
          disabled={!isEditing}
          className={cn(
            'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
            !isEditing && 'bg-gray-50 cursor-not-allowed',
            errors.phone_number && 'border-red-300 focus:border-red-500 focus:ring-red-500'
          )}
        />
        {errors.phone_number && (
          <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
        )}
      </div>
    </div>
  );
}
