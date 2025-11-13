import { NextRequest } from "next/server";
import { withCorsJson } from "./cors";

export async function testLoginIfEnabled(request: NextRequest, endpoint: string) {
  const useTestData = process.env.USE_TEST_AUTH === "true";
  if (endpoint !== "/auth/login" || !useTestData) return null;
  try {
    const body = await request.json();
    if (body.name === "admin" && body.password === "password") {
      return withCorsJson({
        access_token: "test_access_token",
        refresh_token: "test_refresh_token",
        user: {
          id: 1,
          name: "admin",
          surname: "Administrator",
          phone_number: "+1234567890",
          is_admin: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      });
    }
    return withCorsJson({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return withCorsJson({ error: "Invalid request body" }, { status: 400 });
  }
}
