"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { BarChart3, Users, Package, ShoppingCart } from "lucide-react";
import { useI18n } from "@/i18n";
import AdminHeader from "./AdminHeader";
import AdminNavigation from "./AdminNavigation";
import MobileNavOverlay from "./MobileNavOverlay";

interface AdminLayoutProps {
  children: React.ReactNode;
}

type TFunc = (k: string, vars?: Record<string, string | number>) => string;
const adminNavigation = (t: TFunc) => [
  { name: t("admin.nav.home"), href: "/admin", icon: BarChart3 },
  { name: t("admin.nav.users"), href: "/admin/users", icon: Users },
  { name: t("admin.nav.products"), href: "/admin/products", icon: Package },
  { name: t("admin.nav.orders"), href: "/admin/orders", icon: ShoppingCart },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  // Redirect non-admin users
  useEffect(() => {
    if (!isLoading && (!user || !user.is_admin)) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  // Prefetching removed: Each page loads its own data efficiently
  // This avoids duplicate requests and reduces unnecessary network traffic

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!user || !user.is_admin) return null;

  const navItems = adminNavigation(t);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader
        title={t("admin.header.title")}
        userName={user.name}
        welcomeText={t("admin.header.welcome")}
        mobileNavOpen={mobileNavOpen}
        onToggleMobileNav={() => setMobileNavOpen((o) => !o)}
      />

      <MobileNavOverlay
        isOpen={mobileNavOpen}
        title={t("admin.header.title")}
        onClose={() => setMobileNavOpen(false)}
      >
        <AdminNavigation
          items={navItems}
          currentPath={pathname}
          onItemClick={() => setMobileNavOpen(false)}
        />
      </MobileNavOverlay>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="py-8 sticky top-16">
              <AdminNavigation items={navItems} currentPath={pathname} />
            </div>
          </aside>
          <div className="flex-1 py-6 lg:py-8 lg:pl-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
