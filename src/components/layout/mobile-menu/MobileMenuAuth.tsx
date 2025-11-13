import React from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

interface MobileMenuAuthProps {
  isAuthenticated: boolean;
  closeMenu: () => void;
  handleLogout: () => void;
  t: (key: string) => string;
}

export const MobileMenuAuth: React.FC<MobileMenuAuthProps> = ({
  isAuthenticated,
  closeMenu,
  handleLogout,
  t,
}) => {
  if (isAuthenticated) {
    return (
      <div className="border-t border-gray-200 pt-4 mt-4">
        <Link
          href="/profile"
          onClick={closeMenu}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <User className="h-5 w-5 shrink-0" />
          <span>{t("common.profile")}</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>{t("common.logout")}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
      <Link
        href="/auth/login"
        onClick={closeMenu}
        className="block px-4 py-3 rounded-lg text-base font-medium text-center text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 active:bg-emerald-100 border-2 border-emerald-500 hover:border-emerald-600 transition-colors"
      >
        {t("auth.login")}
      </Link>
      <Link
        href="/auth/register"
        onClick={closeMenu}
        className="block px-4 py-3 rounded-lg text-base font-medium text-center bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 transition-colors"
      >
        {t("auth.register")}
      </Link>
    </div>
  );
};
