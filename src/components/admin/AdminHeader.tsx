"use client";
import React from "react";
import { Menu, X } from "lucide-react";

interface AdminHeaderProps {
  title: string
  userName: string
  welcomeText: string
  mobileNavOpen: boolean
  onToggleMobileNav: () => void
}

export default function AdminHeader({
  title,
  userName,
  welcomeText,
  mobileNavOpen,
  onToggleMobileNav,
}: AdminHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle navigation"
              aria-expanded={mobileNavOpen}
              onClick={onToggleMobileNav}
            >
              {mobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
              {title}
            </h1>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 truncate max-w-[50%] sm:max-w-none">
            {welcomeText.replace("{name}", userName)}
          </div>
        </div>
      </div>
    </div>
  );
}
