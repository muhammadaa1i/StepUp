"use client";

import React from "react";
import { Category } from "@/types";
import { Eye, EyeOff, Edit, Trash2, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";

export interface CategoriesTableProps {
  categories: Category[];
  locale: string;
  onToggleActive: (category: Category) => void;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export function CategoriesTable({ categories, locale, onToggleActive, onEdit, onDelete }: CategoriesTableProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <Tag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Категории не найдены</h3>
        <p className="mt-1 text-sm text-gray-500">Попробуйте изменить параметры поиска или создайте новую категорию</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Категория</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <Tag className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">{category.description || "Нет описания"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {category.is_active ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                  {category.is_active ? "Активная" : "Неактивная"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(category.created_at, locale)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => onToggleActive(category)}
                    className={`${category.is_active ? "text-red-600 hover:text-red-900" : "text-green-600 hover:text-green-900"}`}
                    title={category.is_active ? "Деактивировать" : "Активировать"}
                  >
                    {category.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button onClick={() => onEdit(category)} className="text-emerald-600 hover:text-emerald-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete(category.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesTable;
