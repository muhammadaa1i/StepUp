"use client";

import { useCallback } from "react";
import { Category } from "@/types";
import adminCategoryService from "@/services/adminCategoryService";
import { toast } from "react-toastify";
import { CategoryFormData } from "./types";

export function useCategoryActions(
  fetchCategories: () => Promise<void>,
  closeModal: () => void
) {
  const createCategory = useCallback(async (data: CategoryFormData) => {
    await adminCategoryService.create(data);
    toast.success("Категория успешно создана");
    closeModal();
    fetchCategories();
  }, [closeModal, fetchCategories]);

  const updateCategory = useCallback(async (id: number, data: CategoryFormData) => {
    await adminCategoryService.update(id, data);
    toast.success("Категория успешно обновлена");
    closeModal();
    fetchCategories();
  }, [closeModal, fetchCategories]);

  const deleteCategory = useCallback(async (id: number) => {
    await adminCategoryService.delete(id);
    toast.success("Категория успешно удалена");
    fetchCategories();
  }, [fetchCategories]);

  const toggleActive = useCallback(async (category: Category) => {
    await adminCategoryService.toggleActive(category);
    toast.success("Статус категории обновлен");
    fetchCategories();
  }, [fetchCategories]);

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    toggleActive,
  };
}
