"use client";
import React from "react";
import { getAuthDebugInfo } from "@/lib/authDebug";

interface DebugInfoProps {
  debugInfo: ReturnType<typeof getAuthDebugInfo> | null;
  onRefresh: () => void;
}

export default function DebugInfo({ debugInfo, onRefresh }: DebugInfoProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
      <button
        onClick={onRefresh}
        className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
      >
        Refresh Debug Info
      </button>
    </div>
  );
}
