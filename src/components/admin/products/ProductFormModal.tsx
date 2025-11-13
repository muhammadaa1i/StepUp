"use client";
import React from "react";
import { X } from "lucide-react";
import { Slipper } from "@/types";
import ProductFormFields from "./ProductFormFields";
import ProductImageUpload from "./ProductImageUpload";
import ProductExistingImages from "./ProductExistingImages";

interface ProductFormModalProps {
  t: (key: string, params?: Record<string, string>) => string;
  isOpen: boolean;
  onClose: (skipRefresh?: boolean) => void;
  isSaving: boolean;
  editingProduct: Slipper | null;
  formData: { name: string; size: string; price: string; quantity: string; is_available: boolean };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; size: string; price: string; quantity: string; is_available: boolean }>>;
  onSave: () => void;
  // images
  multiImageFiles: FileList | null;
  setMultiImageFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  multiImagePreviews: string[];
  setMultiImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  uploading: boolean;
  uploadProgress: { current: number; total: number } | null;
  editingImages: Array<{ id: number; image_url: string; is_primary?: boolean; alt_text?: string }>;
  loadingImages: boolean;
  deletingImageIds: number[];
  onDeleteExistingImage: (imageId: number) => Promise<void>;
  onSetPrimaryImage: (imageId: number) => Promise<void>;
}

export default function ProductFormModal({ t, isOpen, onClose, isSaving, editingProduct, formData, setFormData, onSave, multiImageFiles, setMultiImageFiles, multiImagePreviews, setMultiImagePreviews, uploading, uploadProgress, editingImages, loadingImages, deletingImageIds, onDeleteExistingImage, onSetPrimaryImage }: ProductFormModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto" onClick={() => onClose()}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto mx-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onClose()} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" aria-label={t('admin.common.close')}>
          <X className="h-5 w-5" />
        </button>
        <div className="p-4 sm:p-6 space-y-5">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingProduct
              ? t('admin.products.form.editTitle')
              : t('admin.products.form.createTitle')}
          </h2>

          <ProductFormFields t={t} formData={formData} setFormData={setFormData} />

          <div className="pt-4 space-y-4 border-t">
            <ProductImageUpload
              t={t}
              editingProduct={!!editingProduct}
              multiImageFiles={multiImageFiles}
              setMultiImageFiles={setMultiImageFiles}
              multiImagePreviews={multiImagePreviews}
              setMultiImagePreviews={setMultiImagePreviews}
              uploading={uploading}
              uploadProgress={uploadProgress}
            />

            {editingProduct && (
              <ProductExistingImages
                t={t}
                editingImages={editingImages}
                loadingImages={loadingImages}
                deletingImageIds={deletingImageIds}
                onDeleteExistingImage={onDeleteExistingImage}
                onSetPrimaryImage={onSetPrimaryImage}
              />
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
            <button
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              disabled={isSaving}
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-60"
              disabled={isSaving}
            >
              {isSaving
                ? t('admin.products.form.buttons.saving')
                : editingProduct
                  ? t('admin.products.form.buttons.update')
                  : t('admin.products.form.buttons.create')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
