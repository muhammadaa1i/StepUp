"use client";
import React from "react";
import Image from "next/image";

interface ImagePreviewListProps {
  files: FileList;
  previews: string[];
  t: (key: string, params?: Record<string, string>) => string;
}

export default function ImagePreviewList({
  files,
  previews,
  t,
}: ImagePreviewListProps) {
  return (
    <div className="mt-2 space-y-2">
      <div className="text-xs text-gray-500">
        <p>
          {t("admin.products.images.selectedFiles", {
            count: files.length.toString(),
          })}
        </p>
        <div className="space-y-1 max-h-16 overflow-y-auto">
          {Array.from(files).map((file, index) => (
            <p
              key={index}
              className={`text-xs ${
                file.size > 2 * 1024 * 1024
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}
            >
              {file.name} ({Math.round(file.size / 1024)}KB)
              {file.size > 2 * 1024 * 1024 && " - will compress"}
            </p>
          ))}
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative w-full h-16 border rounded overflow-hidden bg-gray-50"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
