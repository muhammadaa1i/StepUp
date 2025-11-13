import React from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isProfileDropdownOpen: boolean;
  setIsProfileDropdownOpen: (open: boolean) => void;
  userGreeting: string | undefined;
  handleLogout: () => void;
  t: (key: string) => string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  isAuthenticated,
  isAdmin,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  userGreeting,
  handleLogout,
  t,
}) => {
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="relative" data-profile-dropdown>
        <button
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          aria-haspopup="menu"
          aria-expanded={isProfileDropdownOpen}
          className={cn(
            "flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-md text-sm font-semibold transition-colors min-w-0",
            "bg-white border border-emerald-200/60 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 focus:outline-none focus:border-emerald-300"
          )}
        >
          <User className="h-4 w-4 text-emerald-600 shrink-0" />
          <span className="truncate max-w-20 sm:max-w-none">
            {userGreeting || t("common.profile")}
          </span>
          <span
            className={cn(
              "ml-0.5 text-[10px] font-normal text-emerald-600/70 transition-transform shrink-0",
              isProfileDropdownOpen ? "rotate-180" : ""
            )}
          >
            ▼
          </span>
        </button>
        {isProfileDropdownOpen && (
          <div
            className="absolute right-0 mt-2 w-48 min-w-[180px] max-w-[calc(100vw-2rem)] origin-top-right rounded-xl border border-emerald-200/60 bg-white/95 backdrop-blur shadow-lg shadow-emerald-100/40 ring-1 ring-black/5 z-50"
            role="menu"
            aria-label="Меню профиля"
          >
            <div className="py-2 px-2">
              <Link
                href="/profile"
                onClick={() => setIsProfileDropdownOpen(false)}
                className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus:bg-emerald-50 focus:text-emerald-700 transition-colors"
                role="menuitem"
              >
                <User className="h-4 w-4" />
                <span>{t("common.profile")}</span>
              </Link>
              <div className="my-2 h-px bg-linear-to-r from-transparent via-emerald-200/70 to-transparent" />
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:bg-red-50 focus:text-red-700 transition-colors"
                role="menuitem"
              >
                <LogOut className="h-4 w-4" />
                <span>{t("common.logout")}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isAuthenticated && isAdmin) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>{t("common.logout")}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link
        href="/auth/login"
        className="text-gray-600 focus:border-none px-3 py-2 rounded-md text-sm font-medium transition-colors border-2 border-gray-500"
      >
        {t("auth.login")}
      </Link>
      <Link
        href="/auth/register"
        className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        {t("auth.register")}
      </Link>
    </div>
  );
};
