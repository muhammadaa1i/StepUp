import React from "react";
import { useI18n } from "@/i18n";

interface ErrorSuggestionsProps {
  suggestions: string[];
}

export const ErrorSuggestions: React.FC<ErrorSuggestionsProps> = ({
  suggestions,
}) => {
  const { t } = useI18n();

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">
        {t("errorPage.suggestions.title")}
      </h3>
      <ul className="text-sm text-gray-600 space-y-1">
        {suggestions
          .filter((s) => typeof s === "string" && s.trim().length > 0)
          .map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              {suggestion}
            </li>
          ))}
      </ul>
    </div>
  );
};
