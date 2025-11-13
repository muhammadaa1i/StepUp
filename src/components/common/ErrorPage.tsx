"use client";

import React from "react";
import { useI18n } from "@/i18n";
import { ErrorIcon } from "./error/ErrorIcon";
import { ErrorSuggestions } from "./error/ErrorSuggestions";
import { ErrorActions } from "./error/ErrorActions";
import { getErrorContent } from "./error/errorContentConfig";

interface ErrorPageProps {
  error: {
    status?: number;
    message?: string;
  };
  onRetry?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, onRetry }) => {
  const { t } = useI18n();
  const content = getErrorContent(error.status, error.message, t);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <ErrorIcon status={error.status} />

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>

        <p className="text-gray-600 mb-6">{content.description}</p>

        <ErrorSuggestions suggestions={content.suggestions} />

        <ErrorActions showRetry={content.showRetry} onRetry={onRetry} />

        {error.status && (
          <div className="mt-6 text-xs text-gray-400">
            {t("errorPage.statusCode")}: {error.status}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
