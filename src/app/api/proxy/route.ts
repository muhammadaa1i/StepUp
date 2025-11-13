import { NextRequest, NextResponse } from "next/server";
import { proxy, getEndpointOrError, testLoginIfEnabled, CORS_HEADERS } from "./helpers";

export function GET(request: NextRequest) {
  return proxy(request, "GET");
}

export async function POST(request: NextRequest) {
  // Allow test login flow when explicitly enabled
  const ep = getEndpointOrError(request);
  if ("error" in ep) return ep.error;
  const maybeTest = await testLoginIfEnabled(request, ep.endpoint);
  if (maybeTest) return maybeTest;
  return proxy(request, "POST");
}

export function PUT(request: NextRequest) {
  return proxy(request, "PUT");
}

export function DELETE(request: NextRequest) {
  return proxy(request, "DELETE");
}

// Handle preflight requests
export function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS });
}
