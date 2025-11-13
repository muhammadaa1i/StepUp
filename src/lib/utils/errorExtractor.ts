import { FIELD_NAME_MAP } from "./constants";

interface ErrorDetail {
  loc?: unknown[];
  msg?: unknown;
  message?: unknown;
  detail?: unknown;
}

interface ErrorPayload {
  detail?: string | unknown[];
  message?: string;
  error?: string;
  [key: string]: unknown;
}

/**
 * Convert field name to human-friendly format
 */
const friendlyFieldName = (raw: string): string => {
  return FIELD_NAME_MAP[raw] || raw;
};

/**
 * Extract validation errors from FastAPI/Pydantic style error array
 */
const extractValidationErrors = (details: unknown[]): string | null => {
  const msgs: string[] = [];
  
  for (const rawItem of details) {
    const item = rawItem as ErrorDetail;
    if (!item || typeof item !== "object") continue;
    
    const loc = Array.isArray(item.loc) ? item.loc : [];
    const field = loc.find(
      (l): l is string => typeof l === "string" && l !== "body" && l !== "query" && l !== "path"
    );
    const msg = item.msg || item.message || item.detail;
    
    if (msg) {
      if (field) {
        msgs.push(`${friendlyFieldName(String(field))}: ${msg}`);
      } else {
        msgs.push(String(msg));
      }
    }
    
    if (msgs.length >= 3) break; // Limit noise
  }
  
  return msgs.length ? msgs.join("; ") : null;
};

/**
 * Extract field-specific errors from object
 */
const extractFieldErrors = (payload: Record<string, unknown>): string | null => {
  const parts: string[] = [];
  
  for (const [key, value] of Object.entries(payload)) {
    if (Array.isArray(value)) {
      const first = value.find((v) => typeof v === "string");
      if (first) parts.push(`${key}: ${first}`);
    } else if (value && typeof value === "object" && Array.isArray((value as { messages?: unknown[] }).messages)) {
      const first = (value as { messages?: unknown[] }).messages?.find((m) => typeof m === "string");
      if (first) parts.push(`${key}: ${first}`);
    }
    
    if (parts.length >= 3) break;
  }
  
  return parts.length ? parts.join("; ") : null;
};

/**
 * Check if error message indicates duplicate user
 */
const isDuplicateUserError = (msg: string): boolean => {
  return /user with this phone number already exists/i.test(msg);
};

/**
 * Extract human-friendly validation / API error message from various backend shapes
 */
export function extractErrorMessage(payload: unknown, fallback = "Error"): string {
  if (!payload || typeof payload !== "object") return fallback;
  
  const errorPayload = payload as ErrorPayload;
  
  // Fast path: plain detail string
  if (typeof errorPayload.detail === "string") {
    return errorPayload.detail;
  }
  
  // FastAPI / Pydantic style: detail is an array of objects with loc/msg
  if (Array.isArray(errorPayload.detail)) {
    const validationError = extractValidationErrors(errorPayload.detail);
    if (validationError) return validationError;
  }
  
  // Check message field
  if (typeof errorPayload.message === "string") {
    const msg = errorPayload.message;
    if (isDuplicateUserError(msg)) {
      return 'User with this phone number already exists';
    }
    return msg;
  }
  
  // Check error field
  if (typeof errorPayload.error === "string") {
    const err = errorPayload.error;
    if (isDuplicateUserError(err)) {
      return 'User with this phone number already exists';
    }
    return err;
  }
  
  // FastAPI / DRF style: {field: ["msg1", "msg2"], ...}
  const fieldError = extractFieldErrors(errorPayload);
  if (fieldError) return fieldError;
  
  return fallback;
}
