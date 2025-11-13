import React from "react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  locale: "ru" | "uz";
  setLocale: (locale: "ru" | "uz") => void;
  mobile?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  locale,
  setLocale,
  mobile = false,
}) => {
  if (mobile) {
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
  }

  return (
    <div className="flex items-center space-x-1 ml-1 lg:ml-2">
      {(["ru", "uz"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={cn(
            "px-1.5 lg:px-2 py-1 text-xs rounded border transition",
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
  );
};
