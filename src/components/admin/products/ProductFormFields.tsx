"use client";
import React from "react";

interface ProductFormFieldsProps {
  t: (key: string, params?: Record<string, string>) => string;
  formData: {
    name: string;
    size: string;
    price: string;
    quantity: string;
    is_available: boolean;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      size: string;
      price: string;
      quantity: string;
      is_available: boolean;
    }>
  >;
}

export default function ProductFormFields({ t, formData, setFormData }: ProductFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.products.form.fields.name')}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder={t('admin.products.form.fields.namePlaceholder')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.products.form.fields.price')}
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData((f) => ({ ...f, price: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="0"
          min={0}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.products.form.fields.quantity')}
        </label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData((f) => ({ ...f, quantity: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="0"
          min={0}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('admin.products.form.fields.size')}
        </label>
        <input
          type="text"
          value={formData.size}
          onChange={(e) => setFormData((f) => ({ ...f, size: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          placeholder={t('admin.products.form.fields.sizePlaceholder')}
        />
      </div>

      <div className="flex items-center space-x-2 md:col-span-2 mt-2">
        <input
          id="is_available"
          type="checkbox"
          checked={formData.is_available}
          onChange={(e) => setFormData((f) => ({ ...f, is_available: e.target.checked }))}
          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <label htmlFor="is_available" className="text-sm text-gray-700">
          {t('admin.products.form.fields.active')}
        </label>
      </div>
    </div>
  );
}
