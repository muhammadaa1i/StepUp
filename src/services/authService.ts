// Lightweight auth service; split helpers into modules
import { AuthEndpoints } from "@/lib/api/endpoints";
import { LoginRequest, RegisterRequest, AuthResponse } from "@/types";
import { post, postNoRetry } from "./auth/http";
import { unwrap } from "./auth/unwrap";
import { tokenStorage as TS } from "./auth/tokenStorage";

export const AuthService = {
  async login(creds: LoginRequest): Promise<AuthResponse> {
    const data = unwrap<AuthResponse>(await post(AuthEndpoints.LOGIN, creds));
    if (!data.access_token || !data.refresh_token) {
      throw new Error("Bad auth response");
    }
    TS.set(data.access_token, data.refresh_token);
    return data;
  },

  async register(user: RegisterRequest): Promise<AuthResponse> {
    const data = unwrap<AuthResponse>(await post(AuthEndpoints.REGISTER, user));
    if (!data.access_token || !data.refresh_token) {
      throw new Error("Bad register response");
    }
    TS.set(data.access_token, data.refresh_token);
    return data;
  },

  async refreshToken(): Promise<{ access_token: string }> {
    const rt = TS.refresh();
    if (!rt) throw new Error("No refresh token");
    const res = await post(AuthEndpoints.REFRESH, {
      refresh_token: rt,
      refreshToken: rt,
    });
    const { access_token } = unwrap<{ access_token?: string }>(res);
    if (!access_token) throw new Error("Bad refresh response");
    TS.set(access_token, TS.refresh() || rt);
    return { access_token };
  },

  async logout(): Promise<void> {
    try {
      await postNoRetry(AuthEndpoints.LOGOUT);
    } catch {}
    TS.clear();
  },

  async forgotPassword(payload: {
    name: string;
    password?: string;
    confirm_password?: string;
  }): Promise<void> {
    await post(AuthEndpoints.FORGOT_PASSWORD, payload);
  },

  isAuthenticated(): boolean {
    return !!(TS.access() || TS.refresh());
  },

  getAccessToken(): string | undefined {
    return TS.access();
  },

  clearAuth(): void {
    TS.clear();
  },
};

export default AuthService;
