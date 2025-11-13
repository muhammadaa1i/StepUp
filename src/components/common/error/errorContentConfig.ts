interface ErrorContent {
  title: string;
  description: string;
  suggestions: string[];
  showRetry: boolean;
  retryDelay: number;
}

export const getErrorContent = (
  status: number | undefined,
  message: string | undefined,
  t: (key: string) => string
): ErrorContent => {
  const isNoisyNetworkMessage = (msg?: string) => {
    if (!msg) return false;
    const lower = msg.toLowerCase();
    return (
      lower.includes("failed to fetch") ||
      lower.includes("network error") ||
      lower.includes("load failed")
    );
  };

  switch (status) {
    case 503:
      return {
        title: t("errors.serverUnavailable"),
        description: t("errors.serverUnavailableLong"),
        suggestions: [
          t("errorPage.suggestions.waitFewMinutes"),
          t("errorPage.suggestions.checkConnection"),
          t("errorPage.suggestions.refresh"),
        ],
        showRetry: true,
        retryDelay: 60,
      };

    case 502:
      return {
        title: t("errors.badGateway"),
        description: t("errors.badGatewayLong"),
        suggestions: [
          t("errorPage.suggestions.refresh"),
          t("errorPage.suggestions.checkConnection"),
          t("errorPage.suggestions.tryLater"),
        ],
        showRetry: true,
        retryDelay: 30,
      };

    case 500:
      return {
        title: t("errors.serverError"),
        description: t("errors.serverErrorLong"),
        suggestions: [
          t("errorPage.suggestions.refresh"),
          t("errorPage.suggestions.tryLater"),
          t("errorPage.suggestions.contactSupport"),
        ],
        showRetry: true,
        retryDelay: 30,
      };

    case 429:
      return {
        title: t("errors.tooManyRequests"),
        description: t("errors.tooManyRequestsLong"),
        suggestions: [
          t("errorPage.suggestions.waitFewMinutes"),
          t("errorPage.suggestions.slower"),
          t("errorPage.suggestions.refreshInMinute"),
        ],
        showRetry: true,
        retryDelay: 60,
      };

    default:
      return {
        title: t("errorPage.default.title"),
        description: isNoisyNetworkMessage(message)
          ? t("errors.serverUnavailableRetry")
          : message && !isNoisyNetworkMessage(message)
            ? message
            : t("errorPage.default.description"),
        suggestions: [
          t("errorPage.suggestions.refresh"),
          t("errorPage.suggestions.checkConnection"),
          t("errorPage.suggestions.contactSupport"),
        ],
        showRetry: true,
        retryDelay: 30,
      };
  }
};
