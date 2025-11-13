import React from "react";
import { cn } from "@/lib/utils";

interface MobileMenuLanguageProps {
  locale: "ru" | "uz";
  setLocale: (locale: "ru" | "uz") => void;
}

export const MobileMenuLanguage: React.FC<MobileMenuLanguageProps> = ({
  locale,
  setLocale,
}) => {
  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      <div className="flex items-center gap-2">
        {(["ru", "uz"] as const).map((code) => (
          <button
            key={code}
            onClick={() => setLocale(code)}
            className={cn(
              "px-4 py-2.5 text-base rounded-lg border-2 font-medium transition w-full text-center",
              locale === code
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 active:bg-gray-100"
            )}
            aria-pressed={locale === code}
            aria-label={`Switch language to ${code.toUpperCase()}`}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
