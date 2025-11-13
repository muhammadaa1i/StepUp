"use client";

import { useI18n } from "@/i18n";
import { Slipper } from "@/types";
import { useProductData } from "./admin-products-page/useProductData";
import { useProductModal } from "./admin-products-page/useProductModal";
import { useProductImages } from "./admin-products-page/useProductImages";
import { useProductImageActions } from "./admin-products-page/useProductImageActions";
import { useImageUpload } from "./admin-products-page/useImageUpload";
import { useProductActions } from "./admin-products-page/useProductActions";
import { useProductSave } from "./admin-products-page/useProductSave";

export type { PaginationState, ProductFormData } from "./admin-products-page/types";

export function useAdminProductsPage() {
  const { t } = useI18n();

  // Data fetching & pagination
  const { products, setProducts, isLoading, pagination, setPagination, fetchProducts, handlePageChange } =
    useProductData();

  // Modal & form state
  const {
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
  } = useProductModal();

  // Image management
  const {
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
  } = useProductImages(editingProduct?.id ?? null);

  // Custom edit modal opener that also fetches images
  const openEditModalWithImages = (product: Slipper) => {
    openEditModal(product);
    fetchEditingImages(product.id);
  };

  // Close modal handler
  const closeModal = (skipRefresh = false) => {
    setShowModal(false);
    resetForm();
    resetImageState();
    if (!skipRefresh && !refreshLockRef.current) {
      refreshLockRef.current = true;
      setTimeout(() => {
        fetchProducts().finally(() =>
          setTimeout(() => {
            refreshLockRef.current = false;
          }, 200)
        );
      }, 80);
    }
  };

  // Image actions
  const { handleDeleteExistingImage, handleSetPrimaryImage } = useProductImageActions(
    editingProduct?.id ?? null,
    setEditingImages,
    setDeletingImageIds
  );

  // Image upload
  const { handleImageUploads } = useImageUpload(
    editingProduct,
    multiImageFiles,
    multiImagePreviews,
    setUploading,
    setUploadProgress,
    setMultiImageFiles,
    setMultiImagePreviews,
    setProducts,
    setEditingImages,
    fetchProducts,
    fetchEditingImages
  );

  // Product actions
  const { handleDeleteProduct, handleToggleAvailable } = useProductActions(
    products,
    setProducts,
    pagination,
    setPagination,
    fetchProducts,
    handlePageChange
  );

  // Product save
  const { handleSave } = useProductSave(
    formData,
    editingProduct,
    multiImageFiles,
    setIsSaving,
    setProducts,
    setPagination,
    pagination,
    handlePageChange,
    handleImageUploads,
    closeModal,
    fetchProducts,
    refreshLockRef
  );

  return {
    t,
    products,
    isLoading,
    pagination,
    showModal,
    editingProduct,
    formData,
    isSaving,
    multiImageFiles,
    multiImagePreviews,
    uploading,
    uploadProgress,
    editingImages,
    loadingImages,
    deletingImageIds,
    setFormData,
    setShowModal,
    setMultiImageFiles,
    setMultiImagePreviews,
    fetchProducts,
    handlePageChange,
    openCreateModal,
    openEditModal: openEditModalWithImages,
    closeModal,
    handleDeleteExistingImage,
    handleSetPrimaryImage,
    handleDeleteProduct,
    handleToggleAvailable,
    handleSave,
  };
}

export default useAdminProductsPage;
