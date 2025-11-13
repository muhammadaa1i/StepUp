"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";

interface ForgotPasswordFormProps {
  t: (key: string, params?: Record<string, string>) => string;
  onSubmit: (data: {
    name: string;
    new_password: string;
    confirm_new_password: string;
  }) => Promise<void>;
  isLoading: boolean;
}

export default function ForgotPasswordForm({
  t,
  onSubmit,
  isLoading,
}: ForgotPasswordFormProps) {
  const schema = z
    .object({
      name: z.string().min(1, t("auth.validation.nameRequired")),
      new_password: z.string().min(8, t("auth.passwordPlaceholder")),
      confirm_new_password: z
        .string()
        .min(8, t("auth.confirmPasswordPlaceholder")),
    })
    .refine((data) => data.new_password === data.confirm_new_password, {
      message: t("auth.validation.passwordsMismatch"),
      path: ["confirm_new_password"],
    });

  type FormData = z.infer<typeof schema>;
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  return (
    <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <FormInput
          {...form.register("name")}
          label={t("auth.name")}
          placeholder="user123"
          error={form.formState.errors.name?.message}
        />

        <PasswordInput
          {...form.register("new_password")}
          label={t("auth.forgot.newPassword")}
          autoComplete="new-password"
          placeholder={t("auth.passwordPlaceholder")}
          error={form.formState.errors.new_password?.message}
        />

        <PasswordInput
          {...form.register("confirm_new_password")}
          label={t("auth.forgot.confirmNewPassword")}
          autoComplete="new-password"
          placeholder={t("auth.confirmPasswordPlaceholder")}
          error={form.formState.errors.confirm_new_password?.message}
        />
      </div>

      <button
        type="submit"
        disabled={form.formState.isSubmitting || isLoading}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {form.formState.isSubmitting || isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {t("auth.forgot.saving")}
          </>
        ) : (
          t("auth.forgot.submit")
        )}
      </button>
    </form>
  );
}
