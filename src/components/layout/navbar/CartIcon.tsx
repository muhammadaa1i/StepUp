import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartIconProps {
  mobile?: boolean;
  onClick?: () => void;
  pathname: string | null;
  distinctCount: number;
  isAdmin: boolean;
  isAdminPage: boolean;
  formatCartCount: (count: number) => string;
  t: (key: string) => string;
}

export const CartIcon: React.FC<CartIconProps> = ({
  mobile = false,
  onClick,
  pathname,
  distinctCount,
  isAdmin,
  isAdminPage,
  formatCartCount,
  t: _t,
}) => {
  if (isAdmin || isAdminPage) return null;
  
  const isActive = pathname === "/cart";
  const baseClasses = cn(
    "relative group flex items-center rounded-md transition-colors focus:border-none",
    mobile ? "px-3 py-2 text-base font-medium" : "p-2",
    isActive
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-400/60"
      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
  );
  const iconClasses = cn(
    mobile ? "h-5 w-5" : "h-6 w-6",
    "transition-transform group-hover:scale-105",
    isActive && "scale-105"
  );

  return (
    <Link
      href="/cart"
      aria-label={
        distinctCount > 0
          ? `Корзина: ${distinctCount} позиций`
          : "Корзина"
      }
      onClick={onClick}
      className={baseClasses}
    >
      <ShoppingCart className={iconClasses} />
      {distinctCount > 0 && (
        <span
          className={cn(
            "absolute -top-1.5 -right-1.5 min-w-[1.15rem] h-5 px-1.5 flex items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 text-white text-[10px] font-semibold shadow-md ring-1 ring-white/70 select-none",
            "animate-[fadeIn_120ms_ease-out]"
          )}
        >
          {formatCartCount(distinctCount)}
        </span>
      )}
    </Link>
  );
};
