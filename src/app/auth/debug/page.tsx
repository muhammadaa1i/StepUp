"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAuthDebugInfo, logAuthStatus } from "@/lib/authDebug";
import DebugStatus from "@/components/auth/DebugStatus";
import DebugInfo from "@/components/auth/DebugInfo";
import DebugTestActions from "@/components/auth/DebugTestActions";
import DebugTestResults from "@/components/auth/DebugTestResults";

export default function AuthDebugPage() {
  const { user, isAuthenticated } = useAuth();
  const [debugInfo, setDebugInfo] = useState<ReturnType<typeof getAuthDebugInfo> | null>(null);
  const [testResults, setTestResults] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshDebugInfo();
  }, [user, isAuthenticated]);

  const refreshDebugInfo = () => {
    const info = getAuthDebugInfo();
    setDebugInfo(info);
    logAuthStatus();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Authentication Debug Console</h1>

      <DebugStatus isAuthenticated={isAuthenticated} user={user} debugInfo={debugInfo} />

      <DebugInfo debugInfo={debugInfo} onRefresh={refreshDebugInfo} />

      <DebugTestActions
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setTestResults={setTestResults}
        onRefresh={refreshDebugInfo}
      />

      <DebugTestResults testResults={testResults} />
    </div>
  );
}