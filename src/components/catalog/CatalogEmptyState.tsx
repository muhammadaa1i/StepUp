"use client";
import React from "react";
import { useI18n } from "@/i18n";

export default function CatalogEmptyState() {
  const { t } = useI18n();
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m-6 0l-4-4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{t("catalog.notFoundTitle")}</h3>
      <p className="text-gray-600">{t("catalog.notFoundSubtitle")}</p>
    </div>
  );
}
