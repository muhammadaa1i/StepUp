"use client";
import React from "react";
import { Images, ImagePlus } from "lucide-react";
import ImagePreviewList from "./ImagePreviewList";
import UploadProgress from "./UploadProgress";

interface ProductImageUploadProps {
  t: (key: string, params?: Record<string, string>) => string;
  editingProduct: boolean;
  multiImageFiles: FileList | null;
  setMultiImageFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  multiImagePreviews: string[];
  setMultiImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  uploading: boolean;
  uploadProgress: { current: number; total: number } | null;
}

export default function ProductImageUpload({
  t,
  editingProduct,
  multiImageFiles,
  setMultiImageFiles,
  multiImagePreviews,
  setMultiImagePreviews,
  uploading,
  uploadProgress,
}: ProductImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setMultiImageFiles(files);

    // Clean up old previews
    multiImagePreviews.forEach((url) => URL.revokeObjectURL(url));

    if (files && files.length > 0) {
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setMultiImagePreviews(previews);
    } else {
      setMultiImagePreviews([]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-800 flex items-center space-x-2">
        <ImagePlus className="h-4 w-4 text-emerald-600" />
        <span>{t("admin.products.images.section")}</span>
      </h3>

      <div className="text-xs text-gray-500 bg-emerald-50 p-2 rounded">
        📁 {t("admin.products.images.recommendation")}
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600 mb-1 flex items-center space-x-1">
          <Images className="h-4 w-4 text-emerald-600" />
          <span>{t("admin.products.images.multiple")}</span>
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border file:border-gray-300 file:text-xs file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50"
        />

        {multiImageFiles && multiImageFiles.length > 0 && (
          <ImagePreviewList
            files={multiImageFiles}
            previews={multiImagePreviews}
            t={t}
          />
        )}
      </div>

      <UploadProgress
        isUploading={uploading}
        progress={uploadProgress}
        t={t}
      />

      {!editingProduct && (
        <p className="text-xs text-gray-500">
          {t("admin.products.images.willUploadAfterCreate")}
        </p>
      )}
    </div>
  );
}
