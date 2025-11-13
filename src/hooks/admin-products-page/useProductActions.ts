"use client";

import { useCallback } from "react";
import { useI18n } from "@/i18n";
import { toast } from "react-toastify";
import { useConfirm } from "@/components/ui/ConfirmDialog";
import { AdminProductService } from "@/services/adminProductService";
import { Slipper } from "@/types";
import { ProductFormData, PaginationState } from "./types";

export function useProductActions(
  products: Slipper[],
  setProducts: (updater: (prev: Slipper[]) => Slipper[]) => void,
  pagination: PaginationState,
  setPagination: (updater: (prev: PaginationState) => PaginationState) => void,
  fetchProducts: () => Promise<void>,
  handlePageChange: (page: number) => void
) {
  const { t } = useI18n();
  const confirm = useConfirm();

  const handleDeleteProduct = useCallback(
    async (productId: number) => {
      const prod = products.find((p) => p.id === productId);
      const displayName = prod?.name || `#${productId}`;
      const ok = await confirm({
        title: displayName,
        message: t("common.deleteQuestion"),
        confirmText: t("common.delete"),
        cancelText: t("common.cancel"),
        variant: "danger",
      });
      if (!ok) return;

      const originalIndex = products.findIndex((p) => p.id === productId);
      const originalProduct = products[originalIndex];
      const wasLastItemOnPage = products.length === 1 && pagination.page > 1;
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      setPagination((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
      try {
        await AdminProductService.remove(productId);
        toast.success(t("admin.products.toasts.deleteSuccess"), { autoClose: 2000 });
        if (wasLastItemOnPage) handlePageChange(pagination.page - 1);
      } catch (error) {
        const status = (error as { status?: number })?.status;
        if (status === 404) {
          toast.warn(t("admin.products.toasts.deleteAlreadyRemoved"), { autoClose: 2000 });
        } else {
          toast.error(t("admin.products.toasts.deleteError"), { autoClose: 2000 });
          if (originalProduct) {
            setProducts((prev) => {
              const next = [...prev];
              if (originalIndex >= 0 && originalIndex <= next.length) next.splice(originalIndex, 0, originalProduct);
              else next.unshift(originalProduct);
              return next;
            });
            setPagination((prev) => ({ ...prev, total: prev.total + 1 }));
          } else {
            fetchProducts();
          }
        }
      }
    },
    [confirm, products, pagination.page, t, fetchProducts, setProducts, setPagination, handlePageChange]
  );

  const handleToggleAvailable = async (product: Slipper) => {
    const newAvailability = !product.is_available;
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, is_available: newAvailability } : p)));
    try {
      await AdminProductService.toggleAvailable(product.id, newAvailability);
      toast.success(t("admin.products.toasts.statusUpdateSuccess"), { autoClose: 2000 });
    } catch {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, is_available: product.is_available } : p)));
      toast.error(t("admin.products.toasts.statusUpdateError"), { autoClose: 2000 });
    }
  };

  return {
    handleDeleteProduct,
    handleToggleAvailable,
  };
}
