export const createErrorFromResponse = async (response: Response): Promise<Error> => {
  let errorMessage = `HTTP error! status: ${response.status}`;
  let backendMessage: string | null = null;

  // Try to extract backend error message
  try {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const errorData = await response.clone().json();
      
      // Extract message from various backend formats
      if (typeof errorData.detail === 'string') {
        backendMessage = errorData.detail;
      } else if (typeof errorData.message === 'string') {
        backendMessage = errorData.message;
      } else if (typeof errorData.error === 'string') {
        backendMessage = errorData.error;
      } else if (Array.isArray(errorData.detail) && errorData.detail.length > 0) {
        // Handle FastAPI validation errors
        const firstError = errorData.detail[0];
        if (firstError.msg) {
          backendMessage = firstError.msg;
        }
      }
    }
  } catch (parseError) {
    // If we can't parse the response, fall through to default messages
    console.error("Failed to parse error response:", parseError);
  }

  // Use backend message if available, otherwise use default messages
  if (backendMessage) {
    errorMessage = backendMessage;
  } else {
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
        errorMessage = "Incorrect name or password"; // More user-friendly message
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
  }

  const error = new Error(errorMessage);
  (error as Error & { status?: number }).status = response.status;
  (error as Error & { statusText?: string }).statusText = response.statusText;
  (error as Error & { response?: { data?: unknown } }).response = { 
    data: backendMessage ? { detail: backendMessage } : undefined 
  };
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
