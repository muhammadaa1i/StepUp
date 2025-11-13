import { NextResponse } from "next/server";

export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function withCorsJson(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data as unknown as Record<string, unknown>, {
    ...init,
    headers: { ...CORS_HEADERS, ...(init?.headers as Record<string, string> | undefined) },
  });
}

export function errorJson(message: string, status = 500, extra?: Record<string, unknown>) {
  return withCorsJson({ error: message, ...(extra || {}) }, { status });
}
