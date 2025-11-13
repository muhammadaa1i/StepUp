"use client";

import React from "react";
import { useI18n } from "@/i18n";
import { useLoginForm } from "./login-form/useLoginForm";
import { LoginFormHeader } from "./login-form/LoginFormHeader";
import { LoginFormFields } from "./login-form/LoginFormFields";
import { LoginFormActions } from "./login-form/LoginFormActions";

const LoginForm = () => {
  const { t } = useI18n();
  const { form, loginError, onSubmit, handleInputChange } = useLoginForm({ t });

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginFormHeader t={t} />

        <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
          <LoginFormFields
            form={form}
            loginError={loginError}
            handleInputChange={handleInputChange}
            t={t}
          />
          <LoginFormActions isSubmitting={form.formState.isSubmitting} t={t} />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
