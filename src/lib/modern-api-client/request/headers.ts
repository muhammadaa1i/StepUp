import Cookies from "js-cookie";

export const buildHeaders = (
  optionHeaders?: HeadersInit
): Record<string, string> => {
  let token = Cookies.get("access_token");

  if (!token && typeof window !== "undefined") {
    try {
      token = localStorage.getItem("access_token") || undefined;
    } catch {}
  }

  const defaultHeaders: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  return {
    ...defaultHeaders,
    ...(optionHeaders as Record<string, string>),
  };
};
