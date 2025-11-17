/**
 * Error message extraction utilities
 */

interface ErrorDetail {
  loc?: unknown[];
  msg?: unknown;
  message?: unknown;
  detail?: unknown;
}

export function extractValidationErrors(details: unknown[]): string | null {
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
    
    if (msgs.length >= 3) break;
  }
  
  return msgs.length ? msgs.join("; ") : null;
}

export function extractFieldErrors(payload: Record<string, unknown>): string | null {
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
}

function friendlyFieldName(raw: string): string {
  const FIELD_NAME_MAP: Record<string, string> = {
    name: "Name",
    phone_number: "Phone number",
    password: "Password",
    email: "Email",
  };
  return FIELD_NAME_MAP[raw] || raw;
}
