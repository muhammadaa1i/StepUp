/**
 * Simplified error extraction
 */

import { extractValidationErrors, extractFieldErrors } from "./errorParsers";
import { normalizeErrorMessage } from "./errorDetectors";

interface ErrorPayload {
  detail?: string | unknown[];
  message?: string;
  error?: string;
  [key: string]: unknown;
}

export function extractErrorMessage(payload: unknown, fallback = "Error"): string {
  if (!payload || typeof payload !== "object") return fallback;
  
  const errorPayload = payload as ErrorPayload;
  
  // Fast path: plain detail string
  if (typeof errorPayload.detail === "string") {
    return errorPayload.detail;
  }
  
  // FastAPI / Pydantic style: detail is an array
  if (Array.isArray(errorPayload.detail)) {
    const validationError = extractValidationErrors(errorPayload.detail);
    if (validationError) return validationError;
  }
  
  // Check message field
  if (typeof errorPayload.message === "string") {
    return normalizeErrorMessage(errorPayload.message);
  }
  
  // Check error field
  if (typeof errorPayload.error === "string") {
    return normalizeErrorMessage(errorPayload.error);
  }
  
  // Field-specific errors
  const fieldError = extractFieldErrors(errorPayload);
  if (fieldError) return fieldError;
  
  return fallback;
}

export { isDuplicateUserError, isDuplicateNameError } from "./errorDetectors";
