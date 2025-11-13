"use client";
import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface AdminNavigationProps {
  items: NavItem[];
  currentPath: string;
  onItemClick?: () => void;
}

export default function AdminNavigation({
  items,
  currentPath,
  onItemClick,
}: AdminNavigationProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActive
                ? "bg-emerald-100 text-emerald-700 border-r-2 border-emerald-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            )}
          >
            <Icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
