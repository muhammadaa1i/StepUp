import React from "react";
import { NavigationItem } from "../navbar-components/types";
import { MobileMenuOverlay } from "../mobile-menu/MobileMenuOverlay";
import { MobileMenuNavigation } from "../mobile-menu/MobileMenuNavigation";
import { MobileMenuCart } from "../mobile-menu/MobileMenuCart";
import { MobileMenuAuth } from "../mobile-menu/MobileMenuAuth";
import { MobileMenuLanguage } from "../mobile-menu/MobileMenuLanguage";

interface MobileMenuProps {
  isOpen: boolean;
  navigation: NavigationItem[];
  pathname: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAdminPage: boolean;
  distinctCount: number;
  closeMenu: () => void;
  handleLogout: () => void;
  formatCartCount: (count: number) => string;
  t: (key: string) => string;
  locale: "ru" | "uz";
  setLocale: (locale: "ru" | "uz") => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navigation,
  pathname,
  isAuthenticated,
  isAdmin,
  isAdminPage,
  distinctCount,
  closeMenu,
  handleLogout,
  formatCartCount,
  t,
  locale,
  setLocale,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-x-0 top-16 bottom-0 md:hidden z-40"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <MobileMenuOverlay onClick={closeMenu} />
      
      {/* Slide-down panel */}
      <div className="relative z-50 max-h-full overflow-y-auto bg-white shadow-xl animate-[fadeIn_120ms_ease-out] px-2 pt-2 pb-4 space-y-1 sm:px-3">
        {/* Navigation Links */}
        <MobileMenuNavigation
          navigation={navigation}
          pathname={pathname}
          closeMenu={closeMenu}
        />

        {/* Cart Link */}
        <MobileMenuCart
          isAdmin={isAdmin}
          isAdminPage={isAdminPage}
          pathname={pathname}
          distinctCount={distinctCount}
          formatCartCount={formatCartCount}
          closeMenu={closeMenu}
          t={t}
        />

        {/* Auth Section */}
        <MobileMenuAuth
          isAuthenticated={isAuthenticated}
          closeMenu={closeMenu}
          handleLogout={handleLogout}
          t={t}
        />

        {/* Language Switcher */}
        <MobileMenuLanguage locale={locale} setLocale={setLocale} />
      </div>
    </div>
  );
};
