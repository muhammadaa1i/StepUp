"use client";

import React from "react";
import { useI18n } from "@/i18n";
import { useRegisterForm } from "./register-form/useRegisterForm";
import { RegisterFormHeader } from "./register-form/RegisterFormHeader";
import { RegisterFormFields } from "./register-form/RegisterFormFields";
import { RegisterFormActions } from "./register-form/RegisterFormActions";

const RegisterForm = () => {
  const { t } = useI18n();
  const { form, onSubmit } = useRegisterForm({ t });

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <RegisterFormHeader t={t} />

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <RegisterFormFields form={form} t={t} />
          <RegisterFormActions isSubmitting={form.formState.isSubmitting} t={t} />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
