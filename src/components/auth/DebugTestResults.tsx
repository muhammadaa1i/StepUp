"use client";
import React from "react";

interface DebugTestResultsProps {
  testResults: Record<string, string>;
}

export default function DebugTestResults({ testResults }: DebugTestResultsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Test Results</h2>
      {Object.keys(testResults).length === 0 ? (
        <p className="text-gray-500">Run tests to see results</p>
      ) : (
        <div className="space-y-2">
          {Object.entries(testResults).map(([test, result]) => (
            <div key={test} className="p-3 bg-gray-50 rounded">
              <strong>{test}:</strong> {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
