import React from "react";
import Link from "next/link";
import { CartIcon } from "../navbar/CartIcon";
import { cn } from "@/lib/utils";

interface MobileMenuCartProps {
  isAdmin: boolean;
  isAdminPage: boolean;
  pathname: string | null;
  distinctCount: number;
  formatCartCount: (count: number) => string;
  closeMenu: () => void;
  t: (key: string) => string;
}

export const MobileMenuCart: React.FC<MobileMenuCartProps> = ({
  isAdmin,
  isAdminPage,
  pathname,
  distinctCount,
  formatCartCount,
  closeMenu,
  t,
}) => {
  if (isAdmin || isAdminPage) return null;

  return (
    <Link
      href="/cart"
      onClick={closeMenu}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors relative",
        pathname === "/cart"
          ? "bg-emerald-100 text-emerald-700"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      )}
    >
      <CartIcon
        mobile={true}
        onClick={closeMenu}
        pathname={pathname}
        distinctCount={distinctCount}
        isAdmin={isAdmin}
        isAdminPage={isAdminPage}
        formatCartCount={formatCartCount}
        t={t}
      />
      <span className="select-none">{t("common.cart")}</span>
    </Link>
  );
};
