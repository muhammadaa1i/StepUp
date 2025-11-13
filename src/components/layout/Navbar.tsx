"use client";

import React, { useState, useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useConfirm } from "@/components/ui/ConfirmDialog";
import { useI18n } from "@/i18n";
import { DesktopNavigation } from "./navbar/DesktopNavigation";
import { MobileMenu } from "./navbar/MobileMenu";
import { useNavigation } from "./navbar-components/useNavigation";
import { useLogout } from "./navbar-components/useLogout";
import { useBodyScrollLock } from "./navbar-components/useBodyScrollLock";
import { useClickOutside } from "./navbar-components/useClickOutside";
import { Logo } from "./navbar-components/Logo";
import { DesktopActions } from "./navbar-components/DesktopActions";
import { MobileMenuButton } from "./navbar-components/MobileMenuButton";

const Navbar = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { t, locale, setLocale } = useI18n();
  const confirm = useConfirm();
  const { user, logout, isAuthenticated } = useAuth();
  const { distinctCount } = useCart();
  const pathname = usePathname();

  // Memoize admin status
  const isAdmin = useMemo(() => user?.is_admin || false, [user?.is_admin]);
  // Check if current path is admin
  const isAdminPage = pathname?.startsWith("/admin");

  // Navigation items from custom hook
  const navigation = useNavigation({ isAuthenticated, isAdmin, t });

  // Logout handler from custom hook
  const { handleLogout } = useLogout({ confirm, logout, setIsMenuOpen, t });

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Lock body scroll when mobile menu open
  useBodyScrollLock(isMenuOpen);

  // Close profile dropdown when clicking outside
  useClickOutside(isProfileDropdownOpen, setIsProfileDropdownOpen, '[data-profile-dropdown]');

  // Memoize user greeting
  const userGreeting = useMemo(() => user?.name, [user?.name]);

  // Helper to format cart count (cap at 999+ for layout safety)
  const formatCartCount = useCallback((count: number) => {
    if (count > 999) return "999+";
    if (count > 99) return "99+";
    return String(count);
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo + Tagline */}
          <Logo brandName={t("brand.name")} tagline={t("brand.tagline")} />

          {/* Desktop Navigation (centered) */}
          <DesktopNavigation navigation={navigation} pathname={pathname} />

          {/* User Menu + Profile + Language Switcher (desktop) */}
          <DesktopActions
            pathname={pathname}
            distinctCount={distinctCount}
            isAdmin={isAdmin}
            isAdminPage={isAdminPage}
            formatCartCount={formatCartCount}
            isAuthenticated={isAuthenticated}
            isProfileDropdownOpen={isProfileDropdownOpen}
            setIsProfileDropdownOpen={setIsProfileDropdownOpen}
            userGreeting={userGreeting}
            handleLogout={handleLogout}
            locale={locale}
            setLocale={setLocale}
            t={t}
          />

          {/* Mobile menu button */}
          <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>

        {/* Mobile menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          navigation={navigation}
          pathname={pathname}
          isAuthenticated={isAuthenticated}
          isAdmin={isAdmin}
          isAdminPage={isAdminPage}
          distinctCount={distinctCount}
          closeMenu={closeMenu}
          handleLogout={handleLogout}
          formatCartCount={formatCartCount}
          t={t}
          locale={locale}
          setLocale={setLocale}
        />
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
