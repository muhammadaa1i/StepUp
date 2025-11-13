"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/i18n";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading } = useAuth();
  const { t } = useI18n();

  const handleSubmit = async (data: {
    name: string;
    new_password: string;
    confirm_new_password: string;
  }) => {
    try {
      await forgotPassword({
        name: data.name,
        password: data.new_password,
        confirm_password: data.confirm_new_password,
      });
      // Redirect to login after successful password reset
      window.location.href = "/auth/login";
    } catch {
      // Error handling is done in AuthContext
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.forgot.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.forgot.instructions')}
          </p>
        </div>

        <ForgotPasswordForm t={t} onSubmit={handleSubmit} isLoading={isLoading} />

        <div className="text-center text-sm">
          <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-700">
            {t('auth.forgot.backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  );
}
