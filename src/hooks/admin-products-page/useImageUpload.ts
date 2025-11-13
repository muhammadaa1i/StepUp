"use client";

import Cookies from "js-cookie";
import { API_ENDPOINTS, API_BASE_URL } from "@/lib/constants";
import { AdminProductService } from "@/services/adminProductService";
import { Slipper } from "@/types";

export function useImageUpload(
  editingProduct: Slipper | null,
  multiImageFiles: FileList | null,
  multiImagePreviews: string[],
  setUploading: (val: boolean) => void,
  setUploadProgress: (val: { current: number; total: number } | null) => void,
  setMultiImageFiles: (val: FileList | null) => void,
  setMultiImagePreviews: (val: string[]) => void,
  setProducts: (updater: (prev: Slipper[]) => Slipper[]) => void,
  setEditingImages: (updater: (prev: any[]) => any[]) => void,
  fetchProducts: () => Promise<void>,
  fetchEditingImages: (id: number) => Promise<void>
) {
  const handleImageUploads = async (id: number) => {
    try {
      setUploading(true);
      setUploadProgress(null);
      let uploadSuccess = false;

      const SUPPORTED_FORMATS = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/bmp",
        "image/tiff",
        "image/tif",
        "image/svg+xml",
        "image/avif",
        "image/heic",
        "image/heif",
        "image/ico",
        "image/x-icon",
      ];

      const validateImageFile = (file: File): boolean => {
        if (!SUPPORTED_FORMATS.includes(file.type.toLowerCase()) && !file.type.startsWith("image/")) {
          console.warn(`Unsupported format: ${file.type}. Attempting upload anyway...`);
        }
        return true;
      };

      if (multiImageFiles) {
        for (let i = 0; i < multiImageFiles.length; i++) {
          if (!validateImageFile(multiImageFiles[i])) return;
        }
      }

      if (multiImageFiles && multiImageFiles.length) {
        if (!editingProduct) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        const fd = new FormData();
        Array.from(multiImageFiles).forEach((file, index) => {
          fd.append("images", file, file.name || `image_${index}.jpg`);
        });
        try {
          const proxyUrl = `/api/proxy?endpoint=${encodeURIComponent(API_ENDPOINTS.SLIPPER_UPLOAD_IMAGES(id))}`;
          const headers: Record<string, string> = {};
          const token = Cookies.get("access_token");
          if (token) headers.Authorization = `Bearer ${token}`;
          const resp = await fetch(proxyUrl, { method: "POST", body: fd, headers });
          if (!resp.ok) {
            const txt = await resp.text();
            console.error("Multi image upload failed:", resp.status, txt);
            if (!editingProduct) {
              const directUrl = `${API_BASE_URL}${API_ENDPOINTS.SLIPPER_UPLOAD_IMAGES(id)}`;
              const directResp = await fetch(directUrl, { method: "POST", body: fd, headers });
              if (directResp.ok) uploadSuccess = true;
              else console.error("Direct API upload also failed:", directResp.status, await directResp.text());
            }
          } else {
            uploadSuccess = true;
          }
        } catch (e) {
          console.error("Multi image upload network error:", e);
          if (!editingProduct) {
            try {
              const directUrl = `${API_BASE_URL}${API_ENDPOINTS.SLIPPER_UPLOAD_IMAGES(id)}`;
              const token = Cookies.get("access_token");
              const directResp = await fetch(directUrl, {
                method: "POST",
                body: fd,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
              });
              if (directResp.ok) uploadSuccess = true;
            } catch (retryError) {
              console.error("Direct API retry also failed:", retryError);
            }
          }
        }
      }

      if (uploadSuccess) {
        window.dispatchEvent(new CustomEvent("refreshProductImages", { detail: { productId: id, global: true } }));
      }

      if (uploadSuccess && editingProduct) {
        await fetchEditingImages(editingProduct.id);
        try {
          const { items } = await AdminProductService.list({ include_images: true });
          setProducts(() => items);
          setTimeout(() => {
            try {
              setProducts(() => [...items]);
            } catch {}
          }, 100);
          const updatedProduct = items.find((p) => p.id === editingProduct.id);
          if (updatedProduct && (updatedProduct as any).images) {
            setEditingImages(() =>
              (updatedProduct as any).images.map((img: any) => ({
                id: img.id,
                image_url: img.image_path,
                is_primary: img.is_primary || false,
                alt_text: img.alt_text,
              }))
            );
          }
          setTimeout(() => {
            setProducts(() => [...items]);
          }, 100);
        } catch (error) {
          console.error("Error in immediate refresh:", error);
          await fetchProducts();
        }
      }
    } catch (e) {
      console.error("Image upload failed:", e);
    } finally {
      try {
        setUploading(false);
        setMultiImageFiles(null);
        setUploadProgress(null);
        multiImagePreviews.forEach((url) => {
          try {
            URL.revokeObjectURL(url);
          } catch {}
        });
        setMultiImagePreviews([]);
      } catch (cleanupError) {
        console.error("Error in image upload cleanup:", cleanupError);
      }
    }
  };

  return {
    handleImageUploads,
  };
}
