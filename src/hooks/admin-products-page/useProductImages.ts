"use client";

import { useState } from "react";
import { useI18n } from "@/i18n";
import { toast } from "react-toastify";
import { AdminProductService } from "@/services/adminProductService";
import { ProductImage } from "./types";

export function useProductImages(_editingProductId: number | null) {
  const { t } = useI18n();
  const [multiImageFiles, setMultiImageFiles] = useState<FileList | null>(null);
  const [multiImagePreviews, setMultiImagePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [editingImages, setEditingImages] = useState<ProductImage[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [deletingImageIds, setDeletingImageIds] = useState<number[]>([]);

  const fetchEditingImages = async (slipperId: number) => {
    setEditingImages([]);
    try {
      setLoadingImages(true);
      const data = await AdminProductService.getImages(slipperId);
      if (Array.isArray(data)) {
        setEditingImages(
          data.map((d) => ({
            id: d.id,
            image_url: d.image_url,
            is_primary: d.is_primary,
            alt_text: d.alt_text,
          }))
        );
      }
    } catch (error) {
      console.error("Failed to load images:", error);
      toast.error(t("admin.products.images.uploadError"), { autoClose: 2000 });
    } finally {
      setLoadingImages(false);
    }
  };

  const resetImageState = () => {
    setMultiImageFiles(null);
    setEditingImages([]);
    multiImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setMultiImagePreviews([]);
  };

  return {
    multiImageFiles,
    setMultiImageFiles,
    multiImagePreviews,
    setMultiImagePreviews,
    uploading,
    setUploading,
    uploadProgress,
    setUploadProgress,
    editingImages,
    setEditingImages,
    loadingImages,
    deletingImageIds,
    setDeletingImageIds,
    fetchEditingImages,
    resetImageState,
  };
}
