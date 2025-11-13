"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

interface MobileNavOverlayProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MobileNavOverlay({
  isOpen,
  title,
  onClose,
  children,
}: MobileNavOverlayProps) {
  // Lock scroll & ESC close when open
  useEffect(() => {
    const root = document.documentElement;
    if (isOpen) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
      root.classList.remove("overflow-hidden");
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`lg:hidden fixed inset-0 z-50 ${
        isOpen ? "" : "pointer-events-none"
      }`}
      aria-modal={isOpen || undefined}
      role={isOpen ? "dialog" : undefined}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`absolute inset-y-0 left-0 w-64 bg-white shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-800 text-sm">{title}</span>
          <button
            className="p-2 rounded-md hover:bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Close navigation"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
