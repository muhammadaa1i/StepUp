import React from "react";
import { UseFormReturn } from "react-hook-form";
import FormInput from "../FormInput";
import PasswordInput from "../PasswordInput";

interface RegisterFormFieldsProps {
  form: UseFormReturn<{
    name: string;
    surname: string;
    phone_number: string;
    password: string;
    confirm_password: string;
  }>;
  t: (key: string) => string;
}

export const RegisterFormFields: React.FC<RegisterFormFieldsProps> = ({ form, t }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          {...form.register("name")}
          label={t("auth.name")}
          autoComplete="given-name"
          placeholder={t("auth.name")}
          error={form.formState.errors.name?.message}
        />
        <FormInput
          {...form.register("surname")}
          label={t("auth.validation.surnameRequired").split(" ")[0]}
          autoComplete="family-name"
          placeholder={t("auth.validation.surnameRequired").split(" ")[0]}
          error={form.formState.errors.surname?.message}
        />
      </div>

      <FormInput
        {...form.register("phone_number")}
        type="tel"
        label={t("auth.phone")}
        autoComplete="tel"
        placeholder={t("auth.phonePlaceholder")}
        error={form.formState.errors.phone_number?.message}
      />

      <PasswordInput
        {...form.register("password")}
        label={t("auth.password")}
        autoComplete="new-password"
        placeholder={t("auth.passwordPlaceholder")}
        error={form.formState.errors.password?.message}
        showPasswordLabel={t("auth.showPassword")}
        hidePasswordLabel={t("auth.hidePassword")}
      />

      <PasswordInput
        {...form.register("confirm_password")}
        label={t("auth.confirmPassword")}
        autoComplete="new-password"
        placeholder={t("auth.confirmPasswordPlaceholder")}
        error={form.formState.errors.confirm_password?.message}
        showPasswordLabel={t("auth.showPassword")}
        hidePasswordLabel={t("auth.hidePassword")}
      />
    </div>
  );
};
