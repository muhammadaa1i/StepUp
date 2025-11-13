import React from "react";
import { CartIcon } from "../navbar/CartIcon";
import { UserMenu } from "../navbar/UserMenu";
import { LanguageSwitcher } from "../navbar/LanguageSwitcher";

interface DesktopActionsProps {
  pathname: string | null;
  distinctCount: number;
  isAdmin: boolean;
  isAdminPage: boolean;
  formatCartCount: (count: number) => string;
  isAuthenticated: boolean;
  isProfileDropdownOpen: boolean;
  setIsProfileDropdownOpen: (value: boolean) => void;
  userGreeting: string | undefined;
  handleLogout: () => void;
  locale: "ru" | "uz";
  setLocale: (locale: "ru" | "uz") => void;
  t: (key: string) => string;
}

export const DesktopActions: React.FC<DesktopActionsProps> = ({
  pathname,
  distinctCount,
  isAdmin,
  isAdminPage,
  formatCartCount,
  isAuthenticated,
  isProfileDropdownOpen,
  setIsProfileDropdownOpen,
  userGreeting,
  handleLogout,
  locale,
  setLocale,
  t,
}) => {
  return (
    <div className="hidden md:flex items-center space-x-2 lg:space-x-4 min-w-0">
      <CartIcon
        pathname={pathname}
        distinctCount={distinctCount}
        isAdmin={isAdmin}
        isAdminPage={isAdminPage}
        formatCartCount={formatCartCount}
        t={t}
      />
      <UserMenu
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        isProfileDropdownOpen={isProfileDropdownOpen}
        setIsProfileDropdownOpen={setIsProfileDropdownOpen}
        userGreeting={userGreeting}
        handleLogout={handleLogout}
        t={t}
      />
      <LanguageSwitcher locale={locale} setLocale={setLocale} />
    </div>
  );
};
