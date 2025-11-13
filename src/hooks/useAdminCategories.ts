"use client";

import { useMemo } from "react";
import { useCategoryData } from "./admin-categories/useCategoryData";
import { useCategoryModal } from "./admin-categories/useCategoryModal";
import { useCategoryActions } from "./admin-categories/useCategoryActions";

export type { PaginationState } from "./admin-categories/types";

export function useAdminCategories() {
  // Data fetching and pagination
  const {
    categories,
    isLoading,
    pagination,
    handlePageChange,
    fetchCategories,
  } = useCategoryData();

  // Modal and form state
  const {
    showCreateModal,
    editingCategory,
    formData,
    setFormData,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useCategoryModal();

  // CRUD actions
  const {
    createCategory,
    updateCategory,
    deleteCategory,
    toggleActive,
  } = useCategoryActions(fetchCategories, closeModal);

  return useMemo(() => ({
    categories,
    isLoading,
    pagination,
    handlePageChange,

    // modal + form
    showCreateModal,
    editingCategory,
    formData,
    setFormData,
    openCreateModal,
    openEditModal,
    closeModal,

    // actions
    createCategory,
    updateCategory,
    deleteCategory,
    toggleActive,
  }), [
    categories,
    isLoading,
    pagination,
    handlePageChange,
    showCreateModal,
    editingCategory,
    formData,
    setFormData,
    openCreateModal,
    openEditModal,
    closeModal,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleActive,
  ]);
}

export default useAdminCategories;
