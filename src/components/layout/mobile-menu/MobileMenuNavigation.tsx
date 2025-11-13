import React from "react";
import Link from "next/link";
import { Home, Package, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationItem } from "../navbar-components/types";

interface MobileMenuNavigationProps {
  navigation: NavigationItem[];
  pathname: string | null;
  closeMenu: () => void;
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
              "flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors",
              isActive
                ? "bg-emerald-100 text-emerald-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );
};
