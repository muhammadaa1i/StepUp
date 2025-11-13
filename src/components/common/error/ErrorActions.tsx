import React from "react";
import { RefreshCw, Home } from "lucide-react";
import { useI18n } from "@/i18n";

interface ErrorActionsProps {
  showRetry: boolean;
  onRetry?: () => void;
}

export const ErrorActions: React.FC<ErrorActionsProps> = ({
  showRetry,
  onRetry,
}) => {
  const { t } = useI18n();

  return (
    <div className="space-y-3">
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
        >
          <RefreshCw className="h-5 w-5" />
          <span>{t("errorPage.retry")}</span>
        </button>
      )}

      <button
        onClick={() => (window.location.href = "/")}
        className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
      >
        <Home className="h-5 w-5" />
        <span>{t("errorPage.goHome")}</span>
      </button>
    </div>
  );
};
