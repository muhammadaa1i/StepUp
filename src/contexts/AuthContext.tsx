"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useRef } from "react";
import { User, LoginRequest, RegisterRequest } from "@/types";
import { useI18n } from "@/i18n";
import { clearAuthData } from "./auth/authStorage";
import { createAuthOperations } from "./auth/authOperations";
import { useAuthInit } from "./auth/useAuthInit";
import { useAuthEvents } from "./auth/useAuthEvents";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  forgotPassword: (payload: { name: string; password?: string; confirm_password?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenVerificationRef = useRef<boolean>(false);
  const { t } = useI18n();

  const isAuthenticated = useMemo(() => !!user, [user]);

  const setTokenVerified = useCallback((verified: boolean) => {
    tokenVerificationRef.current = verified;
  }, []);

  const clearAuth = useCallback(() => {
    clearAuthData();
    setUser(null);
    setTokenVerified(false);
  }, [setTokenVerified]);

  // Initialize auth
  useAuthInit({
    setUser,
    setIsLoading,
    setTokenVerified,
    clearAuthData: clearAuth,
  });

  // Setup event listeners
  useAuthEvents({ setUser, setTokenVerified });

  // Create auth operations
  const operations = createAuthOperations({
    setUser,
    setIsLoading,
    setTokenVerified,
    t,
  });

  const updateUserWrapper = useCallback((userData: Partial<User>) => {
    if (user) {
      operations.updateUser(user, userData);
    }
  }, [user, operations]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      login: operations.login,
      register: operations.register,
      forgotPassword: operations.forgotPassword,
      logout: operations.logout,
      updateUser: updateUserWrapper,
    }),
    [user, isLoading, isAuthenticated, operations, updateUserWrapper]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
