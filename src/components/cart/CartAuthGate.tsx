"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";

type Props = {
  shouldShowFullLoading: boolean;
  shouldShowMinimalLoading: boolean;
  shouldSkipAllChecks: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  t: (key: string, vars?: Record<string, string>) => string;
  children: React.ReactNode;
};

export default function CartAuthGate({
  shouldShowFullLoading,
  shouldShowMinimalLoading,
  shouldSkipAllChecks,
  isAuthenticated,
  isLoading,
  t,
  children,
}: Props) {
  if (shouldShowFullLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">{t("auth.checking")}</h2>
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  if (shouldShowMinimalLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
      </div>
    );
  }

  const hasAnyAuthData =
    typeof window !== "undefined" &&
    (Cookies.get("access_token") ||
      Cookies.get("user") ||
      localStorage.getItem("auth_token") ||
      localStorage.getItem("user"));

  if (!shouldSkipAllChecks && !isAuthenticated && !hasAnyAuthData && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">{t("auth.login")}</h2>
          <p className="text-gray-600 mb-4">{t("cart.loginRequired")}</p>
          <Link href="/auth/login" className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600">
            {t("cart.goToLogin")}
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
