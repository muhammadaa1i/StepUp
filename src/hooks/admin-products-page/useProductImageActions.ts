"use client";

import { useI18n } from "@/i18n";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/ui/ConfirmDialog";
import { AdminProductService } from "@/services/adminProductService";

export function useProductImageActions(
  editingProductId: number | null,
  setEditingImages: (updater: (prev: any[]) => any[]) => void,
  setDeletingImageIds: (updater: (prev: number[]) => number[]) => void
) {
  const { t } = useI18n();
  const confirm = useConfirm();

  const handleDeleteExistingImage = async (imageId: number) => {
    if (!editingProductId) return;
    const ok = await confirm({
      title: "Удалить изображение",
      message: "Удалить это изображение?",
      confirmText: "Удалить",
      cancelText: "Отмена",
      variant: "danger",
    });
    if (!ok) return;
    try {
      setDeletingImageIds((ids) => [...ids, imageId]);
      await AdminProductService.deleteImage(editingProductId, imageId);
      setEditingImages((imgs) => imgs.filter((i) => i.id !== imageId));
      toast.success(t("admin.products.images.deleteSuccess"), { autoClose: 2000 });
    } catch {
      toast.error(t("admin.products.images.deleteError"), { autoClose: 2000 });
    } finally {
      setDeletingImageIds((ids) => ids.filter((id) => id !== imageId));
    }
  };

  const handleSetPrimaryImage = async (imageId: number) => {
    if (!editingProductId) return;
    try {
      await AdminProductService.setPrimaryImage(editingProductId, imageId);
      setEditingImages((imgs) => imgs.map((img) => ({ ...img, is_primary: img.id === imageId })));
      toast.success(t("admin.products.images.setPrimarySuccess"), { autoClose: 2000 });
    } catch {
      toast.error(t("admin.products.images.setPrimaryError"), { autoClose: 2000 });
    }
  };

  return {
    handleDeleteExistingImage,
    handleSetPrimaryImage,
  };
}
