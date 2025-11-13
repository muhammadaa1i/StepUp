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
    <div className="border-t pt-3 mt-3">
      <div className="px-3 flex items-center space-x-2">
        {(["ru", "uz"] as const).map((code) => (
          <button
            key={code}
            onClick={() => setLocale(code)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md border font-medium transition w-full text-center",
              locale === code
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
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
