"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductsTable from "@/components/admin/products/ProductsTable";
import ProductsPagination from "@/components/admin/products/ProductsPagination";
import ProductFormModal from "@/components/admin/products/ProductFormModal";
import useAdminProductsPage from "@/hooks/useAdminProductsPage";

export default function AdminProductsPage() {
  const { t } = useI18n();
  const router = useRouter();

  const {
    // state
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
    // setters
    setFormData,
    setMultiImageFiles,
    setMultiImagePreviews,
    // actions
    handlePageChange,
    openCreateModal,
    openEditModal,
    closeModal,
    handleDeleteExistingImage,
    handleSetPrimaryImage,
    handleDeleteProduct,
    handleToggleAvailable,
    handleSave,
  } = useAdminProductsPage();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('admin.products.title')}</h1>
            <p className="text-gray-600 mt-2">{t('admin.products.subtitle')}</p>
          </div>
          <button onClick={openCreateModal} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>{t('admin.products.add')}</span>
          </button>
        </div>

        <ProductsTable
          products={products}
          isLoading={isLoading}
          t={t}
          onEdit={openEditModal}
          onDelete={handleDeleteProduct}
          onToggleAvailability={handleToggleAvailable}
          navigate={(id) => router.push(`/products/${id}`)}
        />

        <ProductsPagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          count={products.length}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          t={t}
        />

        <ProductFormModal
          t={t}
          isOpen={showModal}
          onClose={closeModal}
          isSaving={isSaving}
          editingProduct={editingProduct}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          multiImageFiles={multiImageFiles}
          setMultiImageFiles={setMultiImageFiles}
          multiImagePreviews={multiImagePreviews}
          setMultiImagePreviews={setMultiImagePreviews}
          uploading={uploading}
          uploadProgress={uploadProgress}
          editingImages={editingImages}
          loadingImages={loadingImages}
          deletingImageIds={deletingImageIds}
          onDeleteExistingImage={handleDeleteExistingImage}
          onSetPrimaryImage={handleSetPrimaryImage}
        />
      </div>
    </AdminLayout>
  );
}
