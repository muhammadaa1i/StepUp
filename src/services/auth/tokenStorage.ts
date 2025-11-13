import Cookies from "js-cookie";

const isSecure = typeof window !== "undefined"
  ? window.location.protocol === "https:"
  : process.env.NODE_ENV === "production";

const cookieOpts = {
  sameSite: "lax" as const,
  secure: isSecure,
  path: "/",
};

export const tokenStorage = {
  set(access: string, refresh: string) {
    Cookies.set("access_token", access, { ...cookieOpts, expires: 7 });
    Cookies.set("refresh_token", refresh, { ...cookieOpts, expires: 30 });
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
      } catch {}
    }
  },
  access(): string | undefined {
    try {
      return (
        Cookies.get("access_token") ||
        ((typeof window !== "undefined" && localStorage.getItem("access_token")) || undefined)
      );
    } catch {
      return Cookies.get("access_token");
    }
  },
  refresh(): string | undefined {
    try {
      return (
        Cookies.get("refresh_token") ||
        ((typeof window !== "undefined" && localStorage.getItem("refresh_token")) || undefined)
      );
    } catch {
      return Cookies.get("refresh_token");
    }
  },
  clear() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user");
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
      } catch {}
    }
  },
};
