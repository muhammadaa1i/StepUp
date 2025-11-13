import { useMemo } from "react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: "Home" | "Package" | "Settings";
}

interface UseNavigationOptions {
  isAuthenticated: boolean;
  isAdmin: boolean;
  t: (key: string) => string;
}

export function useNavigation({ isAuthenticated, isAdmin, t }: UseNavigationOptions): NavigationItem[] {
  return useMemo(() => {
    const baseNavigation = [
      { name: t('common.home'), href: "/", icon: "Home" as const },
      { name: t('common.catalog'), href: "/catalog", icon: "Package" as const },
    ];

    const userNavigation: NavigationItem[] = [];
    // Show "My Orders" for authenticated non-admin users
    if (isAuthenticated && !isAdmin) {
      userNavigation.push({ name: t('home.myOrders'), href: '/orders', icon: "Package" as const });
    }

    const adminNavigation = isAdmin
      ? [{ name: t('common.adminPanel'), href: "/admin", icon: "Settings" as const }]
      : [];

    return [...baseNavigation, ...userNavigation, ...adminNavigation];
  }, [isAdmin, isAuthenticated, t]);
}
