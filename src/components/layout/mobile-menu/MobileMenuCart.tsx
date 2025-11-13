import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
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

  const isActive = pathname === "/cart";

  return (
    <Link
      href="/cart"
      onClick={closeMenu}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors relative",
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
      )}
    >
      <ShoppingCart className="h-5 w-5 shrink-0" />
      <span className="select-none">{t("common.cart")}</span>
      {distinctCount > 0 && (
        <span
          className={cn(
            "ml-auto min-w-5 h-5 px-1.5 rounded-full text-xs font-semibold flex items-center justify-center",
            isActive
              ? "bg-emerald-700 text-white"
              : "bg-emerald-600 text-white"
          )}
        >
          {formatCartCount(distinctCount)}
        </span>
      )}
    </Link>
  );
};
