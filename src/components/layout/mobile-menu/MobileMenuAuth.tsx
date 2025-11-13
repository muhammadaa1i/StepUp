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
      <div className="border-t pt-3 mt-3">
        <Link
          href="/profile"
          onClick={closeMenu}
          className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <User className="h-5 w-5" />
          <span>{t("common.profile")}</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>{t("common.logout")}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="border-t pt-3 mt-3 space-y-1">
      <Link
        href="/auth/login"
        onClick={closeMenu}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 border-2 border-emerald-500 hover:border-emerald-600"
      >
        {t("auth.login")}
      </Link>
      <Link
        href="/auth/register"
        onClick={closeMenu}
        className="block px-3 py-2 rounded-md text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {t("auth.register")}
      </Link>
    </div>
  );
};
