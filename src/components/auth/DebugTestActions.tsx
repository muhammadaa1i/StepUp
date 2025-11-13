"use client";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { modernApiClient } from "@/lib/modernApiClient";
import { API_ENDPOINTS } from "@/lib/constants";
import Cookies from "js-cookie";
import TestButton from "./TestButton";

interface DebugTestActionsProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setTestResults: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onRefresh: () => void;
}

export default function DebugTestActions({
  isLoading,
  setIsLoading,
  setTestResults,
  onRefresh,
}: DebugTestActionsProps) {
  const { login, logout } = useAuth();

  const executeTest = async (
    testName: string,
    testFn: () => Promise<string>
  ) => {
    setIsLoading(true);
    try {
      const result = await testFn();
      setTestResults((prev) => ({ ...prev, [testName]: result }));
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [testName]: `❌ Failed: ${error}`,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const testLogin = () =>
    executeTest("login", async () => {
      await login({ name: "admin", password: "password" });
      return "✅ Success";
    });

  const testCartAccess = () =>
    executeTest("cart", async () => {
      const cartData = await modernApiClient.get(API_ENDPOINTS.CART_ITEMS);
      return `✅ Success: ${JSON.stringify(cartData).substring(0, 100)}...`;
    });

  const clearAuthData = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    logout();
    onRefresh();
    setTestResults({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <TestButton
          onClick={testLogin}
          disabled={isLoading}
          label="Test Login (admin/password)"
          colorClass="bg-green-500"
        />
        <TestButton
          onClick={testCartAccess}
          disabled={isLoading}
          label="Test Cart Access"
          colorClass="bg-emerald-500"
        />
      </div>
      <button
        onClick={clearAuthData}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Clear All Auth Data
      </button>
    </div>
  );
}
