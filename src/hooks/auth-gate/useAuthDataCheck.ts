import Cookies from "js-cookie";

export function useAuthDataCheck() {
  const hasAnyAuthData =
    typeof window !== "undefined" &&
    (!!Cookies.get("access_token") ||
      !!Cookies.get("user") ||
      !!localStorage.getItem("auth_token") ||
      !!localStorage.getItem("user"));

  return { hasAnyAuthData };
}
