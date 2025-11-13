import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProfileFormData } from '@/hooks/useProfileForm';

interface PasswordFieldProps {
  name: 'current_password' | 'new_password' | 'confirm_new_password';
  label: string;
  placeholder?: string;
  register: UseFormRegister<ProfileFormData>;
  error?: string;
  isEditing: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  name,
  label,
  placeholder,
  register,
  error,
  isEditing,
  showPassword,
  onTogglePassword,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          {...register(name)}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          disabled={!isEditing}
          className={cn(
            'w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
            !isEditing && 'bg-gray-50 cursor-not-allowed',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500'
          )}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={onTogglePassword}
          tabIndex={-1}
          disabled={!isEditing}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-400" />
          ) : (
            <Eye className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
