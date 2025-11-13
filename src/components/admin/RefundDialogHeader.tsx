"use client";
import React from "react";
import { X, AlertCircle, CheckCircle } from "lucide-react";

interface RefundDialogHeaderProps {
  isSuccess: boolean;
  title: string;
  successTitle: string;
  onClose: () => void;
  isProcessing: boolean;
}

export default function RefundDialogHeader({
  isSuccess,
  title,
  successTitle,
  onClose,
  isProcessing,
}: RefundDialogHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-full ${
            isSuccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {isSuccess ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {isSuccess ? successTitle : title}
        </h3>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        disabled={isProcessing}
      >
        <X className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}
