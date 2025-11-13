export const createErrorFromResponse = (response: Response): Error => {
  let errorMessage = `HTTP error! status: ${response.status}`;

  switch (response.status) {
    case 503:
      errorMessage =
        "Server is temporarily unavailable. Please try again in a few moments.";
      break;
    case 502:
      errorMessage = "Server gateway error. Please try again later.";
      break;
    case 500:
      errorMessage = "Internal server error. Please try again later.";
      break;
    case 404:
      errorMessage = "Requested resource not found.";
      break;
    case 401:
      errorMessage = "Authentication required. Please log in again.";
      break;
    case 403:
      errorMessage =
        "Access denied. You don't have permission to access this resource.";
      break;
    case 429:
      errorMessage =
        "Too many requests. Please wait a moment before trying again.";
      break;
    default:
      errorMessage = `Server error (${response.status}). Please try again later.`;
  }

  const error = new Error(errorMessage);
  (error as Error & { status?: number }).status = response.status;
  (error as Error & { statusText?: string }).statusText = response.statusText;
  return error;
};

export const logRefundError = async (response: Response): Promise<void> => {
  try {
    const errorText = await response.clone().text();
    alert(
      `REFUND ERROR:\nStatus: ${response.status}\nResponse: ${errorText}`
    );
  } catch {}
};
