import React from "react";
import Link from "next/link";
import { Home, Package, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationItem } from "../navbar-components/types";

interface DesktopNavigationProps {
  navigation: NavigationItem[];
  pathname: string | null;
  isAdmin?: boolean;
}

const iconMap = {
  Home,
  Package,
  Settings,
};

export const DesktopNavigation: React.FC<DesktopNavigationProps> = ({
  navigation,
  pathname,
  isAdmin,
}) => {
  return (
    <div className="hidden md:flex items-center">
      {navigation.map((item) => {
        // Skip profile from main nav
        if (item.href === "/profile") return null;
        const Icon = iconMap[item.icon];
        const isActive =
          item.href === "/admin"
            ? pathname?.startsWith("/admin") || isAdmin // Keep green if admin, even on other pages
            : pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-emerald-100 text-emerald-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
