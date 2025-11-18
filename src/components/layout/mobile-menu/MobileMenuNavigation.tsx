import React from "react";
import Link from "next/link";
import { Home, Package, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationItem } from "../navbar-components/types";

interface MobileMenuNavigationProps {
  navigation: NavigationItem[];
  pathname: string | null;
  closeMenu: () => void;
  isAdmin?: boolean;
}

const iconMap = {
  Home,
  Package,
  Settings,
};

export const MobileMenuNavigation: React.FC<MobileMenuNavigationProps> = ({
  navigation,
  pathname,
  closeMenu,
  isAdmin,
}) => {
  return (
    <>
      {navigation.map((item) => {
        const Icon = iconMap[item.icon];
        const isActive =
          item.href === "/admin"
            ? pathname?.startsWith("/admin")
            : pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={closeMenu}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors",
              isActive
                ? "bg-emerald-100 text-emerald-700"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );
};
