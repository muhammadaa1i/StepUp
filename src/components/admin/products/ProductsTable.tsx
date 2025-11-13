"use client";
import React, { useState } from "react";
import { Slipper } from "@/types";
import ProductRow from "@/components/admin/products/ProductRow";
import { Package } from "lucide-react";

interface ProductsTableProps {
  products: Slipper[];
  isLoading: boolean;
  t: (key: string, params?: Record<string, string>) => string;
  onEdit: (p: Slipper) => void;
  onDelete: (id: number) => void;
  onToggleAvailability: (p: Slipper) => void;
  navigate: (id: number) => void;
}

const LoadingTable: React.FC = () => <div className="p-6 text-sm text-gray-500">Loading…</div>;

export default function ProductsTable({ products, isLoading, t, onEdit, onDelete, onToggleAvailability, navigate }: ProductsTableProps) {
  const [imageIndexMap, setImageIndexMap] = useState<Record<number, number>>({});

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {isLoading ? (
        <LoadingTable />
      ) : products.length > 0 ? (
        <div className="block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="hidden md:table-header-group bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.products.table.product')}
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider hidden xs:table-cell">
                  {t('admin.products.table.price')}
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t('admin.products.table.size')}
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  {t('admin.products.table.status')}
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.products.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onEdit={onEdit}
                  onDelete={(id) => onDelete(id)}
                  onToggleAvailability={onToggleAvailability}
                  navigate={(id) => navigate(id)}
                  imageIndex={imageIndexMap[product.id] ?? 0}
                  setImageIndex={(id, next) => setImageIndexMap(prev => ({ ...prev, [id]: next }))}
                  t={t}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {t('admin.products.empty.title')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {t('admin.products.empty.subtitle')}
          </p>
        </div>
      )}
    </div>
  );
}
