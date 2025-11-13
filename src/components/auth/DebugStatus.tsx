"use client";
import React from "react";
import { User } from "@/types";
import { getAuthDebugInfo } from "@/lib/authDebug";

interface DebugStatusProps {
  isAuthenticated: boolean;
  user: User | null;
  debugInfo: ReturnType<typeof getAuthDebugInfo> | null;
}

export default function DebugStatus({ isAuthenticated, user, debugInfo }: DebugStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Current Auth Status</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>
            <strong>Authenticated:</strong> {isAuthenticated ? "✅ Yes" : "❌ No"}
          </p>
          <p>
            <strong>User:</strong> {user ? `${user.name} (ID: ${user.id})` : "None"}
          </p>
        </div>
        <div>
          <p>
            <strong>Cookie Token:</strong>{" "}
            {debugInfo?.hasCookie ? "✅ Present" : "❌ Missing"}
          </p>
          <p>
            <strong>LocalStorage Token:</strong>{" "}
            {debugInfo?.hasLocalStorage ? "✅ Present" : "❌ Missing"}
          </p>
        </div>
      </div>
    </div>
  );
}
