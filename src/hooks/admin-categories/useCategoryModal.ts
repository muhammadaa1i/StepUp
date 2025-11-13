"use client";

import { useState, useCallback } from "react";
import { Category } from "@/types";
import { CategoryFormData } from "./types";

export function useCategoryModal() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({ 
    name: "", 
    description: "", 
    is_active: true 
  });

  const openCreateModal = useCallback(() => {
    setShowCreateModal(true);
    setEditingCategory(null);
    setFormData({ name: "", description: "", is_active: true });
  }, []);

  const openEditModal = useCallback((category: Category) => {
    setEditingCategory(category);
    setShowCreateModal(false);
    setFormData({ 
      name: category.name, 
      description: category.description, 
      is_active: category.is_active 
    });
  }, []);

  const closeModal = useCallback(() => {
    setShowCreateModal(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "", is_active: true });
  }, []);

  return {
    showCreateModal,
    editingCategory,
    formData,
    setFormData,
    openCreateModal,
    openEditModal,
    closeModal,
  };
}
