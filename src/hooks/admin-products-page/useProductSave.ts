"use client";

import { useI18n } from "@/i18n";
import { toast } from "react-toastify";
import { AdminProductService, ProductPayload } from "@/services/adminProductService";
import { Slipper } from "@/types";
import { ProductFormData, PaginationState } from "./types";

export function useProductSave(
  formData: ProductFormData,
  editingProduct: Slipper | null,
  multiImageFiles: FileList | null,
  setIsSaving: (val: boolean) => void,
  setProducts: (updater: (prev: Slipper[]) => Slipper[]) => void,
  setPagination: (updater: (prev: PaginationState) => PaginationState) => void,
  pagination: PaginationState,
  handlePageChange: (page: number) => void,
  handleImageUploads: (id: number) => Promise<void>,
  closeModal: (skipRefresh?: boolean) => void,
  fetchProducts: () => Promise<void>,
  refreshLockRef: React.MutableRefObject<boolean>
) {
  const { t } = useI18n();

  const handleSave = async () => {
    let creationToastShown = false;
    try {
      setIsSaving(true);
      const payload: ProductPayload = {
        name: formData.name.trim(),
        size: formData.size.trim(),
        price: Number(formData.price) || 0,
        quantity: Number(formData.quantity) || 0,
        is_available: formData.is_available,
      };
      if (!payload.name || !payload.price) {
        console.warn("Product validation failed: missing name or price");
        setIsSaving(false);
        return;
      }

      let productId = editingProduct?.id;
      if (editingProduct) {
        await AdminProductService.update(editingProduct.id, payload);
        productId = editingProduct.id;
        toast.success(t("admin.products.toasts.updateSuccess"), { autoClose: 2000 });
        setProducts((prev) => prev.map((p) => (p.id === productId ? ({ ...p, ...payload } as Slipper) : p)));
      } else {
        const created = await AdminProductService.create(payload);
        productId = created.id;
        toast.success(t("admin.products.toasts.createSuccess") || "Product created", { autoClose: 2000 });
        creationToastShown = true;
        if (productId) {
          const newItem: Slipper = {
            ...created,
            ...payload,
            id: productId,
            images: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as Slipper;
          setProducts((prev) => [newItem, ...prev]);
          setPagination((prev) => ({ ...prev, total: prev.total + 1 }));
          setProducts((prev) => {
            const filtered = prev.filter((p) => p.id !== productId);
            return [newItem, ...filtered];
          });
        }
        if (pagination.page !== 1) handlePageChange(1);
      }

      if (productId && multiImageFiles && multiImageFiles.length) {
        if (editingProduct) {
          await handleImageUploads(productId);
          closeModal();
        } else {
          closeModal(true);
          setIsSaving(false);
          if (!creationToastShown) {
            toast.success(t("admin.products.toasts.createSuccess") || "Product created", { autoClose: 2000 });
            creationToastShown = true;
          }
          handleImageUploads(productId)
            .catch((err) => console.error("Background image upload failed:", err))
            .finally(() => {
              if (!refreshLockRef.current) {
                refreshLockRef.current = true;
                fetchProducts().finally(() =>
                  setTimeout(() => {
                    refreshLockRef.current = false;
                  }, 300)
                );
              }
            });
          return;
        }
      } else {
        if (!editingProduct && productId && pagination.page !== 1) {
          handlePageChange(1);
        }
        closeModal(true);
        if (!editingProduct && !creationToastShown && productId) {
          toast.success(t("admin.products.toasts.createSuccess") || "Product created", { autoClose: 2000 });
          creationToastShown = true;
        }
        if (!refreshLockRef.current) {
          refreshLockRef.current = true;
          fetchProducts().finally(() =>
            setTimeout(() => {
              refreshLockRef.current = false;
            }, 300)
          );
        }
        return;
      }
    } catch (e) {
      console.error("Product save failed:", e);
      closeModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    handleSave,
  };
}
