"use client";
import React from "react";

interface UploadProgressProps {
  isUploading: boolean;
  progress: { current: number; total: number } | null;
  t: (key: string, params?: Record<string, string>) => string;
}

export default function UploadProgress({
  isUploading,
  progress,
  t,
}: UploadProgressProps) {
  if (!isUploading) return null;

  return (
    <div className="text-xs text-emerald-600 flex flex-col space-y-1">
      <span>{t("admin.products.images.uploading")}</span>
      {progress && (
        <>
          <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
            <div
              className="bg-emerald-600 h-2 transition-all"
              style={{
                width: `${(progress.current / progress.total) * 100}%`,
              }}
            />
          </div>
          <span className="text-[10px] text-gray-500">
            {t("admin.products.images.progress", {
              current: progress.current.toString(),
              total: progress.total.toString(),
            })}
          </span>
        </>
      )}
    </div>
  );
}
