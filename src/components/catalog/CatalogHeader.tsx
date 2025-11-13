"use client";
import React from "react";
import { useI18n } from "@/i18n";

export default function CatalogHeader() {
  const { t } = useI18n();
  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("catalog.title")}</h1>
      <p className="text-gray-600">{t("catalog.subtitle")}</p>
    </div>
  );
}
