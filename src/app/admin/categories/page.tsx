"use client";

import React, { useEffect, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useConfirm } from "@/components/ui/ConfirmDialog";
import { useI18n } from "@/i18n";
import CategoriesTable from "@/components/admin/categories/CategoriesTable";
import CategoryFormModal from "@/components/admin/categories/CategoryFormModal";
import useAdminCategories from "@/hooks/useAdminCategories";
import type { Category } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminCategoriesPage() {
  const { locale } = useI18n();
  const confirm = useConfirm();

  const {
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
  } = useAdminCategories();

  // Lock body scroll when any modal open (UX parity with previous implementation)
  useEffect(() => {
    if (showCreateModal || editingCategory) {
      const original = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = original;
      };
    }
  }, [showCreateModal, editingCategory]);

  const onDelete = useMemo(() => {
    return async (id: number) => {
      const ok = await confirm({
        title: "Удалить категорию",
        message:
          "Вы уверены, что хотите удалить эту категорию? Это действие нельзя отменить.",
        confirmText: "Удалить",
        cancelText: "Отмена",
        variant: "danger",
      });
      if (!ok) return;
      await deleteCategory(id);
    };
  }, [confirm, deleteCategory]);

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;
    return (
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-gray-600">
          Показано {categories.length} из {pagination.total} категорий
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || isLoading}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-2 rounded-md border border-gray-300 ${
                    pagination.page === pageNumber
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "hover:bg-gray-50"
                  }`}
                  disabled={isLoading}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages || isLoading}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Управление категориями</h1>
            <p className="text-gray-600 mt-2">Просмотр и управление категориями товаров</p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
          >
            <span>Добавить категорию</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <CategoriesTable
              categories={categories}
              locale={locale}
              onToggleActive={(c: Category) => toggleActive(c)}
              onEdit={(c: Category) => openEditModal(c)}
              onDelete={(id: number) => onDelete(id)}
            />
          )}
        </div>

        {renderPagination()}

        <CategoryFormModal
          isOpen={showCreateModal}
          category={editingCategory}
          form={formData}
          setForm={setFormData}
          onClose={closeModal}
          onSubmit={(data) =>
            editingCategory ? updateCategory(editingCategory.id, data) : createCategory(data)
          }
        />
      </div>
    </AdminLayout>
  );
}
