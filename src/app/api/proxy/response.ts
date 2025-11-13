export async function parseUpstream(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (response.status === 204) return {} as Record<string, unknown>;
  if (contentType.includes("application/json")) {
    try { return await response.json(); } catch { return {}; }
  }
  try {
    const text = await response.text();
    return text ? { raw: text } : {};
  } catch {
    return {};
  }
}

export async function errorFromUpstream(response: Response, url: string) {
  const base: Record<string, unknown> = {
    error: `API Error: ${response.status} ${response.statusText}`,
    url,
    requestId: Math.random().toString(36).slice(2, 11),
  };
  try {
    const ct = response.headers.get("content-type") || "";
    const text = await response.text();
    if (ct.includes("application/json")) {
      const json = JSON.parse(text);
      return { ...base, ...json };
    }
    return { ...base, details: text };
  } catch {
    return base;
  }
}
