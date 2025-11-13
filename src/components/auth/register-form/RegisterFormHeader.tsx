import React from "react";
import Link from "next/link";

interface RegisterFormHeaderProps {
  t: (key: string) => string;
}

export const RegisterFormHeader: React.FC<RegisterFormHeaderProps> = ({ t }) => {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {t("auth.register")}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {t("auth.orLogin").split(" ").slice(0, 1).join(" ")}{" "}
        <Link
          href="/auth/login"
          className="font-medium text-emerald-600 hover:text-emerald-500"
        >
          {t("auth.login")}
        </Link>
      </p>
    </div>
  );
};
