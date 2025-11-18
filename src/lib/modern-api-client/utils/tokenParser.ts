/**
 * Token parsing utilities
 */

interface TokenResult {
  access?: string;
  refresh?: string;
}

export async function parseTokensFromResponse(resp: Response): Promise<TokenResult> {
  let body: Record<string, unknown> = {};
  try {
    body = await resp.clone().json();
  } catch {}

  const headers = resp.headers;
  const access = extractAccessToken(body, headers);
  const refresh = extractRefreshToken(body, headers);

  return { access, refresh };
}

function extractAccessToken(
  body: Record<string, unknown>,
  headers: Headers
): string | undefined {
  let access = (body["access_token"] ||
    body["accessToken"] ||
    body["access"]) as string | undefined;

  if (!access) {
    const authH = headers.get("Authorization") || headers.get("authorization");
    if (authH && /bearer/i.test(authH)) {
      const parts = authH.split(/\s+/);
      if (parts.length === 2) access = parts[1];
    }
  }

  return access;
}

function extractRefreshToken(
  body: Record<string, unknown>,
  headers: Headers
): string | undefined {
  let refresh = (body["refresh_token"] ||
    body["refreshToken"] ||
    body["refresh"]) as string | undefined;
    
  if (!refresh) {
    refresh = headers.get("Refresh-Token") || headers.get("refresh-token") || undefined;
  }

  return refresh;
}
