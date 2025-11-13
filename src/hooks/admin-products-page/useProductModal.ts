"use client";

import { useState, useRef } from "react";
import { Slipper } from "@/types";
import { ProductFormData } from "./types";

export function useProductModal() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Slipper | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    size: "",
    price: "",
    quantity: "",
    is_available: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const refreshLockRef = useRef(false);

  const resetForm = () => {
    setFormData({ name: "", size: "", price: "", quantity: "", is_available: true });
    setEditingProduct(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (product: Slipper) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      size: product.size || "",
      price: String(product.price ?? ""),
      quantity: String(product.quantity ?? ""),
      is_available: product.is_available !== false,
    });
    setShowModal(true);
  };

  return {
    showModal,
    setShowModal,
    editingProduct,
    setEditingProduct,
    formData,
    setFormData,
    isSaving,
    setIsSaving,
    refreshLockRef,
    resetForm,
    openCreateModal,
    openEditModal,
  };
}
