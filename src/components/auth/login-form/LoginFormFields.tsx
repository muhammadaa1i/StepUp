import React from "react";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import FormInput from "../FormInput";
import PasswordInput from "../PasswordInput";

interface LoginFormFieldsProps {
  form: UseFormReturn<{
    name: string;
    password: string;
  }>;
  loginError: string | null;
  handleInputChange: () => void;
  t: (key: string) => string;
}

export const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  form,
  loginError,
  handleInputChange,
  t,
}) => {
  const nameRegister = form.register("name");
  const passwordRegister = form.register("password");

  return (
    <>
      <div className="space-y-4">
        <FormInput
          {...nameRegister}
          onChange={(e) => {
            nameRegister.onChange(e);
            handleInputChange();
          }}
          label={t("auth.name")}
          autoComplete="username"
          placeholder={t("auth.namePlaceholder")}
          error={
            form.formState.errors.name?.message ||
            (loginError ? loginError : undefined)
          }
        />

        <PasswordInput
          {...passwordRegister}
          onChange={(e) => {
            passwordRegister.onChange(e);
            handleInputChange();
          }}
          label={t("auth.password")}
          autoComplete="current-password"
          placeholder={t("auth.passwordInputPlaceholder")}
          error={
            form.formState.errors.password?.message ||
            (loginError ? " " : undefined)
          }
          showPasswordLabel={t("auth.showPassword")}
          hidePasswordLabel={t("auth.hidePassword")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-emerald-600 hover:text-emerald-500"
        >
          {t("auth.forgotPassword")}
        </Link>
      </div>
    </>
  );
};
