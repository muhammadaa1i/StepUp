import React from "react";
import Link from "next/link";

interface LoginFormHeaderProps {
  t: (key: string) => string;
}

export const LoginFormHeader: React.FC<LoginFormHeaderProps> = ({ t }) => {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {t("auth.login")}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {t("auth.orCreate").split(" ").slice(0, 1).join(" ")}{" "}
        <Link
          href="/auth/register"
          className="font-medium text-emerald-600 hover:text-emerald-500"
        >
          {t("auth.register")}
        </Link>
      </p>
    </div>
  );
};
